const db = require('./models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function streamToPromise(stream) {
    return new Promise((resolve, reject) => {
        let data = null;
        stream.on("data", chunk => data = chunk);
        stream.on("end", () => resolve(data));
        stream.on("error", error => reject(error));
    });
}

// Create a toJson function for errors, enables easier debugging
if (!('toJSON' in Error.prototype))
Object.defineProperty(Error.prototype, 'toJSON', {
    value: function () {
        var alt = {};

        Object.getOwnPropertyNames(this).forEach(function (key) {
            alt[key] = this[key];
        }, this);

        return alt;
    },
    configurable: true,
    writable: true
});

async function getItems(stream) {
    return (await streamToPromise(stream)).Items.map(p => p.attrs);
}

async function getItem(stream) {
    return (await getItems(stream))[0];
}

function login(username, password, callback) {
    db.User.get(username, function(err, user) {
        if (!user) {
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

function changePassword(username, oldPassword, newPassword, callback) {
    db.User.get(username, function(err, user) {
        if (err) {
            callback(err, false);
            return;
        }
        let hash = user.get("password");
        bcrypt.compare(oldPassword, hash, function(err, equal) {
            if (!equal) {
                callback("Old password is invalid");
                return;
            }
            bcrypt.hash(newPassword, saltRounds, function(err, hash) {
                if (err) {
                    callback(err, false);
                    return;
                }
                db.User.update({
                    username: username,
                    password: hash
                }, function (error, createdUser) {
                    if (error) {
                        callback("Setting new password failed", false);
                    }
                    callback(null, true);
                });
            });
        });
    });
}

function signup(user, callback) {
    console.log(user);
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) {
            callback(err, false);
            return;
        }
        console.log(user);
        db.User.create({
            username: user.username,
            password: hash
        }, {
            overwrite : false
        }, function (error, createdUser) {
            if (error) {
              console.log(error);
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

function isFriend(user1, user2, callback) {
    if (user1 === user2) {
        callback(null, true);
        return;
    }

    db.Friend.query(user1).where('friend').eq(user2).exec(function(err, result) {
        if (err) {
            callback(err, false);
        } else {
            callback(null, result.Count > 0);
        }
    });
}

function post(post, callback) {
    let pictureId = post.pictureId;
    delete post.pictureId;
    db.Post.create(post, async function (error, createdPost) {
        if (error) {
            callback(error, false);
            return;
        }
        try {
            if (post.parent !== undefined) {
                await db.SubPost.create({
                    postId: post.parent,
                    childPostId: createdPost.get('postId'),
                });
            }
            if (pictureId !== undefined) {
                await db.PostPicture.create({
                    postId: createdPost.get('postId'),
                    pictureId: pictureId,
                });
            }
            callback(null, true);
        } catch(err) {
            callback(err, false);
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


function addInterest(user, interest, callback) {
    interest.username = user;
    db.Interest.create(interest, function(err) {
        if (err) {
            callback(err, false);
            return;
        }
        callback(null, true);
    });
}

function removeInterest(user, interestName, callback) {
    db.Interest.destroy({username: user, name: interestName}, function(err) {
        if (err) {
            callback(err, false);
            return;
        }
        callback(null, true);
    });
}

function addAffiliation(user, affiliation, callback) {
    affiliation.username = user;
    db.Affiliation.create(affiliation, function(err, created) {
        if (err) {
            callback(err, false);
            return;
        }
        callback(null, true);
    });
}


function removeAffiliation(user, affiliationName, callback) {
    db.Affiliation.destroy({username: user, name: affiliationName}, function(err) {
        if (err) {
            callback(err, false);
            return;
        }
        callback(null, true);
    });
}

function updateProfile(user, profile, callback) {
    profile.username = user;
    db.Profile.update(profile, function(err) {
        if (err) {
            callback(err, false);
            return;
        }
        callback(null, true);
    })
}

function addPicture(username, identifier, callback) {
    db.Picture.create({
        username: username,
        identifier: identifier,
    }, function (err, created) {
        var data = err ? null : created.attrs;
        callback(err, data);
    });
}

async function getInterests(username) {
    return await getItems(db.Interest.query(username).usingIndex('UsernameIndex').loadAll().exec());
}

async function getAffiliations(username) {
    return await getItems(db.Affiliation.query(username).usingIndex('UsernameIndex').loadAll().exec());
}

async function profileAsync(username, includeAll) {
    let profile = await getItem(db.Profile.query(username).exec());
    if (!profile) {
        return username;
    }
    profile.profilePicture = await getProfilePicture(username);
    if (includeAll) {
        profile.interests = await getInterests(username);
        profile.affiliations = await getAffiliations(username);
    }
    return profile;
}

async function profile(username, callback) {
    try {
        let p = await profileAsync(username, true);
        callback(null, p);
    } catch (err) {
        callback(err, null);
    }
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

async function getPictureUrl(pictureId) {
    let picture = await getItem(db.Picture.query(pictureId).usingIndex('PictureIdIndex').exec());
    return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${picture.identifier}`;
}

async function getPictureUrlFromPost(post) {
    let postPicture = await getItem(db.PostPicture.query(post.postId).exec());
    if (postPicture !== undefined) {
        return await getPictureUrl(postPicture.pictureId);
    }
    return null;
}

async function getProfilePicture(username) {
    let profilePicturePosts = await getItems(db.Post.query(username).filter('type').equals('profilePicture').loadAll().exec());
    if (profilePicturePosts.length === 0) {
        return null;
    }
    return await getPictureUrlFromPost(profilePicturePosts.reverse()[0]);
}

async function mapPost(post) {
    post.reactions = await getItems(db.Reaction.query(post.postId).exec());
    post.picture = await getPictureUrlFromPost(post);
    post.creator = await profileAsync(post.creator);
    post.wall = await profileAsync(post.wall);

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
        let posts = await getItems(db.Post.scan().where('wall').in(walls).where('parent').null().exec());
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
            usernames = friends.Items.map(v => v.get('friend'));
        }
        usernames.push(username);
        posts(usernames, callback);
    });
}

async function getFriends(username, callback) {
    try {
        let friends = await getItems(db.Friend.query(username).loadAll().exec());
        friends = await Promise.all(friends.map(async friend => {
            friend.friend = await profileAsync(friend.friend);
            return friend;
        }));
        callback(null, friends);
    } catch (err) {
        callback(err, null);
    }
}

module.exports = {
    login: login,
    signup: signup,
    post: post,
    reaction: reaction,
    userWall: userWall,
    wall: wall,
    addFriend: addFriend,
    addPicture: addPicture,
    isFriend: isFriend,
    addAffiliation: addAffiliation,
    addInterest: addInterest,
    removeAffiliation: removeAffiliation,
    removeInterest: removeInterest,
    updateProfile: updateProfile,
    changePassword: changePassword,
    getFriends: getFriends,
}
