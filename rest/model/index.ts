import { SONGS } from "../constants/common";

export {}; 
const {Sequelize, DataTypes} = require('sequelize')

const user = 'postgres'
const host = 'localhost'
const database = 'songs'
const password = 'postgres'
const port = '5432'


const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
  })

    sequelize.authenticate().then(() => {
        console.log(`Database connected to discover`)
    }).catch((err:any) => {
        console.log(err)
    })

    const db:any = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

db.songs = require('./song') (sequelize, DataTypes)

module.exports = db

