require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const userLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const userEmail = await User.findAll({ where: { email } });
  
    if (userEmail.length === 0) return res.status(400).json({ message: 'Invalid fields' });

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: email }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { userLogin };
