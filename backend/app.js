const express = require('express');
var bodyParser = require('body-parser')
const routes = require('./routes/routes.js');
const port = 8080;

const app = express();
app.use(bodyParser.json())

app.post('/api/login', routes.login);
app.post('/api/signup', routes.signup);
app.post('/api/post', routes.post);


app.listen(port);
console.log('Server running on port ' + port + '. Now open http://localhost:' + port + '/api/ in your browser!');
