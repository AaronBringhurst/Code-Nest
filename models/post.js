
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class Post extends Model {}

Post.init(
    {
        post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true
        },
    },
    {
        sequelize,
        modelName: 'Post'
    }
);


export default Post;
