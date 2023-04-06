import Swiper from 'swiper/bundle';

const stepText = document.querySelectorAll('.p-howto__step-item');
const stepHand = document.querySelector('.p-howto__screenshots-hand');

export const step = new Swiper('.p-howto__swiper', {
  slidesPerView: 1,
  loop: false,
  pagination: {
    el: '.p-howto__swiper-pagination',
    bulletClass: 'p-howto__swiper-dots',
    bulletActiveClass: 'p-howto__swiper-active',
    clickable: true,
  },
  autoplay: {
    delay: 5000,
  },
  on: {
    slideChange: function() {
      stepText.forEach((item)=> item.classList.remove('active'));
      stepText[step.activeIndex].classList.add('active');
      if(step.activeIndex == 0 ) {
        stepHand.classList.remove('is-step2');
        stepHand.classList.add('is-step1');
      } else if(step.activeIndex == 1) {
        stepHand.classList.remove('is-step1');
        stepHand.classList.add('is-step2');
      } else {
        stepHand.classList.remove('is-step1');
        stepHand.classList.remove('is-step2');
      }
    }
  }
});

export const mv = new Swiper('.p-mv__swiper', {
  slidesPerView: 1,
  effect: 'fade',
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 3000,
  }
});