/*global require*/
"use strict";

// Require.js allows us to configure shortcut alias
require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: "_"
        },
        marionette:{
            deps: [
                "backbone"
            ],
            exports: "marionette"
        },
        backbone: {
            deps: [
                "underscore",
                "jquery",
            ],
            exports: "Backbone"
        }
    },
    paths: {
        backbone : "../bower_components/backbone/backbone",
        underscore : "../bower_components/underscore/underscore",
        jquery : "../bower_components/jquery/dist/jquery",
        "backbone.marionette" : "../bower_components/backbone.marionette/lib/core/backbone.marionette",
        "backbone.radio" : "../bower_components/backbone.radio/build/backbone.radio",
        "backbone.babysitter" : "../bower_components/backbone.babysitter/lib/backbone.babysitter",
        text: "../bower_components/requirejs-text/text"
    },
    enforceDefine: true,
    map: {
        '*': {
            'backbone.wreqr': 'backbone.radio'
        }
    }
});

define([
    "backbone.marionette",
    "backbone.radio",
    "radio.shim",
    "menu/js/menu"
], function (Marionette, Radio, Shim, Menu) {
    window.Radio = Radio;

    // create main App
    var App = new Marionette.Application();
    App.Channel = Radio.channel("main");

    // add region to show menu
    var menuregion = Marionette.Region.extend({
      el: '#somediv'
    });

    App.addRegions({
      menu: "#somediv"
    });

    // data items
    var dataitems = [
        {
            nombre: "infraestructura",
            subitems: [
                {
                    nombre: "sedes",
                    link: "#"
                },
                {
                    nombre: "edificios",
                    link: "#"
                },
                {
                    nombre: "salas",
                    link: "#"
                }
            ]
        },
        {
            nombre: "institución",
            subitems: [
                {
                    nombre: "facultades",
                    link: "#"
                },
                {
                    nombre: "escuelas",
                    link: "#"
                },
                {
                    nombre: "regímenes",
                    link: "#"
                },
                {
                    nombre: "carreras",
                    link: "#"
                }
            ]
        }
    ]

    // start menu
    var menu = new Menu("menu");
    var menuChannel = menu.Channel;
    menu.start({
        items : dataitems  
    });
    var menuView = menuChannel.request("get:root");
    // console.log(menuView);
    App.menu.show(menuView);

});
