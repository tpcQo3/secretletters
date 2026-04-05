let slides = document.querySelectorAll(".slide");
let current = 0;
let step = 0;
let img = document.getElementById("img");

function next() {
  let steps = slides[current].getElementsByClassName('container');

  if (step < steps.length) {
    steps[step].classList.add("show");
    step++;
  } else {

    // slide 1 → 2: ảnh trượt
    if (current === 0) {
      img.classList.add("move");

      setTimeout(() => {
        slides[current].classList.remove("active");
        current++;
        slides[current].classList.add("active");
        step = 0;
      }, 1500);

      return;
    }

    slides[current].classList.remove("active");
    current++;

    if (current < slides.length) {
      slides[current].classList.add("active");
      step = 0;
    }
  }
}

document.addEventListener("click", next);
document.addEventListener("keydown", e => {
  if (e.code === "Space") next();
});

let slide1 = document.getElementsByClassName("slide1")[0];

document.addEventListener("click", () => {
  slide1.classList.add("move-left");
});