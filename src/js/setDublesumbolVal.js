module.exports = setDublesumbolVal;

function setDublesumbolVal (val_1, val_2, numb ) {
  if (val_1 < numb) {
    val_2 = `0${val_1}`;
  } else {
    val_2 = `${val_1}`;
  }
  return val_2
}