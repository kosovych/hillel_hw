const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if(req.url === '/') {
    res.write('Hello World');
    res.end();
  }

  if(req.url === '/test') {
    let jsonObj = [];
    for(let i = 0; i < 10; i++ ) {
      var currentObg = {};
      currentObg.name = `Course-${i}`;
      currentObg.id = parseInt(Math.random() * 100000);
      jsonObj.push(currentObg);
    }

    res.write(JSON.stringify(jsonObj));
    res.end();
  }
});



server.listen(3000);
console.log('Listening on port 3000');

// var database = (() => {
//   let jsonObj = [];

//   for(let i = 0; i < 10; i++ ) {
//     var currentObg = {};
//     currentObg.name = `course-${i}`;
//     currentObg.id = parseInt(Math.random() * 100000);
//     jsonObj.push(currentObg);
//   }
//   return jsonObj
// })();

// const express = require('express');
// const app = express();
// const Joi = require('joi');

// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello world');
// });

// app.get('/courses', (req, res) => {
//   res.send(database);
// });

// app.get('/courses/:name', (req, res) => {
//   const course = database.find((cours) => {
//     return cours.name === req.params.name
//   });

//   if(!course) res.status(404).send('Not found');
//   res.send(course);
// });

// app.post('/courses', (req, res) => {
//   const schema = {
//     name: Joi.string()
//   }

//   const result = Joi.validate(req.body, schema);
//   console.log(result);

//   const course = {
//       id: parseInt(Math.random() * 100000),
//       name: `course-${database.length + 1}`
//   }
//   database.push(course);
//   res.send(course);
// });

// const port = process.env.PORT || 3000;

// app.listen(port, () => {console.log(`Running on :${port}`)});