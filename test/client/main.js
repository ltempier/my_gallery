"use strict";


$(document).ready(function () {


    $.getJSON('/images', function (listItem) {

        //test with same size img
        //listItem = listItem.map(function (item) {
        //    item.src = listItem[0].src;
        //    return item
        //});

        var gallery = new MyGallery('#gallery', listItem, {
            columns: 8,
            //firstItemWidth: 1,
            maxItemWidth: 2,
            resizeRatio: 30 / 100
        })
    })


});
