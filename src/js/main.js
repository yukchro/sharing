require('intersection-observer');
import { step, mv } from './_swiperOptions';
import { smoothScroll } from './_smoothScroll';
import { onIntersect } from './_scrollDetect';
import 'swiper/swiper-bundle.min.css';

window.addEventListener('DOMContentLoaded', ()=> {
  smoothScroll();
  const options = { rootMargin: '0px 0px 0px 0px'};
  const targets = document.querySelectorAll('.js-animation');
  targets.forEach((target) => onIntersect(target, options));
})
