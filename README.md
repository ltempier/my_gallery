# MyGallery
This library generate and optimise an image gallery grid.

## Install

* Require jQuery
* Add lib style: .../my_gallery/src/style.css
* Add lib js: .../my_gallery/src/MyGallery.css

## How to use
```
 new MyGallery(selector, listItem, options)
```

#### selector:
* String or jQuery DOM element

#### listItem:
Array of image item:
* src: image source attribute
* alt: image alt attribute

#### options:
*  columns: number of grid column (default: 3)
*  resizeRatio: max % of height crop (default: 25/100)
*  firstItemWidth: size in column for the first img item
*  maxItemWidth: max size in column for all img items


## Examples

#### index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

    <title>My Gallery</title>
    <link rel="stylesheet" type="text/css" href="my_gallery/src/style.css"/>
</head>
<body>

    <div class="container">
        <div id="gallery"></div>
    </div>

    <script type="text/javascript" src="./jquery-2.2.4.min.js"></script>
    <script type="text/javascript" src="my_gallery/src/MyGallery.js"></script>
    <script type="text/javascript" src="./main.js"></script>

</body>
</html>

```

#### main.js
```
var listItem = [
    {
        src: "http://...",
        alt:"image..."
    },
    {
        src: "http://...",
        alt:"image..."
    }
]

 var gallery = new MyGallery('#gallery', listItem, {
            columns: 8,
            firstItemWidth: 1,
            maxItemWidth: 2,
            resizeRatio: 30 / 100
        })
```

#### result:
![example](https://github.com/ltempier/my-gallery/raw/master/capture.jpeg)

## Test

```
npm install
npm run generateTestImg #very slow be patient
npm test
```

#### open http://localhost:3333/
