/* jslint browser:true, devel:true, white:true, vars:true */
/* global $:false, intel:false */

/** Gestionaremos los errores */

var ges_error = {};

ges_error.alert = function(titulo, mensaje){
    $.afui.loadContent("#error",false,false,"up");
    $("#error").empty();
    $("#error").append('<h2>'+titulo+'</h2><br>');
    $("#error").append('<span>'+mensaje+'</span>');
};

ges_error.noerror = function(){
    $.afui.clearHistory();//Para que no salga el botón de volver hacia atrás
    $.afui.loadContent("#grid",false,false,"up");
};