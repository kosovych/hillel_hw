module.exports = Clock;


function  Clock() {
  let date = new Date();
  this.hours = date.getHours();
  this.minutes = date.getMinutes();
  this.seconds = date.getHours();

  this.$hours = document.getElementById('clock-hour');
  this.$minutes = document.getElementById('clock-minute');
  this.$seconds = document.getElementById('clock-second');

  this.$hours.innerHTML = this.hours;
  this.$minutes.innerHTML = this.minutes;
  this.$seconds.innerHTML = this.seconds;
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

  if (this.hours < 10) {
    this.$hours.innerHTML = `0${this.hours}`;
  } else {
    this.$hours.innerHTML = `${this.hours}`;
  }
}

Clock.prototype.incMinute = function () {
  if(this.minutes < 59) {
    this.minutes = this.minutes + 1;
  } else {
    this.incHour();
    this.minutes = 0;
  }

  if (this.minutes < 10) {
    this.$minutes.innerHTML = `0${this.minutes}`;
  } else {
    this.$minutes.innerHTML = `${this.minutes}`;
  }
}

Clock.prototype.incSecond = function () {
  if (this.seconds < 59) {
    this.seconds = this.seconds + 1;
  } else {
    this.incMinute();
    this.seconds = 0;
  }

  if (this.seconds < 10) {
    this.$seconds.innerHTML = `0${this.seconds}`;
  } else {
    this.$seconds.innerHTML = `${this.seconds}`;
  }
}

Clock.prototype.start = function () {
  let timerID = setInterval(() => {
    this.incSecond();
  }, 1000);
}