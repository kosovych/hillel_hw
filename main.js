function fibonacci(fibonacciIndex) {
  checkFibonacciIndex(fibonacciIndex);
  let fibonacciArr = [0, 1, 1];
  
  for(let i = 3; i <= fibonacciIndex; i++) { 
    fibonacciArr.push(fibonacciArr[i - 2] + fibonacciArr[i - 1]); 
  }

  console.log(fibonacciArr[fibonacciIndex]);
  return fibonacciArr[fibonacciIndex];
}

function checkFibonacciIndex(lastNumber) {
  if(lastNumber < 0 || isNaN(+lastNumber) || !Number.isInteger(lastNumber)) {
    throw new Error('Invalid argument');
  }
}

fibonacci(0);
fibonacci(1);
fibonacci(3);
fibonacci(6);