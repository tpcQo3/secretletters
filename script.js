const envelope = document.getElementById("envelope");

envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");
});

function goNext(event) {
    event.stopPropagation();
    window.location.href = "write.html";
}