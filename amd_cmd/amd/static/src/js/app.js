require(['util','i18n!./nls/message'], function (util, i18n) {
   $("#btn1").on('click', function(){
       util.getText();
   })
    console.log(i18n);
    $('body').append('<button>'+ i18n.edit +'</button>')
    
});
