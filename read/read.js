const loading = document.getElementById("loading")
const error = document.getElementById("error")

const passwordBox = document.getElementById("passwordBox")
const passwordInput = document.getElementById("passwordInput")
const unlockBtn = document.getElementById("unlockBtn")
const wrongPassword = document.getElementById("wrongPassword")

const letterContainer = document.getElementById("letterContainer")

const letterSubject = document.getElementById("letterSubject")
const letterTo = document.getElementById("letterTo")
const letterContent = document.getElementById("letterContent")

let currentLetter = null


function getLetterId(){

const path = window.location.pathname

if(path.startsWith("/l/")){
return path.split("/l/")[1]
}

const params = new URLSearchParams(window.location.search)
return params.get("id")

}


async function loadLetter(){

const id = getLetterId()

if(!id){

loading.classList.add("hidden")
error.classList.remove("hidden")

return

}

try{

const data = await window.firebaseGetDoc(id)

if(!data){

loading.classList.add("hidden")
error.classList.remove("hidden")

return

}

currentLetter = data

/* expiry check */

if(data.expiry && Date.now() > data.expiry){

loading.classList.add("hidden")
error.innerHTML = "⏰ Thư đã hết hạn"
error.classList.remove("hidden")

return

}

if(data.password){

loading.classList.add("hidden")
passwordBox.classList.remove("hidden")

}
else{

showLetter()

}

}
catch(e){

console.error(e)

loading.classList.add("hidden")
error.classList.remove("hidden")

}

}


function showLetter(){

loading.classList.add("hidden")
passwordBox.classList.add("hidden")

letterContainer.classList.remove("hidden")

letterSubject.textContent = currentLetter.subject || "(Không tiêu đề)"

letterTo.textContent = currentLetter.to ? "To: "+currentLetter.to : ""

letterContent.innerHTML = currentLetter.message

}


/* password */

unlockBtn.addEventListener("click",()=>{

const input = passwordInput.value

const hashed = btoa(input)

if(hashed === currentLetter.password){

showLetter()

}
else{

wrongPassword.classList.remove("hidden")

}

})


/* spoiler */

document.addEventListener("click",(e)=>{

if(e.target.classList.contains("spoiler")){

e.target.classList.toggle("reveal")

}

})


loadLetter()