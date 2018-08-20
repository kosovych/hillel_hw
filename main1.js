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
  if(numb === null) {
    alert('You deсide to exit');
    return 
  }
  
  let _numb = parseFloat(numb);
  
  if (isNaN(_numb)) {
    throw new Error ('It must be a number');
  }
  
  
  if(isSimple(numb) || isEven(numb) || isMultipleofTen(numb)) {
    return true
  } else return false
}

function isSimple(numb) {
  if((Math.ceil(numb) - Math.floor(numb) === 1)) {
    return false
  }
  
  if (numb < 4 && numb > 0) {
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

(function() {
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
  
  if (numberForCheck === null) {
    alert('You deсide to exit');
    return
  }
  
  
  // let calc = {
  //   x: 
  // } 
  
}());