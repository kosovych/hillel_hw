module.exports = getParseJSON;
const generStudentTable = require('./GenerStudentTable');


function getParseJSON(elID, url) {
  let $el = document.getElementById(elID);
  let studentsJSON;
  $el.addEventListener('click', function getStudentsJSONHandler(ev, ulr) {
    studentsJSON = getStudentsJSON(ev, url, generStudentTable);
    return studentsJSON;
  });
};

function getStudentsJSON(ev, url, cd) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();

  if(xhr.status != 200) {
    console.log(`${xhr.status}:${xhr.statusText}`);
  } else {
    cd(JSON.parse(xhr.responseText), document.querySelector('#students-table tbody'));
  }
}