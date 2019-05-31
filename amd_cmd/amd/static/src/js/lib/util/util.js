//util
define(['jquery'], function ($) {
  return {
    formatNum: function (n) {
      if (n < 10) return '0' + n;
      return n;
    },
    getUser: function(){
        var def = $.Deferred();
        require(['./static/js/user.js'],function(user){
          def.resolve(user);
        })
        return def;
    },
    
    getFile:function(){ // jsonp
        require(["http://127.0.0.1:3000/file.js"], function(file){
            console.log("file",file);
        })

    }
    ,
    getText: function(){
      require(['text!/static/template/tem.html!strip'], function(template){
        $('body').append(template);
      })
    }
  }
});