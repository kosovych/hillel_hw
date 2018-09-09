module.exports = Clock;
const setDublesumbolVal = require('./setDublesumbolVal.js');

function  Clock() {
  let date = new Date();
  this.hours = date.getHours();
  this.minutes = date.getMinutes();
  this.seconds = date.getSeconds();

  this.$hours = document.getElementById('clock-hour');
  this.$minutes = document.getElementById('clock-minute');
  this.$seconds = document.getElementById('clock-second');

  this.$hours.innerHTML = setDublesumbolVal(this.hours, this.$hours.innerHTML, 10);
  this.$minutes.innerHTML = setDublesumbolVal(this.minutes, this.$minutes.innerHTML, 10);
  this.$seconds.innerHTML = setDublesumbolVal(this.seconds, this.$seconds.innerHTML, 10);
}

Clock.prototype.log = function () {
  console.log(this);
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
  if(this.minutes < 59) {
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
  let timerID = setInterval(() => {
    this.incSecond();
  }, 1000);
}