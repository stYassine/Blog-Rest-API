const express =require('express');
const router =express.Router();
const usersController =require('./../controllers/UsersController');
const categoriesController =require('./../controllers/CategoriesController');
const rolesController =require('./../controllers/RolesController');
const articlesController =require('./../controllers/ArticlesController');
const commentsController =require('./../controllers/CommentsController');
const likesController =require('./../controllers/LikesController');
const AuthController =require('./../controllers/AuthController');

const { User } =require('./../models/User');
const { Article } =require('./../models/Article');
const { Comment } =require('./../models/Comment');


/////////////////////////////////////////////////////////
/// Admin
/////////////////////////////////////////////////////////

/// Users Seedes
router.get('/database/seeder/users', (request, response) => {

    const user_1 ={
        first_name: 'Yassine',
        last_name: 'Msiah',
        email: 'yassine_msiah@hotmail.com',
        password: '123456'
    }
    const user_2 ={
        first_name: 'Tim',
        last_name: 'Humble',
        email: 'tim_humble@hotmail.com',
        password: '123456'
    }
    const user_3 ={
        first_name: 'Andy',
        last_name: 'James',
        email: 'andy_james@hotmail.com',
        password: '123456'
    }
    const user_4 ={
        first_name: 'John',
        last_name: 'Doe',
        email: 'john_doe@hotmail.com',
        password: '123456'
    }
    
    const save_user_1 =new User(user_1);
    const save_user_2 =new User(user_2);
    const save_user_3 =new User(user_3);
    const save_user_4 =new User(user_4);
    

    save_user_4.save((err, user) => {
        if(err) return err;
        
        /// generate token and send it
        user.generateToken((err, user) => {
            if(err) return err;
            return;
        });
    
    });


});

/// Articles Seedes
router.get('/database/seeder/articles', (request, response) => {

    const articles =[
        {
            user_id: '5af20c0d3e51771058c420b6',
            is_active: 1,
            category_id: '5af0b3fc550685edc07b4f9e',
            title: 'Learn Laravel',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
        },
        {
            user_id: '5af20c0d3e51771058c420b6',
            is_active: 1,
            category_id: '5af0b3fc550685edc07b4f9e',
            title: 'Learn Angular',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
        },
        {
            user_id: '5af20c49cd40a50f8c6f6496',
            is_active: 1,
            category_id: '5af0b3fc550685edc07b4f9f',
            title: 'Learn JQuery',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
        },
        {
            user_id: '5af20c49cd40a50f8c6f6496',
            is_active: 1,
            category_id: '5af0b3fc550685edc07b4fa0',
            title: 'Learn Android',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
        }
    ];
    

    Article.insertMany(articles, (err, articles) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(articles);
    });


});


/// Comments Seedes
router.get('/database/seeder/comments', (request, response) => {

    const comments =[
        {
            user_id: '5af20c0d3e51771058c420b6',
            is_active: 1,
            article_id: '5af35bf93143bd0600cb4814',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
        },
        {
            user_id: '5af20c0d3e51771058c420b6',
            is_active: 1,
            article_id: '5af35bf93143bd0600cb4814',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
        },
        {
            user_id: '5af20c49cd40a50f8c6f6496',
            is_active: 1,
            article_id: '5af35bf93143bd0600cb4814',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
        },
        {
            user_id: '5af20c49cd40a50f8c6f6496',
            is_active: 1,
            article_id: '5af35bf93143bd0600cb4815',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
        }
    ];
    

    Comment.insertMany(comments, (err, comments) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(comments);
    });


});



/////////////////////////////////////////////////////////
/// Public
/////////////////////////////////////////////////////////

////////////////
/// Auth
/////////////////
/// Login
router.post('/login', AuthController.userLogin);

/// register
router.post('/register', AuthController.userRegister);


////////////////
/// Users
/////////////////
/// all users
router.get('/users', usersController.getUsers);

/// get single user
router.get('/users/:id', usersController.getSingleUser);

/// create user
router.post('/users', usersController.createUsers);

/// update user
router.put('/users/update/:id', usersController.updateUser);

/// remove user
router.delete('/users/remove/:id', usersController.removeUser);




////////////////
/// Categories
/////////////////
/// all categories
router.get('/categories', categoriesController.getCategories);

/// get single category
router.get('/categories/:id', categoriesController.getSingleCategory);

/// create category
router.post('/categories', categoriesController.createCategories);

/// update category
router.put('/categories/update/:id', categoriesController.updateCategories);

/// remove category
router.delete('/categories/remove/:id', categoriesController.removeCategories);



////////////////
/// Roles
/////////////////
/// all roles
///router.get('/roles', rolesController.getRoles);




////////////////
/// Articles
/////////////////
/// all articles
router.get('/articles', articlesController.getArticles);

/// get single article
router.get('/articles/:id', articlesController.getSingleArticle);

/// get articles by category id
router.get('/articles/category/:id', articlesController.getArticlesByCategoryId);

/// get articles by user id
router.get('/articles/user/:id', articlesController.getArticlesByUserId);

/// create article
router.post('/articles', articlesController.createArticles);

/// update article
router.put('/articles/update/:id', articlesController.updateArticles);

/// remove article
router.delete('/articles/remove/:id', articlesController.removeArticle);



////////////////
/// Comments
/////////////////
/// all comments
router.get('/comments', commentsController.getComments);

/// get single comment
router.get('/comments/:id', commentsController.getSingleComment);

/// get comments by article id
router.get('/comments/article/:id', commentsController.getCommentsByArticleId);

/// create comment
router.post('/comments', commentsController.createComments);

/// update comment
router.put('/comments/update/:id', commentsController.updateComments);

/// remove comment
router.delete('/comments/remove/:id', commentsController.removeComments);


////////////////
/// Likes
/////////////////
/// like a comment
router.post('/like', likesController.likeAComment);


/// dislike a comment
router.post('/dislike/:id', likesController.dislikeAComment);



module.exports =router;