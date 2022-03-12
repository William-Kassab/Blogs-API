const isDisplayNameValid = (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName) return res.status(400).json({ message: '"displayName" is required' });

  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const isEmailValid = (req, res, next) => {
  const { email } = req.body;
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const testEmail = emailRegex.test(email);

  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }

  if (!email) return res.status(400).json({ message: '"email" is required' });

  if (!testEmail) return res.status(400).json({ message: '"email" must be a valid email' });

  next();
};

const isPasswordValid = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  if (!password) return res.status(400).json({ message: '"password" is required' });

  if (password.length < 6 || password.length > 6) {
    return res.status(400).json({
      message: '"password" length must be 6 characters long',
    });
  }
  
  next();
};

module.exports = {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
};
