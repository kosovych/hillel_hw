module.exports = FuncTableConctructor;
let $ = require('jquery');

function FuncTableConctructor($container, model) {
  return new FuncTable($container, model);
}

function FuncTable(container, model) {
  this.$container = $(container);
  this.model = model;

  this.initForm();
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
}