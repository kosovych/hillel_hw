function checkStrLenght(str) {
  if (str.length < 10) {
    logBySunbol(str)
  } else {
    logAnotherMeth(str);
  }
}

function logBySunbol(str) {
  for (let i = 0; i < str.length; i++) {
    console.log(str[i]);
  }
}

function logAnotherMeth(str) {
  console.log(str.substr(0,6));
  console.log(str.substr(10, Infinity));
}

checkStrLenght('012345678911');
