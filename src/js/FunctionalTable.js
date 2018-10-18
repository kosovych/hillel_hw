module.exports = FuncTableConctructor;
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
    renderStudent.call(this, this.studentDB);
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

    if(el.mask) {
      console.log(el.mask);
      jQuery(function($){
        input.find('input').mask(el.mask);
     });
    }
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
  renderStudent.call(this, studentObj);
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

function renderStudent(StudentObj) {
  
  if(StudentObj.length) {
    return renderStudentDB.call(this, StudentObj);
  }
  
  let $tr =  $('<tr/>', {html: '<td>1</td>'});
  
  this.model.forEach( el => {
    $tr.append($('<td/>', {html: `${StudentObj[el.title]}`}));
  });
  
  this.$table.find('tbody').prepend($tr);
  
  if (this.$tbody.children().length > 1) {
    let $tbodyChildren = this.$tbody.children();
    for(let i = 1, $length = $tbodyChildren.length; i <= $length - 1; i++) {
      $tbodyChildren[i].children[0].innerHTML = i + 1;
    }
  }
}

function renderStudentDB(ArrOfStudentObj) {
  ArrOfStudentObj.forEach( StudentObj => {
    renderStudent.call(this, StudentObj);
  })
}


function sortColumn(isSortByOrder, index) {
  console.log(this.studentDB);
  let sortIndex = isSortByOrder ? -1 : 1;
  
  const sortedArr = this.studentDB.slice(0).sort((currentStudent, nextStudent) => {
    if (currentStudent[this.model[index - 1].title] > nextStudent[this.model[index - 1].title]) {
      return sortIndex;
    }
    if (currentStudent[this.model[index - 1].title] < nextStudent[this.model[index - 1].title]) {
      return sortIndex;
    }
    return 0;
  });
  console.log(sortedArr);
  this.$tbody.html('');
  renderStudent.call(this, sortedArr);
}