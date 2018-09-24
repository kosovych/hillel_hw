module.exports = editStudentsHandler;
const checkInputsHasValueHandler = require('./checkInputsHasValueHandler.js');
const studentsAddEventHandler = require('./studentsAddEventHandler.js');



function editStudentsHandler(ev) {
  if (ev.target.classList.contains('rm-btn')) {
    removeRow(this, ev.target);
  }
  if (ev.target.classList.contains('edit-btn')) {
    editRow(this, ev.target, document.getElementById('student-table'));
  }
}

function removeRow(context, btn) {
  context.removeChild(btn.parentNode.parentNode);
}

function editRow(context, btn, editForm) {
  editForm.removeEventListener('submit', studentsAddEventHandler);

  let editObj = {
    name: null,
    lastName: null,
    yearOfAdmission: null,
    yearOfGraduation: null
  }

  let currentRow = btn.parentNode.parentNode;
  let formInputsArr = Array.from(document.querySelectorAll(`#${editForm.id} input[name]`));
  let tdOfcurrentRowArr = [];

  Array.from(currentRow.children).forEach(td => {
    if (!td.firstChild.tagName) {
      tdOfcurrentRowArr.push(td.innerText);
    }
  });

  formInputsArr.forEach((el, i) => {
    el.value = tdOfcurrentRowArr[i];
  });

  formInputsArr.forEach(input => {
    checkInputsHasValueHandler(null, input);
  });

  currentRow.classList.add('on-edit');
  context.classList.add('event-none');

  editForm.addEventListener('submit', function saveChangesHandler(ev) {
    saveChanges(ev, currentRow, editForm);
    this.removeEventListener('submit', saveChangesHandler);
    currentRow.classList.remove('on-edit');
    this.addEventListener('submit', studentsAddEventHandler);
    context.classList.remove('event-none');
  });

}

function saveChanges(ev, row, form) {
  let fd = new FormData(ev.target);
  let dataArr = [];
  let $tdOfcurrentRowArr = [];

  Array.from(row.children).forEach(td => {
    if (!td.firstChild.tagName) {
      $tdOfcurrentRowArr.push(td);
    }
  });

  for (var key of fd.keys()) {
    dataArr.push(fd.get(key));
  }

  $tdOfcurrentRowArr.forEach((td, i) => {
    td.innerText = dataArr[i]
  });
  ev.target.reset();
}