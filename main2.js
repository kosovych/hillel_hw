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
  for (let i = 0; i < str.length; i++) {
    if (i === 7) {
      console.log(str[i]);
      i = 10;
    }
    console.log(str[i]);
  }
}
