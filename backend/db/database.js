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
            return;
        } 
        if (post.parent === undefined) {
            callback(null, true);
            return;
        } 
        db.SubPost.create({
            postId: post.parent,
            childPostId: createdPost.get('postId'),
        }, function(error, _) {
            if (error) {
                callback(error, false);
                return;
            }
            callback(null, true);
        });
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

function addFriend(username, friend, callback) {
    db.Friend.create({
        username: username,
        friend: friend
    }, function(err, result) {
        if (err) {
            callback(err, false);
            return;
        }
        db.Friend.create({
            username: friend,
            friend: username
        }, function(err, result) {
            if (err) {
                callback(err, false);
                return;
            }
            callback(null, true);
        });
    });
}

function streamToPromise(stream) {
    return new Promise((resolve, reject) => {
        let data = null;
        stream.on("data", chunk => data = chunk);
        stream.on("end", () => resolve(data));
        stream.on("error", error => reject(error));
    });
}

async function getItems(stream) {
    return (await streamToPromise(stream)).Items.map(p => p.attrs);
}

async function getItem(stream) {
    return (await streamToPromise(stream)).attrs;
}

async function mapPost(post) {
    post.reactions = await getItems(db.Reaction.query(post.postId).exec());
    let subPosts = await getItems(db.SubPost.query(post.postId).exec());
    if (subPosts.length !== 0) {
        let subPostIds = subPosts.map(s => s.childPostId);
        let children = await getItems(db.Post.scan().where('postId').in(subPostIds).loadAll().exec());
        post.children = await Promise.all(children.map(async child => await mapPost(child)));
    }
    return post;
}

async function posts(walls, callback) {
    try {
        let posts = await getItems(db.Post.scan().where('wall').in(walls).exec());
        posts = await Promise.all(posts.reverse().map(async post => await mapPost(post)));
        callback(null, posts);
    } catch(err) {
        callback(err, null);
    }
}

function userWall(username, callback) {
    profile(username, function(err, profile) {
        if (err) {
            callback(err, null);
            return;
        }
        posts([username], function(err, posts) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, {
                profile: profile,
                posts: posts
            });
        });
    });

    db.Post.query(username).loadAll().exec(function(err, posts) {
        if (err) {
            callback(err, null);
        } else {
            
        }
    });
}

function wall(username, callback) {
    db.Friend.query(username).loadAll().exec(function(err, friends) {
        if (err) {
            callback(err, null);
            return;
        }
        let usernames = [];
        if (friends.Items.length === 0) {
            usernames = friends.Items.map(v => v.get('friend'))
        }
        usernames.push(username);
        posts(usernames, callback);
    });
}

module.exports = {
    login: login,
    signup: signup,
    post: post,
    reaction: reaction,
    userWall: userWall,
    wall: wall,
    addFriend: addFriend
}