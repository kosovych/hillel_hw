module.exports = tableGenerator;

function tableGenerator (_rows, _cols) {
  let rows = parseFloat(_rows);
  let cols = parseFloat(_cols);

  if(!valirateFormTableGen(rows, cols)) {
    return
  }

  let table = document.createElement('table');
  table.setAttribute('class', 'table');

  for(let i = 0; i < rows; i++) {
    let $tr = document.createElement('tr');
    $tr.setAttribute('class', 'table__tr');

    for(let i = 0; i < cols; i++) {
      let $td = document.createElement('td');
      $td.setAttribute('class', 'table__td');
      $tr.appendChild($td);
    }
    table.appendChild($tr);
  }

  return table

}

function valirateFormTableGen(numb_1, numb_2) {
  if(isNaN(numb_1) || isNaN(numb_2)) {
    alert('Please, enter the quantity of rows & columns correct.');
    return false;
  }

  if(numb_1 <= 0 || numb_2 <= 0 ) {
    alert('The quantity of rows & columns must be a positive number.');
    return false;
  }

  if(!Number.isInteger(numb_1) || !Number.isInteger(numb_2)) {
    alert('Please, enter the integer quantity of rows & columns correct.');
    return false;
  }

  return true;
}