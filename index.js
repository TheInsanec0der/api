const { yellowBright, greenBright, cyanBright } = require('chalk');
const express = require('express');
const api = express();

api.set('json spaces', 2)

require('./routes')(api)
require("dotenv").config();

api.get('/', (req, res) => {
    res.send({
        message: "an API made with ExpressJS with unique endpoints ✨",
        repository: "https://github.com/TheInsanec0der/api",
        endpoints: [
            "GET /gameserver?game=<game ID>&ip=<server address>",
        ]
    })
})


api.listen(process.env.PORT, () => {
    console.log(`${cyanBright.italic("Starting...")}`)
    setTimeout(() => {
        console.log(`${yellowBright("[API]")} ${greenBright(`App running on port ${process.env.PORT}`)}`);
    }, 3000)

})