function openLetter() {
    const envelope = document.querySelector(".envelope");
    envelope.classList.toggle("open");
}

function goNext(event) {
    event.stopPropagation();
    window.location.href = "write.html";
}