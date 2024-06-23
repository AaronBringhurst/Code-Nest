const Sequelize = require('./config/connection');
const { Model, DataTypes } = require("sequelize");

class Post extends Model{}

Post.init(
    {
        post_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        username:{
            type: DataTypes.STRING(69),
            allowNull: false,
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