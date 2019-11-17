module.exports = {

   agregarUsuarioPag:(req, res)=>{
        res.render('add-user.ejs',
        {
             title:'Control Usuarios | Agregar Un usuario'
            , message: ''
        });
   },
    
    //Función por método POST para realizar la inserción del nuevo usuario 
    agregarUsuario: (req, res) => {
        // Definión de variables donde se almacena el valor ingresado en cada uno input del formulario y se referencian
        // mediante el atributo name
        let message = '';
        let nombre = req.body.nombres;
        let apellido = req.body.apellido;
        let email = req.body.email;
        let clave = req.body.clave;
        
        let emailQuery = "SELECT * FROM `usuarios` WHERE email = '" + email + "'";

        db.query(emailQuery, (err, result) => {
            if (err) {
                console.log('Error buscando por email')
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Usuario con email ya existe';
                res.render('add-user.ejs', {
                    message,
                    title: 'Control usuarios | Agregar un usuario'
                });
            } else {

                // inserción del nuevo usuario a la tabla usuarios de la DB 
                let query = "INSERT INTO `usuarios` (nombres, apellidos, email, clave) VALUES ('" +
                    nombre + "', '" + apellido + "', '" + email + "', '" + clave + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log('Insertar el usuario')
                        return res.status(500).send(err);
                    }
                    res.redirect('/index');
                });
            }
        });
    },
    editarUsuarioPage: (req, res) => {
        let usuarioId = req.params.id; //variable que contiene el id del registro con el cual se realiza la consulta
        let query = "SELECT * FROM `usuarios` WHERE id = '" + usuarioId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                console.log('Usuario no encontrado')
                return res.status(500).send(err);
            }
            res.render('edit-user.ejs', {
                title: 'Control usuarios | Editar usuario'
                , usuario: result[0] // paso de consulta bajo la variable usuario, para llenar cada campo 
                , message: ''        //de la vista edit-user.ejs
            });
        });
    },
   

 editarUsuario: (req, res) => {
        let usuarioId = req.params.id;
        let nombres = req.body.nombre;
        let apellidos = req.body.apellido;
        let email = req.body.email;
        let clave = req.body.clave;

        let query = "UPDATE `usuarios` SET `nombres` = '" + nombres + "', `apellidos` = '" + apellidos + "', `email` = '" + email + "', `clave` = '" + clave + "' WHERE `usuarios`.`id` = '" + usuarioId + "'";
        db.query(query, (err, result) => {
            if (err) {
                console.log('Registro no pudo ser actualizado')
                return res.status(500).send(err);
            }
            res.redirect('/index');
        });
    },

    eliminarUsuario: (req, res) =>{
        let usuarioId = req.params.id;
        let deleteUserQuery = 'DELETE FROM usuarios WHERE id = "'+ usuarioId + '"';
        db.query(deleteUserQuery,(err,result)=>{
            if (err){
                console - log('Registro no pudo ser eliminado')
                return res.status(500).send(err);
            }
            res.redirect('/index');
        })
    }
};