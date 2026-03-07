const editor = document.getElementById("editor");
const charCount = document.getElementById("charCount");
const form = document.getElementById("letterForm");
const previewText = document.getElementById("previewText");

const fontSelectText = document.getElementById("fontSelectText");
const fontSizeInput = document.getElementById("fontSize");
const fontSizeValue = document.getElementById("fontSizeValue");
const colorPicker = document.getElementById("colorPicker");
const colorText = document.getElementById("colorText");
const themeSelect = document.getElementById("theme");


function parseCustomTags(text){

  if(!text) return "";

  text = text
  .replace(/&/g,"&amp;")
  .replace(/</g,"&lt;")
  .replace(/>/g,"&gt;");


  text = text
  .replace(/&lt;font\s+face="(.*?)"&gt;/g, '<span style="font-family: $1;">')
  .replace(/&lt;\/font&gt;/g, '</span>')
  .replace(/&lt;span\s+style="(.*?)"&gt;/g, '<span style="$1">')
  .replace(/&lt;\/span&gt;/g, '</span>')
  .replace(/&lt;b&gt;/g, '<b>')
  .replace(/&lt;\/b&gt;/g, '</b>')
  .replace(/&lt;i&gt;/g, '<i>')
  .replace(/&lt;\/i&gt;/g, '</i>')
  .replace(/&lt;u&gt;/g, '<u>')
  .replace(/&lt;\/u&gt;/g, '</u>')
  .replace(/&lt;br&gt;/g, '<br>')
  .replace(/&amp;nbsp;/g, '&nbsp;');

  text = text.replace(/^##\s(.+)$/gm,"<h3>$1</h3>");
  text = text.replace(/^#\s(.+)$/gm,"<h2>$1</h2>");

  text = text.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>");

  text = text.replace(/__(.*?)__/g,"<u>$1</u>");

  text = text.replace(/\*(.*?)\*/g,"<i>$1</i>");
  text = text.replace(/_(.*?)_/g,"<i>$1</i>");

  text = text.replace(/\|\|([\s\S]*?)\|\|/g,
    `<span class="spoiler">$1</span>`
  );

  text = text.replace(
    /<<\s*(https?:\/\/[^\s]+)\s*:\s*([^>]+)\s*>>/g,
    `<a href="$1" class="custom-link" target="_blank">$2</a>`
  );

  text = text.replace(/\n/g,"<br>");

  return text;
}


if(editor){

editor.addEventListener("input", () => {

  const rawText = editor.innerHTML;

  const parsed = parseCustomTags(rawText);

  if(previewText){
    previewText.innerHTML =
      parsed || "Nội dung thư của bạn sẽ hiển thị ở đây...";
  }

  const textLength = editor.innerText.length;

  if(charCount){
    charCount.textContent = `${textLength} / 2000`;
    charCount.style.color = textLength > 2000 ? "red" : "";
  }

});

}

if(previewText){

previewText.addEventListener("click", (e) => {

  if(e.target.classList.contains("spoiler")){
    e.target.classList.toggle("reveal");
  }

});

}

if(form){

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const to = document.getElementById("to")?.value.trim();
  const subject = document.getElementById("subject")?.value.trim();
  const password = document.getElementById("password")?.value;
  const expiryDays = document.getElementById("expiry")?.value;
  const customIdInput = document.getElementById("customId")?.value.trim();
  const theme = themeSelect?.value;

  const message = editor.innerText.trim();

  if(!message){
    showPopup("Bạn chưa viết nội dung 💌");
    return;
  }

  let id = customIdInput || Math.random().toString(36).substring(2,10);

  let expiry = null;

  if(expiryDays && expiryDays !== "0"){
    expiry = Date.now() + (expiryDays * 24 * 60 * 60 * 1000);
  }

  let hashedPassword = null;

  if(password){
    hashedPassword = btoa(password);
  }

  try{

    await window.firebaseSetDoc(id,{
      to,
      subject,
      message,
      password: hashedPassword,
      expiry,
      theme,
      fontSize: fontSizeInput?.value,
      color: colorPicker?.value,
      createdAt: Date.now()
    });

    const link = `${window.location.origin}/l/${id}`;

    showPopup("Tạo thư thành công 💌",link);

    form.reset();

    editor.innerHTML = "";

    if(previewText){
      previewText.innerHTML =
      "Nội dung thư của bạn sẽ hiển thị ở đây...";
    }

    if(charCount){
      charCount.textContent = "0 / 2000";
    }

  }
  catch(err){

    console.error(err);

    showPopup("Lỗi khi lưu thư 😢");

  }

});

}


if(fontSelectText){
fontSelectText.addEventListener("change", () => {

  if(fontSelectText.value){
    const selection = window.getSelection();
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    // Khôi phục selection
    if(range){
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    document.execCommand("fontName", false, fontSelectText.value);
    if(range){
      range.collapse(false); // false = collapse ở cuối range
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    // Trigger input event để update preview
    editor.dispatchEvent(new Event("input"));
    
    // Reset dropdown
    fontSelectText.value = "";
  }

});
}

if(fontSizeInput){
fontSizeInput.addEventListener("input", () => {

  editor.style.fontSize = fontSizeInput.value + "px";

  if(previewText){
    previewText.style.fontSize = fontSizeInput.value + "px";
  }

  if(fontSizeValue){
    fontSizeValue.textContent = fontSizeInput.value + "px";
  }

});
}

if(colorPicker){
colorPicker.addEventListener("input", () => {

  editor.style.color = colorPicker.value;

  if(previewText){
    previewText.style.color = colorPicker.value;
  }

  if(colorText){
    colorText.value = colorPicker.value;
  }

});
}

if(colorText){
colorText.addEventListener("input", () => {

  editor.style.color = colorText.value;

  if(previewText){
    previewText.style.color = colorText.value;
  }

});
}


function format(command){

  editor.focus();
  document.execCommand(command,false,null);

}

function setFont(font){

  editor.focus();
  document.execCommand("fontName",false,font);

}

function setColor(color){

  editor.focus();
  document.execCommand("foreColor",false,color);

}


function showPopup(message,link=""){

  const msg = document.getElementById("popupMessage");
  const linkInput = document.getElementById("popupLink");
  const popup = document.getElementById("popup");
  const copyBtn = document.querySelector(".copy-btn");

  if(msg) msg.innerText = message;
  if(linkInput){
    linkInput.value = link;
    linkInput.style.display = link ? "block" : "none";
  }
  if(copyBtn){
    copyBtn.style.display = link ? "block" : "none";
  }

  popup?.classList.remove("hidden");

}

function closePopup(){

  document.getElementById("popup")?.classList.add("hidden");

}

function copyLink(){

  const input = document.getElementById("popupLink");
  const successText = document.getElementById("copySuccess");

  if(!input) return;

  navigator.clipboard.writeText(input.value).then(()=>{

    successText?.classList.remove("hidden");

    setTimeout(()=>{
      successText?.classList.add("hidden");
    },2000);

  });

}


if(themeSelect){

document.body.classList.add("default");

themeSelect.addEventListener("change", () => {

  const theme = themeSelect.value;

  document.body.className = "";

  document.body.classList.add(theme);

});

}