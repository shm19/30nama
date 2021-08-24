/* eslint-disable */

const carouselSlide = document.querySelector('.carousel-slide');
const carouselDivs = document.querySelectorAll(
  '.carousel-slide .reviews__card'
);

// Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let counter = 0;
const elementSize = carouselDivs[0].clientWidth;

nextBtn.addEventListener('click', () => {
  if (counter < carouselDivs.length - 1) {
    counter++;
    carouselSlide.style.transition = 'transform 0.4s ease-in-out';
    carouselSlide.style.transform =
      'translateX(' + -elementSize * counter + 'px)';
  }
});

prevBtn.addEventListener('click', () => {
  if (counter > 0) {
    counter--;
    carouselSlide.style.transition = 'transform 0.4s ease-in-out';
    carouselSlide.style.transform =
      'translateX(' + -elementSize * counter + 'px)';
  }
});
