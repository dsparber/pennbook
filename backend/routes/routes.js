var db = require('../db/database.js')

const login = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    db.login(username, password, function(error, success) {
        res.json({
            success: success,
            error: error,
        });
    });
}


const signup = function(req, res) {
    var user = req.body;

    db.signup(user, function(error, success) {
        res.json({
            success: success,
            error: error,
        });
    });
}


const post = function(req, res) {
    var post = req.body;

    db.post(post, function(error, success) {
        res.json({
            success: success,
            error: error,
        });
    });
}


module.exports = {
    login: login,
    signup: signup,
    post: post,
}