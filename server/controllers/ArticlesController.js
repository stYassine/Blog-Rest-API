const { Article } =require('./../models/Article');
const { Comment } =require('./../models/Comment');

/// all articles
exports.getArticles =(request, response) => {

    Article.find((err, articles) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(articles);
    });

}

/// single article
exports.getSingleArticle =(request, response) => {

    let article_id =request.params.id;

    Article.findOne({ '_id': article_id }, (err, article) => {
        if(err) return response.status(400).send(err);

        /// get article comments
        Comment.find({ 'article_id': article._id }, (err, comments) => {
            if(err) return response.status(400).send(err);

            return response.status(200).json({
                'article': article,
                'comments': comments
            });

        });

        
    });

}

/// get articles by category id
exports.getArticlesByCategoryId =(request, response) => {

    let category_id =request.params.id;

    Article.find({ 'category_id': category_id }, (err, articles) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(articles);
    });

}

/// get articles by category id
exports.getArticlesByUserId =(request, response) => {

    let user_id =request.params.id;

    Article.find({ 'user_id': user_id }, (err, articles) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(articles);
    });

}

/// create article
exports.createArticles =(request, response) => {

    const article =new Article(request.body);

    Article.save((err, article) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(article);
    });

}

/// update articles
exports.updateArticles =(request, response) => {

    let article_id =request.params.id;

    let query ={
        is_active: request.body.is_active,
        category_id: request.body.category_id,
        title: request.body.title,
        body: request.body.body
    };
    

    Article.findByIdAndUpdate(article_id, query, (err, article) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(article);
    });

    
}

/// remove article
exports.removeArticle =(request, response) => {
    
    let article_id =request.params.id;
    
    Article.findByIdAndRemove(article_id, (err, article) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(article);
    });

}