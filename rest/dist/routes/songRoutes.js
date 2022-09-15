"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const songController = require('../Controllers/songController');
const { read, create } = songController;
const router = express_1.default.Router();
router.get('/read', read);
router.get('/create', create);
module.exports = router;
