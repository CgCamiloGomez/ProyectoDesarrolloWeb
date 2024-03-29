module.exports = {
    getHomePage: (req, res) =>{
        let query = "SELECT * FROM `usuarios` ORDER BY id ASC";
        db.query(query, (err, result) => {
            if(err){
                res.redirect('/');
                console.log('Fallo consulta a usuarios');
            }

            res.render('usuarios.ejs',
                {
                    title: 'Reservas | Ver Reservas',
                    usuarios: result,
                    tituloPag: 'RESERVAS'
                }); 
        });
    }
};