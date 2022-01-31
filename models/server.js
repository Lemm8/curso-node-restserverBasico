const cors = require('cors')
const express = require('express');
//const usuariosRoute = require('../routes/user-routes')

class Server {
    
    constructor() {
        // CUANDO SE INSTANCIE EL SERVIDOR, CREAR APP DE EXPRESS COMO PROPIEDAD
        this.app = express();
        // PUERTO
        this.port = process.env.PORT;
        // RUTAS
        this.usuariosPath = '/api/usuarios';

        // MIDDLEWARES (FUNCIONES QUE AÑADEN FUNCIONACLIDADES AL SERVER, SE EJCUTAN SIEMPRE QUE SE LEVANTE EL SERVER)
        this.middlewares();


        // ESTABLECER RUTAS
        this.routes();
    }


    middlewares() {

        //CORS
        this.app.use( cors() );
        // PARSEO Y LECTURA DEL BODY
        this.app.use( express.json() );
        // DIRECTORIO PÚBLICO
        this.app.use( express.static( 'public' ) );

    }


    // RUTAS DEL SERVIDOR
    routes() {
        
        this.app.use( this.usuariosPath, require( '../routes/user-routes' ) );

    }

    // PUERTO DONDE SE VA A ESUCHAR
    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto ', this.port );
        });
    }

}

module.exports = Server;