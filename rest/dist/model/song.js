"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (sequelize, DataTypes) => {
    const Song = sequelize.define("song", {
        singer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        song: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { timestamps: true });
    return Song;
};
