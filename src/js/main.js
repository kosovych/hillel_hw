const Clock = require('./clock.js');
const clock = new Clock();
const tableGenerator = require('./tableGenerator.js');
const getIndexOfEl = require('./getIndexOfEl.js');
const checkInputsHasValue = require('./checkInputsHasValue.js');

const $tableGenerator = document.getElementById('table-generator');

let $inputs = document.getElementsByClassName('input-component__input');

// let $forms = document.getElementsByTagName('form');

let $forms = document.getElementById('table-generator');
$forms.addEventListener('reset', function(ev) {
  setTimeout(() => {
    checkInputsHasValue(document.querySelectorAll(`#${ev.target.id} .input-component__input`));
  }, 0);
}, 'passive');

checkInputsHasValue($inputs);

$tableGenerator.addEventListener('submit', function (ev) {
  ev.preventDefault();
  let table = tableGenerator(document.getElementById('table-rows').value, document.getElementById('table-cols').value);

  if(!table) {
    ev.target.reset();
    return;
  }

  ev.target.reset();
  document.getElementById('table-container').appendChild(table);
  table.addEventListener('click', function(ev) {
    getIndexOfEl(ev);
  });
});

clock.start();