"uses strict";

var sharp = require('sharp');
var path = require('path');

for (var i = 0; i < 20; i++) {
    var width = Math.floor(Math.random() * 1000) + 600;
    var height = Math.floor(Math.random() * 1000) + 600;
    var imgFileName = 'img_lg_' + i + '.jpg';
    generateAndSaveImg(imgFileName, width, height)
}

for (var i = 0; i < 20; i++) {
    var width = Math.floor(Math.random() * 500) + 300;
    var height = Math.floor(Math.random() * 500) + 300;
    var imgFileName = 'img_md_' + i + '.jpg';
    generateAndSaveImg(imgFileName, width, height)
}

for (var i = 0; i < 20; i++) {
    var width = Math.floor(Math.random() * 250) + 100;
    var height = Math.floor(Math.random() * 250) + 100;
    var imgFileName = 'img_sm_' + i + '.jpg';
    generateAndSaveImg(imgFileName, width, height)
}


function generateAndSaveImg(imgFileName, width, height, callback) {
    var imgBuffer = new Buffer([
            '<svg font-family="Verdana">',
            '<rect x="0" y="0" width="' + width + '" height="' + height + '" style="fill:#949494;stroke-width:0;"/>',
            '<text text-anchor="middle" x="' + width / 2 + '" y="' + height / 2 + '" font-size="' + width / 10 + '">' + width + 'x' + height + '</text>',
            '<text text-anchor="middle" x="' + width / 2 + '" y="' + (height / 2 + width / 10) + '" font-size="' + width / 12 + '">' + imgFileName + '</text>',
            '</svg>'
        ].join('')
    );

    var imgPath = path.join(__dirname, 'img', imgFileName);
    sharp(imgBuffer)
        .resize(width, height)
        .toFile(imgPath, (err, info) => {
            if (err)
                console.log(err);
            if (callback)
                callback(err, info)
        });

}
