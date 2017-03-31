#! /usr/bin/env node

var fs   = require( "fs-extra" ),
    guid = require( "guid" );

fs.readJson( process.cwd() + "\\File Testing.yyp", ( err, obj ) => {

    if ( err ) console.log( err );
    else console.log( obj );

    
    console.log( process.argv );

    var res = obj.resources;

    for ( r in res ) console.log( res[ r ].Value.resourceType );

    console.log( guid.raw() );
    console.log( guid.raw() );
    
} );