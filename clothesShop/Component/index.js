const slides = document.querySelector(".slides");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let counter = 0;
const size = slides.children[0].offsetWidth;

function nextSlide() {
  slides.classList.add("animate");
  counter++;
  if (counter === slides.children.length) {
    counter = 0;
  }
  slides.style.transform = `translateX(-${size * counter}px)`;
}

function prevSlide() {
  slides.classList.add("animate");
  counter--;
  if (counter < 0) {
    counter = slides.children.length - 1;
  }
  slides.style.transform = `translateX(-${size * counter}px)`;
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

setInterval(nextSlide, 3000);
