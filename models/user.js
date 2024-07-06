
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class User extends Model {}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(69),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(69),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(69),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(69),
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: false,
        freezeTableName: true,
        underscored: true
    }
);

// ESM export syntax
export default User;
