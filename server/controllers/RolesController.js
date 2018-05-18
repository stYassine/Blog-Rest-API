const { Role } =require('./../models/Role');


/// all roles
exports.getRoles =(request, response) => {

    Role.find((err, roles) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(roles);
    });
    
}