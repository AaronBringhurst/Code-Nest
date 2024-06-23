const { Model, DataTypes } = require("sequelize");

class User extends Model {
}


User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING(69),
            allowNull: false
        },
        username:{
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
    }
)

module.exports = User;