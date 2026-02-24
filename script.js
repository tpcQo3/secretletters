const envelope = document.querySelector(".envelope");

envelope.addEventListener("click", () => {
  envelope.classList.toggle("open");
});

function goNext(e){
  e.stopPropagation();
  window.location.href = "write.html";
}