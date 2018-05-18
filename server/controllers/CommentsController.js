const { Comment } =require('./../models/Comment');

/// all comments
exports.getComments =(request, response) => {
    
    Comment.find((err, comments) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(comments);
    });

}

/// single comment
exports.getSingleComment =(request, response) => {

    let comment_id =request.params.id;

    Comment.findOne({ '_id': comment_id }, (err, comment) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(comment);
    });

}

/// get comments by article id
exports.getCommentsByArticleId =(request, response) => {

    let article_id =request.params.id;

    Comment.find({ 'article_id': article_id }, (err, comments) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(comments);
    });

}

/// create comment
exports.createComments =(request, response) => {

    const comment =new Comment(request.body);

    comment.save((err, comment) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(comment);
    });

}

/// update comment
exports.updateComments =(request, response) => {

    let comment_id =request.params.id;

    let query ={
        is_active: request.body.is_active,
        article_id: request.body.article_id,
        body: request.body.body
    };

    Comment.findByIdAndUpdate(comment_id, query, (err, comment) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(comment);
    });

}

/// remove comment
exports.removeComments =(request, response) => {

    let comment_id =request.params.id;

    Comment.findByIdAndRemove(comment_id, (err, comment) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(comment);
    });
    
}