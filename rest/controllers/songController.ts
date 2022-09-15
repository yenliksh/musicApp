import { SONGS } from "../constants/common";

const db = require("../Model");

const Song = db.songs;

const read = async (req:any, res:any) => {
  try {
    const songs = await Song.findAll();

    if(songs) return res.status(200).send(songs);

    return res.status(409).send("Error");
  } catch(error){

    return res.status(500).send("Error");
  }
};

const create = async (req:any, res:any) => {
  try {
    SONGS.map((song)=>{
      db.songs.create(song);
    })


    return res.status(200).send("Success");

  } catch(error){
    return res.status(500).send("Error");
  }
};


module.exports = {
 read,
 create
};