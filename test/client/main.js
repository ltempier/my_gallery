"use strict";


$(document).ready(function () {



    $.getJSON('/images', function(listItem){
        var gallery = new Gallery('#gallery', listItem)
    })



});
