module.exports = Carousel;

function Carousel($container, options) {
  return new CarouselConstructor($container, options);
}

function CarouselConstructor($container, options) {
  this.options = options;
  this.$container = document.querySelector($container);
  this.$container.carouselObj = this;

  this.$carouselWrapper = this.$container.firstElementChild;
  this.$carouselWrapper.firstElementChild.append(this.$carouselWrapper.firstElementChild.children[0].cloneNode(true));

  this.$carouselWrapper
    .firstElementChild
    .insertBefore(this.$carouselWrapper.firstElementChild.children[this.$carouselWrapper.firstElementChild.children.length - 2].cloneNode(true),
      this.$carouselWrapper.firstElementChild.children[0]);

  this.$slidesWrapper = this.$carouselWrapper.firstElementChild;
  this.$slides = Array.from(this.$slidesWrapper.children);
  this.curentSlide = 1;

  this.$carouselWrapper.style = `max-width: ${(this.$container.offsetWidth - 40)}px`;

  let self = this;
  this.slideWidth = this.$carouselWrapper.offsetWidth * this.$slides.length;
  this.slidesWidth = this.$slides.map(el => el.offsetWidth);

  this.$slides.map(el => {
    el.style.width = `${this.$slidesWrapper.offsetWidth}px`;
  });

  replaceSlider(null, 'start', this);
  setTimeout(() => {
    this.$slidesWrapper.style.transition = 'left 0.3s';
  }, 0);

  this.$slidesWrapper.style.width = `${this.slideWidth}px`;

  this.$prevSlideBtn = append('button', 'carousel-btn prev', this.$container);

  this.$prevSlideBtn.addEventListener('click', function prevSlideHandler(ev) {
    ev.target.removeEventListener('click', prevSlideHandler);
    self.prevSlide(ev, self);
    self.$slidesWrapper.addEventListener('transitionend', function transitionendHandler(ev) {
      ev.target.removeEventListener('transitionend', transitionendHandler);
      self.$prevSlideBtn.addEventListener('click', prevSlideHandler);
    });
  });

  this.$nextSlideBtn = append('button', 'carousel-btn next', this.$container);

  this.$nextSlideBtn.addEventListener('click', function nextSlideHandler(ev) {
    ev.target.removeEventListener('click', nextSlideHandler);
    self.nextSlide(ev, self);
    self.$slidesWrapper.addEventListener('transitionend', function transitionendHandler(ev) {
      ev.target.removeEventListener('transitionend', transitionendHandler);
      self.$nextSlideBtn.addEventListener('click', nextSlideHandler);
    });
  });

  // Options Description
  if (this.options.autoPlay) {
    this.autoPlayMethod();
  }

  if (this.options.dots) {
    this.dotsInit();
  }

  if (this.options.title) {
    this.titleInit('init');
  }

  Object.defineProperty(this, '_curentSlide', {

    get: function () {
      return this.curentSlide;
    },

    set: function (value) {
      this.updateDot('rm', this.curentSlide);
      this.curentSlide = value;
      this.updateDot('add', this.curentSlide);
    }
  });
}

function append(el, $class, $append) {
  let $el = document.createElement(el);
  $el.setAttribute('class', $class);
  $append.appendChild($el);
  return $el
}

CarouselConstructor.prototype.nextSlide = function (ev, $this) {
  if ($this.$slides[$this._curentSlide + 1]) {
    $this._curentSlide = $this._curentSlide + 1;
  }

  if (!$this.$slides[$this._curentSlide + 1]) {
    $this._curentSlide = 1;
    $this.$slidesWrapper.addEventListener('transitionend', function as(ev, self) {
      $this.$slidesWrapper.style.transition = 'none';
      replaceSlider(ev, 'start', $this);
      $this.$slidesWrapper.removeEventListener('transitionend', as);
      setTimeout(() => {
        $this.$slidesWrapper.style.transition = ' left 0.3s'
      }, 0);
    });
  }

  let shift = $this.$slides[$this.curentSlide].offsetWidth;

  $this.$slidesWrapper.style.left = $this.$slidesWrapper.style.left === "" ?
    `${-shift}px` :
    `${parseInt($this.$slidesWrapper.style.left) - shift}px`;
}

CarouselConstructor.prototype.prevSlide = function (ev, $this) {
  $this._curentSlide = $this._curentSlide - 1;

  if (!$this.$slides[$this.curentSlide - 1]) {
    $this._curentSlide = $this.$slides.length - 2;
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

  $this.$slidesWrapper.style.left = $this.$slidesWrapper.style.left === "" ?
    `${shift}px` :
    `${parseInt($this.$slidesWrapper.style.left) + shift}px`;
}

function replaceSlider(ev, controller, context) {
  if (controller === 'start') {
    context.$slidesWrapper.style.left = `-${context.slideWidth / context.$slides.length}px`;
  }

  if (controller === 'end') {
    context.$slidesWrapper.style.left = '-' + context
      .slidesWidth.slice(0, context.slidesWidth.length - 2)
      .reduce((accumulator, currentValue) => accumulator + currentValue) + 'px';
  }
}

CarouselConstructor.prototype.autoPlayMethod = function () {
  if (this.setIntervalId) {
    clearInterval(this.setIntervalId);
  }

  let self = this;
  this.setIntervalId = setInterval(this.nextSlide, 1500, null, this);
  this.$slidesWrapper.addEventListener('mouseover', function mouseOverAutoplayHandler(ev) {
    clearInterval(self.setIntervalId);
    ev.target.addEventListener('mouseout', () => self.autoPlayMethod());
  });
}

CarouselConstructor.prototype.dotsInit = function () {
  let dotsCount = this.$slides.length - 3;
  let dotsContainer = document.createElement('div');
  dotsContainer.classList.add('dots');

  for (let i = 0; i <= dotsCount; i++) {
    let dot = document.createElement('i');
    dot.classList.add('dots__el');
    dotsContainer.appendChild(dot);
  }

  this.dots = Array.from(dotsContainer.children);
  dotsContainer.addEventListener('click', (ev) => {
    if (ev.target.tagName.toLowerCase() !== "i") {
      return
    }
    moveToSlide(this, this.dots.indexOf(ev.target));

  });
  this.$carouselWrapper.appendChild(dotsContainer);
  this.updateDot('add', this.curentSlide);
};

CarouselConstructor.prototype.updateDot = function (mod, dotIndex) {
  if (!this.options.dots) {
    return
  }

  if (mod === 'rm' && this.dots[dotIndex - 1]) {
    this.dots[dotIndex - 1].classList.remove('active');
  }

  if (mod === 'add' && this.dots[dotIndex - 1]) {
    this.dots[dotIndex - 1].classList.add('active');
  }
}

CarouselConstructor.prototype.titleInit = function (mod) {
  let $title = document.createElement('div');
  $title.classList.add('slide-title');
  this.$carouselWrapper.appendChild($title);
  this.$title = $title;
  this.$carouselWrapper.addEventListener('mouseover', () => {
    this.$title.innerText = this.$slides[this.curentSlide].dataset.slideTitle;
    this.$title.style.opacity = 1;
  });

  this.$carouselWrapper.addEventListener('mouseout', () => {
    this.$title.style.opacity = 0;
  });
}


function moveToSlide(context, toSlide) {
  context.$slidesWrapper.style.left = `-${(context.slideWidth / context.$slides.length) * toSlide + (context.slideWidth / context.$slides.length)}px`;
  context._curentSlide = toSlide + 1;
}