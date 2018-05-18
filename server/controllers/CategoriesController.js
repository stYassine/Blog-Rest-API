const { Category } =require('./../models/Category');

/// all categories
exports.getCategories =(request, response) => {

    Category.find((err, categories) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(categories);
    });

    
}

/// single category
exports.getSingleCategory =(request, response) => {

    let category_id =request.params.id;

    Category.findOne({ '_id': category_id }, (err, category) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(category);
    });

}

/// create category
exports.createCategories =(request, response) => {

    const category =new Category(request.body);

    category.save((err, category) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(category);
    });

}

/// update category
exports.updateCategories =(request, response) => {

    let category_id =request.params.id;
    let query ={
        name: request.body.name
    };

    Category.findByIdAndUpdate(category_id, query, (err, category) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(category);
    });

}

/// remove category
exports.removeCategories =(request, response) => {
    
    let category_id =request.params.id;
    
    Category.findByIdAndRemove(category_id, (err, category) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(category);
    });

}