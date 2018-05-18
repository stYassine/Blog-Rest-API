const { User } =require('./../models/User');
const bcrypt =require('bcrypt');

/// user login
exports.userLogin =(request, response) => {

    /// check if email exists
    User.findOne({ 'email': request.body.email }, (err, user) => {
        if(err) return response.status(400).send(err);
        if(!user) return response.status(400).json({msg: 'Email InCorrect'});
        
        /// if email exist compare password
        bcrypt.compare(request.body.password, user.password, (err, isMatched) => {
            if(err) return response.status(400).send(err);
            if(!isMatched) return response.status(400).json({msg: 'Password InCorrect'});
            
            /// if email & password correct
            /// generate token and send it
            user.generateToken((err, user) => {
                if(err) return response.status(400).send(err);
                return response.status(200).json({
                    'user': user
                 });
            });

        });


    });

};

/// user register
exports.userRegister =(request, response) => {
    
    const user =new User(request.body);

    user.save((err, user) => {
        if(err) return response.status(400).send(err);
        
        /// generate token and send it
        user.generateToken((err, user) => {
            if(err) return response.status(400).send(err);
            return response.status(200).json({ 'user': user });
        });

    });

};

/// user logout
