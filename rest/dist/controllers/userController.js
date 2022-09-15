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
const bcrypt = require("bcrypt");
const db = require("../Model");
const jwt = require("jsonwebtoken");
const User = db.users;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const data = {
            userName,
            email,
            password: yield bcrypt.hash(password, 10),
        };
        const user = yield User.create(data);
        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });
            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            return res.status(201).send(token);
        }
        else {
            return res.status(409).send("Details are not correct");
        }
    }
    catch (error) {
        console.log(error);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User.findOne({ email });
        if (user) {
            const isSame = yield bcrypt.compare(password, user.password);
            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                return res.status(201).send(token);
            }
            else {
                return res.status(401).send("Authentication failed");
            }
        }
        else {
            return res.status(401).send("Authentication failed");
        }
    }
    catch (error) {
        console.log(error);
    }
});
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield User.findOne({ id });
        if (user)
            return res.status(200).send(user);
        return res.status(409).send("Details are not correct");
    }
    catch (error) {
        console.log(error);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { userName, email } = req.body;
        const user = yield User.findOne({ id });
        if (user) {
            user.update({ userName, email }, { where: { id } });
            return res.status(200).send(user);
        }
        return res.status(409).send("Details are not correct");
    }
    catch (error) {
        console.log(error);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield User.findOne({ id });
        if (user) {
            user.destroy({ where: { id } });
            return res.status(200).send('successfully deleted');
        }
        return res.status(409).send("Details are not correct");
    }
    catch (error) {
        console.log(error);
    }
});
module.exports = {
    signup,
    login,
    read,
    update,
    destroy,
};
