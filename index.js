const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
} = require('./middleware/userMiddleware');

const { isNameValid } = require('./middleware/categorieMiddleware');

const { isBlogPostValid } = require('./middleware/blogpostMiddleware');

const validateJWT = require('./middleware/auth');

const User = require('./controller/UserController');

const Login = require('./controller/LoginController');

const Categorie = require('./controller/CategorieController');

const BlogPost = require('./controller/BlogPostController');

const Post = require('./controller/PostCategoryController');

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', isDisplayNameValid, isEmailValid, isPasswordValid, User.createUser);

app.post('/login', isEmailValid, isPasswordValid, Login.userLogin);

app.get('/user', validateJWT, User.getUsers);

app.get('/user/:id', validateJWT, User.getUserById);

app.post('/categories', isNameValid, validateJWT, Categorie.createCategorie);

app.get('/categories', validateJWT, Categorie.getCategories);

app.post('/post', isBlogPostValid, validateJWT, BlogPost.postBlog);

app.get('/post', validateJWT, Post.getAllPosts);

app.get('/post/:id', validateJWT, Post.getPostById);
