"use strict";


class MyGallery {

    constructor(selector, listItem, options) {

        options = options || {};

        this.columns = options.columns || 3;
        this.firstItemWidth = options.firstItemWidth || Math.ceil(this.columns / 2);
        this.resizeRatio = options.resizeRatio || (10 / 100);

        this.$gallery = $(selector);

        this.$gallery.empty();
        this.$gallery.addClass('my-gallery');

        this.galleryWidthPixel = 0;
        this.galleryHeightPixel = 0;

        this.setListItem(listItem);
    }

    setListItem(listItem) {
        this._listItem = [];
        var self = this;
        (listItem || []).forEach(function (item, idx) {
            var img = new Image();
            img.onload = function () {

                self._listItem.push({
                    src: this.src,
                    idx: this.idx,
                    alt: this.alt,
                    height: this.height,
                    width: this.width
                });

                if (self._listItem.length == listItem.length) {
                    self._listItem = self._listItem.sort(function (a, b) {
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

    getItemWidth(max) {
        var min = 1;
        var width = min;

        if (!max || max > Math.ceil(this.columns / 2))
            max = Math.ceil(this.columns / 2);

        this._bufferRandomItemWidth = this._bufferRandomItemWidth || {};
        this._bufferRandomItemWidth[this._columnIdx] = this._bufferRandomItemWidth[this._columnIdx] || [];

        if (max > 1) {
            var itemUpWidth = this._bufferRandomItemWidth[this._columnIdx][this._bufferRandomItemWidth[this._columnIdx].length - 1];
            for (var w = max; w > min; w--) {
                if (w != itemUpWidth) {
                    width = w;
                    break
                }
            }
        }

        this._bufferRandomItemWidth[this._columnIdx].push(width);
        return width;
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

        this._columnIdx = 0;
        this._listItem.forEach((originItem, itemIdx) => {

            var self = this;
            var item = JSON.parse(JSON.stringify(originItem));

            var itemColumnWidth = 1;
            var maxItemColumnWidth = Math.floor(originItem.width / columnWidthPixel);

            var currentColumnHeight = bufferColumnsHeight[this._columnIdx];

            for (var i = (this._columnIdx + 1); i < bufferColumnsHeight.length; i++) {
                if (itemColumnWidth >= maxItemColumnWidth) //for best img quality
                    break;
                if (currentColumnHeight === bufferColumnsHeight[i]) //currentHeight === rightColumnHeight
                    itemColumnWidth += 1;
                else
                    break
            }

            if (itemIdx == 0)
                itemColumnWidth = this.firstItemWidth;
            else
                itemColumnWidth = this.getItemWidth(itemColumnWidth);

            var widthPx = itemColumnWidth * columnWidthPixel;

            item.height = Math.round(item.height * (widthPx / item.width));
            item.width = widthPx;
            item.left = this._columnIdx * columnWidthPixel;
            item.top = bufferColumnsHeight[this._columnIdx];

            var leftColumnHeight = (this._columnIdx > 0) ? bufferColumnsHeight[this._columnIdx - 1] : null;

            if (leftColumnHeight) {
                var deltaHeight = Math.abs(leftColumnHeight - currentColumnHeight);
                var ratio = deltaHeight / item.height;


                if (itemIdx == 24)
                    console.log('io')

                if (Math.abs(1 - ratio) < this.resizeRatio) {
                    item.height = deltaHeight;
                    item.resize = true;
                }
            }

            for (var i = 0; i < itemColumnWidth; i++)
                bufferColumnsHeight[this._columnIdx + i] += item.height;

            if (bufferColumnsHeight[this._columnIdx] > this.galleryHeightPixel)
                this.galleryHeightPixel = bufferColumnsHeight[this._columnIdx];

            var minColumnHeight = bufferColumnsHeight[this._columnIdx];

            for (var i = 0; i < this.columns; i++) {
                if (bufferColumnsHeight[i] < minColumnHeight) {
                    minColumnHeight = bufferColumnsHeight[i];
                    self._columnIdx = i
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
        }

        if (clear === true)
            this.$gallery.empty();//TODO remove line

        if ($(".gallery-item").length)
            listItem.forEach((item) => {
                var $galleryItem = $('.gallery-item-lib[data-gallery-item-idx=' + item.idx + ']');
                setGalleryItemCss($galleryItem, item)
            });
        else
            listItem.forEach((item) => {
                var $galleryItem = $('<li class="gallery-item-lib" data-gallery-item-idx="' + item.idx + '" data-col="' + item.columns + '">');

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
