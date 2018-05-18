const mongoose =require('mongoose');

const articlesSchema =new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: 0,
    },
    category_id: {
        type: String,
        required: true
    },
    title: {
        required: true,
        type: String,
        minlength: 2,
        maxlength: 150
    },
    body: {
        required: true,
        type: String,
        minlength: 2,
    }
});

const Article =mongoose.model('articles', articlesSchema);

module.exports ={
    Article: Article
};