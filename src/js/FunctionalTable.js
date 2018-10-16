module.exports = FuncTableConctructor;
let $ = require('jquery');
const checkInputsHasValue = require('./checkInputsHasValueHandler.js');

window.addEventListener('focusout', (ev) => {
  if (ev.target.classList.contains('input-component__input')) {
    checkInputsHasValue(null, ev.target);
  }
})

function FuncTableConctructor($container, model) {
  return new FuncTable($container, model);
}

function FuncTable(container, model) {
  this.$container = $(container);
  this.model = model;

  this.initForm();

  if(!localStorage.getItem('functional_table')) {
    localStorage.setItem('functional_table', JSON.stringify([]));
  }
}

FuncTable.prototype.initForm = function () {
  const re = / /gi;
  this.$form = $('<form/>', {
    'class': 'student-table'
  });

  
  this.model.forEach( (el) => {
    let id = parseInt(Math.random() * 10000);
    let input = $('<div/>', {
      html: `<input id="${id + '-' + el.replace(re, '-')}" autocomplete="none" class="input-component__input" placeholder="" name="${el.replace(re, '-') }">
      <label class="input-component__label" for="${ id + '-' + el.replace(re, '-')}">Enter the ${el}</label>`,
      'class': 'input-component'
    });
    this.$form.append(input);
  });
  
  this.$form.append($('<button/>', {
    'type': 'submit',
    'class': "btn_submit",
    html: 'Add student'
  }));
  
  this.$container.append(this.$form);

  this.$form.on('submit', (ev) => {
    studentFormHandler(ev, this)
  });
}

FuncTable.prototype.tableInit = function() {
  let $table = $('<table/>', {'class': 'table'});
  let $thead = $('<thead/>');
  let $tbody = $('<tbody/>');
  let $tr = $('<tr>');
  
  this.model.forEach( el => {
    $tr.append($('<td/>', {html: `${el}`}));
  });

  $tr.prepend($('<td/>', {html: '№'}));
  this.$container.append($table.append($thead.append($tr)).append($tbody));

  this.$table = $table;
}

function studentFormHandler(ev, context) {
  ev.preventDefault();
  let formData = new FormData(ev.target);

  if(!context.$table) {
    context.tableInit();
  }

  


}