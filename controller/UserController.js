require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const userEmail = await User.findAll({
      where: { email },
    });
      if (userEmail.length > 0) return res.status(409).json({ message: 'User already registered' });

      await User.create({ displayName, email, password, image });

      const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
      };

      const token = jwt.sign({ data: email }, secret, jwtConfig);

      return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const foundUserById = await User.findByPk(id);

    if (!foundUserById) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(foundUserById);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
