import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
    underscored: true
});

export default Comment;
