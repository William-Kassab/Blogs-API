const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER },
    published: { type: DataTypes.DATE },
    updated: { type: DataTypes.DATE },
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { foreingKey: 'userId', as: 'user' });
  };

  return blogPost;
};

module.exports = BlogPost;
