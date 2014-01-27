/**
* Module dependencies.
*/
var express = require('express');       // Routes module
var mongoose = require('mongoose');     // MongoDB module
var passport = require('passport');     // User sessions module
var fs = require('fs');                 // File System module
var http = require('http');             // HTTP requests module


// Server configuration
var config = require( './config/env/config' );

/**
* Main application entry file.
* Please note that the order of loading is important.
*/
// Connection to the DB
var db = mongoose.connect(config.dbPath, function(err) {
    if (err) {
        throw err;
    }
});

// Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function( path )
{
    fs.readdirSync( path ).forEach( function( file )
    {
        var newPath = path + '/' + file;
        var stat = fs.statSync( newPath );
        if( stat.isFile() )
        {
            if( /(.*)\.(js$|coffee$)/.test( file ) )
            {
                require( newPath );
            }
        }
        else if( stat.isDirectory() )
        {
            walk( newPath );
        }
    } );
};
walk( models_path );

// Instantiate express module
var app = express();

// Express
require( './config/express' )( app, passport, db );

// Passport
require( './config/passport' )( passport );

// Routes
require( './config/routes' )( app );

// Server listen the following port
app.listen(config.port, function() {
    console.log('Server start on port: ' + config.port);
});

// TODO
// Supprimer l'image du moviePoster lors de la supprésion d'un film
// Vérifier si le titre du film existe avant de l'enregister dans la vue edit-dvd
// Rajouter les choix multiple lors de l'appuie sur rechercher dans la vue add-dvd
// Gérer zone adminisatrateur
// Ajouter plusieurs genres
// Faire fichies de conf pour la langue et les constantes
// Vérifier enregistrement DVD manuelement (pour le movie poster)
// Pouvoir éditer un utilisateur (mail, username, password...)
// Gestion collection de DVD (combien par categories...)
// Rajouter _ devant le nom du fichier temporaire de moviePoster
// Faire zone register
// Rajouter option choix couleur de body dans la section compte
// Cacher la société de production
// Regarder problème session qui expire et bugs
// Traduire message de suppression en français




// Rajouter message d'érreurs lors de la connection sur signin
// Rajouter une case commentaire lors de l'ajout d'un film dans la vue add-dvd
// Gestion mot de passe avec bcrypt