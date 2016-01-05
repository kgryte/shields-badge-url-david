'use strict';

var getKeys = require( 'object-keys' ).shim();
var url = require( 'url' );
var list = require( 'npm-list-author-packages' );
var repoUrls = require( 'npm-repo-url' );
var badgeUrls = require( './../lib' );

// Generate badge URLs for all of an author's packages...
list( {'username': 'kgryte'}, onList );

function onList( error, list ) {
	var opts;
	if ( error ) {
		throw error;
	}
	if ( !list.length ) {
		return;
	}
	opts = {
		'packages': list
	};
	repoUrls( opts, onUrls );
}

function onUrls( error, results ) {
	var badge;
	var parts;
	var urls;
	var pkgs;
	var path;
	var i;
	if ( error ) {
		throw error;
	}
	urls = results.data;
	pkgs = getKeys( urls );

	// Note: we assume all repository URLs are of the form: git://github.com/{{owner}}/{{repo}}.git
	for ( i = 0; i < pkgs.length; i++ ) {
		parts = url.parse( urls[ pkgs[i] ] );
		path = parts.pathname.split( '/' );
		badge = badgeUrls({
			'owner': path[ 1 ],
			'repo': path[ 2 ].slice( 0, -4 )
		});
		console.log( badge );
	}
}
