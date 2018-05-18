const { Like } =require('../models/Like');

exports.likeAComment =(request, response) => {

    const like =new Like(request.body);

    like.save((err, like) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(like);
    });

}

exports.dislikeAComment =(request, response) => {

    const like_id =request.params.id;

    Like.findByIdAndRemove(like_id, (err, like) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(like);
    });

}