requirejs.config({baseUrl:"../../static/src/js",paths:{jquery:"./lib/jquery",text:"./lib/text",util:"./lib/util/util",css:"./css",i18n:"./lib/i18n/i18n"},config:{text:{},i18n:{locale:"en"}},shim:{info:{deps:["jquery"],exports:"info",init:function(i){}},util:["css!./lib/util/css/common.css","css!./lib/util/css/color.css"]},map:{}});