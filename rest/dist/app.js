"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./Model');
const songRoutes = require('./Routes/songRoutes');
const cors = require("cors");
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync");
});
app.use('/api/songs', songRoutes);
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
