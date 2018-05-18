const mongoose =require('mongoose');

const likesSchema =new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    comment_id: {
        type: String,
        required: true
    }
});

const Like =mongoose.model('likes', likesSchema);

module.exports ={
    Like: Like
};