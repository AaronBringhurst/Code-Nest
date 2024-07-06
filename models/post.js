
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
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'user_id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Post',
        freezeTableName: true,
        underscored: true
    }
);


export default Post;
