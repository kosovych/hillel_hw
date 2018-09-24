module.exports = studentAddsEventHandler;
const generStudentTable = require('./GenerStudentTable');


function studentAddsEventHandler(ev) {
  ev.preventDefault();
  let fd = new FormData(ev.target);
  let objFd = {};
  let dataArr = [];
  for (var key of fd.keys()) {
    objFd[key] = fd.get(key);
  }

  dataArr.push(objFd);
  generStudentTable(dataArr, document.querySelector('#students-table tbody'));
  ev.target.reset();
}