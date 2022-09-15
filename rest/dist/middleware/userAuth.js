"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../Model");
const jwt = require("jsonwebtoken");
const User = db.users;
const saveUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = yield User.findOne({
            where: {
                userName: req.body.userName,
            },
        });
        if (username) {
            return res.json(409).send("username already taken");
        }
        const emailcheck = yield User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (emailcheck) {
            return res.json(409).send("Authentication failed");
        }
        next();
    }
    catch (error) {
        console.log(error);
    }
});
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.SECRET_KEY;
    try {
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            // return res.send("Successfully Verified");
            next();
        }
        else {
            // Access Denied
            return res.status(401).send('access denied');
        }
    }
    catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});
//exporting module
module.exports = {
    saveUser, verifyToken
};
