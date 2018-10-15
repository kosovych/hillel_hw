module.exports = Clock;
const setDublesumbolVal = require('./setDublesumbolVal.js');

function Clock($hours, $minutes, $seconds, $container = null, isClock = true) {
  let date = new Date();
  this.isClock = isClock;

  this.hours = this.isClock ? date.getHours() : 0;
  this.minutes = this.isClock ? date.getMinutes() : 0;
  this.seconds = this.isClock ? date.getSeconds() : 0;

  this.$hours = $hours;
  this.$minutes = $minutes;
  this.$seconds = $seconds;
  this.$container = $container;


  if (!isClock) {
    this.$container.addEventListener('mouseover', Clock.prototype.stop.bind(this));
    this.$container.addEventListener('mouseout', Clock.prototype.start.bind(this));
  }

  this.$hours.innerHTML = setDublesumbolVal(this.hours, this.$hours.innerHTML, 10);
  this.$minutes.innerHTML = setDublesumbolVal(this.minutes, this.$minutes.innerHTML, 10);
  this.$seconds.innerHTML = setDublesumbolVal(this.seconds, this.$seconds.innerHTML, 10);
}

Clock.prototype.log = function () {
}

Clock.prototype.incHour = function () {
  if (this.hours < 23) {
    this.hours = this.hours + 1;
  } else {
    this.hours = 0;
  }

  this.$hours.innerHTML = setDublesumbolVal(this.hours, this.$hours.innerHTML, 10);
}

Clock.prototype.incMinute = function () {
  if (this.minutes < 59) {
    this.minutes = this.minutes + 1;
  } else {
    this.incHour();
    this.minutes = 0;
  }

  this.$minutes.innerHTML = setDublesumbolVal(this.minutes, this.$minutes.innerHTML, 10);
}

Clock.prototype.incSecond = function () {
  if (this.seconds < 59) {
    this.seconds = this.seconds + 1;
  } else {
    this.incMinute();
    this.seconds = 0;
  }

  this.$seconds.innerHTML = setDublesumbolVal(this.seconds, this.$seconds.innerHTML, 10);
}

Clock.prototype.start = function () {
  this.timerID = setInterval(() => {
    this.incSecond();
  }, 1000);
}

Clock.prototype.stop = function () {
  if (!this.isClock) {
    clearInterval(this.timerID);
  }
}

Clock.prototype.reset = function () {
  if (!this.isClock) {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.$hours.innerHTML = '00';
    this.$minutes.innerHTML = '00';
    this.$seconds.innerHTML = '00';
  }
}