const envelope = document.querySelector(".envelope");
const scene = document.querySelector(".scene");

envelope.addEventListener("click", () => {
  scene.classList.add("open");
});