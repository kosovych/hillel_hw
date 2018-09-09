const Clock = require('./clock.js');
const clock = new Clock();
const tableGenerator = require('./tableGenerator.js');

const $tableGenerator = document.getElementById('table-generator');

$tableGenerator.addEventListener('submit', function (ev) {
  tableGenerator(ev, 'test1', 'test2');
});

clock.start();