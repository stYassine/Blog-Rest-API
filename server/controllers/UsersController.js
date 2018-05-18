const { User } =require('./../models/User');
const { Article } =require('./../models/Article');
const { Comment } =require('./../models/Comment');


/// all users
exports.getUsers =(request, response) => {

    User.find((err, users) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(users);
    });

    
}

/// single user
exports.getSingleUser =(request, response) => {

    let user_id =request.params.id;

    /// get user by id
    User.findOne({ '_id': user_id }, (err, user) => {
        if(err) return response.status(400).send(err);

        /// get user articles
        Article.find({ 'user_id': user._id }, (err, articles) => {
            if(err) return response.status(400).send(err);

            /// get user comments
            Comment.find({ 'user_id': user._id }, (err, comments) => {
                if(err) return response.status(400).send(err);

                return response.status(200).json({
                    'user': user,
                    'articles': articles,
                    'comments': comments
                });

            });

        });

        
    });


}

/// create users
exports.createUsers =(request, response) => {

    const category =new Category(request.body);

    category.save((err, category) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(category);
    });

}

/// update user
exports.updateUser =(request, response) => {

    let user_id =request.params.id;
    let query ={
        is_active: request.body.is_active,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        
    };

    if(request.body.password != ""){
        query.password =request.body.password;
    }

    User.findByIdAndUpdate(user_id, query, (err, user) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(user);
    });

}

/// remove user
exports.removeUser =(request, response) => {
    
    let user_id =request.params.id;
    
    User.findByIdAndRemove(user_id, (err, user) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(user);
    });

}