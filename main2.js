const sum = {
  meth: function () {
    let arr = Array.from(arguments);
    let result = arr.reduce((sum, curent) => {
      return sum + curent;
    });
    return result;
  }
}

const multi = {
  meth: function () {
    let arr = Array.from(arguments);
    let result = arr.reduce((sum, curent) => {
      return sum * curent;
    });
    return result;
  }
}

function applayAll(context, ...rest) {
  return context.meth.apply(context, rest);
}

console.log(applayAll(sum, 1, 2, 3));
console.log(applayAll(multi, 1, 2, 3, 4));