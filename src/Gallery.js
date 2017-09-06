"use strict";


class Gallery {

    constructor(selector, listItem) {

        this.columns = 3;
        this.$gallery = $(selector);

        this.$gallery.empty();
        this.$gallery.addClass('my-gallery');

        this.galleryWidthPixel = 0;
        this.galleryHeightPixel = 0;

        this.cropRatio = 10 / 100;

        this.setListItem(listItem);
    }

    setListItem(listItem) {
        this.listItem = [];
        var self = this;
        (listItem || []).forEach(function (item, idx) {
            var img = new Image();
            img.onload = function () {

                self.listItem.push({
                    src: this.src,
                    idx: this.idx,
                    alt: this.alt,
                    height: this.height,
                    width: this.width
                });

                if (self.listItem.length == listItem.length) {
                    self.listItem = self.listItem.sort(function (a, b) {
                        return a.idx - b.idx
                    });

                    self.refresh();
                    window.onresize = function () {
                        self.refresh();
                    };
                }
            };
            img.src = item.src;
            img.idx = idx;
            img.alt = item.alt;
        });
    }

    getRandomItemWidth(max, i) {
        if (max == 1)
            return 1;

        i = i || 0;
        if (!max || max > Math.ceil(this.columns / 2))
            max = Math.ceil(this.columns / 2);

        var min = 2;
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        //return random; //TODO fix

        if (i < 5 && this.lastRandom && this.lastRandom == random)
            return this.getRandomItemWidth(max, i + 1);
        else {
            this.lastRandom = random;
            return random
        }
    }

    refresh() {
        var galleryWidthPixel = this.$gallery.width();
        if (this.galleryWidthPixel == galleryWidthPixel)
            return;

        this.galleryWidthPixel = galleryWidthPixel;
        this.galleryHeightPixel = 0;

        var listItem = [];
        var columnWidthPixel = galleryWidthPixel / this.columns;
        var bufferColumnsHeight = [];
        for (var i = 0; i < this.columns; i++)
            bufferColumnsHeight[i] = 0

        var columnIdx = 0;

        this.listItem.forEach((originItem) => {

            var item = JSON.parse(JSON.stringify(originItem));

            var itemColumnWidth = 1;
            var maxItemColumnWidth = Math.floor(originItem.width / columnWidthPixel);

            var currentColumnHeight = bufferColumnsHeight[columnIdx];

            for (var i = columnIdx + 1; i < bufferColumnsHeight.length; i++) {
                if (itemColumnWidth >= maxItemColumnWidth) //for best img quality
                    break;
                if (currentColumnHeight === bufferColumnsHeight[i])
                    itemColumnWidth += 1;
            }

            itemColumnWidth = this.getRandomItemWidth(itemColumnWidth);

            var widthPx = itemColumnWidth * columnWidthPixel;

            item.height = Math.round(item.height * (widthPx / item.width));
            item.width = widthPx;
            item.left = columnIdx * columnWidthPixel;
            item.top = bufferColumnsHeight[columnIdx];

            var leftColumnHeight = (columnIdx > 0) ? bufferColumnsHeight[columnIdx - 1] : null;

            if (leftColumnHeight) {
                var deltaHeight = Math.abs(leftColumnHeight - currentColumnHeight);
                var ratio = deltaHeight / item.height;

                if (Math.abs(1 - ratio) < this.cropRatio) {
                    item.height = deltaHeight;
                    item.crop = true;
                }
            }

            for (var i = 0; i < itemColumnWidth; i++)
                bufferColumnsHeight[columnIdx + i] += item.height;

            if (bufferColumnsHeight[columnIdx] > this.galleryHeightPixel)
                this.galleryHeightPixel = bufferColumnsHeight[columnIdx];

            var minColumnHeight = bufferColumnsHeight[columnIdx];
            for (var i = 0; i < bufferColumnsHeight.length; i++) {
                if (bufferColumnsHeight[i] < minColumnHeight) {
                    minColumnHeight = bufferColumnsHeight[i];
                    columnIdx = i
                }
            }

            listItem.push(item);
        });

        this.render(listItem);
    }

    render(listItem, clear) {


        function setGalleryItemCss($galleryItem, item) {
            $galleryItem.css('position', 'absolute');
            $galleryItem.css('width', item.width + 'px');
            $galleryItem.css('height', item.height + 'px');
            $galleryItem.css('top', item.top + 'px');
            $galleryItem.css('left', item.left + 'px');

            //if (item.crop)
            //    $galleryItem.css('background-color', 'green');
            //else
            //    $galleryItem.css('background-color', 'red');
        }

        if (clear === true)
            this.$gallery.empty();//TODO remove line

        if ($(".gallery-item").length)
            listItem.forEach((item) => {
                var $galleryItem = $('.gallery-item[data-gallery-item-idx=' + item.idx + ']');
                setGalleryItemCss($galleryItem, item)
            });
        else
            listItem.forEach((item) => {
                var $galleryItem = $('<li class="gallery-item" data-gallery-item-idx="' + item.idx + '" data-col="' + item.columns + '">');

                setGalleryItemCss($galleryItem, item);

                $galleryItem.append([
                    '<a href="' + item.src + '">',
                    '<img src="' + item.src + '" alt="' + item.alt + '"/>',
                    '</a>'
                ].join(''));

                this.$gallery.append($galleryItem);
            });

        this.$gallery.css('height', this.galleryHeightPixel + 'px');
    }
}
