let passWord = prompt('Enter the password');

validatePassword(passWord);

function validatePassword(str) {
  'use strict';
  if (!str) {
    alert('Password can\'t be emtry' );
    return
  }

  str = str.toLocaleLowerCase();
  let hasNumb = isHasNumb(str);
  let hasSumd = isHasSumb(str);
  let hasCorrectLenght = isCorrectLenght(str);
  if (hasNumb && hasSumd && hasCorrectLenght) {
    alert('VALID');
    return 'VALID';
  } else {
    alert('INVALID');
    return 'INVALID';
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