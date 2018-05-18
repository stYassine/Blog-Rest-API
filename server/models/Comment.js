const mongoose =require('mongoose');

const commentsSchema =new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: 0,
    },
    article_id: {
        type: String,
        required: true
    },
    body: {
        required: true,
        type: String,
        minlength: 2
    }
});

const Comment =mongoose.model('comments', commentsSchema);

module.exports ={
    Comment: Comment
};