module.exports = FuncTableConctructor;
let $ = require('jquery');
const checkInputsHasValue = require('./checkInputsHasValueHandler.js');


function FuncTableConctructor($container, model) {
  return new FuncTable($container, model);
}

function FuncTable(container, model) {
  this.$container = $(container);
  this.model = model;
  
  this.initForm();
  
  if(!localStorage.getItem('functional_table')) localStorage.setItem('functional_table', JSON.stringify([]));
  else renderFromLocalStorage(JSON.parse(localStorage.getItem('functional_table')), this);
}

FuncTable.prototype.initForm = function () {
  const re = / /gi;
  this.$form = $('<form/>', {
    'class': 'student-table'
  });
  
  
  this.model.forEach( (el) => {
    let id = parseInt(Math.random() * 10000);
    let input = $('<div/>', {
      html: `<input id="${id + '-' + el.title.replace(re, '-')}"
      autocomplete="none"
      class="input-component__input"
      placeholder=""
      name="${el.title.replace(re, '_') }"
      ${el.require ? 'required': ''}
      type="${el.type ? el.type : 'text'}"
      />
      
      <label class="input-component__label"
      for="${ id + '-' + el.title.replace(re, '-')}"
      >Enter the ${el.title}</label>`,
      
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
    studentFormHandler(ev, this);
  });
}

FuncTable.prototype.tableInit = function() {
  let $table = $('<table/>', {'class': 'table'});
  let $thead = $('<thead/>');
  let self = this;
  
  $thead.on('click', (ev) => {
    if($(ev.target).hasClass('sort-column')){
      if(self.currentColSort && self.currentColSort[0] !== ev.target) {
        self.currentColSort.removeClass('current-col-sort')
      }
      
      if($(ev.target).hasClass('current-col-sort')) {
        $(ev.target).toggleClass('sort-reverse');
      }
      
      self.currentColSort = $(ev.target).addClass('current-col-sort');
      setTimeout(() => {
        sortColumn.call(self, ev)
      } ,0)
    }
  });
  
  this.$tbody = $('<tbody/>');
  let $tr = $('<tr>');
  
  this.model.forEach( el => {
    $tr.append($('<td/>', {html: `<span class="sort-column">${el.title}</span>`}));
    
    this.model[this.model.indexOf(el)].title = this.model[this.model.indexOf(el)].title.replace(/ /gi, '_');
  });
  
  $tr.prepend($('<td/>', {html: '<span>№</span>'}));
  this.$container.append($table.append($thead.append($tr)).append(this.$tbody));
  
  this.$table = $table;
}

function sortColumn(ev) {
  let rowIndex = $(ev.target).parent().index();
  let arrOfRows = this.$tbody.children().toArray();
  let sortIndex = 1
  
  if(!$(ev.target).hasClass('sort-reverse')) {
    sortIndex = -sortIndex;
  }
  
  arrOfRows.sort((row_a, row_b) => {
    if (row_a.children[rowIndex].innerHTML > row_b.children[rowIndex].innerHTML) {
      return sortIndex;
    }
    if (row_a.children[rowIndex].innerHTML < row_b.children[rowIndex].innerHTML) {
      return sortIndex;
    }
    return 0;
  });
  
  this.$tbody.html('');
  arrOfRows.forEach( row => {
    this.$tbody.append($(row));
  })
}

function studentFormHandler(ev, context) {
  ev.preventDefault();
  let formData = new FormData(ev.target);
  
  if(!context.$table) {
    context.tableInit();
  }
  
  let currentStudentObj = {};
  
  context.model.forEach( el => {
    currentStudentObj[el.title] = formData.get(el.title);
  });
  
  renderStudent(currentStudentObj ,context);
}


function renderStudent(StudentObj, context) {
  let $tr =  $('<tr/>', {html: '<td>1</td>'});
  
  context.model.forEach( el => {
    $tr.append($('<td/>', {html: `${StudentObj[el.title]}`}));
  });
  
  context.$table.find('tbody').append($tr);
  
  if (context.$tbody.children().length > 1) {
    let $tbodyChildren = context.$tbody.children();
    for(let i = 1, $length = $tbodyChildren.length; i <= $length - 1; i++) {
      $tbodyChildren[i].children[0].innerHTML = i + 1;
    }
  }
  
  saveStudentInLocalStorage('functional_table', StudentObj);
}

function saveStudentInLocalStorage(localKey, obj) {
  if(!localStorage.getItem(localKey)) {
    localStorage.setItem(localKey, JSON.stringify([]));
  }
  
  let storeArrOfObj = JSON.parse(localStorage.getItem(localKey));
  storeArrOfObj.push(obj);
  localStorage.setItem(localKey, JSON.stringify(storeArrOfObj));
}

function renderFromLocalStorage(storeArrOfObj, context) {
  context.tableInit();
  let i = 1;
  storeArrOfObj.forEach( obj => {
    let $tr = $('<tr>', {html: `<td>${i++}</td>`});
    context.model.forEach( el => {
      $tr.append($(`<td>${obj[el.title]}</td>`))
    });
    context.$tbody.append($tr);
  })
}