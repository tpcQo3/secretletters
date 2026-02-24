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

function readSecret(){
    let params = new URLSearchParams(window.location.search);
    let data = params.get("data");

    if(data){
        let decoded = atob(data);
        let parts = decoded.split("||");

        document.getElementById("mainBox").innerHTML = `
            <h2>Secret Letter</h2>
            <p><b>From:</b> ${parts[0]}</p>
            <p>${parts[1]}</p>
        `;
    }
}

readSecret();