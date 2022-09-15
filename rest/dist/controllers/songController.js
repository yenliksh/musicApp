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
const common_1 = require("../constants/common");
const db = require("../Model");
const Song = db.songs;
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield Song.findAll();
        if (songs)
            return res.status(200).send(songs);
        return res.status(409).send("Error");
    }
    catch (error) {
        return res.status(500).send("Error");
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        common_1.SONGS.map((song) => {
            db.songs.create(song);
        });
        return res.status(200).send("Success");
    }
    catch (error) {
        return res.status(500).send("Error");
    }
});
module.exports = {
    read,
    create
};
