'use strict';

// MODULES //

var test = require( 'tape' );
var validate = require( './../lib/validate.js' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof validate === 'function', 'export is a function' );
	t.end();
});

test( 'if provided an `options` argument which is not an object, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, values[ i ] );
		t.ok( err instanceof TypeError, 'returns a TypeError when provided ' + values[ i ] );
	}
	t.end();
});

test( 'if provided an `owner` option which is not a string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'owner': values[ i ],
			'repo': 'beep'
		});
		t.ok( err instanceof TypeError, 'returns a TypeError when provided ' + values[ i ] );
	}
	t.end();
});

test( 'if provided a `repo` option which is not a string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'owner': 'beep',
			'repo': values[ i ]
		});
		t.ok( err instanceof TypeError, 'returns a TypeError when provided ' + values[ i ] );
	}
	t.end();
});

test( 'if provided a `deps` option which is not a string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'owner': 'beep',
			'repo':'boop',
			'deps': values[ i ]
		});
		t.ok( err instanceof TypeError, 'returns a TypeError when provided ' + values[ i ] );
	}
	t.end();
});

test( 'if provided an unrecognized/unsupported `deps` option, the function returns an error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'hello',
		'world',
		'yolo'
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'owner': 'beep',
			'repo':'boop',
			'deps': values[ i ]
		});
		t.ok( err instanceof Error, 'returns an Error when provided ' + values[ i ] );
	}
	t.end();
});

test( 'if provided a `style` option which is not a string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'owner': 'beep',
			'repo':'boop',
			'style': values[ i ]
		});
		t.ok( err instanceof TypeError, 'returns a TypeError when provided ' + values[ i ] );
	}
	t.end();
});

test( 'if provided a `format` option which is not a string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'owner': 'beep',
			'repo':'boop',
			'format': values[ i ]
		});
		t.ok( err instanceof TypeError, 'returns a TypeError when provided ' + values[ i ] );
	}
	t.end();
});

test( '`package` option is required', function test( t ) {
	var err = validate( {}, {} );
	t.ok( err instanceof TypeError, 'returns a type error when not provided option' );
	t.end();
});

test( 'if all options are valid, the function returns `null`', function test( t ) {
	var err;

	err = validate( {}, {
		'owner': 'beep',
		'repo':'boop',
		'deps': 'main',
		'style': 'flat',
		'format': 'png'
	});
	t.equal( err, null, 'returns null' );

	err = validate( {}, {
		'owner': 'beep',
		'repo':'boop',
		'deps': 'optional',
		'style': 'flat',
		'format': 'png'
	});
	t.equal( err, null, 'returns null' );

	t.end();
});

test( 'the function ignores unrecognized options', function test( t ) {
	var err = validate( {}, {
		'owner': 'beep',
		'repo':'boop',
		'bip': 'bop',
		'foo': null,
		'bar': [1,2,3]
	});
	t.equal( err, null, 'returns null' );
	t.end();
});
