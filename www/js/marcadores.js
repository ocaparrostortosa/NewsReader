/* jslint browser:true, devel:true, white:true, vars:true */
/* global $:false, intel:false */

/* Ejemplo de lo que vamos a almacenar en los marcadores
var marcadores = [
    {nombre:"Ideal Jaén",url:"http://",tipo:"atom"},
    {nombre:"El mundo",url:"http://",tipo:"rss"},
    {nombre:"CNN",url:"http://",tipo:"atom"}
];
*/

var marcadores = {};

marcadores.lista = [];

marcadores.add = function (nombre, url){
    $.ajax({
        url: "http://query.yahooapis.com/v1/public/yql",

        // The name of the callback parameter, as specified by the YQL service
        jsonp: "callback",

        // Tell jQuery we're expecting JSONP (JSON proxy).
        dataType: "jsonp",

        // Tell YQL what we want and that we want JSON
        data: {
            q: "select * from rss where url=\""+url+"\"",
            format: "json"
        },

        // Work with the response
        success: function( response ){
            if(response.query.count > 0){
                //Añadir RSS
                var alimentador = {"nombre":nombre,"url":url,"tipo":"rss"};
                marcadores.lista.push(alimentador);
                ges_error.noerror();
                marcadores.save();
            } else{
                //probar con atom
                 $.ajax({
                    url: "http://query.yahooapis.com/v1/public/yql",

                    // The name of the callback parameter, as specified by the YQL service
                    jsonp: "callback",

                    // Tell jQuery we're expecting JSONP (JSON proxy).
                    dataType: "jsonp",

                    // Tell YQL what we want and that we want JSON
                    data: {
                        q: "select * from atom where url=\""+url+"\"",
                        format: "json"
                    },

                    // Work with the response
                    success: function( response ){
                        if(response.query.count > 0){
                            //añadir ATOM
                            var alimentador = {"nombre":nombre,"url":url,"tipo":"atom"};
                            marcadores.lista.push(alimentador);
                            ges_error.noerror();
                            marcadores.save();
                        } else{
                            ges_error.alert('Error al procesar el canal',
                                            'No he podido comprobar el tipo de canal (RSS-ATOM). Compruebe que la URL es correcta.');
                        }
                    }               
    
            });
            }
        },
        error: function(XHR, textStatus, errorThrown){
            $.ges_error.alert('Error de conexión', 'No ha sido posible añadir el canal, compruebe su conexión a internet.');
        },
        timeout: 3000;
    });
    
};

//Vuelca a localStorage los marcadores
marcadores.save = function(){
    localStorage.setItem("marcadores", JSON.stringify(marcadores.lista));
};

//Carga de localStorage los marcadores
marcadores.load = function(){
    if (marcadores === null){
        var cargarListaMarcadores = JSON.parse(localStorage.getItem("marcadores"));
    }
    
};
//Acabado

