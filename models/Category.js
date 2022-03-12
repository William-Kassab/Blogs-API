const Categorie = (sequelize, DataTypes) => {
  const Categ = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Categories',
  });
  return Categ;
};

module.exports = Categorie;
