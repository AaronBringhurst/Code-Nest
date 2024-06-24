// ESM import syntax for Sequelize dependencies
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';  // Make sure this path is correct

class Post extends Model {}

Post.init(
    {
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        username: {
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
    },
    {
        sequelize,  // Add sequelize instance
        modelName: 'Post'  // Add model name
    }
);

// ESM export syntax
export default Post;
