function openLetter(){
    document.getElementById("letterContainer").classList.add("hidden");
    document.getElementById("letterContent").classList.remove("hidden");
}

function showForm(){
    document.getElementById("letterContent").classList.add("hidden");
    document.getElementById("mainBox").classList.remove("hidden");
}

function createLink(){
    let name = document.getElementById("name").value;
    let msg = document.getElementById("msg").value;

    if(name === "" || msg === ""){
        alert("Please fill all fields");
        return;
    }

    let data = btoa(name + "||" + msg);
    let link = window.location.origin + "?data=" + data;

    document.getElementById("result").innerHTML =
        "Share this link:<br><a href='"+link+"'>"+link+"</a>";
}