const User = (sequelize, DataTypes) => {
  const Use = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Users',
  });

  Use.associate = (models) => {
    Use.hasMany(models.BlogPost, { foreingKey: 'id', as: 'userId' });
  };

  return Use;
};

module.exports = User;
