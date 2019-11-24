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
        db.User.create({
            username: user.username,
            password: hash
        }, {
            overwrite : false
        }, function (error, createdUser) { 
            if (error) {
                callback("User already exists", false);
            } else {
                let profile = user.profile;
                profile.username = user.username;
                db.Profile.create(profile, function (error, createdProfile) { 
                    if (error) {
                        callback(error, false);
                    } else {
                        callback(null, true);
                    }
                });
            }
        });
    });
}

function post(post, callback) {
    db.Post.create(post, function (error, createdPost) {
        if (error) {
            callback(error, false);
        } else {
            callback(null, true);
        }
    });
}

function reaction(reaction, callback) {
    db.Reaction.create(reaction, function (error, createdReaction) {
        if (error) {
            callback(error, false);
        } else {
            callback(null, true);
        }
    });
}

function profile(username, callback) {
    db.Profile.get(username, function(err, user) {
        callback(err, user);
    });
}

function userWall(username, callback) {
    db.Post.query(username).loadAll().exec(function(err, posts) {
        if (err) {
            callback(err, null);
        } else {
            profile(username, function(err, profile) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, {
                        profile: profile,
                        posts: posts.Items
                    });
                }
            });
        }
    });
}

module.exports = {
    login: login,
    signup: signup,
    post: post,
    reaction: reaction,
    userWall: userWall,
}