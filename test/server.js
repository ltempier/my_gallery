"use strict";


process.env.PORT = process.env.PORT || 3333;
process.env.IP = process.env.IP || "0.0.0.0";

const express = require('express');
const fs = require('fs');
const path = require('path');


var app = express();
const dirImgPath = path.join(__dirname, 'img');

app.use(express.static(path.join(__dirname, 'client')));
app.use('/src', express.static(path.join(__dirname, '..', 'src')));
app.use('/img', express.static(dirImgPath));


app.get('/images', function (req, res) {

    var images = [];
    fs.readdirSync(dirImgPath).forEach(function (fileName) {
        if (fileName.endsWith(".jpg"))
            images.push({
                src: '/img/' + fileName,
                alt: 'test img ' + fileName
            })
    });

    res.status(200).json(images);
});


app.listen(process.env.PORT, process.env.IP, function (err) {
    if (err)
        console.error(err);
    else
        console.log('server start on', process.env.IP + ':' + process.env.PORT)
});
