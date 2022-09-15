export {};
import express from 'express';
const songController = require('../Controllers/songController')
const { read, create } = songController

const router = express.Router()

router.get('/read',  read )

router.get('/create',  create )

module.exports = router