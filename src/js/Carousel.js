module.exports = Carousel;

function Carousel($container) {
  return new CarouselConstructor($container);
}

function CarouselConstructor($container) {
  this.$container = document.querySelector($container);
  this.$carouselWrapper = this.$container.firstElementChild;
  this.$slidesWrapper = this.$carouselWrapper.firstElementChild;
  this.$slides = Array.from(this.$slidesWrapper.children);
  this.$carouselWrapper .style = `max-width: ${(this.$container.offsetWidth - 40)}px`;

  let slidesW = 0;
  this.$slides.map(el => {
    el.style = `width: ${this.$slidesWrapper.offsetWidth}px`;
    slidesW += el.offsetWidth;
  });

  this.$slidesWrapper.style = `width: ${slidesW}px`;

  append('button', 'carousel-btn left', this.$container);
  append('button', 'carousel-btn right', this.$container);
}

function append(el, $class, $append) {
  let $el = document.createElement(el);
  $el.setAttribute('class', $class);
  $append.appendChild($el);
}