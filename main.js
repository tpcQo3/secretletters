let slides = document.querySelectorAll(".slide");
let current = 0;
let step = 0;

function next() {
  let steps = slides[current].querySelectorAll(".step");

  // hiện từng dòng
  if (step < steps.length) {
    steps[step].classList.add("show");
    step++;
  } else {

    // gọi hiệu ứng slide hiện tại
    let outFunc = window[`slide${current + 1}Out`];
    if (outFunc) outFunc();

    setTimeout(() => {
      slides[current].classList.remove("active");
      current++;

      if (current < slides.length) {
        slides[current].classList.add("active");
        step = 0;
      }

    }, 1500);
  }
}

document.addEventListener("click", next);
document.addEventListener("keydown", e => {
  if (e.code === "Space") next();
});