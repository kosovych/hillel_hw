module.exports = editStudentsHandler;
const checkInputsHasValueHandler = require('./checkInputsHasValueHandler.js');


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
    if(!td.firstChild.tagName) {
      tdOfcurrentRowArr.push(td.innerText);
    }
  });

  formInputsArr.forEach((el, i) => {
    el.value = tdOfcurrentRowArr[i];
  });

  formInputsArr.forEach(input => {
    checkInputsHasValueHandler(null, input);
  });
}