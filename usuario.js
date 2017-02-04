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


'use strict'
const expreso  = require('express')
const parseador = require('body-parser')

const aplicacion = expreso()
const puerto = process.env.PORT||3001



aplicacion.use(parseador.urlencoded({extended:false}))
aplicacion.use(parseador.json())


aplicacion.post("/api/login_post", (req,res) =>{

  req.header('Accept', '*/*');
  req.accepts('application/json');

     var query = connection.query('CALL sp_login (?, SHA1(MD5(?)));',
    [req.param("usuario"),req.param("contrasena")],

     function(error, result)
     {
     if(error){
        console.log(error);
        res.send(404, error)
        throw error;

     }else{
        console.log(result);

        var json= {
           status : "success",

            "usuario" : {
                "usuario" : result[0][0]["usuario"],
                "nombre" : result[0][0]["NOMBRE"],
                "apellido_p" : result[0][0]["APELLIDO_P"],
                "apellido_m" : result[0][0]["APELLIDO_M"],

           },
           message:"Hola "+result[0][0]["NOMBRE"]
         }

      res.send(200,json)
     }
   }
  );
})



aplicacion.post("/api/seguridad/usuario/registrar", (req,res) =>{

  req.header('Accept', '*/*');
  req.accepts('application/json');

     var query = connection.query('CALL sp_registrar_usuario(?,?,?,?);',
    [req.param("correo"),req.param("nombre"),req.param("apellidos"),req.param("contrasena")],

     function(error, result)
     {
     if(error){
       console.log(error);
       res.send(404, error)
       throw error;

     }else{
        console.log(result);

        var json= {
           status : "success",

           "data" : {
                "estado" : result[0][0]["valido"],
                "mensaje" : result[0][0]["mensaje"],
           },

         }
        res.send(200,json)

     }
   }
  );
})



aplicacion.listen(puerto, () => {
  console.log(`API REST corriendo en http://localhost:${puerto}`)
})
