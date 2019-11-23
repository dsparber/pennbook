const dynamo = require('dynamodb');
const Joi = require('joi');
dynamo.AWS.config.loadFromPath('./config.json');

const User = dynamo.define('User', {
    hashKey: 'username',
    timestamps: true,
    schema: {
        username: Joi.string(),
        password: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        birthday: Joi.date(),
    }
});

const Friend = dynamo.define('Friend', {
    hashKey: 'username',
    rangeKey: 'friend',
    timestamps: true,
    schema: {
        username: Joi.string(),
        friend: Joi.string(),
    }
});

const Affiliation = dynamo.define('Affiliation', {
    hashKey: 'name',
    rangeKey: 'username',
    schema: {
        name: Joi.string(),
        username: Joi.string(),
    },
    indexes: [
        {
            hashKey: 'username',
            name: 'UsernameIndex',
            type: 'global',
        }
    ]
});

const Post = dynamo.define('Post', {
    hashKey: 'wall',
    rangeKey: 'postId',
    timestamps: true,
    schema:  {
        wall: Joi.string(),
        postId: dynamo.types.uuid(),
        content: Joi.string(),
        creator: Joi.string(),
        parent: Joi.string(),
        type: Joi.string(),
    },
    indexes: [
        {
            hashKey: 'postId',
            name: 'PostIdIndex',
            type: 'global',
        }
    ]
});

const Like = dynamo.define('Like', {
    hashKey: 'postId',
    rangeKey: 'username',
    timestamps: true,
    schema: {
        postId: dynamo.types.uuid(),
        username: Joi.string(),
    }
});


const SubPost = dynamo.define('SubPost', {
    hashKey: 'postId',
    rangeKey: 'childPostId',
    timestamps: true,
    schema: {
        postId: dynamo.types.uuid(),
        childPostId: dynamo.types.uuid(),
    }
});


const Picture = dynamo.define('Picture', {
    hashKey: 'username',
    rangeKey: 'pictureId',
    timestamps: true,
    schema: {
        username: Joi.string(),
        pictureId: dynamo.types.uuid(),
        identifier: Joi.string(),
    },
    indexes: [
        {
            hashKey: 'pictureId',
            name: 'PictureIdIndex',
            type: 'global',
        }
    ]
});

const PostPicture = dynamo.define('PostPicture', {
    hashKey: 'postId',
    schema: {
        postId: dynamo.types.uuid(),
        pictureId: dynamo.types.uuid(),
    }
});

const Chat = dynamo.define('Chat',  {
    hashKey: 'chatId',
    timestamps: true,
    schema: {
        chatId: dynamo.types.uuid(),
        name: Joi.string(),
    }
});

const UserChat = dynamo.define('UserChat', {
    hashKey: 'username',
    rangeKey: 'chatId',
    schema: {
        username: Joi.string(),
        chatId: dynamo.types.uuid(),
        joined: Joi.date(),
    }, 
    indexes: [
        {
            hashKey: 'chatId',
            name: 'ChatIdIndex',
            type: 'global',
        }
    ]
});

const ChatMessages = dynamo.define('ChatMessages', {
    hashKey: 'chatId',
    rangeKey: 'messageId',
    timestamps: true,
    schema: {
        chatId: dynamo.types.uuid(),
        messageId: dynamo.types.uuid(),
    }
});

// Creates all models
/*
dynamo.createTables(function(err) {
    if (err) {
        console.log('Error creating tables: ', err);
    } else {
        console.log('Tables has been created');
    }
});
*/

module.exports = {
    dynamo: dynamo,
    Affiliation: Affiliation,
    Chat: Chat,
    ChatMessages: ChatMessages,
    Friend: Friend,
    User: User,
    UserChat: UserChat,
    Post: Post,
    SubPost: SubPost,
    Like: Like,
    Picture: Picture,
    PostPicture: PostPicture,
};