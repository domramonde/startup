var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'db_gamarra',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion Establecida');
   }
});

"use strict"

var express = require('express');
var servidor = express.createServer();

servidor.get('/api/insertar-producto', (req,res,next) => {
   var consulta = connection.query('INSERT INTO producto(precio) VALUES(?)', ['19.95'], function(error, result){
   if(error){
      throw error;
   }else{
      console.log(result);
	    res.json([{mensaje: 'guardado con exito'}]);
    next();
   }
 }
);
});
