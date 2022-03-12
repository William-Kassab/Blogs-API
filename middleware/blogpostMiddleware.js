const { Categorie } = require('../models');

const findCategoryId = async (categoryId) => {
  const categories = await Categorie.findAll();
  const categoriesIds = categories.map((id) => id.dataValues.id);
  const arrayComparison = categoryId.every((id) => categoriesIds.includes(id));

  return arrayComparison;
};

const isBlogPostValid = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) return res.status(400).json({ message: '"title" is required' });

  if (!content) return res.status(400).json({ message: '"content" is required' });
  
  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });

  const foundCategory = await findCategoryId(categoryIds);
  if (!foundCategory) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  next();
};

module.exports = {
  isBlogPostValid,
};
