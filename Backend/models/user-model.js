const { DataTypes } = require('sequelize');

const authenticationModel = (sequelize) => {
    const userModel = sequelize.define("user", {
        email: {
            type: DataTypes.STRING,
            allowNull: false, // Email should be required
            unique: true, // Email should be unique

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, // Password should be required
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false, // Password should be required
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "user", // Set default role to "user"
        },
        isSuspended: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return userModel;
};

module.exports = authenticationModel;
