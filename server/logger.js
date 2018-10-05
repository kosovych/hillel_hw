let url = 'https://test.com';
const EventEmmiter = require('events');
const emitter = new EventEmmiter();


class Logger extends EventEmmiter  {
  log(message) {
    console.log(url + message);
    this.emit('messageLog', {id: 1, url: 'http://qwerty.com'});
  }
}

module.exports = Logger;