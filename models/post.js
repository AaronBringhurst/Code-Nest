const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Post extends Model{}

Post.init(
    {
        post_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(69),
            allowNull: false
        },
        body: {
            type: DataTypes.STRING(69),
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }
)

module.exports = Post;