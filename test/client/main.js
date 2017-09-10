"use strict";


$(document).ready(function () {


    var gallery = new MyGallery('#gallery', {
        columns: 6,
        //firstItemWidth: 1,
        maxItemWidth: 4,
        resizeRatio: 30 / 100
    });

    gallery.setListItem(largeTestListItem);

    //$.getJSON('/images', function (listItem) {
    //
    //
    //    //test with same size img
    //    //listItem = listItem.map(function (item) {
    //    //    item.src = listItem[0].src;
    //    //    return item
    //    //});
    //
    //    gallery.setListItem(listItem)
    //})

});
