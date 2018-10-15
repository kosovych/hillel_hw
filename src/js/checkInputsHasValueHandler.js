module.exports = checkInputsHasValueHandler;


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
    if (domEl.value) {
      domEl.nextElementSibling.classList.add('has-value');
    } else {
      domEl.nextElementSibling.classList.remove('has-value');
    }
  }
}