let myheaders = new Headers();
myheaders.append('Access-Control-Allow-Origin', '*');
myheaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept');
myheaders.append("Content-Type", "text/plain");




fetch('http://localhost:3000/test', {method: 'GET', mode: 'no-cors', headers: myheaders})
  .then(function(res) {
    return res.body
  })
  .then(data => {console.log(data);})