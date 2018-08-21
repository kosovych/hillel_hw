////////// Password validation

function validatePassword(str) {
  'use strict';
  if (!str) {
    // alert('Password can\'t be emtry' );
    return false;
  }
  
  str = str.toLocaleLowerCase();
  let hasNumb = isHasNumb(str);
  let hasSumd = isHasSumb(str);
  let hasCorrectLenght = isCorrectLenght(str);
  if (hasNumb && hasSumd && hasCorrectLenght) {
    return true;
  } else {
    return false;
  }
}

function isHasNumb(str) {
  for(let i = 0; i < str.length; i++) {
    if(typeof +str[i] === 'number' && !isNaN(str[i])) {
      return true
    }
  }
  return false;
}

function isHasSumb(str) {
  let _isHasSumb = false;
  for(let i = 0; i < str.length; i++) {
    if (typeof +str[i] === 'number' && !isNaN(str[i])) {
      continue
    }
    if (str[i].charCodeAt() >= 97 && str[i].charCodeAt() <= 122) {
      _isHasSumb = true;
    } else {
      _isHasSumb = false
      break;
    }
  }
  return _isHasSumb;
}

function isCorrectLenght(str) {
  if(str.length >=6 && str.length < 20) {
    return true
  } else return false
}

////////// Number Validation


function checkNumb(numb) {
 
  let _numb = parseFloat(numb);
  
  if (isNaN(_numb)) {
    return false;
  }
  
  
  if(isSimple(numb) || isEven(numb) || isMultipleofTen(numb)) {
    return true
  } else return false
}

function isSimple(numb) {
  if (numb <= 0) {
    return false
  }

  if((Math.ceil(numb) - Math.floor(numb) === 1)) {
    return false
  }
  
  if (numb < 4) {
    return true
  }
  
  if((numb % 2 === 0) && (numb !== 2)) {
    return false
  }
  
  for(let i = 3; i < numb; i++) {
    if(numb % i === 0) {
      return false 
    } else return true
  }
  
}

function isEven(numb) {
  if(numb%2 === 0) {
    return true
  } else return false
}

function isMultipleofTen(numb) {
  if (numb % 10 === 0) {
    return true
  } else return false
}

let test = checkNumb(45);

//////////

function _calc(numb1, numb2) {
  let resultArr = [];
  resultArr.length = 1 + Math.max(numb1.length, numb2.length);

  let N1MoreN2 = 0;
  let N2MoreN2 = 0;

  if (numb1.length > numb2.length) {
    N1MoreN2 = numb1.length - numb2.length;

  } else if (numb1.length < numb2.length) {
    N2MoreN2 = numb2.length - numb1.length;
  }

  let delta = 0;
  for (let i = resultArr.length; i >= 0; i--) {


    let operand1 = +numb1[i - 1 - N2MoreN2] || 0;
    let operand2 = +numb2[i - 1 - N1MoreN2] || 0;

    sum = operand1 + operand2 + delta;

    if (sum > 9) {
      delta = 1;
      sum = sum - 10;
    } else {
      delta = 0
    }

    if (sum === 0 && delta === 0) {
      continue
    } else resultArr[i] = sum;
  }

  return resultArr.join('');
}

////////// Is NaN function

function _isNotNaN(numb) {
  if(+numb === 0) {
    alert('You deсide to exit');
    return
  }

  if(!isNaN(+numb)) {
    return true
  } else return false
}

////////// Open modal

function modalLoop(el, func, message, checkingNumbForNull = false) {
  let checkingFunc = func;

  if(+checkingNumbForNull) {
    alert("It must be a number");
    return modalLoop(el, func, message, checkingNumbForNull);
  }
  
  while(!checkingFunc(el) && el !== null && !checkingNumbForNull) {
    el = prompt(`Invalid. ${message}`);
  }

  return el;
}

////////// Script

function playWithMe() {
  let message1 = "Enter password"
  let passWord = modalLoop(prompt(message1),validatePassword, message1);

  if (passWord === null) {
    alert('You deсide to exit');
    return
  }

  let message2 = "Try enter even, simple or multiple of ten number";

  let numberForCheck = modalLoop(prompt(message2), checkNumb, message2);

  if (numberForCheck === null) {
    alert('You deсide to exit');
    return
  }

  let message3 = 'Enter first number';
  let message4 = 'Enter second number'

  let numbObj = {
    x: modalLoop(prompt(message3), _isNotNaN, message3),
    y: modalLoop(prompt(message4), _isNotNaN, message4),
  }

  alert(`The sum of two numbers is ${_calc(numbObj.x, numbObj.y)}`);
  
};

playWithMe();

let btn = document.createElement('button');
btn.innerHTML = "Play Again";
document.body.appendChild(btn);

btn.onclick = function() {
  playWithMe();
}