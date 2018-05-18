const mongoose =require('mongoose');

const categoriesSchema =new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 2,
        maxlength: 50,
        unique: 1
    }
});

const Category =mongoose.model('categories', categoriesSchema);

module.exports ={
    Category: Category
};