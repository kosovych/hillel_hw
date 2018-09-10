module.exports = checkInputsHasValue;

function checkInputsHasValue(inputs) {
  let inputsArr = Array.from(inputs);

  inputsArr.forEach((el) => {
    checkInputsHasValueHandler(null, el);
    
    el.addEventListener('blur', function (ev) {
      checkInputsHasValueHandler(ev, null);
    });
    
  });
}

function checkInputsHasValueHandler(ev, domEl) {
  if (ev !== null && domEl === null) {
    let $evTarget = ev.target;

    if ($evTarget.value) {
      $evTarget.nextElementSibling.classList.add('has-value');
    } else {
      $evTarget.nextElementSibling.classList.remove('has-value');
    }
  }

  if(ev === null && domEl !== null) {
    console.log('----');
    if (domEl.value) {
      domEl.nextElementSibling.classList.add('has-value');
    } else {
      domEl.nextElementSibling.classList.remove('has-value');
    }
  }
}