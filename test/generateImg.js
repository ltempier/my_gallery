"uses strict";

var sharp = require('sharp');
var path = require('path');

for (var i = 0; i < 100; i++) {

    var width = Math.floor(Math.random() * 1000) + 300;
    var height = Math.floor(Math.random() * 1000) + 200;
    var imgFileName =  'img_' + i + '.jpg';
    var imgPath = path.join(__dirname,'img', 'img_' + i + '.jpg');

    const imgBuffer = new Buffer([
            '<svg font-family="Verdana">',
            '<rect x="0" y="0" width="' + width + '" height="' + height + '" style="fill:#ffffff;"/>',
            '<text text-anchor="middle" x="' + width / 2 + '" y="' + height / 2 + '" font-size="40">' + width + 'x' + height + '</text>',
            '<text text-anchor="middle" x="' + width / 2 + '" y="' + (height / 2 + 50) + '" font-size="30">' + imgFileName + '</text>',
            '</svg>'
        ].join('')
    );

    sharp(imgBuffer)
        .resize(width, height)
        .toFile(imgPath, (err, info) => {
            if (err)
                console.log(err)
        });

}
