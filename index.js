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



aplicacion.get("/api/producto", (req,res) =>{

  var consulta = connection.query('INSERT INTO talla(VALOR) VALUES(?)', ["PEQLL"],
   function(error, result){
  if(error){
     throw error;
  }else{
     console.log(result);
     res.json([{mensaje: 'guardado con exito'}]);
    }
}
);
})

aplicacion.post("/api/cliente-post", (req,res) =>{

  req.header('Accept', '*/*');
  req.accepts('application/json');

    console.log(`valor capturado: ${req.param("nombre")}`);
     var query = connection.query('INSERT INTO cliente(NOMBRE,APELLIDO_P,APELLIDO_M,DNI,FECHA_NAC) VALUES(?,?,?,?,?)',
    [req.param("nombre"),req.param("apellidop"),req.param("apellidom"),req.param("DNI"),req.param("fechanac")],

     function(error, result)
     {
     if(error){
        throw error;
     }else{
        console.log(result);
     }
   }
  );
  res.send(200,{ message:`el cliente ${req.param("nombre")}  se ha agregado`})
})

aplicacion.post("/api/login-prueba", (req,res) =>{

  req.header('Accept', '*/*');
  req.accepts('application/json');

    console.log(`valor capturado: ${req.param("usuario")}`);
     var query = connection.query('INSERT INTO usuarios_login(usuario,contrasena, metodo) VALUES(?,SHA1(MD5(?)),?)',
    [req.param("usuario"),req.param("contrasena"),req.param("metodo")],

     function(error, result)
     {
     if(error){
         console.log(error);
        throw error;
     }else{
        console.log(result);
     }
   }
  );
  res.send(200,{ message:`el cliente ${req.param("usuario")}  se ha agregado`})
})


aplicacion.listen(puerto, () => {
  console.log(`API REST corriendo en http://localhost:${puerto}`)
})
