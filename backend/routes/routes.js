const db = require('../db/database.js');
const storage = require('../db/storage.js');
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;

const checkPermission = function(user, accessedUser, res, callback) {
    db.isFriend(user, accessedUser, function(err, isFriend) {
        if (err || !isFriend) {
            res.json({
                success: false,
                error: err || "Not authorized",
            });
            return;
        }
        callback();
    });
}

const login = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    db.login(username, password, function(error, success) {
        let token = null;
        if (success) {
            token = jwt.sign({ username: username }, secret);
        }
        res.json({
            error: error,
            success: success,
            token: token
        });
    });
}

const changePassword = function(req, res) {
    var username = req.auth.username;
    var oldPassword = req.body.old;
    var newPassword = req.body.new;

    db.changePassword(username, oldPassword, newPassword, function(error, success) {
        res.json({
            error: error,
            success: success,
        });
    });
}


const signup = function(req, res) {
    var user = req.body;

    db.signup(user, function(error, success) {
        let token = null;
        if (success) {
            token = jwt.sign({ username: user.username }, secret);
        }
        res.json({
            error: error,
            success: success,
            token: token
        });
    });
}


const post = function(req, res) {
    var post = req.body;
    var username = req.auth.username;
    var wall = post.wall;
    checkPermission(username, wall, res, function() {
        db.post(post, function(error, result) {
            res.json({
                result: result,
                error: error,
            });
        });
    });
}


const reaction = function(req, res) {
    var reaction = req.body;
    db.reaction(reaction, function(error, success) {
        res.json({
            success: success,
            error: error,
        });
    });
}

const userWall = function(req, res) {
    var username = req.auth.username;
    var wall = req.params.username;
    checkPermission(username, wall, res, function() {
        db.userWall(wall, function(error, result) {
            res.json({
                error: error,
                result: result,
            });
        });
    });
}

const addFriend = function(req, res) {
    var username = req.auth.username;
    var friend = req.body.friend;
    db.addFriend(username, friend, function(error, result) {
        res.json({
            error: error,
            result: result,
        });
    });
}

const addAffiliation = function(req, res) {
    var username = req.auth.username;
    var data = req.body;
    db.addAffiliation(username, data, function(error, result) {
        res.json({
            error: error,
            result: result,
        });
    });
}

const addInterest = function(req, res) {
    var username = req.auth.username;
    var data = req.body;
    db.addInterest(username, data, function(error, result) {
        res.json({
            error: error,
            result: result,
        });
    });
}

const removeAffiliation  = function(req, res) {
    var username = req.auth.username;
    var name = req.body.name;
    db.removeAffiliation(username, name, function(error, result) {
        res.json({
            error: error,
            result: result,
        });
    });
}

const removeInterest = function(req, res) {
    var username = req.auth.username;
    var name = req.body.name;
    db.removeInterest(username, name, function(error, result) {
        res.json({
            error: error,
            result: result,
        });
    });
}

const updateProfile = function(req, res) {
    var username = req.auth.username;
    var data = req.body;
    db.updateProfile(username, data, function(error, result) {
        res.json({
            error: error,
            result: result,
        });
    });
}

const uploadPicture = function(req, res) {
    var username = req.auth.username;
    var file = req.file;
    storage.uploadFile(username, file, function(error, result) {
        res.json({
            error: error,
            result: result,
        });
    });
}

const wall = function(req, res) {
    var username = req.auth.username;
    db.wall(username, function(error, result) {
        res.json({
            error: error,
            result: result,
        });
    });
}

const getFriends = function(req, res) {
    var username = req.auth.username;
    db.getFriends(username, function(error, result) {
        res.json({
            error: error,
            result: result,
        });
    });
}


module.exports = {
    login: login,
    signup: signup,
    post: post,
    reaction: reaction,
    userWall: userWall,
    addFriend: addFriend,
    wall: wall,
    uploadPicture: uploadPicture,
    addAffiliation: addAffiliation,
    addInterest: addInterest,
    removeAffiliation: removeAffiliation,
    removeInterest: removeInterest,
    updateProfile: updateProfile,
    changePassword: changePassword,
    getFriends: getFriends,
}
