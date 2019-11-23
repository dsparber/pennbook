const db = require('./models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function login(username, password, callback) {
    db.User.get(username, function(err, user) {
        if (user === null) {
            callback("Invalide user / password combination", false);
            return;
        }
        let hash = user.get("password");
        bcrypt.compare(password, hash, function(err, res) {
            if (res === true) {
                callback(null, true);
            } else {
                callback("Invalide user / password combination", false);
            }
        });
    });
}

function signup(user, callback) {
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) {
            callback(err, false);
            return;
        }
        user.password = hash;
        db.User.create(user, {overwrite : false}, function (error, createdUser) { 
            if (error) {
                callback("User already exists", false)
            } else {
                callback(null, true);
            }
        });
    });
}

module.exports = {
    login: login,
    signup: signup,
}