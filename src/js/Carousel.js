module.exports = Carousel;

function Carousel($container) {
  return new CarouselConstructor($container);
}

function CarouselConstructor($container) {
  this.$container = document.querySelector($container);
  this.$carouselWrapper = this.$container.firstElementChild;
  this.$carouselWrapper.firstElementChild.append(this.$carouselWrapper.firstElementChild.children[0].cloneNode(true));
  this.$slidesWrapper = this.$carouselWrapper.firstElementChild;
  this.$slides = Array.from(this.$slidesWrapper.children);
  this.curentSlide = 0;
  this.$carouselWrapper.style = `max-width: ${(this.$container.offsetWidth - 40)}px`;

  let self = this;
  let slidesW = 0;

  this.$slides.map(el => {
    el.style.width = `${this.$slidesWrapper.offsetWidth}px`;
    slidesW += el.offsetWidth;
  });

  this.$slidesWrapper.style.width = `${slidesW}px`;

  append('button', 'carousel-btn prev', this.$container).addEventListener('click', function (ev) {
    self.nextSlide(ev, self);
  });
  append('button', 'carousel-btn next', this.$container).addEventListener('click', function (ev) {
    self.nextSlide(ev, self);
  });
}

function append(el, $class, $append) {
  let $el = document.createElement(el);
  $el.setAttribute('class', $class);
  $append.appendChild($el);
  return $el
}

CarouselConstructor.prototype.nextSlide = function (ev, $this) {
  $this.curentSlide += 1;

  if (!$this.$slides[$this.curentSlide + 1]) {
    $this.curentSlide = 0;
    this.$slidesWrapper.addEventListener('transitionend', function as(ev, self) {
      replaceSlider(ev);
      ev.target.removeEventListener('transitionend', as);
    });
  }

  let shift = $this.$slides[$this.curentSlide].offsetWidth;
  console.log(shift);
  
  $this.$slidesWrapper.style.left = $this.$slidesWrapper.style.left === "" ?
  `${-shift}px` :
  `${parseInt($this.$slidesWrapper.style.left) - shift}px`;
  

}

function replaceSlider(ev, context) {
  ev.target.style.left = 0;
  console.log("asd");
}