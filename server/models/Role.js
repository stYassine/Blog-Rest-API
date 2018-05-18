const mongoose =require('mongoose');

const rolesSchema =new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 2,
        maxlength: 50,
        unique: 1
    }
});

const Role =mongoose.model('roles', rolesSchema);

module.exports ={
    Role: Role
};