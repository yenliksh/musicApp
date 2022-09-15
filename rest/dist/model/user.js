"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, { timestamps: true });
    return User;
};
