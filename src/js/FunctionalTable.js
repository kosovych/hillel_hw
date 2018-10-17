module.exports = FuncTableConctructor;
const $ = require('jquery');
const checkInputsHasValueHandler = require('./checkInputsHasValueHandler');


function FuncTableConctructor($container, model) {
  return new FuncTable($container, model);
}

function FuncTable(container, model) {
  this.$container = $(container);
  this.model = model;
  this.studentDB = JSON.parse(localStorage.getItem('studentDB')) || []
  this.initForm();
  this.isSortByOrders = true;
  
  if(this.studentDB.length > 0) {
    this.tableInit();
    renderStudent(this.studentDB, this);
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
    submitFormHandler(ev, this);
  });
}

FuncTable.prototype.tableInit = function() {
  let $table = $('<table/>', {'class': 'table'});
  let $thead = $('<thead/>');
  let self = this;
  
  $thead.on('click', (ev) => {
    let $evTarget = $(ev.target);
    $('.current-col-sort').removeClass('current-col-sort');
    $evTarget.addClass('current-col-sort');
    
    if(this.currentSortRow && this.currentSortRow[0] === $evTarget[0]) {
      $evTarget.toggleClass('sort-reverse');
      this.isSortByOrders = !this.isSortByOrders;
      sortColumn.call(this, this.isSortByOrders, $evTarget.parent().index());
    } else {
      this.isSortByOrders = true;
      sortColumn.call(this, this.isSortByOrders, $evTarget.parent().index());
    }
    
    this.currentSortRow = $evTarget;
    console.log(this.currentSortRow);


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

FuncTable.prototype.addStudent = function (studentObj) {
  this.studentDB.push(studentObj);
  
  if(!localStorage.getItem('studentDB')) {
    localStorage.setItem('studentDB', JSON.stringify([]));
  }
  
  localStorage.setItem('studentDB', JSON.stringify(this.studentDB));
  renderStudent(studentObj, this);
  console.dir(this.studentDB);
}


function submitFormHandler(ev, context) {
  ev.preventDefault();
  let formData = new FormData(ev.target);
  
  if(!context.$table) {
    context.tableInit();
  }
  
  let currentStudentObj = {};
  
  context.model.forEach( el => {
    currentStudentObj[el.title] = formData.get(el.title);
  });
  
  context.addStudent(currentStudentObj);
  ev.target.reset();
  
  Array.from(ev.target.children).forEach( el => {
    if ($(el).hasClass('input-component')) {
      checkInputsHasValueHandler(null, el.firstChild);
    }
  });
}

function renderStudent(StudentObj, context) {
  
  if(StudentObj.length) {
    return renderStudentDB(StudentObj, context);
  }
  
  let $tr =  $('<tr/>', {html: '<td>1</td>'});
  
  context.model.forEach( el => {
    $tr.append($('<td/>', {html: `${StudentObj[el.title]}`}));
  });
  
  context.$table.find('tbody').prepend($tr);
  
  if (context.$tbody.children().length > 1) {
    let $tbodyChildren = context.$tbody.children();
    for(let i = 1, $length = $tbodyChildren.length; i <= $length - 1; i++) {
      $tbodyChildren[i].children[0].innerHTML = i + 1;
    }
  }
}

function renderStudentDB(ArrOfStudentObj, context) {
  ArrOfStudentObj.forEach( StudentObj => {
    renderStudent(StudentObj, context);
  })
}


function sortColumn(isSortByOrder, index) {
  console.log(isSortByOrder);
  console.log(this);
  console.log(index);

  let sortIndex = isSortByOrder ? 1 : -1;
  
  // USE MODEL !!!
  // if(!$(ev.target).hasClass('sort-reverse')) {
  //   sortIndex = -sortIndex;
  // }

  // let sortedArr = arrOfRows.sort((row_a, row_b) => {
  //   if (row_a.children[rowIndex].innerHTML > row_b.children[rowIndex].innerHTML) {
  //     return sortIndex;
  //   }
  //   if (row_a.children[rowIndex].innerHTML < row_b.children[rowIndex].innerHTML) {
  //     return sortIndex;
  //   }
  //   return 0;
  // });

  // this.$tbody.html('');
  // arrOfRows.forEach( row => {
  //   this.$tbody.append($(row));
  // })
}