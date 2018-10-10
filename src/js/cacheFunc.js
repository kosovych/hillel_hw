let complexFunction = function (a, b) {
  let result = a + b;
  console.log('function called => ', result);
  return result;
}

function cache(func) {
  let cacheArrOfObj = [];
  
  return function (_a, _b) {
    if (cacheArrOfObj.length === 0) {
      return newCacheObj(_a, _b, cacheArrOfObj)
    };
    
    let rightObj;
     cacheArrOfObj.forEach( obj => {
      if(obj['a'] === _a && obj['b'] === _b) {
        rightObj = obj
      } else if(!rightObj) {
        rightObj = false
      }
    });

    if(rightObj) {
      console.log('from cache =>', rightObj.result);
      console.log(cacheArrOfObj);
      return rightObj.result
    } else {
      return  newCacheObj(_a, _b, cacheArrOfObj);
    }
  }
}

let cachedFunction = cache(complexFunction);

function newCacheObj(_a, _b, arr) {
  let newCacheObj = {};
  newCacheObj['a'] = _a;
  newCacheObj['b'] = _b;
  newCacheObj.result =  complexFunction(_a, _b);
  arr.push(newCacheObj);
  console.log(arr);
  return newCacheObj.result;
}

cachedFunction(1,2);
cachedFunction(1,2);

cachedFunction(2,2);
cachedFunction(2,2);

cachedFunction('foo', 'bar');
cachedFunction('foo', 'bar');

cachedFunction('bar', 'foo');