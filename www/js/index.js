/* jslint browser:true, devel:true, white:true, vars:true */
/* global $:false, intel:false */

/**
    Nuestra "clase" alimentadores. Para evitar pérdidas de memoria hay que encapsular los objetos o métodos.
*/
$.feed = {};

/**
    Carga el "canal" en el div con id "caja"
    
    Parámetros:
    *url_canal: URL del XML donde está el rss o atom (Formato XML).
    *tipo: [rss|atom].
    *caja: El id (jQuery, con "$") del DIV donde vamos a escribir el resultado.
*/
$.feed.cargaNoticia = function(url_canal, tipo, caja){
    $.ajax({
        url: "http://query.yahooapis.com/v1/public/yql",

        // The name of the callback parameter, as specified by the YQL service
        jsonp: "callback",

        // Tell jQuery we're expecting JSONP (JSON proxy).
        dataType: "jsonp",

        // Tell YQL what we want and that we want JSON
        data: {
            q: "select * from "+tipo+" where url=\""+url_canal+"\"",
            format: "json"
        },

        // Work with the response
        success: function( response ) {
            console.log( response ); // server response
            /** Nos muestra el número de noticias que tenemos.
            console.log( response.query.count ); 
            */
            var numeroNoticias = response.query.count;
            /** Nos muestra la primera noticia
            console.log( response.query.results.item[0] ); 
            */
            var arrayNoticias = response.query.results.item;
            
            $(caja).empty();
            //Procesar los campos del array (title, link, pubDate, description)
            for(var i=0; i < numeroNoticias; i++){
                var item = $("<div></div>");
                
                var ancla = $("<a href='"+arrayNoticias[i].link+" target='_blank' data-rel='external' location='yes'>"+arrayNoticias[i].title+"</a>");
                item.append(ancla);
                
                var fecha = $("<p>"+arrayNoticias[i].pubDate+"</p>");               
                item.append(fecha);
                
                var descripcion = $("<p><i>"+arrayNoticias[i].description+"</i></p>");
                item.append(descripcion);
                
                $(caja).append(item);
            }
        }
    });    
};

/** Al cargar la aplicación **/
function onDeviceReady() {
    marcadores.load();
    generarRejilla();
}

$.feed.cargaNoticia("http://www.ideal.es/granada/rss/2.0/portada","rss","#itemEjemplo");

/**
    Necesitamos almacenar en localStorage información sobre marcadores
*/
var marcadores = [
    {
        "nombre":"Ideal Jaén",
        "url":"http://www.ideal.es/jaen/rss/2.0/portada",
        "tipo":"rss"
    },
    {
        "nombre":"BBC News",
        "url":"http://feeds.bbci.co.uk/mundo/rss.xml",
        "tipo":"rss"
    }
];

function addChannel(){
    marcadores.add( $("#nombreRSS").val(), $("#urlRSS").val() );   
}

var caja, lista;
function generarRejilla(){
    //Para los paneles
    for(var i = 0; i < marcadores.lista.length;i++){
        caja = $("<div></div>");
        caja.addClass("panel");
        caja.attr("data-title", $.marcadores.lista[i].nombre);
        caja.attr("id","item"+i);
        $("#paneles").append(caja);
        //$.feed.cargaNoticia(marcadores[i].url,marcadores[i].tipo,"#item\""+i"");
        
        lista = $("<li></li>");
        caja = $("<div></div>");
        caja.addClass("grid-photo-box");
        caja.append("<a href='#item"+i"'>"+$.marcadores.lista[i].nombre+"</a>");
        lista.append(caja);
        $("#divPrincipal").append(lista);
        
        
    }
    
}
