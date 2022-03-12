const { BlogPost } = require('../models');
const { User } = require('../models');
const { Categorie } = require('../models');

const getAllPosts = async (req, res) => {
  const foundPosts = await BlogPost.findAll({
    attributes: { exclude: ['userId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories' }, 
    ],
  });
  return res.status(200).json(foundPosts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const foundPostsById = await BlogPost.findByPk(id, {
    attributes: { exclude: ['userId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories' },
    ],
  });
  const foundPosts = await BlogPost.findAll();
  const foundPostsIds = foundPosts.map((posts) => posts.dataValues.id);
  
  if (!foundPostsIds.includes(Number(id))) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(foundPostsById);
};

module.exports = {
  getAllPosts,
  getPostById,
};
