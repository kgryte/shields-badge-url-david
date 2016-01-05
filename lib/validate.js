'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );
var contains = require( 'validate.io-contains' );


// VARIABLES //

var DEPS = [
	'main',
	'dev',
	'peer',
	'optional',
	'bundled'
];


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - function options
* @param {String} options.owner - repository owner
* @param {String} options.repo - repository name
* @param {String} [options.deps] - dependency type
* @param {String} [options.style] - badge style
* @param {String} [options.format] - badge format
* @returns {Error|Null} error object or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	opts.owner = options.owner;
	if ( !isString( opts.owner ) ) {
		return new TypeError( 'invalid option. Owner option must be a string. Option: `' + opts.owner + '`.' );
	}
	opts.repo = options.repo;
	if ( !isString( opts.repo ) ) {
		return new TypeError( 'invalid option. Repo option must be a string. Option: `' + opts.repo + '`.' );
	}
	if ( options.hasOwnProperty( 'deps' ) ) {
		if ( !isString( options.deps ) ) {
			return new TypeError( 'invalid option. Dependency option must be a string. Option: `' + options.deps + '`.' );
		}
		if ( options.deps === 'main' ) {
			// move along...
		}
		else if ( contains( DEPS, options.deps ) ) {
			opts.deps = options.deps;
		}
		else {
			return new Error( 'invalid option. Unrecognized dependency option. Option: `' + options.deps + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'style' ) ) {
		opts.style = options.style;
		if ( !isString( opts.style ) ) {
			return new TypeError( 'invalid option. Style option must be a string. Option: `' + opts.style + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'format' ) ) {
		opts.format = options.format;
		if ( !isString( opts.format ) ) {
			return new TypeError( 'invalid option. Format option must be a string. Option: `' + opts.format + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
