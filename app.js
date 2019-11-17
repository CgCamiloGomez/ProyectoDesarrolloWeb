const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 5000;

const {getHomePage} = require('./Routes/index');
const {agregarUsuario, agregarUsuarioPag,editarUsuarioPage, editarUsuario, eliminarUsuario} = require('./Routes/usuarios');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'usuarios_db'
    }
);

db.connect((err) => {
    if (err){
        throw err;
    }
    console.log('Conectado a la base de datos');
});

global.db = db;

app.set('port', process.env.port || port);
app.set('views', __dirname + '/Views');
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,'/assets')));

//rutas para la app - a que función hace referencia, es decir que función se ejecuta cuando ingresa a la ruta
app.get('/index', getHomePage);
app.get('/usuarios/agregar',agregarUsuarioPag);
app.post('/usuarios/agregar',agregarUsuario);
app.get('/usuarios/editar/:id',editarUsuarioPage);
app.post('/usuarios/editar/:id', editarUsuario);  //LLamo a la función que permite la edición
app.get('/usuarios/eliminar/:id', eliminarUsuario);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

// app.set('view engine', 'ejs');
// app.use(bodyparser.urlencoded({extended: false}));
// app.use(bodyparser.json());
// app.use(express.static(path.join(__dirname, 'assets')));

