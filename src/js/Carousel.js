module.exports = Carousel;

function Carousel($container) {
  return new CarouselConstructor($container);
}

function CarouselConstructor($container) {
  this.$container = document.querySelector($container);
  this.$carouselWrapper = this.$container.firstElementChild;
  this.$carouselWrapper.firstElementChild.append(this.$carouselWrapper.firstElementChild.children[0].cloneNode(true));

  this.$carouselWrapper.firstElementChild.insertBefore(this.$carouselWrapper.firstElementChild.children[this.$carouselWrapper.firstElementChild.children.length - 2].cloneNode(true), this.$carouselWrapper.firstElementChild.children[0]);

  this.$slidesWrapper = this.$carouselWrapper.firstElementChild;
  this.$slides = Array.from(this.$slidesWrapper.children);
  this.curentSlide = 1;
  this.$carouselWrapper.style = `max-width: ${(this.$container.offsetWidth - 40)}px`;

  this.slidesWidth = this.$slides.map(el => el.offsetWidth);
  console.log(this.slidesWidth);

  let self = this;
  let slidesW = 0;

  this.$slides.map(el => {
    el.style.width = `${this.$slidesWrapper.offsetWidth}px`;
    slidesW += el.offsetWidth;
  });

  replaceSlider(null, 'start', this);
  setTimeout(() => {
    this.$slidesWrapper.style.transition = 'left 0.3s';
  }, 0);
  this.$slidesWrapper.style.width = `${slidesW}px`;

  append('button', 'carousel-btn prev', this.$container).addEventListener('click', function (ev) {
    self.prevSlide(ev, self);
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
    $this.curentSlide = 1;
    this.$slidesWrapper.addEventListener('transitionend', function as(ev, self) {
      ev.target.style.transition = 'none';
      replaceSlider(ev, 'start', $this);
      ev.target.removeEventListener('transitionend', as);
      setTimeout(() => {
        ev.target.style.transition = ' left 0.3s'
      }, 0);
    });
  }

  let shift = $this.$slides[$this.curentSlide].offsetWidth;
  console.log(shift);

  $this.$slidesWrapper.style.left = $this.$slidesWrapper.style.left === "" ?
    `${-shift}px` :
    `${parseInt($this.$slidesWrapper.style.left) - shift}px`;
}

CarouselConstructor.prototype.prevSlide = function (ev, $this) {
  $this.curentSlide -= 1;

  if (!$this.$slides[$this.curentSlide - 1]) {
    $this.curentSlide = $this.$slides.length - 2;
    this.$slidesWrapper.addEventListener('transitionend', function ass(ev, self) {
      ev.target.style.transition = 'none';
      replaceSlider(ev, 'end', $this);
      ev.target.removeEventListener('transitionend', ass);

      setTimeout(() => {
        ev.target.style.transition = ' left 0.3s'
      }, 0);
    });
  }

  let shift = $this.$slides[$this.curentSlide].offsetWidth;
  console.log(shift);

  $this.$slidesWrapper.style.left = $this.$slidesWrapper.style.left === "" ?
    `${shift}px` :
    `${parseInt($this.$slidesWrapper.style.left) + shift}px`;
}



function replaceSlider(ev, controller, context) {
  if (controller === 'start') {
    context.$slidesWrapper.style.left = `-${context.slidesWidth[0]}px`;
  }

  if (controller === 'end') {
    context.$slidesWrapper.style.left = '-' + context
      .slidesWidth.slice(0, context.slidesWidth.length - 2)
      .reduce((accumulator, currentValue) => accumulator + currentValue) + 'px';
  }
}