#!/usr/bin/env node

const path = require("path");
const express = require('express');
const app = module.exports = express();

app.get("/", (req,res) => {
    res.redirect("/demo/ui/index-vue");
});
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use("/demo/ui", express.static(path.join(__dirname, "../src/ui")));
app.use("/dist", express.static(path.join(__dirname, "../dist")));

// bind in DemoRest service
const DemoRest = require("../test/hello-rest");
var greetingRest = new DemoRest("greeting");
greetingRest.bindExpress(app);
var alohaRest = new DemoRest("aloha");
alohaRest.bindExpress(app);

if (module.parent) {
    console.log("TEST\t: launched server for testing");
    app.restService = DemoRest; 
} else {
    // Launch nodejs server
    const onListen = (port, data) => console.log("HTTP\t:" + ' listening on HTTP port ' + port);
    var listener = app.listen(80, (data) => onListen(80, data));
    listener.on('error', function(error) {
        if (error.code !== "EACCES") {
            throw error;
        }
        listener = app.listen(8080, (data) => onListen(8080, data));
    });
}
