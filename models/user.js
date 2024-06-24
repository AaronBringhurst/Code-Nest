// ESM import syntax for Sequelize dependencies
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';  // Make sure this path is correct

class User extends Model {}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,  // Assume it's a primary key
            autoIncrement: true  // Assume it needs auto increment
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
            type: DataTypes.STRING(255),
            allowNull: false
        },
    },
    {
        sequelize,  // Add sequelize instance
        modelName: 'User'  // Add model name
    }
);

// ESM export syntax
export default User;
