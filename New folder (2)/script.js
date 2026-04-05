document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const scene = document.querySelector(".scene");

  if (envelope) {
    envelope.addEventListener("click", () => {
      scene.classList.add("open");
    });
  }
});