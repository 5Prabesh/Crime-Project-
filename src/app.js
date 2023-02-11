"use strict";
const config = require('./config');
let startServer =  () => {
    const app = require("./server")();
    app.listen(config.port, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Express API running at port: ${config.port}`);
    });
};
startServer();
