"use strict";


$(document).ready(function () {


    $.getJSON('/images', function (listItem) {

        //test with same size img
        //listItem = listItem.map(function (item) {
        //    item.src = '/img/img_lg_1.jpg';
        //    return item
        //});

        var gallery = new MyGallery('#gallery', listItem, {
            columns: 5,
            firstItemWidth: 1,
            resizeRatio: 20 / 100
        })
    })


});
