/* jslint browser:true, devel:true */
/* glboal $:true */

var db = {};

db.SQLite = window.cordova.require('cordova-sqlite-plugin.SQLite');

db.sqlite = new db.SQLite('example');

db.sqlite.open(function(err){
    if(err) throw err;
    db.sqlite.query('SELECT TABLE IF NOT EXIST alimentadores(url,tipo,caja)', function(err, res) {
    if (err) throw err;
    console.log(res.rows[0].solution);
  });
});