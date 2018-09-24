module.exports = generStudentTable;
const createEl = require('./createEl.js');

function generStudentTable(dataArr, container) {
  let fragment = document.createDocumentFragment();

  dataArr.forEach(elementObj => {
    let tr = createEl('tr', null, '');
    for(let key in elementObj) {
      let td = createEl('td', 'table__td', elementObj[key]);
      tr.appendChild(td);
    }
    tr.appendChild(createEl('td', 'table__td', createEl('button', 'edit-btn', '<i class="fas fa-pen"></i>')));
    tr.appendChild(createEl('td', 'table__td', createEl('button', 'rm-btn', '<i class="fas fa-trash-alt"></i>')));
    fragment.appendChild(tr);

  });
  container.appendChild(fragment);
}