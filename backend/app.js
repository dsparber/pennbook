require('dotenv').config()
const express = require('express');
var bodyParser = require('body-parser');
const jwt = require('express-jwt');
const routes = require('./routes/routes.js');

const port = process.env.PORT;
const path = process.env.API_PATH;

const app = express();
app.use(bodyParser.json())
app.use(jwt({secret: process.env.TOKEN_SECRET, requestProperty: 'auth'}).unless({path: [`${path}/login`, 'api/signup']}));

app.post(`${path}/login`, routes.login);
app.post(`${path}/signup`, routes.signup);
app.post(`${path}/post`, routes.post);
app.post(`${path}/reaction`, routes.reaction);
app.post(`${path}/friends/add`, routes.addFriend);
app.get(`${path}/wall`, routes.wall);
app.get(`${path}/wall/:username`, routes.userWall);


app.listen(port);
console.log(`Server running. URL: http://localhost:${port}${path}`);
