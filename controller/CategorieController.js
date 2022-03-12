require('dotenv').config();
const { Categorie } = require('../models');

const createCategorie = async (req, res) => {
  try {
    const { name } = req.body;

    const categorieCreated = await Categorie.create({ name });

    return res.status(201).json(categorieCreated);
  } catch (e) {
    console.log(e.message);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll();

    return res.status(200).json(categories);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  createCategorie,
  getCategories,
};
