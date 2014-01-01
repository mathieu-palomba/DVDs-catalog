///**
// * Module dependencies.
// */
//var express = require( 'express' ),
//    fs = require( 'fs' ),
//    passport = require( 'passport' ),
//    logger = require( 'mean-logger' );
//
//require( 'newrelic' );
//
///**
// * Main application entry file.
// * Please note that the order of loading is important.
// */
//
////Load configurations
////if test env, load example file
//var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
//    config = require( './config/config' ),
//    auth = require( './config/middlewares/authorization' ),
//    mongoose = require( 'mongoose' );
//
//
//// Print some application state
//console.log( "Env is: " + env );
//console.log( "Db is: " + config.db );
//
////Bootstrap db connection
//var db = mongoose.connect( config.db );
//
////Bootstrap models
//var models_path = __dirname + '/app/models';
//var walk = function( path )
//{
//    fs.readdirSync( path ).forEach( function( file )
//    {
//        var newPath = path + '/' + file;
//        var stat = fs.statSync( newPath );
//        if( stat.isFile() )
//        {
//            if( /(.*)\.(js$|coffee$)/.test( file ) )
//            {
//                require( newPath );
//            }
//        }
//        else if( stat.isDirectory() )
//        {
//            walk( newPath );
//        }
//    } );
//};
//walk( models_path );
//
////bootstrap passport config
//require( './config/passport' )( passport );
//
//var app = express();
//
//// Create the server
//server = require( 'http' ).createServer( app );
//
//// socket.io
//var io = require( 'socket.io' ).listen( server );
//app.use( function( req, res, next )
//{
//    req.io = io;
//    next();
//} );
//
////express settings
//require( './config/express' )( app, passport, db );
//
////Bootstrap routes
//require( './config/routes' )( app, passport, auth );
//
////Start the app by listening on <port>
//var port = process.env.PORT || config.port;
//server.listen( port );
//console.log( 'EasyFear started on port ' + port );
//
////Initializing logger
//logger.init( app, passport, mongoose );
//
////expose app
//exports = module.exports = app;

var express = require('express');
var http = require('http');

var app = express();

app.use(express.logger()) // Active le middleware de logging
    .use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques
    .use(express.favicon(__dirname + '/public/favicon.ico')); // Active la favicon indiquée

// Set views path, template engine and default layout
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

// Routes
require( './config/routes' )( app );

app.listen(3000);