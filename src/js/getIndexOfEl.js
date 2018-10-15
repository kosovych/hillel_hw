module.exports = getIndexOfEl;

function getIndexOfEl(ev) {
  let $evTarget = ev.target;
  let curentRow = $evTarget.parentElement;

  let arrOfTableData = Array.from(curentRow.children);

  alert(`Index of current cell is ${arrOfTableData.indexOf($evTarget)}`);
}