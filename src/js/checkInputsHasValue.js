module.exports = checkInputsHasValue;
const checkInputsHasValueHandler = require('./checkInputsHasValueHandler.js');

function checkInputsHasValue(inputs) {
  let inputsArr = Array.from(inputs);

  inputsArr.forEach((el) => {
    checkInputsHasValueHandler(null, el);
    
    el.addEventListener('blur', function(ev) {
      checkInputsHasValueHandler(ev, null);
    });
  });
}