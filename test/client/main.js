"use strict";


$(document).ready(function () {


    var gallery = new MyGallery('#gallery', largeTestListItem, {
        columns: 6,
        //firstItemWidth: 1,
        maxItemWidth: 4,
        resizeRatio: 30 / 100
    });

    //$.getJSON('/images', function (listItem) {
    //
    //
    //    //test with same size img
    //    //listItem = listItem.map(function (item) {
    //    //    item.src = listItem[0].src;
    //    //    return item
    //    //});
    //
    //    var gallery = new MyGallery('#gallery', listItem, {
    //        columns: 3,
    //        maxItemWidth: 2,
    //        resizeRatio: 30 / 100
    //    })
    //})

});
