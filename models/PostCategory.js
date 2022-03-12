module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {}, { timestamps: false, tableName: 'PostsCategories' });

  PostCategory.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategory;
};
