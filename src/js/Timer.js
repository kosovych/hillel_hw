module.exports = Timer;
const setDublesumbolVal = require('./setDublesumbolVal.js');
const Clock = require('./clock');

function Timer() {
  this.hours = 0;
  this.minutes = 0;
  this.seconds = 0;

  this.$hours = document.getElementById('timer-hour');
  this.$minutes = document.getElementById('timer-minute');
  this.$seconds = document.getElementById('timer-second');
  this.$container = document.getElementById('timer');

  this.$container.addEventListener('mouseover', Clock.prototype.stop.bind(this));
  this.$container.addEventListener('mouseout', Clock.prototype.start.bind(this));

  this.$hours.innerHTML = setDublesumbolVal(this.hours, this.$hours.innerHTML, 10);
  this.$minutes.innerHTML = setDublesumbolVal(this.minutes, this.$minutes.innerHTML, 10);
  this.$seconds.innerHTML = setDublesumbolVal(this.seconds, this.$seconds.innerHTML, 10);
}

Timer.prototype.log = Clock.prototype.log;

Timer.prototype.incHour = Clock.prototype.incHour;

Timer.prototype.incMinute = Clock.prototype.incMinute;

Timer.prototype.incSecond = Clock.prototype.incSecond;

Timer.prototype.start = Clock.prototype.start;

Timer.prototype.stop = function () {
  clearInterval(this.timerID);
}