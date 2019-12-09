require('dotenv').config()
const express = require('express');
var bodyParser = require('body-parser');
var socket = require('socket.io');
const jwt = require('express-jwt');
const routes = require('./routes/routes.js');
const storage = require('./db/storage.js');

const port = process.env.PORT;
const path = process.env.API_PATH;
const cros = require('cors');

const app = express();
app.use(bodyParser.json())
app.use(cros({origin: '*'}));
app.use(jwt({secret: process.env.TOKEN_SECRET, requestProperty: 'auth'}).unless({path: [`${path}/login`, `${path}/signup`]}));

app.post(`${path}/login`, routes.login);
app.post(`${path}/signup`, routes.signup);
app.post(`${path}/post`, routes.post);
app.post(`${path}/reaction`, routes.reaction);
app.post(`${path}/friends/add`, routes.addFriend);
app.post(`${path}/interest/add`, routes.addInterest);
app.post(`${path}/interest/remove`, routes.removeInterest);
app.post(`${path}/affiliation/add`, routes.addAffiliation);
app.post(`${path}/affiliation/remove`, routes.removeAffiliation);
app.post(`${path}/profile/update`, routes.updateProfile);
app.post(`${path}/password/change`, routes.changePassword);
app.post(`${path}/picture/upload`, storage.upload, routes.uploadPicture);

app.get(`${path}/friends`, routes.getFriends);
app.get(`${path}/wall`, routes.wall);
app.get(`${path}/wall/:username`, routes.userWall);


var server = app.listen(port, function(){
  console.log(`Server running. URL: http://localhost:${port}${path}`);
});

//Socket Setup
var io = socket(server);

io.on('connection', function(){
  console.log('Socket connection on server made');
});
