require('dotenv').config();
const { BlogPost } = require('../models');

const postBlog = async (req, res) => {
  try {
    const { id } = req.user.dataValues;
    const { title, content } = req.body;

    const blogPostCreated = await BlogPost.create({ userId: id, title, content });

    return res.status(201).json(blogPostCreated);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  postBlog,
};
