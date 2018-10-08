const Clock = require('./clock.js');
const tableGenerator = require('./tableGenerator.js');
const getIndexOfEl = require('./getIndexOfEl.js');
const checkInputsHasValue = require('./checkInputsHasValue.js');
const windowSizeBadge = require('./windowSizeBadge.js');
const Tab = require('./Tab.js');
const Carousel = require('./Carousel');
const CarouselClass = require('./Carousel-Class');

const $tableGenerator = document.getElementById('table-generator');
let $inputs = document.getElementsByClassName('input-component__input');
let $viewportBadge = document.getElementById('viewport-badge');
let $forms = document.getElementById('table-generator');

//timer & clock
const tab = new Tab();
const clock = new Clock(document.getElementById('clock-hour'),
                        document.getElementById('clock-minute'),
                        document.getElementById('clock-second'));

const timer = new Clock(document.getElementById('timer-hour'),
                        document.getElementById('timer-minute'),
                        document.getElementById('timer-second'),
                        document.getElementById('timer'),
                        false);

clock.start();
timer.start();

window.addEventListener('keyup', function(ev) {
  if(ev.keyCode === 27) {
    timer.reset();
  } else return
});

//Input UI
$forms.addEventListener('reset', function (ev) {
  setTimeout(() => {
    checkInputsHasValue(document.querySelectorAll(`#${ev.target.id} .input-component__input`));
  }, 0);
}, 'passive');

window.addEventListener('resize', function (ev) {
  windowSizeBadge($viewportBadge);
}, true);

windowSizeBadge($viewportBadge);

checkInputsHasValue($inputs);

//table gen
$tableGenerator.addEventListener('submit', function (ev) {
  ev.preventDefault();
  let table = tableGenerator(document.getElementById('table-rows').value, document.getElementById('table-cols').value);

  if (!table) {
    ev.target.reset();
    return;
  }

  ev.target.reset();
  document.getElementById('table-container').appendChild(table);
  table.addEventListener('click', function (ev) {
    getIndexOfEl(ev);
  });
});


const carousel = Carousel('.carousel', {
  autoPlay: false,
  dots: true,
  title: true
});
const carousel2 = Carousel('.another-cats', {
  autoPlay: true
});

const carousel3 = CarouselClass('.class-cats', {
  autoPlay: false,
  dots: true,
  title: true
});
const carousel4 = CarouselClass('.another-class-cats', {
  autoPlay: true
});