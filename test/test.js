'use strict';

// MODULES //

var test = require( 'tape' );
var urls = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof urls === 'function', 'main export is a function' );
	t.end();
});

test( 'a repository `owner` must be specified', function test( t ) {
	t.throws( foo, TypeError, 'throws error' );
	t.end();

	function foo() {
		urls({
			'repo': 'beep'
		});
	}
});

test( 'a repository name must be specified', function test( t ) {
	t.throws( foo, TypeError, 'throws error' );
	t.end();

	function foo() {
		urls({
			'owner': 'beep'
		});
	}
});

test( 'the function returns an object containing `image` and `url` fields', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});

	t.equal( typeof out.image, 'string', 'image field is a string' );
	t.equal( typeof out.url, 'string', 'url field is a string' );
	t.end();
});

test( 'the `image` field corresponds to a shields.io badge url', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.image, 'https://img.shields.io/david/beep/boop.svg?style=flat', 'image url' );
	t.end();
});

test( 'the `url` field corresponds to the url on David', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.url, 'https://david-dm.org/beep/boop', 'David url' );
	t.end();
});

test( 'the default dependency type corresponds to the main dependencies of a package', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.image, 'https://img.shields.io/david/beep/boop.svg?style=flat', 'image url' );
	t.end();
});

test( 'the dependency type can be specified', function test( t ) {
	var out;

	// main:
	out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'deps': 'main'
	});
	t.equal( out.image, 'https://img.shields.io/david/beep/boop.svg?style=flat', 'image url (main)' );
	t.equal( out.url, 'https://david-dm.org/beep/boop', 'David url (main)' );

	// dev:
	out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'deps': 'dev'
	});
	t.equal( out.image, 'https://img.shields.io/david/dev/beep/boop.svg?style=flat', 'image url (dev)' );
	t.equal( out.url, 'https://david-dm.org/beep/boop#info=devDependencies', 'David url (dev)' );

	// optional:
	out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'deps': 'optional'
	});
	t.equal( out.image, 'https://img.shields.io/david/optional/beep/boop.svg?style=flat', 'image url (optional)' );
	t.equal( out.url, 'https://david-dm.org/beep/boop#info=optionalDependencies', 'David url (optional)' );

	// peer:
	out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'deps': 'peer'
	});
	t.equal( out.image, 'https://img.shields.io/david/peer/beep/boop.svg?style=flat', 'image url (peer)' );
	t.equal( out.url, 'https://david-dm.org/beep/boop#info=peerDependencies', 'David url (peer)' );

	// bundled:
	out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'deps': 'bundled'
	});
	t.equal( out.image, 'https://img.shields.io/david/bundled/beep/boop.svg?style=flat', 'image url (bundled)' );
	t.equal( out.url, 'https://david-dm.org/beep/boop#info=bundledDependencies', 'David url (bundled)' );

	t.end();
});

test( 'the default badge style is `flat`', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.image, 'https://img.shields.io/david/beep/boop.svg?style=flat', 'image url' );
	t.end();
});

test( 'the badge style can be specified', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'style': 'flat-square'
	});
	t.equal( out.image, 'https://img.shields.io/david/beep/boop.svg?style=flat-square', 'image url' );
	t.end();
});

test( 'the default badge format is `svg`', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.image, 'https://img.shields.io/david/beep/boop.svg?style=flat', 'image url' );
	t.end();
});

test( 'the badge format can be specified', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'format': 'png'
	});
	t.equal( out.image, 'https://img.shields.io/david/beep/boop.png?style=flat', 'image url' );
	t.end();
});
