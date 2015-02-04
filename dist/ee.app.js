/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/*
 * jQuery UI Widget 1.10.3+amd
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */

(function (factory) {
    if (typeof define === "function" && define.amd) {
        // Register as an anonymous AMD module:
        define(["jquery"], factory);
    } else {
        // Browser globals:
        factory(jQuery);
    }
}(function( $, undefined ) {

var uuid = 0,
	slice = Array.prototype.slice,
	_cleanData = $.cleanData;
$.cleanData = function( elems ) {
	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
		try {
			$( elem ).triggerHandler( "remove" );
		// http://bugs.jquery.com/ticket/8235
		} catch( e ) {}
	}
	_cleanData( elems );
};

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );
};

$.widget.extend = function( target ) {
	var input = slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			// 1.9 BC for #7810
			// TODO remove dual storage
			.removeData( this.widgetName )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( value === undefined ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( value === undefined ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			// accept selectors, DOM elements
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^(\w+)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

}));

/*
 * jQuery Iframe Transport Plugin 1.7
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint unparam: true, nomen: true */
/*global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:
    var counter = 0;

    // The iframe transport accepts three additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s),
    //  can be a string or an array of strings.
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
    $.ajaxTransport('iframe', function (options) {
        if (options.async) {
            var form,
                iframe,
                addParamChar;
            return {
                send: function (_, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    form.attr('accept-charset', options.formAcceptCharset);
                    addParamChar = /\?/.test(options.url) ? '&' : '?';
                    // XDomainRequest only supports GET and POST:
                    if (options.type === 'DELETE') {
                        options.url = options.url + addParamChar + '_method=DELETE';
                        options.type = 'POST';
                    } else if (options.type === 'PUT') {
                        options.url = options.url + addParamChar + '_method=PUT';
                        options.type = 'POST';
                    } else if (options.type === 'PATCH') {
                        options.url = options.url + addParamChar + '_method=PATCH';
                        options.type = 'POST';
                    }
                    // javascript:false as initial iframe src
                    // prevents warning popups on HTTPS in IE6.
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    counter += 1;
                    iframe = $(
                        '<iframe src="javascript:false;" name="iframe-transport-' +
                            counter + '"></iframe>'
                    ).bind('load', function () {
                        var fileInputClones,
                            paramNames = $.isArray(options.paramName) ?
                                    options.paramName : [options.paramName];
                        iframe
                            .unbind('load')
                            .bind('load', function () {
                                var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = iframe.contents();
                                    // Google Chrome and Firefox do not throw an
                                    // exception when calling iframe.contents() on
                                    // cross-domain requests, so we unify the response:
                                    if (!response.length || !response[0].firstChild) {
                                        throw new Error();
                                    }
                                } catch (e) {
                                    response = undefined;
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(
                                    200,
                                    'success',
                                    {'iframe': response}
                                );
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="javascript:false;"></iframe>')
                                    .appendTo(form);
                                window.setTimeout(function () {
                                    // Removing the form in a setTimeout call
                                    // allows Chrome's developer tools to display
                                    // the response result
                                    form.remove();
                                }, 0);
                            });
                        form
                            .prop('target', iframe.prop('name'))
                            .prop('action', options.url)
                            .prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>')
                                    .prop('name', field.name)
                                    .val(field.value)
                                    .appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length &&
                                options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function (index) {
                                    $(this).prop(
                                        'name',
                                        paramNames[index] || options.paramName
                                    );
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form
                                .append(options.fileInput)
                                .prop('enctype', 'multipart/form-data')
                                // enctype must be set as encoding for IE:
                                .prop('encoding', 'multipart/form-data');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                $(input).prop('name', clone.prop('name'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo(document.body);
                },
                abort: function () {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe
                            .unbind('load')
                            .prop('src', 'javascript'.concat(':false;'));
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, xml
    // and script.
    // Please note that the Content-Type for JSON responses has to be text/plain
    // or text/html, if the browser doesn't include application/json in the
    // Accept header, else IE will show a download dialog.
    // The Content-Type for XML responses on the other hand has to be always
    // application/xml or text/xml, so IE properly parses the XML response.
    // See also
    // https://github.com/blueimp/jQuery-File-Upload/wiki/Setup#content-type-negotiation
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return iframe && $(iframe[0].body).text();
            },
            'iframe json': function (iframe) {
                return iframe && $.parseJSON($(iframe[0].body).text());
            },
            'iframe html': function (iframe) {
                return iframe && $(iframe[0].body).html();
            },
            'iframe xml': function (iframe) {
                var xmlDoc = iframe && iframe[0];
                return xmlDoc && $.isXMLDoc(xmlDoc) ? xmlDoc :
                        $.parseXML((xmlDoc.XMLDocument && xmlDoc.XMLDocument.xml) ||
                            $(xmlDoc.body).html());
            },
            'iframe script': function (iframe) {
                return iframe && $.globalEval($(iframe[0].body).text());
            }
        }
    });

}));

/*
 * jQuery File Upload Plugin 5.31.6
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global define, window, document, location, File, Blob, FormData */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'jquery.ui.widget'
        ], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // The FileReader API is not actually used, but works as feature detection,
    // as e.g. Safari supports XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads:
    $.support.xhrFileUpload = !!(window.XMLHttpRequestUpload && window.FileReader);
    $.support.xhrFormDataFileUpload = !!window.FormData;

    // Detect support for Blob slicing (required for chunked uploads):
    $.support.blobSlice = window.Blob && (Blob.prototype.slice ||
        Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

    // The fileupload widget listens for change events on file input fields defined
    // via fileInput setting and paste or drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files using
    // the fileupload API.
    // By default, files added via file input selection, paste, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {

        options: {
            // The drop target element(s), by the default the complete document.
            // Set to null to disable drag & drop support:
            dropZone: $(document),
            // The paste target element(s), by the default the complete document.
            // Set to null to disable paste support:
            pasteZone: $(document),
            // The file input field(s), that are listened to for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty,
            // can be a string or an array of strings:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            // Interval in milliseconds to calculate and trigger progress events:
            progressInterval: 100,
            // Interval in milliseconds to calculate progress bitrate:
            bitrateInterval: 500,
            // By default, uploads are started automatically when adding files:
            autoUpload: true,

            // Error and info messages:
            messages: {
                uploadedBytes: 'Uploaded bytes exceed file size'
            },

            // Translation function, gets the message key to be translated
            // and an object with context specific data as arguments:
            i18n: function (message, context) {
                message = this.messages[message] || message.toString();
                if (context) {
                    $.each(context, function (key, value) {
                        message = message.replace('{' + key + '}', value);
                    });
                }
                return message;
            },

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uploads, else
            // once for each file selection.
            //
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows you to override plugin options as well as define ajax settings.
            //
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            //
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                if (data.autoUpload || (data.autoUpload !== false &&
                        $(this).fileupload('option', 'autoUpload'))) {
                    data.process().done(function () {
                        data.submit();
                    });
                }
            },

            // Other callbacks:

            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);

            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);

            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);

            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);

            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);

            // Callback for change events of the fileInput(s):
            // change: function (e, data) {}, // .bind('fileuploadchange', func);

            // Callback for paste events to the pasteZone(s):
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

            // Callback for drop events of the dropZone(s):
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

            // Callback for dragover events of the dropZone(s):
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // Callback for the start of each chunk upload request:
            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

            // Callback for successful chunk uploads:
            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

            // Callback for failed (abort or error) chunk uploads:
            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

            // Callback for completed (success, abort or error) chunk upload requests:
            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false
        },

        // A list of options that require reinitializing event listeners and/or
        // special initialization code:
        _specialOptions: [
            'fileInput',
            'dropZone',
            'pasteZone',
            'multipart',
            'forceIframeTransport'
        ],

        _blobSlice: $.support.blobSlice && function () {
            var slice = this.slice || this.webkitSlice || this.mozSlice;
            return slice.apply(this, arguments);
        },

        _BitrateTimer: function () {
            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (now, loaded, interval) {
                var timeDiff = now - this.timestamp;
                if (!this.bitrate || !interval || timeDiff > interval) {
                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                    this.loaded = loaded;
                    this.timestamp = now;
                }
                return this.bitrate;
            };
        },

        _isXHRUpload: function (options) {
            return !options.forceIframeTransport &&
                ((!options.multipart && $.support.xhrFileUpload) ||
                $.support.xhrFormDataFileUpload);
        },

        _getFormData: function (options) {
            var formData;
            if (typeof options.formData === 'function') {
                return options.formData(options.form);
            }
            if ($.isArray(options.formData)) {
                return options.formData;
            }
            if ($.type(options.formData) === 'object') {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _initProgressObject: function (obj) {
            var progress = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            if (obj._progress) {
                $.extend(obj._progress, progress);
            } else {
                obj._progress = progress;
            }
        },

        _initResponseObject: function (obj) {
            var prop;
            if (obj._response) {
                for (prop in obj._response) {
                    if (obj._response.hasOwnProperty(prop)) {
                        delete obj._response[prop];
                    }
                }
            } else {
                obj._response = {};
            }
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
                    loaded;
                if (data._time && data.progressInterval &&
                        (now - data._time < data.progressInterval) &&
                        e.loaded !== e.total) {
                    return;
                }
                data._time = now;
                loaded = Math.floor(
                    e.loaded / e.total * (data.chunkSize || data._progress.total)
                ) + (data.uploadedBytes || 0);
                // Add the difference from the previously loaded state
                // to the global loaded counter:
                this._progress.loaded += (loaded - data._progress.loaded);
                this._progress.bitrate = this._bitrateTimer.getBitrate(
                    now,
                    this._progress.loaded,
                    data.bitrateInterval
                );
                data._progress.loaded = data.loaded = loaded;
                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(
                    now,
                    loaded,
                    data.bitrateInterval
                );
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger('progress', e, data);
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger('progressall', e, this._progress);
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
                $(xhr.upload).bind('progress', function (e) {
                    var oe = e.originalEvent;
                    // Make sure the progress event properties get copied over:
                    e.lengthComputable = oe.lengthComputable;
                    e.loaded = oe.loaded;
                    e.total = oe.total;
                    that._onProgress(e, options);
                });
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _isInstanceOf: function (type, obj) {
            // Cross-frame instanceof check
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        },

        _initXHRData: function (options) {
            var that = this,
                formData,
                file = options.files[0],
                // Ignore non-multipart setting if not supported:
                multipart = options.multipart || !$.support.xhrFileUpload,
                paramName = options.paramName[0];
            options.headers = options.headers || {};
            if (options.contentRange) {
                options.headers['Content-Range'] = options.contentRange;
            }
            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
                options.headers['Content-Disposition'] = 'attachment; filename="' +
                    encodeURI(file.name) + '"';
            }
            if (!multipart) {
                options.contentType = file.type;
                options.data = options.blob || file;
            } else if ($.support.xhrFormDataFileUpload) {
                if (options.postMessage) {
                    // window.postMessage does not allow sending FormData
                    // objects, so we just add the File/Blob objects to
                    // the formData array and let the postMessage window
                    // create the FormData object out of this array:
                    formData = this._getFormData(options);
                    if (options.blob) {
                        formData.push({
                            name: paramName,
                            value: options.blob
                        });
                    } else {
                        $.each(options.files, function (index, file) {
                            formData.push({
                                name: options.paramName[index] || paramName,
                                value: file
                            });
                        });
                    }
                } else {
                    if (that._isInstanceOf('FormData', options.formData)) {
                        formData = options.formData;
                    } else {
                        formData = new FormData();
                        $.each(this._getFormData(options), function (index, field) {
                            formData.append(field.name, field.value);
                        });
                    }
                    if (options.blob) {
                        formData.append(paramName, options.blob, file.name);
                    } else {
                        $.each(options.files, function (index, file) {
                            // This check allows the tests to run with
                            // dummy objects:
                            if (that._isInstanceOf('File', file) ||
                                    that._isInstanceOf('Blob', file)) {
                                formData.append(
                                    options.paramName[index] || paramName,
                                    file,
                                    file.name
                                );
                            }
                        });
                    }
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },

        _initIframeSettings: function (options) {
            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && targetHost && targetHost !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },

        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options);
            }
        },

        _getParamName: function (options) {
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                paramName = [];
                fileInput.each(function () {
                    var input = $(this),
                        name = input.prop('name') || 'files[]',
                        i = (input.prop('files') || [1]).length;
                    while (i) {
                        paramName.push(name);
                        i -= 1;
                    }
                });
                if (!paramName.length) {
                    paramName = [fileInput.prop('name') || 'files[]'];
                }
            } else if (!$.isArray(paramName)) {
                paramName = [paramName];
            }
            return paramName;
        },

        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
                // If the given file input doesn't have an associated form,
                // use the default widget file input's form:
                if (!options.form.length) {
                    options.form = $(this.options.fileInput.prop('form'));
                }
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type || options.form.prop('method') || '')
                .toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT' &&
                    options.type !== 'PATCH') {
                options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
                options.formAcceptCharset = options.form.attr('accept-charset');
            }
        },

        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // jQuery 1.6 doesn't provide .state(),
        // while jQuery 1.8+ removed .isRejected() and .isResolved():
        _getDeferredState: function (deferred) {
            if (deferred.state) {
                return deferred.state();
            }
            if (deferred.isResolved()) {
                return 'resolved';
            }
            if (deferred.isRejected()) {
                return 'rejected';
            }
            return 'pending';
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Adds convenience methods to the data callback argument:
        _addConvenienceMethods: function (e, data) {
            var that = this,
                getPromise = function (data) {
                    return $.Deferred().resolveWith(that, [data]).promise();
                };
            data.process = function (resolveFunc, rejectFunc) {
                if (resolveFunc || rejectFunc) {
                    data._processQueue = this._processQueue =
                        (this._processQueue || getPromise(this))
                            .pipe(resolveFunc, rejectFunc);
                }
                return this._processQueue || getPromise(this);
            };
            data.submit = function () {
                if (this.state() !== 'pending') {
                    data.jqXHR = this.jqXHR =
                        (that._trigger('submit', e, this) !== false) &&
                        that._onSend(e, this);
                }
                return this.jqXHR || that._getXHRPromise();
            };
            data.abort = function () {
                if (this.jqXHR) {
                    return this.jqXHR.abort();
                }
                return that._getXHRPromise();
            };
            data.state = function () {
                if (this.jqXHR) {
                    return that._getDeferredState(this.jqXHR);
                }
                if (this._processQueue) {
                    return that._getDeferredState(this._processQueue);
                }
            };
            data.progress = function () {
                return this._progress;
            };
            data.response = function () {
                return this._response;
            };
        },

        // Parses the Range header from the server response
        // and returns the uploaded bytes:
        _getUploadedBytes: function (jqXHR) {
            var range = jqXHR.getResponseHeader('Range'),
                parts = range && range.split('-'),
                upperBytesPos = parts && parts.length > 1 &&
                    parseInt(parts[1], 10);
            return upperBytesPos && upperBytesPos + 1;
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            options.uploadedBytes = options.uploadedBytes || 0;
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes,
                mcs = options.maxChunkSize || fs,
                slice = this._blobSlice,
                dfd = $.Deferred(),
                promise = dfd.promise(),
                jqXHR,
                upload;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = options.i18n('uploadedBytes');
                return this._getXHRPromise(
                    false,
                    options.context,
                    [null, 'error', file.error]
                );
            }
            // The chunk upload method:
            upload = function () {
                // Clone the options object for each chunk upload:
                var o = $.extend({}, options),
                    currentLoaded = o._progress.loaded;
                o.blob = slice.call(
                    file,
                    ub,
                    ub + mcs,
                    file.type
                );
                // Store the current chunk size, as the blob itself
                // will be dereferenced after data processing:
                o.chunkSize = o.blob.size;
                // Expose the chunk bytes position range:
                o.contentRange = 'bytes ' + ub + '-' +
                    (ub + o.chunkSize - 1) + '/' + fs;
                // Process the upload data (the blob and potential form data):
                that._initXHRData(o);
                // Add progress listeners for this chunk upload:
                that._initProgressListener(o);
                jqXHR = ((that._trigger('chunksend', null, o) !== false && $.ajax(o)) ||
                        that._getXHRPromise(false, o.context))
                    .done(function (result, textStatus, jqXHR) {
                        ub = that._getUploadedBytes(jqXHR) ||
                            (ub + o.chunkSize);
                        // Create a progress event if no final progress event
                        // with loaded equaling total has been triggered
                        // for this chunk:
                        if (currentLoaded + o.chunkSize - o._progress.loaded) {
                            that._onProgress($.Event('progress', {
                                lengthComputable: true,
                                loaded: ub - o.uploadedBytes,
                                total: ub - o.uploadedBytes
                            }), o);
                        }
                        options.uploadedBytes = o.uploadedBytes = ub;
                        o.result = result;
                        o.textStatus = textStatus;
                        o.jqXHR = jqXHR;
                        that._trigger('chunkdone', null, o);
                        that._trigger('chunkalways', null, o);
                        if (ub < fs) {
                            // File upload not yet complete,
                            // continue with the next chunk:
                            upload();
                        } else {
                            dfd.resolveWith(
                                o.context,
                                [result, textStatus, jqXHR]
                            );
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        o.jqXHR = jqXHR;
                        o.textStatus = textStatus;
                        o.errorThrown = errorThrown;
                        that._trigger('chunkfail', null, o);
                        that._trigger('chunkalways', null, o);
                        dfd.rejectWith(
                            o.context,
                            [jqXHR, textStatus, errorThrown]
                        );
                    });
            };
            this._enhancePromise(promise);
            promise.abort = function () {
                return jqXHR.abort();
            };
            upload();
            return promise;
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
                // Set timer for global bitrate progress calculation:
                this._bitrateTimer = new this._BitrateTimer();
                // Reset the global progress values:
                this._progress.loaded = this._progress.total = 0;
                this._progress.bitrate = 0;
            }
            // Make sure the container objects for the .response() and
            // .progress() methods on the data object are available
            // and reset to their initial state:
            this._initResponseObject(data);
            this._initProgressObject(data);
            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
            data._progress.total = data.total = this._getTotal(data.files) || 1;
            data._progress.bitrate = data.bitrate = 0;
            this._active += 1;
            // Initialize the global progress values:
            this._progress.loaded += data.loaded;
            this._progress.total += data.total;
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            var total = options._progress.total,
                response = options._response;
            if (options._progress.loaded < total) {
                // Create a progress event if no final progress event
                // with loaded equaling total has been triggered:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: total,
                    total: total
                }), options);
            }
            response.result = options.result = result;
            response.textStatus = options.textStatus = textStatus;
            response.jqXHR = options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            var response = options._response;
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._progress.loaded -= options._progress.loaded;
                this._progress.total -= options._progress.total;
            }
            response.jqXHR = options.jqXHR = jqXHR;
            response.textStatus = options.textStatus = textStatus;
            response.errorThrown = options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
        },

        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
            // jqXHRorResult, textStatus and jqXHRorError are added to the
            // options object via done and fail callbacks
            this._trigger('always', null, options);
        },

        _onSend: function (e, data) {
            if (!data.submit) {
                this._addConvenienceMethods(e, data);
            }
            var that = this,
                jqXHR,
                aborted,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function () {
                    that._sending += 1;
                    // Set timer for bitrate progress calculation:
                    options._bitrateTimer = new that._BitrateTimer();
                    jqXHR = jqXHR || (
                        ((aborted || that._trigger('send', e, options) === false) &&
                        that._getXHRPromise(false, options.context, aborted)) ||
                        that._chunkedUpload(options) || $.ajax(options)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._onAlways(
                            jqXHRorResult,
                            textStatus,
                            jqXHRorError,
                            options
                        );
                        that._sending -= 1;
                        that._active -= 1;
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (that._getDeferredState(nextSlot) === 'pending') {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                        if (that._active === 0) {
                            // The stop callback is triggered when all uploads have
                            // been completed, equivalent to the global ajaxStop event:
                            that._trigger('stop');
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.pipe(send);
                } else {
                    this._sequence = this._sequence.pipe(send, send);
                    pipe = this._sequence;
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    aborted = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(options.context, aborted);
                        }
                        return send();
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },

        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                limit = options.limitMultiFileUploads,
                paramName = this._getParamName(options),
                paramNameSet,
                paramNameSlice,
                fileSet,
                i;
            if (!(options.singleFileUploads || limit) ||
                    !this._isXHRUpload(options)) {
                fileSet = [data.files];
                paramNameSet = [paramName];
            } else if (!options.singleFileUploads && limit) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < data.files.length; i += limit) {
                    fileSet.push(data.files.slice(i, i + limit));
                    paramNameSlice = paramName.slice(i, i + limit);
                    if (!paramNameSlice.length) {
                        paramNameSlice = paramName;
                    }
                    paramNameSet.push(paramNameSlice);
                }
            } else {
                paramNameSet = paramName;
            }
            data.originalFiles = data.files;
            $.each(fileSet || data.files, function (index, element) {
                var newData = $.extend({}, data);
                newData.files = fileSet ? element : [element];
                newData.paramName = paramNameSet[index];
                that._initResponseObject(newData);
                that._initProgressObject(newData);
                that._addConvenienceMethods(e, newData);
                result = that._trigger('add', e, newData);
                return result;
            });
            return result;
        },

        _replaceFileInput: function (input) {
            var inputClone = input.clone(true);
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // elements set with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },

        _handleFileTreeEntry: function (entry, path) {
            var that = this,
                dfd = $.Deferred(),
                errorHandler = function (e) {
                    if (e && !e.entry) {
                        e.entry = entry;
                    }
                    // Since $.when returns immediately if one
                    // Deferred is rejected, we use resolve instead.
                    // This allows valid files and invalid items
                    // to be returned together in one set:
                    dfd.resolve([e]);
                },
                dirReader;
            path = path || '';
            if (entry.isFile) {
                if (entry._file) {
                    // Workaround for Chrome bug #149735
                    entry._file.relativePath = path;
                    dfd.resolve(entry._file);
                } else {
                    entry.file(function (file) {
                        file.relativePath = path;
                        dfd.resolve(file);
                    }, errorHandler);
                }
            } else if (entry.isDirectory) {
                dirReader = entry.createReader();
                dirReader.readEntries(function (entries) {
                    that._handleFileTreeEntries(
                        entries,
                        path + entry.name + '/'
                    ).done(function (files) {
                        dfd.resolve(files);
                    }).fail(errorHandler);
                }, errorHandler);
            } else {
                // Return an empy list for file system items
                // other than files or directories:
                dfd.resolve([]);
            }
            return dfd.promise();
        },

        _handleFileTreeEntries: function (entries, path) {
            var that = this;
            return $.when.apply(
                $,
                $.map(entries, function (entry) {
                    return that._handleFileTreeEntry(entry, path);
                })
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _getDroppedFiles: function (dataTransfer) {
            dataTransfer = dataTransfer || {};
            var items = dataTransfer.items;
            if (items && items.length && (items[0].webkitGetAsEntry ||
                    items[0].getAsEntry)) {
                return this._handleFileTreeEntries(
                    $.map(items, function (item) {
                        var entry;
                        if (item.webkitGetAsEntry) {
                            entry = item.webkitGetAsEntry();
                            if (entry) {
                                // Workaround for Chrome bug #149735:
                                entry._file = item.getAsFile();
                            }
                            return entry;
                        }
                        return item.getAsEntry();
                    })
                );
            }
            return $.Deferred().resolve(
                $.makeArray(dataTransfer.files)
            ).promise();
        },

        _getSingleFileInputFiles: function (fileInput) {
            fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') ||
                    fileInput.prop('entries'),
                files,
                value;
            if (entries && entries.length) {
                return this._handleFileTreeEntries(entries);
            }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
                value = fileInput.prop('value');
                if (!value) {
                    return $.Deferred().resolve([]).promise();
                }
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                files = [{name: value.replace(/^.*\\/, '')}];
            } else if (files[0].name === undefined && files[0].fileName) {
                // File normalization for Safari 4 and Firefox 3:
                $.each(files, function (index, file) {
                    file.name = file.fileName;
                    file.size = file.fileSize;
                });
            }
            return $.Deferred().resolve(files).promise();
        },

        _getFileInputFiles: function (fileInput) {
            if (!(fileInput instanceof $) || fileInput.length === 1) {
                return this._getSingleFileInputFiles(fileInput);
            }
            return $.when.apply(
                $,
                $.map(fileInput, this._getSingleFileInputFiles)
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _onChange: function (e) {
            var that = this,
                data = {
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            this._getFileInputFiles(data.fileInput).always(function (files) {
                data.files = files;
                if (that.options.replaceFileInput) {
                    that._replaceFileInput(data.fileInput);
                }
                if (that._trigger('change', e, data) !== false) {
                    that._onAdd(e, data);
                }
            });
        },

        _onPaste: function (e) {
            var items = e.originalEvent && e.originalEvent.clipboardData &&
                    e.originalEvent.clipboardData.items,
                data = {files: []};
            if (items && items.length) {
                $.each(items, function (index, item) {
                    var file = item.getAsFile && item.getAsFile();
                    if (file) {
                        data.files.push(file);
                    }
                });
                if (this._trigger('paste', e, data) === false ||
                        this._onAdd(e, data) === false) {
                    return false;
                }
            }
        },

        _onDrop: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var that = this,
                dataTransfer = e.dataTransfer,
                data = {};
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                e.preventDefault();
                this._getDroppedFiles(dataTransfer).always(function (files) {
                    data.files = files;
                    if (that._trigger('drop', e, data) !== false) {
                        that._onAdd(e, data);
                    }
                });
            }
        },

        _onDragOver: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var dataTransfer = e.dataTransfer;
            if (dataTransfer) {
                if (this._trigger('dragover', e) === false) {
                    return false;
                }
                if ($.inArray('Files', dataTransfer.types) !== -1) {
                    dataTransfer.dropEffect = 'copy';
                    e.preventDefault();
                }
            }
        },

        _initEventHandlers: function () {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop
                });
                this._on(this.options.pasteZone, {
                    paste: this._onPaste
                });
            }
            this._on(this.options.fileInput, {
                change: this._onChange
            });
        },

        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, 'dragover drop');
            this._off(this.options.pasteZone, 'paste');
            this._off(this.options.fileInput, 'change');
        },

        _setOption: function (key, value) {
            var reinit = $.inArray(key, this._specialOptions) !== -1;
            if (reinit) {
                this._destroyEventHandlers();
            }
            this._super(key, value);
            if (reinit) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },

        _initSpecialOptions: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input[type="file"]') ?
                        this.element : this.element.find('input[type="file"]');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
            if (!(options.pasteZone instanceof $)) {
                options.pasteZone = $(options.pasteZone);
            }
        },

        _getRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _isRegExpOption: function (key, value) {
            return key !== 'url' && $.type(value) === 'string' &&
                /^\/.*\/[igm]{0,3}$/.test(value);
        },

        _initDataAttributes: function () {
            var that = this,
                options = this.options;
            // Initialize options set via HTML5 data-attributes:
            $.each(
                $(this.element[0].cloneNode(false)).data(),
                function (key, value) {
                    if (that._isRegExpOption(key, value)) {
                        value = that._getRegExp(value);
                    }
                    options[key] = value;
                }
            );
        },

        _create: function () {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers();
        },

        // This method is exposed to the widget API and allows to query
        // the number of active uploads:
        active: function () {
            return this._active;
        },

        // This method is exposed to the widget API and allows to query
        // the widget upload progress.
        // It returns an object with loaded, total and bitrate properties
        // for the running uploads:
        progress: function () {
            return this._progress;
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            var that = this;
            if (!data || this.options.disabled) {
                return;
            }
            if (data.fileInput && !data.files) {
                this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    that._onAdd(null, data);
                });
            } else {
                data.files = $.makeArray(data.files);
                this._onAdd(null, data);
            }
        },

        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files or fileInput property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                if (data.fileInput && !data.files) {
                    var that = this,
                        dfd = $.Deferred(),
                        promise = dfd.promise(),
                        jqXHR,
                        aborted;
                    promise.abort = function () {
                        aborted = true;
                        if (jqXHR) {
                            return jqXHR.abort();
                        }
                        dfd.reject(null, 'abort', 'abort');
                        return promise;
                    };
                    this._getFileInputFiles(data.fileInput).always(
                        function (files) {
                            if (aborted) {
                                return;
                            }
                            data.files = files;
                            jqXHR = that._onSend(null, data).then(
                                function (result, textStatus, jqXHR) {
                                    dfd.resolve(result, textStatus, jqXHR);
                                },
                                function (jqXHR, textStatus, errorThrown) {
                                    dfd.reject(jqXHR, textStatus, errorThrown);
                                }
                            );
                        }
                    );
                    return this._enhancePromise(promise);
                }
                data.files = $.makeArray(data.files);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }

    });

}));

/*
* Cloudinary's jQuery library - v1.0.21
* Copyright Cloudinary
* see https://github.com/cloudinary/cloudinary_js
*/

(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // Register as an anonymous AMD module:
    define([
      'jquery',
      'jquery.ui.widget',
      'jquery.iframe-transport',
      'jquery.fileupload'
      ], factory);
    } else {
      // Browser globals:
      var $ = window.jQuery;
      factory($);
      $(function() {
        if($.fn.cloudinary_fileupload !== undefined) {
          $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload();
        }
      });
    }
  }(function ($) {
    'use strict';
    var CF_SHARED_CDN = "d3jpl91pxevbkh.cloudfront.net";
    var OLD_AKAMAI_SHARED_CDN = "cloudinary-a.akamaihd.net";
    var AKAMAI_SHARED_CDN = "res.cloudinary.com";
    var SHARED_CDN = AKAMAI_SHARED_CDN;

    function utf8_encode (argString) {
      // http://kevin.vanzonneveld.net
      // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   improved by: sowberry
      // +    tweaked by: Jack
      // +   bugfixed by: Onno Marsman
      // +   improved by: Yves Sucaet
      // +   bugfixed by: Onno Marsman
      // +   bugfixed by: Ulrich
      // +   bugfixed by: Rafal Kukawski
      // +   improved by: kirilloid
      // *     example 1: utf8_encode('Kevin van Zonneveld');
      // *     returns 1: 'Kevin van Zonneveld'

      if (argString === null || typeof argString === "undefined") {
        return "";
      }

      var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      var utftext = '',
      start, end, stringl = 0;

      start = end = 0;
      stringl = string.length;
      for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
          end++;
        } else if (c1 > 127 && c1 < 2048) {
          enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
        } else {
          enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
        }
        if (enc !== null) {
          if (end > start) {
            utftext += string.slice(start, end);
          }
          utftext += enc;
          start = end = n + 1;
        }
      }

      if (end > start) {
        utftext += string.slice(start, stringl);
      }

      return utftext;
    }

    function crc32 (str) {
      // http://kevin.vanzonneveld.net
      // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
      // +   improved by: T0bsn
      // +   improved by: http://stackoverflow.com/questions/2647935/javascript-crc32-function-and-php-crc32-not-matching
      // -    depends on: utf8_encode
      // *     example 1: crc32('Kevin van Zonneveld');
      // *     returns 1: 1249991249
      str = utf8_encode(str);
      var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

      var crc = 0;
      var x = 0;
      var y = 0;

      crc = crc ^ (-1);
      for (var i = 0, iTop = str.length; i < iTop; i++) {
        y = (crc ^ str.charCodeAt(i)) & 0xFF;
        x = "0x" + table.substr(y * 9, 8);
        crc = (crc >>> 8) ^ x;
      }

      crc = crc ^ (-1);
      //convert to unsigned 32-bit int if needed
      if (crc < 0) {crc += 4294967296;}
      return crc;
    }

    function option_consume(options, option_name, default_value) {
      var result = options[option_name];
      delete options[option_name];
      return typeof(result) == 'undefined' ? default_value : result;
    }

    function build_array(arg) {
      if (arg === null || typeof(arg) == 'undefined') {
        return [];
      } else if ($.isArray(arg)) {
        return arg;
      } else {
        return [arg];
      }
    }

    function present(value) {
      return typeof value != 'undefined' && ("" + value).length > 0;
    }

    function process_base_transformations(options) {
      var transformations = build_array(options.transformation);
      var all_named = true;
      for (var i = 0; i < transformations.length; i++) {
        all_named = all_named && typeof(transformations[i]) == 'string';
      }
      if (all_named) {
        return [];
      }
      delete options.transformation;
      var base_transformations = [];
      for (var i = 0; i < transformations.length; i++) {
        var transformation = transformations[i];
        if (typeof(transformation) == 'string') {
          base_transformations.push("t_" + transformation);
        } else {
          base_transformations.push(generate_transformation_string($.extend({}, transformation)));
        }
      }
      return base_transformations;
    }

    function process_size(options) {
      var size = option_consume(options, 'size');
      if (size) {
        var split_size = size.split("x");
        options.width = split_size[0];
        options.height = split_size[1];
      }
    }

    function process_html_dimensions(options) {
      var width = options.width, height = options.height;
      var has_layer = options.overlay || options.underlay;
      var crop = options.crop;
      var use_as_html_dimensions = !has_layer && !options.angle && crop != "fit" && crop != "limit" && crop != "lfill";
      if (use_as_html_dimensions) {
        if (width && !options.html_width && width !== "auto" && parseFloat(width) >= 1) options.html_width = width;
        if (height && !options.html_height && parseFloat(height) >= 1) options.html_height = height;
      }
      if (!crop && !has_layer) {
        delete options.width;
        delete options.height;
      }
    }

    var TRANSFORMATION_PARAM_NAME_MAPPING = {
      angle: 'a',
      background: 'b',
      border: 'bo',
      color: 'co',
      color_space: 'cs',
      crop: 'c',
      default_image: 'd',
      delay: 'dl',
      density: 'dn',
      dpr: 'dpr',
      effect: 'e',
      fetch_format: 'f',
      flags: 'fl',
      gravity: 'g',
      height: 'h',
      opacity: 'o',
      overlay: 'l',
      page: 'pg',
      prefix: 'p',
      quality: 'q',
      radius: 'r',
      transformation: 't',
      underlay: 'u',
      width: 'w',
      x: 'x',
      y: 'y'
    };

    var TRANSFORMATION_PARAM_VALUE_MAPPING = {
      angle: function(angle){ return build_array(angle).join("."); },
      background: function(background) { return background.replace(/^#/, 'rgb:');},
      border: function(border) {
        if ($.isPlainObject(border)) {
          var border_width = "" + (border.width || 2);
          var border_color = (border.color || "black").replace(/^#/, 'rgb:');
          border = border_width + "px_solid_" + border_color;
        }
        return border;
      },
      color: function(color) { return color.replace(/^#/, 'rgb:');},
      dpr: function(dpr) {
        dpr = dpr.toString();
        if (dpr === "auto") {
          return "1.0";
        } else if (dpr.match(/^\d+$/)) {
          return dpr + ".0";
        } else {
          return dpr;
        }
      },
      effect: function(effect) { return build_array(effect).join(":");},
      flags: function(flags) { return build_array(flags).join(".")},
      transformation: function(transformation) { return build_array(transformation).join(".")}
    };

    function generate_transformation_string(options) {
      var base_transformations = process_base_transformations(options);
      process_size(options);
      process_html_dimensions(options);

      var params = [];
      for (var param in TRANSFORMATION_PARAM_NAME_MAPPING) {
        var value = option_consume(options, param);
        if (!present(value)) continue;
        if (TRANSFORMATION_PARAM_VALUE_MAPPING[param]) {
          value = TRANSFORMATION_PARAM_VALUE_MAPPING[param](value);
        }
        if (!present(value)) continue;
        params.push(TRANSFORMATION_PARAM_NAME_MAPPING[param] + "_" + value);
      }
      params.sort();

      var raw_transformation = option_consume(options, 'raw_transformation');
      if (present(raw_transformation)) params.push(raw_transformation);
      var transformation = params.join(",");
      if (present(transformation)) base_transformations.push(transformation);
      return base_transformations.join("/");
    }

    function absolutize(url) {
      if (!url.match(/^https?:\//)) {
        var prefix = document.location.protocol + "//" + document.location.host;
        if (url[0] == '?') {
          prefix += document.location.pathname;
        } else if (url[0] != '/') {
          prefix += document.location.pathname.replace(/\/[^\/]*$/, '/');
        }
        url = prefix + url;
      }
      return url;
    }

    function cloudinary_url_prefix(public_id, cloud_name, private_cdn, cdn_subdomain, secure_cdn_subdomain, cname, secure, secure_distribution, protocol) {
      if (cloud_name.match(/^\//) && !secure) {
        return "/res" + cloud_name;
      }

      var prefix = secure ? 'https://' : (window.location.protocol === 'file:' ? "file://" : 'http://');
      prefix = protocol ? protocol + '//' : prefix;

      var shared_domain = !private_cdn;
      if (secure) {
        if (!secure_distribution || secure_distribution == OLD_AKAMAI_SHARED_CDN) {
          secure_distribution = private_cdn ? cloud_name + "-res.cloudinary.com" : SHARED_CDN;
        }
        shared_domain = shared_domain || secure_distribution == SHARED_CDN;
        if (secure_cdn_subdomain == null && shared_domain) {
          secure_cdn_subdomain = cdn_subdomain;
        }
        if (secure_cdn_subdomain) {
          secure_distribution = secure_distribution.replace('res.cloudinary.com', "res-" + ((crc32(public_id) % 5) + 1) + ".cloudinary.com");
        }
        prefix += secure_distribution;
      } else if (cname) {
        var subdomain = cdn_subdomain ? "a" + ((crc32(public_id) % 5) + 1) + "." : "";
        prefix += subdomain + cname;
      } else {
        prefix += (private_cdn ? cloud_name + "-res" : "res");
        prefix += (cdn_subdomain ? "-" + ((crc32(public_id) % 5) + 1) : "")
        prefix += ".cloudinary.com";
      }
      if (shared_domain) prefix += "/" + cloud_name;

      return prefix;
    }

    function finalize_resource_type(resource_type, type, url_suffix, use_root_path, shorten) {
      var resource_type_and_type = resource_type + "/" + type;
      if (url_suffix) {
        if (resource_type_and_type == "image/upload") {
          resource_type_and_type = "images";
        } else if (resource_type_and_type == "raw/upload") {
          resource_type_and_type = "files";
        } else {
          throw "URL Suffix only supported for image/upload and raw/upload";
        }
      }
      if (use_root_path) {
        if (resource_type_and_type == "image/upload" || resource_type_and_type == "images") {
          resource_type_and_type = "";
        } else {
          throw "Root path only supported for image/upload";
        }
      }
      if (shorten && resource_type_and_type == "image/upload") {
        resource_type_and_type = "iu";
      }
      return resource_type_and_type;
    }

    function cloudinary_url(public_id, options) {
      options = options || {};
      var type = option_consume(options, 'type', 'upload');
      if (type == 'fetch') {
        options.fetch_format = options.fetch_format || option_consume(options, 'format');
      }
      var transformation = generate_transformation_string(options);
      var resource_type = option_consume(options, 'resource_type', "image");
      var version = option_consume(options, 'version');
      var format = option_consume(options, 'format');
      var cloud_name = option_consume(options, 'cloud_name', $.cloudinary.config().cloud_name);
      if (!cloud_name) throw "Unknown cloud_name";
      var private_cdn = option_consume(options, 'private_cdn', $.cloudinary.config().private_cdn);
      var secure_distribution = option_consume(options, 'secure_distribution', $.cloudinary.config().secure_distribution);
      var cname = option_consume(options, 'cname', $.cloudinary.config().cname);
      var cdn_subdomain = option_consume(options, 'cdn_subdomain', $.cloudinary.config().cdn_subdomain);
      var secure_cdn_subdomain = option_consume(options, 'secure_cdn_subdomain', $.cloudinary.config().secure_cdn_subdomain);
      var shorten = option_consume(options, 'shorten', $.cloudinary.config().shorten);
      var secure = option_consume(options, 'secure', window.location.protocol == 'https:');
      var protocol = option_consume(options, 'protocol', $.cloudinary.config().protocol);
      var trust_public_id = option_consume(options, 'trust_public_id');
      var url_suffix = option_consume(options, 'url_suffix');
      var use_root_path = option_consume(options, 'use_root_path', $.cloudinary.config().use_root_path);
      if (!private_cdn) {
        if (url_suffix) throw "URL Suffix only supported in private CDN";
        if (use_root_path) throw "Root path only supported in private CDN";
      }

      if (type == 'fetch') {
        public_id = absolutize(public_id);
      }

      if (public_id.search("/") >= 0 && !public_id.match(/^v[0-9]+/) && !public_id.match(/^https?:\//) && !present(version)) {
        version = 1;
      }

      if (public_id.match(/^https?:/)) {
        if (type == "upload" || type == "asset") return public_id;
        public_id = encodeURIComponent(public_id).replace(/%3A/g, ":").replace(/%2F/g, "/");
      } else {
        // Make sure public_id is URI encoded.
        public_id = encodeURIComponent(decodeURIComponent(public_id)).replace(/%3A/g, ":").replace(/%2F/g, "/");
        if (url_suffix) {
          if (url_suffix.match(/[\.\/]/)) throw "url_suffix should not include . or /";
          public_id = public_id + "/" + url_suffix;
        }

        if (format) {
          if (!trust_public_id) public_id = public_id.replace(/\.(jpg|png|gif|webp)$/, '');
          public_id = public_id + "." + format;
        }
      }

      var resource_type_and_type = finalize_resource_type(resource_type, type, url_suffix, use_root_path, shorten);

      var prefix = cloudinary_url_prefix(public_id, cloud_name, private_cdn, cdn_subdomain, secure_cdn_subdomain, cname, secure, secure_distribution, protocol);

      var url = [prefix, resource_type_and_type, transformation, version ? "v" + version : "",
      public_id].join("/").replace(/([^:])\/+/g, '$1/');
      return url;
    }

    function default_stoppoints(width) {
      return 10 * Math.ceil(width / 10);
    }

    function prepare_html_url(public_id, options) {
      if ($.cloudinary.config('dpr') && !options.dpr) {
        options.dpr = $.cloudinary.config('dpr');
      }
      var url = cloudinary_url(public_id, options);
      var width = option_consume(options, 'html_width');
      var height = option_consume(options, 'html_height');
      if (width) options.width = width;
      if (height) options.height = height;
      return url;
    }

    function get_config(name, options, default_value) {
      var value = options[name] || $.cloudinary.config(name);
      if (typeof(value) == 'undefined') value = default_value;
      return value;
    }

    function closest_above(list, value) {
      var i = list.length - 2;
      while (i >= 0 && list[i] >= value) {
        i--;
      }
      return list[i+1];
    }

    var cloudinary_config = null;
    var responsive_config = null;
    var responsive_resize_initialized = false;
    var device_pixel_ratio_cache = {};

    $.cloudinary = {
      CF_SHARED_CDN: CF_SHARED_CDN,
      OLD_AKAMAI_SHARED_CDN: OLD_AKAMAI_SHARED_CDN,
      AKAMAI_SHARED_CDN: AKAMAI_SHARED_CDN,
      SHARED_CDN: SHARED_CDN,
      config: function(new_config, new_value) {
        if (!cloudinary_config) {
          cloudinary_config = {};
          $('meta[name^="cloudinary_"]').each(function() {
            cloudinary_config[$(this).attr('name').replace("cloudinary_", '')] = $(this).attr('content');
          });
        }
        if (typeof(new_value) != 'undefined') {
          cloudinary_config[new_config] = new_value;
        } else if (typeof(new_config) == 'string') {
          return cloudinary_config[new_config];
        } else if (new_config) {
          cloudinary_config = new_config;
        }
        return cloudinary_config;
      },
      url: function(public_id, options) {
        options = $.extend({}, options);
        return cloudinary_url(public_id, options);
      },
      url_internal: cloudinary_url,
      transformation_string: function(options) {
        options = $.extend({}, options);
        return generate_transformation_string(options);
      },
      image: function(public_id, options) {
        options = $.extend({}, options);
        var url = prepare_html_url(public_id, options);
        var img = $('<img/>').data('src-cache', url).attr(options).cloudinary_update(options);
        return img;
      },
      facebook_profile_image: function(public_id, options) {
        return $.cloudinary.image(public_id, $.extend({type: 'facebook'}, options));
      },
      twitter_profile_image: function(public_id, options) {
        return $.cloudinary.image(public_id, $.extend({type: 'twitter'}, options));
      },
      twitter_name_profile_image: function(public_id, options) {
        return $.cloudinary.image(public_id, $.extend({type: 'twitter_name'}, options));
      },
      gravatar_image: function(public_id, options) {
        return $.cloudinary.image(public_id, $.extend({type: 'gravatar'}, options));
      },
      fetch_image: function(public_id, options) {
        return $.cloudinary.image(public_id, $.extend({type: 'fetch'}, options));
      },
      sprite_css: function(public_id, options) {
        options = $.extend({type: 'sprite'}, options);
        if (!public_id.match(/.css$/)) options.format = 'css';
        return $.cloudinary.url(public_id, options);
      },
      /**
      * Turn on hidpi (dpr_auto) and responsive (w_auto) processing according to the current container size and the device pixel ratio.
      * Use the following classes:
      * - cld-hidpi - only set dpr_auto
      * - cld-responsive - update both dpr_auto and w_auto
      * @param: options
      * - responsive_resize - should responsive images be updated on resize (default: true).
      * - responsive_debounce - if set, how many milliseconds after resize is done before the image is replaces (default: 100). Set to 0 to disable.
      * - responsive_use_stoppoints:
      *   - true - always use stoppoints for width
      *   - "resize" - use exact width on first render and stoppoints on resize (default)
      *   - false - always use exact width
      * Stoppoints - to prevent creating a transformation for every pixel, stop-points can be configured. The smallest stop-point that is larger than
      *    the wanted width will be used. The default stoppoints are all the multiples of 10. See calc_stoppoint for ways to override this.
      */
      responsive: function(options) {
        responsive_config = $.extend(responsive_config || {}, options);
        $('img.cld-responsive, img.cld-hidpi').cloudinary_update(responsive_config);
        var responsive_resize = get_config('responsive_resize', responsive_config, true);
        if (responsive_resize && !responsive_resize_initialized) {
          responsive_config.resizing = responsive_resize_initialized = true;
          var timeout = null;
          $(window).on('resize', function() {
            var debounce = get_config('responsive_debounce', responsive_config, 100);
            function reset() {
              if (timeout) {
                clearTimeout(timeout);
                timeout = null;
              }
            }
            function run() {
              $('img.cld-responsive').cloudinary_update(responsive_config);
            }
            function wait() {
              reset();
              setTimeout(function() { reset(); run(); }, debounce);
            }
            if (debounce) {
              wait();
            } else {
              run();
            }
          });
        }
      },
      /**
      * Compute the stoppoint for the given element and width.
      * By default the stoppoint will be the smallest multiple of 10 larger than the width.
      * These can be overridden by either setting the data-stoppoints attribute of an image or using $.cloudinary.config('stoppoints', stoppoints).
      * The value can be either:
      * - an ordered list of the wanted stoppoints
      * - a comma separated ordered list of stoppoints
      * - a function that returns the stoppoint given the wanted width.
      */
      calc_stoppoint: function (element, width) {
        var stoppoints = $(element).data('stoppoints') || $.cloudinary.config().stoppoints || default_stoppoints;
        if (typeof(stoppoints) === 'function') {
          return stoppoints(width);
        }
        if (typeof(stoppoints) === 'string') {
          stoppoints = $.map(stoppoints.split(","), function(val){ return parseInt(val); });
        }
        return closest_above(stoppoints, width);
      },
      device_pixel_ratio: function() {
        var dpr = window.devicePixelRatio || 1;
        var dpr_string = device_pixel_ratio_cache[dpr];
        if (!dpr_string) {
          // Find closest supported DPR (to work correctly with device zoom)
          var dpr_used = closest_above($.cloudinary.supported_dpr_values, dpr);
          dpr_string = dpr_used.toString();
          if (dpr_string.match(/^\d+$/)) dpr_string += ".0";
          device_pixel_ratio_cache[dpr] = dpr_string;
        }
        return dpr_string;
      },
      supported_dpr_values: [0.75, 1.0, 1.3, 1.5, 2.0, 3.0]
    };

    $.fn.cloudinary = function(options) {
      this.filter('img').each(function() {
        var img_options = $.extend({width: $(this).attr('width'), height: $(this).attr('height'),
        src: $(this).attr('src')}, $(this).data(), options);
        var public_id = option_consume(img_options, 'source', option_consume(img_options, 'src'));
        var url = prepare_html_url(public_id, img_options);
        $(this).data('src-cache', url).attr({width: img_options.width, height: img_options.height});
      }).cloudinary_update(options);
      return this;
    };

    /**
    * Update hidpi (dpr_auto) and responsive (w_auto) fields according to the current container size and the device pixel ratio.
    * Only images marked with the cld-responsive class have w_auto updated.
    * options:
    * - responsive_use_stoppoints:
    *   - true - always use stoppoints for width
    *   - "resize" - use exact width on first render and stoppoints on resize (default)
    *   - false - always use exact width
    * - responsive:
    *   - true - enable responsive on this element. Can be done by adding cld-responsive.
    *            Note that $.cloudinary.responsive() should be called once on the page.
    */
    $.fn.cloudinary_update = function(options) {
      options = options || {};
      var responsive_use_stoppoints = get_config('responsive_use_stoppoints', options, "resize");
      var exact = responsive_use_stoppoints === false || (responsive_use_stoppoints == "resize" && !options.resizing);

      this.filter('img').each(function() {
        if (options.responsive) {
          $(this).addClass('cld-responsive');
        }
        var attrs = {};
        var src = $(this).data('src-cache') || $(this).data('src');

        if (!src) return;
        var responsive = $(this).hasClass('cld-responsive') && src.match(/\bw_auto\b/);
        if (responsive) {
          var parents = $(this).parents(),
          parentsLength = parents.length,
          container,
          containerWidth = 0,
          nthParent;

          for (nthParent = 0; nthParent < parentsLength; nthParent+=1) {
            container = parents[nthParent];
            if (container && container.clientWidth) {
              containerWidth = container.clientWidth;
              break;
            }
          }
          if (containerWidth == 0) {
            // container doesn't know the size yet. Usually because the image is hidden or outside the DOM.
            return;
          }

          var requestedWidth = exact ? containerWidth : $.cloudinary.calc_stoppoint(this, containerWidth);
          var currentWidth = $(this).data('width') || 0;
          if (requestedWidth > currentWidth) {
            // requested width is larger, fetch new image
            $(this).data('width', requestedWidth);
          } else {
            // requested width is not larger - keep previous
            requestedWidth = currentWidth;
          }
          src = src.replace(/\bw_auto\b/g, "w_" + requestedWidth);
          attrs.width = null;
          attrs.height = null;
        }
        // Update dpr according to the device's devicePixelRatio
        attrs.src = src.replace(/\bdpr_(1\.0|auto)\b/g, "dpr_" + $.cloudinary.device_pixel_ratio());
        $(this).attr(attrs);
      });
      return this;
    };


    var webp = null;
    $.fn.webpify = function(options, webp_options) {
      var that = this;
      options = options || {};
      webp_options = webp_options || options;
      if (!webp) {
        webp = $.Deferred();
        var webp_canary = new Image();
        webp_canary.onerror = webp.reject;
        webp_canary.onload = webp.resolve;
        webp_canary.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
      }
      $(function() {
        webp.done(function() {
          $(that).cloudinary($.extend({}, webp_options, {format: 'webp'}));
        }).fail(function() {
          $(that).cloudinary(options);
        });
      });
      return this;
    };
    $.fn.fetchify = function(options) {
      return this.cloudinary($.extend(options, {'type': 'fetch'}));
    };
    if (!$.fn.fileupload) {
      return;
    }
    $.cloudinary.delete_by_token = function(delete_token, options) {
      options = options || {};
      var url = options.url;
      if (!url) {
        var cloud_name = options.cloud_name || $.cloudinary.config().cloud_name;
        url = "https://api.cloudinary.com/v1_1/" + cloud_name + "/delete_by_token";
      }
      var dataType = $.support.xhrFileUpload ? "json" : "iframe json";
      return $.ajax({
        url: url,
        method: "POST",
        data: {token: delete_token},
        headers: {"X-Requested-With": "XMLHttpRequest"},
        dataType: dataType
      });
    };

    $.fn.cloudinary_fileupload = function(options) {
      var initializing = !this.data('blueimpFileupload');
      if (initializing) {
        options = $.extend({
          maxFileSize: 20000000,
          dataType: 'json',
          headers: {"X-Requested-With": "XMLHttpRequest"}
        }, options);
      }
      this.fileupload(options);

      if (initializing) {
        this.bind("fileuploaddone", function(e, data) {
          if (data.result.error) return;
          data.result.path = ["v", data.result.version, "/", data.result.public_id,
          data.result.format ? "." + data.result.format : ""].join("");

          if (data.cloudinaryField && data.form.length > 0) {
            var upload_info = [data.result.resource_type, data.result.type, data.result.path].join("/") + "#" + data.result.signature;
            var multiple = $(e.target).prop("multiple");
            var add_field = function() {
              $('<input></input>').attr({type: "hidden", name: data.cloudinaryField}).val(upload_info).appendTo(data.form);
            };

            if (multiple) {
              add_field();
            } else {
              var field = $(data.form).find('input[name="' + data.cloudinaryField + '"]');
              if (field.length > 0) {
                field.val(upload_info);
              } else {
                add_field();
              }
            }
          }
          $(e.target).trigger('cloudinarydone', data);
        });

        this.bind("fileuploadstart", function(e){
          $(e.target).trigger('cloudinarystart');
        });
        this.bind("fileuploadstop", function(e){
          $(e.target).trigger('cloudinarystop');
        });
        this.bind("fileuploadprogress", function(e,data){
          $(e.target).trigger('cloudinaryprogress',data);
        });
        this.bind("fileuploadprogressall", function(e,data){
          $(e.target).trigger('cloudinaryprogressall',data);
        });
        this.bind("fileuploadfail", function(e,data){
          $(e.target).trigger('cloudinaryfail',data);
        });
        this.bind("fileuploadalways", function(e,data){
          $(e.target).trigger('cloudinaryalways',data);
        });

        if (!this.fileupload('option').url) {
          var cloud_name = options.cloud_name || $.cloudinary.config().cloud_name;
          var upload_url = "https://api.cloudinary.com/v1_1/" + cloud_name + "/upload";
          this.fileupload('option', 'url', upload_url);
        }
      }
      return this;
    };

    $.fn.cloudinary_upload_url = function(remote_url) {
      this.fileupload('option', 'formData').file = remote_url;
      this.fileupload('add', { files: [ remote_url ] });
      delete(this.fileupload('option', 'formData').file);
    };

    $.fn.unsigned_cloudinary_upload = function(upload_preset, upload_params, options) {
      options = options || {};
      upload_params = $.extend({}, upload_params) || {};

      if (upload_params.cloud_name) {
        options.cloud_name = upload_params.cloud_name;
        delete upload_params.cloud_name;
      }

      // Serialize upload_params
      for (var key in upload_params) {
        var value = upload_params[key];
        if ($.isPlainObject(value)) {
          upload_params[key] = $.map(value, function(v, k){return k + "=" + v;}).join("|");
        } else if ($.isArray(value)) {
          if (value.length > 0 && $.isArray(value[0])) {
            upload_params[key] = $.map(value, function(array_value){return array_value.join(",");}).join("|");
          } else {
            upload_params[key] = value.join(",");
          }
        }
      }
      if (!upload_params.callback) {
        upload_params.callback = "/cloudinary_cors.html";
      }
      upload_params.upload_preset = upload_preset;

      options.formData = upload_params;

      if (options.cloudinary_field) {
        options.cloudinaryField = options.cloudinary_field;
        delete options.cloudinary_field;
      }

      var html_options = options.html || {};
      html_options["class"] = "cloudinary_fileupload " + (html_options["class"] || "");
      if (options.multiple) html_options.multiple = true;
      this.attr(html_options).cloudinary_fileupload(options);
      return this;
    };

    $.cloudinary.unsigned_upload_tag = function(upload_preset, upload_params, options) {
      return $('<input/>').attr({type: "file", name: "file"}).unsigned_cloudinary_upload(upload_preset, upload_params, options);
    };
  }));

/*
 AngularJS v1.2.28
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(W,X,u){'use strict';function z(b){return function(){var a=arguments[0],c,a="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.2.28/"+(b?b+"/":"")+a;for(c=1;c<arguments.length;c++)a=a+(1==c?"?":"&")+"p"+(c-1)+"="+encodeURIComponent("function"==typeof arguments[c]?arguments[c].toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof arguments[c]?"undefined":"string"!=typeof arguments[c]?JSON.stringify(arguments[c]):arguments[c]);return Error(a)}}function Sa(b){if(null==b||Ja(b))return!1;
var a=b.length;return 1===b.nodeType&&a?!0:G(b)||L(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function r(b,a,c){var d;if(b)if(N(b))for(d in b)"prototype"==d||("length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d))||a.call(c,b[d],d);else if(L(b)||Sa(b))for(d=0;d<b.length;d++)a.call(c,b[d],d);else if(b.forEach&&b.forEach!==r)b.forEach(a,c);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d);return b}function Xb(b){var a=[],c;for(c in b)b.hasOwnProperty(c)&&a.push(c);return a.sort()}function Sc(b,
a,c){for(var d=Xb(b),e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function Yb(b){return function(a,c){b(c,a)}}function ib(){for(var b=na.length,a;b;){b--;a=na[b].charCodeAt(0);if(57==a)return na[b]="A",na.join("");if(90==a)na[b]="0";else return na[b]=String.fromCharCode(a+1),na.join("")}na.unshift("0");return na.join("")}function Zb(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function E(b){var a=b.$$hashKey;r(arguments,function(a){a!==b&&r(a,function(a,c){b[c]=a})});Zb(b,a);return b}function U(b){return parseInt(b,
10)}function $b(b,a){return E(new (E(function(){},{prototype:b})),a)}function v(){}function ga(b){return b}function aa(b){return function(){return b}}function F(b){return"undefined"===typeof b}function D(b){return"undefined"!==typeof b}function T(b){return null!=b&&"object"===typeof b}function G(b){return"string"===typeof b}function jb(b){return"number"===typeof b}function va(b){return"[object Date]"===Ba.call(b)}function N(b){return"function"===typeof b}function kb(b){return"[object RegExp]"===Ba.call(b)}
function Ja(b){return b&&b.document&&b.location&&b.alert&&b.setInterval}function Tc(b){return!(!b||!(b.nodeName||b.prop&&b.attr&&b.find))}function Uc(b,a,c){var d=[];r(b,function(b,f,g){d.push(a.call(c,b,f,g))});return d}function Ta(b,a){if(b.indexOf)return b.indexOf(a);for(var c=0;c<b.length;c++)if(a===b[c])return c;return-1}function Ua(b,a){var c=Ta(b,a);0<=c&&b.splice(c,1);return a}function Ka(b,a,c,d){if(Ja(b)||b&&b.$evalAsync&&b.$watch)throw Va("cpws");if(a){if(b===a)throw Va("cpi");c=c||[];
d=d||[];if(T(b)){var e=Ta(c,b);if(-1!==e)return d[e];c.push(b);d.push(a)}if(L(b))for(var f=a.length=0;f<b.length;f++)e=Ka(b[f],null,c,d),T(b[f])&&(c.push(b[f]),d.push(e)),a.push(e);else{var g=a.$$hashKey;L(a)?a.length=0:r(a,function(b,c){delete a[c]});for(f in b)e=Ka(b[f],null,c,d),T(b[f])&&(c.push(b[f]),d.push(e)),a[f]=e;Zb(a,g)}}else if(a=b)L(b)?a=Ka(b,[],c,d):va(b)?a=new Date(b.getTime()):kb(b)?(a=RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=b.lastIndex):T(b)&&(a=Ka(b,{},c,d));
return a}function ha(b,a){if(L(b)){a=a||[];for(var c=0;c<b.length;c++)a[c]=b[c]}else if(T(b))for(c in a=a||{},b)!lb.call(b,c)||"$"===c.charAt(0)&&"$"===c.charAt(1)||(a[c]=b[c]);return a||b}function Ca(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(L(b)){if(!L(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!Ca(b[d],a[d]))return!1;return!0}}else{if(va(b))return va(a)?isNaN(b.getTime())&&isNaN(a.getTime())||b.getTime()===
a.getTime():!1;if(kb(b)&&kb(a))return b.toString()==a.toString();if(b&&b.$evalAsync&&b.$watch||a&&a.$evalAsync&&a.$watch||Ja(b)||Ja(a)||L(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!N(b[d])){if(!Ca(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==u&&!N(a[d]))return!1;return!0}return!1}function Bb(b,a){var c=2<arguments.length?wa.call(arguments,2):[];return!N(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,c.concat(wa.call(arguments,
0))):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Vc(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)?c=u:Ja(a)?c="$WINDOW":a&&X===a?c="$DOCUMENT":a&&(a.$evalAsync&&a.$watch)&&(c="$SCOPE");return c}function oa(b,a){return"undefined"===typeof b?u:JSON.stringify(b,Vc,a?"  ":null)}function ac(b){return G(b)?JSON.parse(b):b}function Wa(b){"function"===typeof b?b=!0:b&&0!==b.length?(b=x(""+b),b=!("f"==b||"0"==b||"false"==b||"no"==b||"n"==b||"[]"==b)):b=!1;
return b}function ia(b){b=A(b).clone();try{b.empty()}catch(a){}var c=A("<div>").append(b).html();try{return 3===b[0].nodeType?x(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+x(b)})}catch(d){return x(c)}}function bc(b){try{return decodeURIComponent(b)}catch(a){}}function cc(b){var a={},c,d;r((b||"").split("&"),function(b){b&&(c=b.replace(/\+/g,"%20").split("="),d=bc(c[0]),D(d)&&(b=D(c[1])?bc(c[1]):!0,lb.call(a,d)?L(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Cb(b){var a=
[];r(b,function(b,d){L(b)?r(b,function(b){a.push(Da(d,!0)+(!0===b?"":"="+Da(b,!0)))}):a.push(Da(d,!0)+(!0===b?"":"="+Da(b,!0)))});return a.length?a.join("&"):""}function mb(b){return Da(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Da(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,a?"%20":"+")}function Wc(b,a){function c(a){a&&d.push(a)}var d=[b],e,f,g=["ng:app","ng-app","x-ng-app",
"data-ng-app"],h=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;r(g,function(a){g[a]=!0;c(X.getElementById(a));a=a.replace(":","\\:");b.querySelectorAll&&(r(b.querySelectorAll("."+a),c),r(b.querySelectorAll("."+a+"\\:"),c),r(b.querySelectorAll("["+a+"]"),c))});r(d,function(a){if(!e){var b=h.exec(" "+a.className+" ");b?(e=a,f=(b[2]||"").replace(/\s+/g,",")):r(a.attributes,function(b){!e&&g[b.name]&&(e=a,f=b.value)})}});e&&a(e,f?[f]:[])}function dc(b,a){var c=function(){b=A(b);if(b.injector()){var c=b[0]===X?
"document":ia(b);throw Va("btstrpd",c.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);a.unshift("ng");c=ec(a);c.invoke(["$rootScope","$rootElement","$compile","$injector","$animate",function(a,b,c,d,e){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},d=/^NG_DEFER_BOOTSTRAP!/;if(W&&!d.test(W.name))return c();W.name=W.name.replace(d,"");Xa.resumeBootstrap=function(b){r(b,function(b){a.push(b)});c()}}function nb(b,a){a=
a||"_";return b.replace(Xc,function(b,d){return(d?a:"")+b.toLowerCase()})}function Db(b,a,c){if(!b)throw Va("areq",a||"?",c||"required");return b}function Ya(b,a,c){c&&L(b)&&(b=b[b.length-1]);Db(N(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function Ea(b,a){if("hasOwnProperty"===b)throw Va("badname",a);}function fc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&N(b)?Bb(e,b):b}function Eb(b){var a=
b[0];b=b[b.length-1];if(a===b)return A(a);var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return A(c)}function Yc(b){var a=z("$injector"),c=z("ng");b=b.angular||(b.angular={});b.$$minErr=b.$$minErr||z;return b.module||(b.module=function(){var b={};return function(e,f,g){if("hasOwnProperty"===e)throw c("badname","module");f&&b.hasOwnProperty(e)&&(b[e]=null);return b[e]||(b[e]=function(){function b(a,d,e){return function(){c[e||"push"]([a,d,arguments]);return n}}if(!f)throw a("nomod",
e);var c=[],d=[],l=b("$injector","invoke"),n={_invokeQueue:c,_runBlocks:d,requires:f,name:e,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:b("$provide","value"),constant:b("$provide","constant","unshift"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),config:l,run:function(a){d.push(a);return this}};g&&l(g);return n}())}}())}
function Zc(b){E(b,{bootstrap:dc,copy:Ka,extend:E,equals:Ca,element:A,forEach:r,injector:ec,noop:v,bind:Bb,toJson:oa,fromJson:ac,identity:ga,isUndefined:F,isDefined:D,isString:G,isFunction:N,isObject:T,isNumber:jb,isElement:Tc,isArray:L,version:$c,isDate:va,lowercase:x,uppercase:La,callbacks:{counter:0},$$minErr:z,$$csp:Za});$a=Yc(W);try{$a("ngLocale")}catch(a){$a("ngLocale",[]).provider("$locale",ad)}$a("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:bd});a.provider("$compile",
gc).directive({a:cd,input:hc,textarea:hc,form:dd,script:ed,select:fd,style:gd,option:hd,ngBind:id,ngBindHtml:jd,ngBindTemplate:kd,ngClass:ld,ngClassEven:md,ngClassOdd:nd,ngCloak:od,ngController:pd,ngForm:qd,ngHide:rd,ngIf:sd,ngInclude:td,ngInit:ud,ngNonBindable:vd,ngPluralize:wd,ngRepeat:xd,ngShow:yd,ngStyle:zd,ngSwitch:Ad,ngSwitchWhen:Bd,ngSwitchDefault:Cd,ngOptions:Dd,ngTransclude:Ed,ngModel:Fd,ngList:Gd,ngChange:Hd,required:ic,ngRequired:ic,ngValue:Id}).directive({ngInclude:Jd}).directive(Fb).directive(jc);
a.provider({$anchorScroll:Kd,$animate:Ld,$browser:Md,$cacheFactory:Nd,$controller:Od,$document:Pd,$exceptionHandler:Qd,$filter:kc,$interpolate:Rd,$interval:Sd,$http:Td,$httpBackend:Ud,$location:Vd,$log:Wd,$parse:Xd,$rootScope:Yd,$q:Zd,$sce:$d,$sceDelegate:ae,$sniffer:be,$templateCache:ce,$timeout:de,$window:ee,$$rAF:fe,$$asyncCallback:ge})}])}function ab(b){return b.replace(he,function(a,b,d,e){return e?d.toUpperCase():d}).replace(ie,"Moz$1")}function Gb(b,a,c,d){function e(b){var e=c&&b?[this.filter(b)]:
[this],k=a,m,l,n,q,p,s;if(!d||null!=b)for(;e.length;)for(m=e.shift(),l=0,n=m.length;l<n;l++)for(q=A(m[l]),k?q.triggerHandler("$destroy"):k=!k,p=0,q=(s=q.children()).length;p<q;p++)e.push(Fa(s[p]));return f.apply(this,arguments)}var f=Fa.fn[b],f=f.$original||f;e.$original=f;Fa.fn[b]=e}function S(b){if(b instanceof S)return b;G(b)&&(b=$(b));if(!(this instanceof S)){if(G(b)&&"<"!=b.charAt(0))throw Hb("nosel");return new S(b)}if(G(b)){var a=b;b=X;var c;if(c=je.exec(a))b=[b.createElement(c[1])];else{var d=
b,e;b=d.createDocumentFragment();c=[];if(Ib.test(a)){d=b.appendChild(d.createElement("div"));e=(ke.exec(a)||["",""])[1].toLowerCase();e=da[e]||da._default;d.innerHTML="<div>&#160;</div>"+e[1]+a.replace(le,"<$1></$2>")+e[2];d.removeChild(d.firstChild);for(a=e[0];a--;)d=d.lastChild;a=0;for(e=d.childNodes.length;a<e;++a)c.push(d.childNodes[a]);d=b.firstChild;d.textContent=""}else c.push(d.createTextNode(a));b.textContent="";b.innerHTML="";b=c}Jb(this,b);A(X.createDocumentFragment()).append(this)}else Jb(this,
b)}function Kb(b){return b.cloneNode(!0)}function Ma(b){Lb(b);var a=0;for(b=b.childNodes||[];a<b.length;a++)Ma(b[a])}function lc(b,a,c,d){if(D(d))throw Hb("offargs");var e=pa(b,"events");pa(b,"handle")&&(F(a)?r(e,function(a,c){bb(b,c,a);delete e[c]}):r(a.split(" "),function(a){F(c)?(bb(b,a,e[a]),delete e[a]):Ua(e[a]||[],c)}))}function Lb(b,a){var c=b.ng339,d=cb[c];d&&(a?delete cb[c].data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),lc(b)),delete cb[c],b.ng339=u))}function pa(b,a,c){var d=
b.ng339,d=cb[d||-1];if(D(c))d||(b.ng339=d=++me,d=cb[d]={}),d[a]=c;else return d&&d[a]}function Mb(b,a,c){var d=pa(b,"data"),e=D(c),f=!e&&D(a),g=f&&!T(a);d||g||pa(b,"data",d={});if(e)d[a]=c;else if(f){if(g)return d&&d[a];E(d,a)}else return d}function Nb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function ob(b,a){a&&b.setAttribute&&r(a.split(" "),function(a){b.setAttribute("class",$((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g,
" ").replace(" "+$(a)+" "," ")))})}function pb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");r(a.split(" "),function(a){a=$(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",$(c))}}function Jb(b,a){if(a){a=a.nodeName||!D(a.length)||Ja(a)?[a]:a;for(var c=0;c<a.length;c++)b.push(a[c])}}function mc(b,a){return qb(b,"$"+(a||"ngController")+"Controller")}function qb(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=L(a)?a:[a];b;){for(var d=
0,e=a.length;d<e;d++)if((c=A.data(b,a[d]))!==u)return c;b=b.parentNode||11===b.nodeType&&b.host}}function nc(b){for(var a=0,c=b.childNodes;a<c.length;a++)Ma(c[a]);for(;b.firstChild;)b.removeChild(b.firstChild)}function oc(b,a){var c=rb[a.toLowerCase()];return c&&pc[b.nodeName]&&c}function ne(b,a){var c=function(c,e){c.preventDefault||(c.preventDefault=function(){c.returnValue=!1});c.stopPropagation||(c.stopPropagation=function(){c.cancelBubble=!0});c.target||(c.target=c.srcElement||X);if(F(c.defaultPrevented)){var f=
c.preventDefault;c.preventDefault=function(){c.defaultPrevented=!0;f.call(c)};c.defaultPrevented=!1}c.isDefaultPrevented=function(){return c.defaultPrevented||!1===c.returnValue};var g=ha(a[e||c.type]||[]);r(g,function(a){a.call(b,c)});8>=R?(c.preventDefault=null,c.stopPropagation=null,c.isDefaultPrevented=null):(delete c.preventDefault,delete c.stopPropagation,delete c.isDefaultPrevented)};c.elem=b;return c}function Na(b,a){var c=typeof b,d;"function"==c||"object"==c&&null!==b?"function"==typeof(d=
b.$$hashKey)?d=b.$$hashKey():d===u&&(d=b.$$hashKey=(a||ib)()):d=b;return c+":"+d}function db(b,a){if(a){var c=0;this.nextUid=function(){return++c}}r(b,this.put,this)}function qc(b){var a,c;"function"===typeof b?(a=b.$inject)||(a=[],b.length&&(c=b.toString().replace(oe,""),c=c.match(pe),r(c[1].split(qe),function(b){b.replace(re,function(b,c,d){a.push(d)})})),b.$inject=a):L(b)?(c=b.length-1,Ya(b[c],"fn"),a=b.slice(0,c)):Ya(b,"fn",!0);return a}function ec(b){function a(a){return function(b,c){if(T(b))r(b,
Yb(a));else return a(b,c)}}function c(a,b){Ea(a,"service");if(N(b)||L(b))b=n.instantiate(b);if(!b.$get)throw eb("pget",a);return l[a+h]=b}function d(a,b){return c(a,{$get:b})}function e(a){var b=[],c,d,f,h;r(a,function(a){if(!m.get(a)){m.put(a,!0);try{if(G(a))for(c=$a(a),b=b.concat(e(c.requires)).concat(c._runBlocks),d=c._invokeQueue,f=0,h=d.length;f<h;f++){var g=d[f],k=n.get(g[0]);k[g[1]].apply(k,g[2])}else N(a)?b.push(n.invoke(a)):L(a)?b.push(n.invoke(a)):Ya(a,"module")}catch(p){throw L(a)&&(a=
a[a.length-1]),p.message&&(p.stack&&-1==p.stack.indexOf(p.message))&&(p=p.message+"\n"+p.stack),eb("modulerr",a,p.stack||p.message||p);}}});return b}function f(a,b){function c(d){if(a.hasOwnProperty(d)){if(a[d]===g)throw eb("cdep",d+" <- "+k.join(" <- "));return a[d]}try{return k.unshift(d),a[d]=g,a[d]=b(d)}catch(e){throw a[d]===g&&delete a[d],e;}finally{k.shift()}}function d(a,b,e){var f=[],h=qc(a),g,k,p;k=0;for(g=h.length;k<g;k++){p=h[k];if("string"!==typeof p)throw eb("itkn",p);f.push(e&&e.hasOwnProperty(p)?
e[p]:c(p))}L(a)&&(a=a[g]);return a.apply(b,f)}return{invoke:d,instantiate:function(a,b){var c=function(){},e;c.prototype=(L(a)?a[a.length-1]:a).prototype;c=new c;e=d(a,c,b);return T(e)||N(e)?e:c},get:c,annotate:qc,has:function(b){return l.hasOwnProperty(b+h)||a.hasOwnProperty(b)}}}var g={},h="Provider",k=[],m=new db([],!0),l={$provide:{provider:a(c),factory:a(d),service:a(function(a,b){return d(a,["$injector",function(a){return a.instantiate(b)}])}),value:a(function(a,b){return d(a,aa(b))}),constant:a(function(a,
b){Ea(a,"constant");l[a]=b;q[a]=b}),decorator:function(a,b){var c=n.get(a+h),d=c.$get;c.$get=function(){var a=p.invoke(d,c);return p.invoke(b,null,{$delegate:a})}}}},n=l.$injector=f(l,function(){throw eb("unpr",k.join(" <- "));}),q={},p=q.$injector=f(q,function(a){a=n.get(a+h);return p.invoke(a.$get,a)});r(e(b),function(a){p.invoke(a||v)});return p}function Kd(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;
r(a,function(a){b||"a"!==x(a.nodeName)||(b=a)});return b}function f(){var b=c.hash(),d;b?(d=g.getElementById(b))?d.scrollIntoView():(d=e(g.getElementsByName(b)))?d.scrollIntoView():"top"===b&&a.scrollTo(0,0):a.scrollTo(0,0)}var g=a.document;b&&d.$watch(function(){return c.hash()},function(){d.$evalAsync(f)});return f}]}function ge(){this.$get=["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:function(b){return a(b,0,!1)}}]}function se(b,a,c,d){function e(a){try{a.apply(null,
wa.call(arguments,1))}finally{if(s--,0===s)for(;J.length;)try{J.pop()()}catch(b){c.error(b)}}}function f(a,b){(function ea(){r(w,function(a){a()});t=b(ea,a)})()}function g(){y!=h.url()&&(y=h.url(),r(ba,function(a){a(h.url())}))}var h=this,k=a[0],m=b.location,l=b.history,n=b.setTimeout,q=b.clearTimeout,p={};h.isMock=!1;var s=0,J=[];h.$$completeOutstandingRequest=e;h.$$incOutstandingRequestCount=function(){s++};h.notifyWhenNoOutstandingRequests=function(a){r(w,function(a){a()});0===s?a():J.push(a)};
var w=[],t;h.addPollFn=function(a){F(t)&&f(100,n);w.push(a);return a};var y=m.href,K=a.find("base"),B=null;h.url=function(a,c){m!==b.location&&(m=b.location);l!==b.history&&(l=b.history);if(a){if(y!=a){var e=y&&Ga(y)===Ga(a);y=a;!e&&d.history?c?l.replaceState(null,"",a):(l.pushState(null,"",a),K.attr("href",K.attr("href"))):(e||(B=a),c?m.replace(a):m.href=a);return h}}else return B||m.href.replace(/%27/g,"'")};var ba=[],O=!1;h.onUrlChange=function(a){if(!O){if(d.history)A(b).on("popstate",g);if(d.hashchange)A(b).on("hashchange",
g);else h.addPollFn(g);O=!0}ba.push(a);return a};h.$$checkUrlChange=g;h.baseHref=function(){var a=K.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var M={},ca="",P=h.baseHref();h.cookies=function(a,b){var d,e,f,h;if(a)b===u?k.cookie=escape(a)+"=;path="+P+";expires=Thu, 01 Jan 1970 00:00:00 GMT":G(b)&&(d=(k.cookie=escape(a)+"="+escape(b)+";path="+P).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(k.cookie!==
ca)for(ca=k.cookie,d=ca.split("; "),M={},f=0;f<d.length;f++)e=d[f],h=e.indexOf("="),0<h&&(a=unescape(e.substring(0,h)),M[a]===u&&(M[a]=unescape(e.substring(h+1))));return M}};h.defer=function(a,b){var c;s++;c=n(function(){delete p[c];e(a)},b||0);p[c]=!0;return c};h.defer.cancel=function(a){return p[a]?(delete p[a],q(a),e(v),!0):!1}}function Md(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new se(b,d,a,c)}]}function Nd(){this.$get=function(){function b(b,d){function e(a){a!=
n&&(q?q==a&&(q=a.n):q=a,f(a.n,a.p),f(a,n),n=a,n.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw z("$cacheFactory")("iid",b);var g=0,h=E({},d,{id:b}),k={},m=d&&d.capacity||Number.MAX_VALUE,l={},n=null,q=null;return a[b]={put:function(a,b){if(m<Number.MAX_VALUE){var c=l[a]||(l[a]={key:a});e(c)}if(!F(b))return a in k||g++,k[a]=b,g>m&&this.remove(q.key),b},get:function(a){if(m<Number.MAX_VALUE){var b=l[a];if(!b)return;e(b)}return k[a]},remove:function(a){if(m<Number.MAX_VALUE){var b=
l[a];if(!b)return;b==n&&(n=b.p);b==q&&(q=b.n);f(b.n,b.p);delete l[a]}delete k[a];g--},removeAll:function(){k={};g=0;l={};n=q=null},destroy:function(){l=h=k=null;delete a[b]},info:function(){return E({},h,{size:g})}}}var a={};b.info=function(){var b={};r(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function ce(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function gc(b,a){var c={},d="Directive",e=/^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/,f=/(([\d\w_\-]+)(?:\:([^;]+))?;?)/,
g=/^(on[a-z]+|formaction)$/;this.directive=function k(a,e){Ea(a,"directive");G(a)?(Db(e,"directiveFactory"),c.hasOwnProperty(a)||(c[a]=[],b.factory(a+d,["$injector","$exceptionHandler",function(b,d){var e=[];r(c[a],function(c,f){try{var g=b.invoke(c);N(g)?g={compile:aa(g)}:!g.compile&&g.link&&(g.compile=aa(g.link));g.priority=g.priority||0;g.index=f;g.name=g.name||a;g.require=g.require||g.controller&&g.name;g.restrict=g.restrict||"A";e.push(g)}catch(k){d(k)}});return e}])),c[a].push(e)):r(a,Yb(k));
return this};this.aHrefSanitizationWhitelist=function(b){return D(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return D(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};this.$get=["$injector","$interpolate","$exceptionHandler","$http","$templateCache","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,l,n,q,p,s,J,w,t,y,K){function B(a,b,c,d,e){a instanceof
A||(a=A(a));r(a,function(b,c){3==b.nodeType&&b.nodeValue.match(/\S+/)&&(a[c]=A(b).wrap("<span></span>").parent()[0])});var f=O(a,b,a,c,d,e);ba(a,"ng-scope");return function(b,c,d,e){Db(b,"scope");var g=c?Oa.clone.call(a):a;r(d,function(a,b){g.data("$"+b+"Controller",a)});d=0;for(var k=g.length;d<k;d++){var p=g[d].nodeType;1!==p&&9!==p||g.eq(d).data("$scope",b)}c&&c(g,b);f&&f(b,g,g,e);return g}}function ba(a,b){try{a.addClass(b)}catch(c){}}function O(a,b,c,d,e,f){function g(a,c,d,e){var f,p,l,m,q,
n,w;f=c.length;var s=Array(f);for(m=0;m<f;m++)s[m]=c[m];n=m=0;for(q=k.length;m<q;n++)p=s[n],c=k[m++],f=k[m++],c?(c.scope?(l=a.$new(),A.data(p,"$scope",l)):l=a,w=c.transcludeOnThisElement?M(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?M(a,b):null,c(f,l,p,d,w)):f&&f(a,p.childNodes,u,e)}for(var k=[],p,l,m,q,n=0;n<a.length;n++)p=new Ob,l=ca(a[n],[],p,0===n?d:u,e),(f=l.length?I(l,a[n],p,b,c,null,[],[],f):null)&&f.scope&&ba(p.$$element,"ng-scope"),p=f&&f.terminal||!(m=a[n].childNodes)||!m.length?
null:O(m,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b),k.push(f,p),q=q||f||p,f=null;return q?g:null}function M(a,b,c){return function(d,e,f){var g=!1;d||(d=a.$new(),g=d.$$transcluded=!0);e=b(d,e,f,c);if(g)e.on("$destroy",function(){d.$destroy()});return e}}function ca(a,b,c,d,g){var k=c.$attr,p;switch(a.nodeType){case 1:ea(b,qa(Pa(a).toLowerCase()),"E",d,g);for(var l,m,q,n=a.attributes,w=0,s=n&&n.length;w<s;w++){var t=!1,J=!1;l=n[w];if(!R||8<=R||l.specified){p=l.name;m=
$(l.value);l=qa(p);if(q=U.test(l))p=nb(l.substr(6),"-");var y=l.replace(/(Start|End)$/,"");l===y+"Start"&&(t=p,J=p.substr(0,p.length-5)+"end",p=p.substr(0,p.length-6));l=qa(p.toLowerCase());k[l]=p;if(q||!c.hasOwnProperty(l))c[l]=m,oc(a,l)&&(c[l]=!0);S(a,b,m,l);ea(b,l,"A",d,g,t,J)}}a=a.className;if(G(a)&&""!==a)for(;p=f.exec(a);)l=qa(p[2]),ea(b,l,"C",d,g)&&(c[l]=$(p[3])),a=a.substr(p.index+p[0].length);break;case 3:x(b,a.nodeValue);break;case 8:try{if(p=e.exec(a.nodeValue))l=qa(p[1]),ea(b,l,"M",d,
g)&&(c[l]=$(p[2]))}catch(B){}}b.sort(F);return b}function P(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ja("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return A(d)}function C(a,b,c){return function(d,e,f,g,k){e=P(e[0],b,c);return a(d,e,f,g,k)}}function I(a,c,d,e,f,g,k,q,n){function w(a,b,c,d){if(a){c&&(a=C(a,c,d));a.require=H.require;a.directiveName=z;if(K===H||H.$$isolateScope)a=rc(a,
{isolateScope:!0});k.push(a)}if(b){c&&(b=C(b,c,d));b.require=H.require;b.directiveName=z;if(K===H||H.$$isolateScope)b=rc(b,{isolateScope:!0});q.push(b)}}function t(a,b,c,d){var e,f="data",g=!1;if(G(b)){for(;"^"==(e=b.charAt(0))||"?"==e;)b=b.substr(1),"^"==e&&(f="inheritedData"),g=g||"?"==e;e=null;d&&"data"===f&&(e=d[b]);e=e||c[f]("$"+b+"Controller");if(!e&&!g)throw ja("ctreq",b,a);}else L(b)&&(e=[],r(b,function(b){e.push(t(a,b,c,d))}));return e}function J(a,e,f,g,n){function w(a,b){var c;2>arguments.length&&
(b=a,a=u);Ia&&(c=ca);return n(a,b,c)}var y,Q,B,M,C,P,ca={},ra;y=c===f?d:ha(d,new Ob(A(f),d.$attr));Q=y.$$element;if(K){var ue=/^\s*([@=&])(\??)\s*(\w*)\s*$/;P=e.$new(!0);!I||I!==K&&I!==K.$$originalDirective?Q.data("$isolateScopeNoTemplate",P):Q.data("$isolateScope",P);ba(Q,"ng-isolate-scope");r(K.scope,function(a,c){var d=a.match(ue)||[],f=d[3]||c,g="?"==d[2],d=d[1],k,l,n,q;P.$$isolateBindings[c]=d+f;switch(d){case "@":y.$observe(f,function(a){P[c]=a});y.$$observers[f].$$scope=e;y[f]&&(P[c]=b(y[f])(e));
break;case "=":if(g&&!y[f])break;l=p(y[f]);q=l.literal?Ca:function(a,b){return a===b||a!==a&&b!==b};n=l.assign||function(){k=P[c]=l(e);throw ja("nonassign",y[f],K.name);};k=P[c]=l(e);P.$watch(function(){var a=l(e);q(a,P[c])||(q(a,k)?n(e,a=P[c]):P[c]=a);return k=a},null,l.literal);break;case "&":l=p(y[f]);P[c]=function(a){return l(e,a)};break;default:throw ja("iscp",K.name,c,a);}})}ra=n&&w;O&&r(O,function(a){var b={$scope:a===K||a.$$isolateScope?P:e,$element:Q,$attrs:y,$transclude:ra},c;C=a.controller;
"@"==C&&(C=y[a.name]);c=s(C,b);ca[a.name]=c;Ia||Q.data("$"+a.name+"Controller",c);a.controllerAs&&(b.$scope[a.controllerAs]=c)});g=0;for(B=k.length;g<B;g++)try{M=k[g],M(M.isolateScope?P:e,Q,y,M.require&&t(M.directiveName,M.require,Q,ca),ra)}catch(H){l(H,ia(Q))}g=e;K&&(K.template||null===K.templateUrl)&&(g=P);a&&a(g,f.childNodes,u,n);for(g=q.length-1;0<=g;g--)try{M=q[g],M(M.isolateScope?P:e,Q,y,M.require&&t(M.directiveName,M.require,Q,ca),ra)}catch(D){l(D,ia(Q))}}n=n||{};for(var y=-Number.MAX_VALUE,
M,O=n.controllerDirectives,K=n.newIsolateScopeDirective,I=n.templateDirective,ea=n.nonTlbTranscludeDirective,F=!1,E=!1,Ia=n.hasElementTranscludeDirective,x=d.$$element=A(c),H,z,V,S=e,R,Ha=0,sa=a.length;Ha<sa;Ha++){H=a[Ha];var U=H.$$start,Y=H.$$end;U&&(x=P(c,U,Y));V=u;if(y>H.priority)break;if(V=H.scope)M=M||H,H.templateUrl||(fb("new/isolated scope",K,H,x),T(V)&&(K=H));z=H.name;!H.templateUrl&&H.controller&&(V=H.controller,O=O||{},fb("'"+z+"' controller",O[z],H,x),O[z]=H);if(V=H.transclude)F=!0,H.$$tlb||
(fb("transclusion",ea,H,x),ea=H),"element"==V?(Ia=!0,y=H.priority,V=x,x=d.$$element=A(X.createComment(" "+z+": "+d[z]+" ")),c=x[0],ra(f,wa.call(V,0),c),S=B(V,e,y,g&&g.name,{nonTlbTranscludeDirective:ea})):(V=A(Kb(c)).contents(),x.empty(),S=B(V,e));if(H.template)if(E=!0,fb("template",I,H,x),I=H,V=N(H.template)?H.template(x,d):H.template,V=W(V),H.replace){g=H;V=Ib.test(V)?A($(V)):[];c=V[0];if(1!=V.length||1!==c.nodeType)throw ja("tplrt",z,"");ra(f,x,c);sa={$attr:{}};V=ca(c,[],sa);var Z=a.splice(Ha+
1,a.length-(Ha+1));K&&D(V);a=a.concat(V).concat(Z);v(d,sa);sa=a.length}else x.html(V);if(H.templateUrl)E=!0,fb("template",I,H,x),I=H,H.replace&&(g=H),J=te(a.splice(Ha,a.length-Ha),x,d,f,F&&S,k,q,{controllerDirectives:O,newIsolateScopeDirective:K,templateDirective:I,nonTlbTranscludeDirective:ea}),sa=a.length;else if(H.compile)try{R=H.compile(x,d,S),N(R)?w(null,R,U,Y):R&&w(R.pre,R.post,U,Y)}catch(ve){l(ve,ia(x))}H.terminal&&(J.terminal=!0,y=Math.max(y,H.priority))}J.scope=M&&!0===M.scope;J.transcludeOnThisElement=
F;J.templateOnThisElement=E;J.transclude=S;n.hasElementTranscludeDirective=Ia;return J}function D(a){for(var b=0,c=a.length;b<c;b++)a[b]=$b(a[b],{$$isolateScope:!0})}function ea(b,e,f,g,p,m,n){if(e===p)return null;p=null;if(c.hasOwnProperty(e)){var q;e=a.get(e+d);for(var w=0,s=e.length;w<s;w++)try{q=e[w],(g===u||g>q.priority)&&-1!=q.restrict.indexOf(f)&&(m&&(q=$b(q,{$$start:m,$$end:n})),b.push(q),p=q)}catch(y){l(y)}}return p}function v(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;r(a,function(d,e){"$"!=
e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});r(b,function(b,f){"class"==f?(ba(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function te(a,b,c,d,e,f,g,k){var p=[],l,m,w=b[0],s=a.shift(),y=E({},s,{templateUrl:null,transclude:null,replace:null,$$originalDirective:s}),J=N(s.templateUrl)?s.templateUrl(b,c):s.templateUrl;
b.empty();n.get(t.getTrustedResourceUrl(J),{cache:q}).success(function(q){var n,t;q=W(q);if(s.replace){q=Ib.test(q)?A($(q)):[];n=q[0];if(1!=q.length||1!==n.nodeType)throw ja("tplrt",s.name,J);q={$attr:{}};ra(d,b,n);var B=ca(n,[],q);T(s.scope)&&D(B);a=B.concat(a);v(c,q)}else n=w,b.html(q);a.unshift(y);l=I(a,n,c,e,b,s,f,g,k);r(d,function(a,c){a==n&&(d[c]=b[0])});for(m=O(b[0].childNodes,e);p.length;){q=p.shift();t=p.shift();var K=p.shift(),C=p.shift(),B=b[0];if(t!==w){var P=t.className;k.hasElementTranscludeDirective&&
s.replace||(B=Kb(n));ra(K,A(t),B);ba(A(B),P)}t=l.transcludeOnThisElement?M(q,l.transclude,C):C;l(m,q,B,d,t)}p=null}).error(function(a,b,c,d){throw ja("tpload",d.url);});return function(a,b,c,d,e){a=e;p?(p.push(b),p.push(c),p.push(d),p.push(a)):(l.transcludeOnThisElement&&(a=M(b,l.transclude,e)),l(m,b,c,d,a))}}function F(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function fb(a,b,c,d){if(b)throw ja("multidir",b.name,c.name,a,ia(d));}function x(a,
c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){var b=a.parent().length;b&&ba(a.parent(),"ng-binding");return function(a,c){var e=c.parent(),f=e.data("$binding")||[];f.push(d);e.data("$binding",f);b||ba(e,"ng-binding");a.$watch(d,function(a){c[0].nodeValue=a})}}})}function z(a,b){if("srcdoc"==b)return t.HTML;var c=Pa(a);if("xlinkHref"==b||"FORM"==c&&"action"==b||"IMG"!=c&&("src"==b||"ngSrc"==b))return t.RESOURCE_URL}function S(a,c,d,e){var f=b(d,!0);if(f){if("multiple"===e&&"SELECT"===
Pa(a))throw ja("selmulti",ia(a));c.push({priority:100,compile:function(){return{pre:function(c,d,k){d=k.$$observers||(k.$$observers={});if(g.test(e))throw ja("nodomevents");if(f=b(k[e],!0,z(a,e)))k[e]=f(c),(d[e]||(d[e]=[])).$$inter=!0,(k.$$observers&&k.$$observers[e].$$scope||c).$watch(f,function(a,b){"class"===e&&a!=b?k.$updateClass(a,b):k.$set(e,a)})}}}})}}function ra(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,k;if(a)for(g=0,k=a.length;g<k;g++)if(a[g]==d){a[g++]=c;k=g+e-1;for(var p=a.length;g<
p;g++,k++)k<p?a[g]=a[k]:delete a[g];a.length-=e-1;break}f&&f.replaceChild(c,d);a=X.createDocumentFragment();a.appendChild(d);c[A.expando]=d[A.expando];d=1;for(e=b.length;d<e;d++)f=b[d],A(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function rc(a,b){return E(function(){return a.apply(null,arguments)},a,b)}var Ob=function(a,b){this.$$element=a;this.$attr=b||{}};Ob.prototype={$normalize:qa,$addClass:function(a){a&&0<a.length&&y.addClass(this.$$element,a)},$removeClass:function(a){a&&0<
a.length&&y.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=sc(a,b),d=sc(b,a);0===c.length?y.removeClass(this.$$element,d):0===d.length?y.addClass(this.$$element,c):y.setClass(this.$$element,c,d)},$set:function(a,b,c,d){var e=oc(this.$$element[0],a);e&&(this.$$element.prop(a,b),d=e);this[a]=b;d?this.$attr[a]=d:(d=this.$attr[a])||(this.$attr[a]=d=nb(a,"-"));e=Pa(this.$$element);if("A"===e&&"href"===a||"IMG"===e&&"src"===a)this[a]=b=K(b,"src"===a);!1!==c&&(null===b||b===u?this.$$element.removeAttr(d):
this.$$element.attr(d,b));(c=this.$$observers)&&r(c[a],function(a){try{a(b)}catch(c){l(c)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers={}),e=d[a]||(d[a]=[]);e.push(b);J.$evalAsync(function(){e.$$inter||b(c[a])});return b}};var sa=b.startSymbol(),Ia=b.endSymbol(),W="{{"==sa||"}}"==Ia?ga:function(a){return a.replace(/\{\{/g,sa).replace(/}}/g,Ia)},U=/^ngAttr[A-Z]/;return B}]}function qa(b){return ab(b.replace(we,""))}function sc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),
f=0;a:for(;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(0<c.length?" ":"")+g}return c}function Od(){var b={},a=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,d){Ea(a,"controller");T(a)?E(b,a):b[a]=d};this.$get=["$injector","$window",function(c,d){return function(e,f){var g,h,k;G(e)&&(g=e.match(a),h=g[1],k=g[3],e=b.hasOwnProperty(h)?b[h]:fc(f.$scope,h,!0)||fc(d,h,!0),Ya(e,h,!0));g=c.instantiate(e,f);if(k){if(!f||"object"!==typeof f.$scope)throw z("$controller")("noscp",
h||e.name,k);f.$scope[k]=g}return g}}]}function Pd(){this.$get=["$window",function(b){return A(b.document)}]}function Qd(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function tc(b){var a={},c,d,e;if(!b)return a;r(b.split("\n"),function(b){e=b.indexOf(":");c=x($(b.substr(0,e)));d=$(b.substr(e+1));c&&(a[c]=a[c]?a[c]+", "+d:d)});return a}function uc(b){var a=T(b)?b:u;return function(c){a||(a=tc(b));return c?a[x(c)]||null:a}}function vc(b,a,c){if(N(c))return c(b,
a);r(c,function(c){b=c(b,a)});return b}function Td(){var b=/^\s*(\[|\{[^\{])/,a=/[\}\]]\s*$/,c=/^\)\]\}',?\n/,d={"Content-Type":"application/json;charset=utf-8"},e=this.defaults={transformResponse:[function(d){G(d)&&(d=d.replace(c,""),b.test(d)&&a.test(d)&&(d=ac(d)));return d}],transformRequest:[function(a){return T(a)&&"[object File]"!==Ba.call(a)&&"[object Blob]"!==Ba.call(a)?oa(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ha(d),put:ha(d),patch:ha(d)},xsrfCookieName:"XSRF-TOKEN",
xsrfHeaderName:"X-XSRF-TOKEN"},f=this.interceptors=[],g=this.responseInterceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(a,b,c,d,n,q){function p(a){function b(a){var d=E({},a,{data:vc(a.data,a.headers,c.transformResponse)});return 200<=a.status&&300>a.status?d:n.reject(d)}var c={method:"get",transformRequest:e.transformRequest,transformResponse:e.transformResponse},d=function(a){var b=e.headers,c=E({},a.headers),d,f,b=E({},b.common,b[x(a.method)]);
a:for(d in b){a=x(d);for(f in c)if(x(f)===a)continue a;c[d]=b[d]}(function(a){var b;r(a,function(c,d){N(c)&&(b=c(),null!=b?a[d]=b:delete a[d])})})(c);return c}(a);E(c,a);c.headers=d;c.method=La(c.method);var f=[function(a){d=a.headers;var c=vc(a.data,uc(d),a.transformRequest);F(c)&&r(d,function(a,b){"content-type"===x(b)&&delete d[b]});F(a.withCredentials)&&!F(e.withCredentials)&&(a.withCredentials=e.withCredentials);return s(a,c,d).then(b,b)},u],g=n.when(c);for(r(t,function(a){(a.request||a.requestError)&&
f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var h=f.shift(),g=g.then(a,h)}g.success=function(a){g.then(function(b){a(b.data,b.status,b.headers,c)});return g};g.error=function(a){g.then(null,function(b){a(b.data,b.status,b.headers,c)});return g};return g}function s(c,f,g){function m(a,b,c,e){C&&(200<=a&&300>a?C.put(A,[a,b,tc(c),e]):C.remove(A));q(b,a,c,e);d.$$phase||d.$apply()}function q(a,b,d,e){b=Math.max(b,0);(200<=
b&&300>b?t.resolve:t.reject)({data:a,status:b,headers:uc(d),config:c,statusText:e})}function s(){var a=Ta(p.pendingRequests,c);-1!==a&&p.pendingRequests.splice(a,1)}var t=n.defer(),r=t.promise,C,I,A=J(c.url,c.params);p.pendingRequests.push(c);r.then(s,s);!c.cache&&!e.cache||(!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method)||(C=T(c.cache)?c.cache:T(e.cache)?e.cache:w);if(C)if(I=C.get(A),D(I)){if(I&&N(I.then))return I.then(s,s),I;L(I)?q(I[1],I[0],ha(I[2]),I[3]):q(I,200,{},"OK")}else C.put(A,r);F(I)&&
((I=Pb(c.url)?b.cookies()[c.xsrfCookieName||e.xsrfCookieName]:u)&&(g[c.xsrfHeaderName||e.xsrfHeaderName]=I),a(c.method,A,f,m,g,c.timeout,c.withCredentials,c.responseType));return r}function J(a,b){if(!b)return a;var c=[];Sc(b,function(a,b){null===a||F(a)||(L(a)||(a=[a]),r(a,function(a){T(a)&&(a=va(a)?a.toISOString():oa(a));c.push(Da(b)+"="+Da(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var w=c("$http"),t=[];r(f,function(a){t.unshift(G(a)?q.get(a):q.invoke(a))});r(g,
function(a,b){var c=G(a)?q.get(a):q.invoke(a);t.splice(b,0,{response:function(a){return c(n.when(a))},responseError:function(a){return c(n.reject(a))}})});p.pendingRequests=[];(function(a){r(arguments,function(a){p[a]=function(b,c){return p(E(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){r(arguments,function(a){p[a]=function(b,c,d){return p(E(d||{},{method:a,url:b,data:c}))}})})("post","put","patch");p.defaults=e;return p}]}function xe(b){if(8>=R&&(!b.match(/^(get|post|head|put|delete|options)$/i)||
!W.XMLHttpRequest))return new W.ActiveXObject("Microsoft.XMLHTTP");if(W.XMLHttpRequest)return new W.XMLHttpRequest;throw z("$httpBackend")("noxhr");}function Ud(){this.$get=["$browser","$window","$document",function(b,a,c){return ye(b,xe,b.defer,a.angular.callbacks,c[0])}]}function ye(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),g=null;f.type="text/javascript";f.src=a;f.async=!0;g=function(a){bb(f,"load",g);bb(f,"error",g);e.body.removeChild(f);f=null;var h=-1,s="unknown";a&&("load"!==
a.type||d[b].called||(a={type:"error"}),s=a.type,h="error"===a.type?404:200);c&&c(h,s)};sb(f,"load",g);sb(f,"error",g);8>=R&&(f.onreadystatechange=function(){G(f.readyState)&&/loaded|complete/.test(f.readyState)&&(f.onreadystatechange=null,g({type:"load"}))});e.body.appendChild(f);return g}var g=-1;return function(e,k,m,l,n,q,p,s){function J(){t=g;K&&K();B&&B.abort()}function w(a,d,e,f,g){O&&c.cancel(O);K=B=null;0===d&&(d=e?200:"file"==xa(k).protocol?404:0);a(1223===d?204:d,e,f,g||"");b.$$completeOutstandingRequest(v)}
var t;b.$$incOutstandingRequestCount();k=k||b.url();if("jsonp"==x(e)){var y="_"+(d.counter++).toString(36);d[y]=function(a){d[y].data=a;d[y].called=!0};var K=f(k.replace("JSON_CALLBACK","angular.callbacks."+y),y,function(a,b){w(l,a,d[y].data,"",b);d[y]=v})}else{var B=a(e);B.open(e,k,!0);r(n,function(a,b){D(a)&&B.setRequestHeader(b,a)});B.onreadystatechange=function(){if(B&&4==B.readyState){var a=null,b=null,c="";t!==g&&(a=B.getAllResponseHeaders(),b="response"in B?B.response:B.responseText);t===g&&
10>R||(c=B.statusText);w(l,t||B.status,b,a,c)}};p&&(B.withCredentials=!0);if(s)try{B.responseType=s}catch(ba){if("json"!==s)throw ba;}B.send(m||null)}if(0<q)var O=c(J,q);else q&&N(q.then)&&q.then(J)}}function Rd(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(f,m,l){for(var n,q,p=0,s=[],J=f.length,w=!1,t=[];p<J;)-1!=(n=f.indexOf(b,p))&&-1!=(q=f.indexOf(a,
n+g))?(p!=n&&s.push(f.substring(p,n)),s.push(p=c(w=f.substring(n+g,q))),p.exp=w,p=q+h,w=!0):(p!=J&&s.push(f.substring(p)),p=J);(J=s.length)||(s.push(""),J=1);if(l&&1<s.length)throw wc("noconcat",f);if(!m||w)return t.length=J,p=function(a){try{for(var b=0,c=J,g;b<c;b++){if("function"==typeof(g=s[b]))if(g=g(a),g=l?e.getTrusted(l,g):e.valueOf(g),null==g)g="";else switch(typeof g){case "string":break;case "number":g=""+g;break;default:g=oa(g)}t[b]=g}return t.join("")}catch(h){a=wc("interr",f,h.toString()),
d(a)}},p.exp=f,p.parts=s,p}var g=b.length,h=a.length;f.startSymbol=function(){return b};f.endSymbol=function(){return a};return f}]}function Sd(){this.$get=["$rootScope","$window","$q",function(b,a,c){function d(d,g,h,k){var m=a.setInterval,l=a.clearInterval,n=c.defer(),q=n.promise,p=0,s=D(k)&&!k;h=D(h)?h:0;q.then(null,null,d);q.$$intervalId=m(function(){n.notify(p++);0<h&&p>=h&&(n.resolve(p),l(q.$$intervalId),delete e[q.$$intervalId]);s||b.$apply()},g);e[q.$$intervalId]=n;return q}var e={};d.cancel=
function(b){return b&&b.$$intervalId in e?(e[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),delete e[b.$$intervalId],!0):!1};return d}]}function ad(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),
SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function Qb(b){b=b.split("/");for(var a=b.length;a--;)b[a]=
mb(b[a]);return b.join("/")}function xc(b,a,c){b=xa(b,c);a.$$protocol=b.protocol;a.$$host=b.hostname;a.$$port=U(b.port)||ze[b.protocol]||null}function yc(b,a,c){var d="/"!==b.charAt(0);d&&(b="/"+b);b=xa(b,c);a.$$path=decodeURIComponent(d&&"/"===b.pathname.charAt(0)?b.pathname.substring(1):b.pathname);a.$$search=cc(b.search);a.$$hash=decodeURIComponent(b.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function ta(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ga(b){var a=
b.indexOf("#");return-1==a?b:b.substr(0,a)}function Rb(b){return b.substr(0,Ga(b).lastIndexOf("/")+1)}function zc(b,a){this.$$html5=!0;a=a||"";var c=Rb(b);xc(b,this,b);this.$$parse=function(a){var e=ta(c,a);if(!G(e))throw Sb("ipthprfx",a,c);yc(e,this,b);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Cb(this.$$search),b=this.$$hash?"#"+mb(this.$$hash):"";this.$$url=Qb(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$parseLinkUrl=function(d,
e){var f,g;(f=ta(b,d))!==u?(g=f,g=(f=ta(a,f))!==u?c+(ta("/",f)||f):b+g):(f=ta(c,d))!==u?g=c+f:c==d+"/"&&(g=c);g&&this.$$parse(g);return!!g}}function Tb(b,a){var c=Rb(b);xc(b,this,b);this.$$parse=function(d){var e=ta(b,d)||ta(c,d),e="#"==e.charAt(0)?ta(a,e):this.$$html5?e:"";if(!G(e))throw Sb("ihshprfx",d,a);yc(e,this,b);d=this.$$path;var f=/^\/[A-Z]:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));f.exec(e)||(d=(e=f.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=Cb(this.$$search),
e=this.$$hash?"#"+mb(this.$$hash):"";this.$$url=Qb(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Ga(b)==Ga(a)?(this.$$parse(a),!0):!1}}function Ac(b,a){this.$$html5=!0;Tb.apply(this,arguments);var c=Rb(b);this.$$parseLinkUrl=function(d,e){var f,g;b==Ga(d)?f=d:(g=ta(c,d))?f=b+a+g:c===d+"/"&&(f=c);f&&this.$$parse(f);return!!f};this.$$compose=function(){var c=Cb(this.$$search),e=this.$$hash?"#"+mb(this.$$hash):"";this.$$url=Qb(this.$$path)+
(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function tb(b){return function(){return this[b]}}function Bc(b,a){return function(c){if(F(c))return this[b];this[b]=a(c);this.$$compose();return this}}function Vd(){var b="",a=!1;this.hashPrefix=function(a){return D(a)?(b=a,this):b};this.html5Mode=function(b){return D(b)?(a=b,this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,f){function g(a){c.$broadcast("$locationChangeSuccess",h.absUrl(),a)}var h,k=d.baseHref(),m=d.url();
a?(k=m.substring(0,m.indexOf("/",m.indexOf("//")+2))+(k||"/"),e=e.history?zc:Ac):(k=Ga(m),e=Tb);h=new e(k,"#"+b);h.$$parseLinkUrl(m,m);var l=/^\s*(javascript|mailto):/i;f.on("click",function(a){if(!a.ctrlKey&&!a.metaKey&&2!=a.which){for(var b=A(a.target);"a"!==x(b[0].nodeName);)if(b[0]===f[0]||!(b=b.parent())[0])return;var e=b.prop("href"),g=b.attr("href")||b.attr("xlink:href");T(e)&&"[object SVGAnimatedString]"===e.toString()&&(e=xa(e.animVal).href);l.test(e)||(!e||(b.attr("target")||a.isDefaultPrevented())||
!h.$$parseLinkUrl(e,g))||(a.preventDefault(),h.absUrl()!=d.url()&&(c.$apply(),W.angular["ff-684208-preventDefault"]=!0))}});h.absUrl()!=m&&d.url(h.absUrl(),!0);d.onUrlChange(function(a){h.absUrl()!=a&&(c.$evalAsync(function(){var b=h.absUrl();h.$$parse(a);c.$broadcast("$locationChangeStart",a,b).defaultPrevented?(h.$$parse(b),d.url(b)):g(b)}),c.$$phase||c.$digest())});var n=0;c.$watch(function(){var a=d.url(),b=h.$$replace;n&&a==h.absUrl()||(n++,c.$evalAsync(function(){c.$broadcast("$locationChangeStart",
h.absUrl(),a).defaultPrevented?h.$$parse(a):(d.url(h.absUrl(),b),g(a))}));h.$$replace=!1;return n});return h}]}function Wd(){var b=!0,a=this;this.debugEnabled=function(a){return D(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||v;a=!1;try{a=!!e.apply}catch(k){}return a?
function(){var a=[];r(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function ka(b,a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw la("isecfld",a);return b}function ma(b,a){if(b){if(b.constructor===b)throw la("isecfn",a);if(b.document&&
b.location&&b.alert&&b.setInterval)throw la("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw la("isecdom",a);if(b===Object)throw la("isecobj",a);}return b}function ub(b,a,c,d,e){ma(b,d);e=e||{};a=a.split(".");for(var f,g=0;1<a.length;g++){f=ka(a.shift(),d);var h=ma(b[f],d);h||(h={},b[f]=h);b=h;b.then&&e.unwrapPromises&&(ya(d),"$$v"in b||function(a){a.then(function(b){a.$$v=b})}(b),b.$$v===u&&(b.$$v={}),b=b.$$v)}f=ka(a.shift(),d);ma(b[f],d);return b[f]=c}function Qa(b){return"constructor"==
b}function Cc(b,a,c,d,e,f,g){ka(b,f);ka(a,f);ka(c,f);ka(d,f);ka(e,f);var h=function(a){return ma(a,f)},k=g.expensiveChecks,m=k||Qa(b)?h:ga,l=k||Qa(a)?h:ga,n=k||Qa(c)?h:ga,q=k||Qa(d)?h:ga,p=k||Qa(e)?h:ga;return g.unwrapPromises?function(g,h){var k=h&&h.hasOwnProperty(b)?h:g,t;if(null==k)return k;(k=m(k[b]))&&k.then&&(ya(f),"$$v"in k||(t=k,t.$$v=u,t.then(function(a){t.$$v=m(a)})),k=m(k.$$v));if(!a)return k;if(null==k)return u;(k=l(k[a]))&&k.then&&(ya(f),"$$v"in k||(t=k,t.$$v=u,t.then(function(a){t.$$v=
l(a)})),k=l(k.$$v));if(!c)return k;if(null==k)return u;(k=n(k[c]))&&k.then&&(ya(f),"$$v"in k||(t=k,t.$$v=u,t.then(function(a){t.$$v=n(a)})),k=n(k.$$v));if(!d)return k;if(null==k)return u;(k=q(k[d]))&&k.then&&(ya(f),"$$v"in k||(t=k,t.$$v=u,t.then(function(a){t.$$v=q(a)})),k=q(k.$$v));if(!e)return k;if(null==k)return u;(k=p(k[e]))&&k.then&&(ya(f),"$$v"in k||(t=k,t.$$v=u,t.then(function(a){t.$$v=p(a)})),k=p(k.$$v));return k}:function(f,g){var h=g&&g.hasOwnProperty(b)?g:f;if(null==h)return h;h=m(h[b]);
if(!a)return h;if(null==h)return u;h=l(h[a]);if(!c)return h;if(null==h)return u;h=n(h[c]);if(!d)return h;if(null==h)return u;h=q(h[d]);return e?null==h?u:h=p(h[e]):h}}function Ae(b,a){return function(c,d){return b(c,d,ya,ma,a)}}function Dc(b,a,c){var d=a.expensiveChecks,e=d?Be:Ce;if(e.hasOwnProperty(b))return e[b];var f=b.split("."),g=f.length,h;if(a.csp)h=6>g?Cc(f[0],f[1],f[2],f[3],f[4],c,a):function(b,d){var e=0,h;do h=Cc(f[e++],f[e++],f[e++],f[e++],f[e++],c,a)(b,d),d=u,b=h;while(e<g);return h};
else{var k="var p;\n";d&&(k+="s = eso(s, fe);\nl = eso(l, fe);\n");var m=d;r(f,function(b,e){ka(b,c);var f=(e?"s":'((l&&l.hasOwnProperty("'+b+'"))?l:s)')+'["'+b+'"]',g=d||Qa(b);g&&(f="eso("+f+", fe)",m=!0);k+="if(s == null) return undefined;\ns="+f+";\n";a.unwrapPromises&&(k+='if (s && s.then) {\n pw("'+c.replace(/(["\r\n])/g,"\\$1")+'");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v='+(g?"eso(v)":"v")+";});\n}\n s="+(g?"eso(s.$$v)":"s.$$v")+"\n}\n")});k+="return s;";
h=new Function("s","l","pw","eso","fe",k);h.toString=aa(k);if(m||a.unwrapPromises)h=Ae(h,c)}"hasOwnProperty"!==b&&(e[b]=h);return h}function Xd(){var b={},a={},c={csp:!1,unwrapPromises:!1,logPromiseWarnings:!0,expensiveChecks:!1};this.unwrapPromises=function(a){return D(a)?(c.unwrapPromises=!!a,this):c.unwrapPromises};this.logPromiseWarnings=function(a){return D(a)?(c.logPromiseWarnings=a,this):c.logPromiseWarnings};this.$get=["$filter","$sniffer","$log",function(d,e,f){c.csp=e.csp;var g={csp:c.csp,
unwrapPromises:c.unwrapPromises,logPromiseWarnings:c.logPromiseWarnings,expensiveChecks:!0};ya=function(a){c.logPromiseWarnings&&!Ec.hasOwnProperty(a)&&(Ec[a]=!0,f.warn("[$parse] Promise found in the expression `"+a+"`. Automatic unwrapping of promises in Angular expressions is deprecated."))};return function(e,f){var m;switch(typeof e){case "string":var l=f?a:b;if(l.hasOwnProperty(e))return l[e];m=f?g:c;var n=new Ub(m);m=(new gb(n,d,m)).parse(e);"hasOwnProperty"!==e&&(l[e]=m);return m;case "function":return e;
default:return v}}}]}function Zd(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return De(function(a){b.$evalAsync(a)},a)}]}function De(b,a){function c(a){return a}function d(a){return g(a)}var e=function(){var g=[],m,l;return l={resolve:function(a){if(g){var c=g;g=u;m=f(a);c.length&&b(function(){for(var a,b=0,d=c.length;b<d;b++)a=c[b],m.then(a[0],a[1],a[2])})}},reject:function(a){l.resolve(h(a))},notify:function(a){if(g){var c=g;g.length&&b(function(){for(var b,d=0,e=c.length;d<e;d++)b=
c[d],b[2](a)})}},promise:{then:function(b,f,h){var l=e(),J=function(d){try{l.resolve((N(b)?b:c)(d))}catch(e){l.reject(e),a(e)}},w=function(b){try{l.resolve((N(f)?f:d)(b))}catch(c){l.reject(c),a(c)}},t=function(b){try{l.notify((N(h)?h:c)(b))}catch(d){a(d)}};g?g.push([J,w,t]):m.then(J,w,t);return l.promise},"catch":function(a){return this.then(null,a)},"finally":function(a){function b(a,c){var d=e();c?d.resolve(a):d.reject(a);return d.promise}function d(e,f){var g=null;try{g=(a||c)()}catch(h){return b(h,
!1)}return g&&N(g.then)?g.then(function(){return b(e,f)},function(a){return b(a,!1)}):b(e,f)}return this.then(function(a){return d(a,!0)},function(a){return d(a,!1)})}}}},f=function(a){return a&&N(a.then)?a:{then:function(c){var d=e();b(function(){d.resolve(c(a))});return d.promise}}},g=function(a){var b=e();b.reject(a);return b.promise},h=function(c){return{then:function(f,g){var h=e();b(function(){try{h.resolve((N(g)?g:d)(c))}catch(b){h.reject(b),a(b)}});return h.promise}}};return{defer:e,reject:g,
when:function(h,m,l,n){var q=e(),p,s=function(b){try{return(N(m)?m:c)(b)}catch(d){return a(d),g(d)}},J=function(b){try{return(N(l)?l:d)(b)}catch(c){return a(c),g(c)}},w=function(b){try{return(N(n)?n:c)(b)}catch(d){a(d)}};b(function(){f(h).then(function(a){p||(p=!0,q.resolve(f(a).then(s,J,w)))},function(a){p||(p=!0,q.resolve(J(a)))},function(a){p||q.notify(w(a))})});return q.promise},all:function(a){var b=e(),c=0,d=L(a)?[]:{};r(a,function(a,e){c++;f(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,
--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise}}}function fe(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};f.supported=
e;return f}]}function Yd(){var b=10,a=z("$rootScope"),c=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(d,e,f,g){function h(){this.$id=ib();this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this["this"]=this.$root=this;this.$$destroyed=!1;this.$$asyncQueue=[];this.$$postDigestQueue=[];this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings=
{}}function k(b){if(q.$$phase)throw a("inprog",q.$$phase);q.$$phase=b}function m(a,b){var c=f(a);Ya(c,b);return c}function l(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function n(){}h.prototype={constructor:h,$new:function(a){a?(a=new h,a.$root=this.$root,a.$$asyncQueue=this.$$asyncQueue,a.$$postDigestQueue=this.$$postDigestQueue):(this.$$childScopeClass||(this.$$childScopeClass=function(){this.$$watchers=this.$$nextSibling=this.$$childHead=
this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$id=ib();this.$$childScopeClass=null},this.$$childScopeClass.prototype=this),a=new this.$$childScopeClass);a["this"]=a;a.$parent=this;a.$$prevSibling=this.$$childTail;this.$$childHead?this.$$childTail=this.$$childTail.$$nextSibling=a:this.$$childHead=this.$$childTail=a;return a},$watch:function(a,b,d){var e=m(a,"watch"),f=this.$$watchers,g={fn:b,last:n,get:e,exp:a,eq:!!d};c=null;if(!N(b)){var h=m(b||v,"listener");g.fn=function(a,
b,c){h(c)}}if("string"==typeof a&&e.constant){var k=g.fn;g.fn=function(a,b,c){k.call(this,a,b,c);Ua(f,g)}}f||(f=this.$$watchers=[]);f.unshift(g);return function(){Ua(f,g);c=null}},$watchCollection:function(a,b){var c=this,d,e,g,h=1<b.length,k=0,l=f(a),m=[],n={},q=!0,r=0;return this.$watch(function(){d=l(c);var a,b,f;if(T(d))if(Sa(d))for(e!==m&&(e=m,r=e.length=0,k++),a=d.length,r!==a&&(k++,e.length=r=a),b=0;b<a;b++)f=e[b]!==e[b]&&d[b]!==d[b],f||e[b]===d[b]||(k++,e[b]=d[b]);else{e!==n&&(e=n={},r=0,
k++);a=0;for(b in d)d.hasOwnProperty(b)&&(a++,e.hasOwnProperty(b)?(f=e[b]!==e[b]&&d[b]!==d[b],f||e[b]===d[b]||(k++,e[b]=d[b])):(r++,e[b]=d[b],k++));if(r>a)for(b in k++,e)e.hasOwnProperty(b)&&!d.hasOwnProperty(b)&&(r--,delete e[b])}else e!==d&&(e=d,k++);return k},function(){q?(q=!1,b(d,d,c)):b(d,g,c);if(h)if(T(d))if(Sa(d)){g=Array(d.length);for(var a=0;a<d.length;a++)g[a]=d[a]}else for(a in g={},d)lb.call(d,a)&&(g[a]=d[a]);else g=d})},$digest:function(){var d,f,h,l,m=this.$$asyncQueue,r=this.$$postDigestQueue,
K,B,u=b,O,M=[],A,P,C;k("$digest");g.$$checkUrlChange();c=null;do{B=!1;for(O=this;m.length;){try{C=m.shift(),C.scope.$eval(C.expression)}catch(I){q.$$phase=null,e(I)}c=null}a:do{if(l=O.$$watchers)for(K=l.length;K--;)try{if(d=l[K])if((f=d.get(O))!==(h=d.last)&&!(d.eq?Ca(f,h):"number"===typeof f&&"number"===typeof h&&isNaN(f)&&isNaN(h)))B=!0,c=d,d.last=d.eq?Ka(f,null):f,d.fn(f,h===n?f:h,O),5>u&&(A=4-u,M[A]||(M[A]=[]),P=N(d.exp)?"fn: "+(d.exp.name||d.exp.toString()):d.exp,P+="; newVal: "+oa(f)+"; oldVal: "+
oa(h),M[A].push(P));else if(d===c){B=!1;break a}}catch(D){q.$$phase=null,e(D)}if(!(l=O.$$childHead||O!==this&&O.$$nextSibling))for(;O!==this&&!(l=O.$$nextSibling);)O=O.$parent}while(O=l);if((B||m.length)&&!u--)throw q.$$phase=null,a("infdig",b,oa(M));}while(B||m.length);for(q.$$phase=null;r.length;)try{r.shift()()}catch(x){e(x)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this!==q&&(r(this.$$listenerCount,Bb(null,l,this)),a.$$childHead==
this&&(a.$$childHead=this.$$nextSibling),a.$$childTail==this&&(a.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=null,this.$$listeners={},this.$$watchers=this.$$asyncQueue=this.$$postDigestQueue=[],this.$destroy=this.$digest=this.$apply=v,this.$on=this.$watch=function(){return v})}},
$eval:function(a,b){return f(a)(this,b)},$evalAsync:function(a){q.$$phase||q.$$asyncQueue.length||g.defer(function(){q.$$asyncQueue.length&&q.$digest()});this.$$asyncQueue.push({scope:this,expression:a})},$$postDigest:function(a){this.$$postDigestQueue.push(a)},$apply:function(a){try{return k("$apply"),this.$eval(a)}catch(b){e(b)}finally{q.$$phase=null;try{q.$digest()}catch(c){throw e(c),c;}}},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||
(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=Ta(c,b);-1!==d&&(c[d]=null,l(e,1,a))}},$emit:function(a,b){var c=[],d,f=this,g=!1,h={name:a,targetScope:f,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=[h].concat(wa.call(arguments,1)),l,m;do{d=f.$$listeners[a]||c;h.currentScope=f;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(n){e(n)}else d.splice(l,1),l--,m--;if(g)break;
f=f.$parent}while(f);return h},$broadcast:function(a,b){for(var c=this,d=this,f={name:a,targetScope:this,preventDefault:function(){f.defaultPrevented=!0},defaultPrevented:!1},g=[f].concat(wa.call(arguments,1)),h,k;c=d;){f.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){e(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}return f}};var q=new h;
return q}]}function bd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file):|data:image\/)/;this.aHrefSanitizationWhitelist=function(a){return D(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return D(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;if(!R||8<=R)if(f=xa(c).href,""!==f&&!f.match(e))return"unsafe:"+f;return c}}}function Ee(b){if("self"===b)return b;if(G(b)){if(-1<b.indexOf("***"))throw za("iwcard",b);b=b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,
"\\$1").replace(/\x08/g,"\\x08").replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return RegExp("^"+b+"$")}if(kb(b))return RegExp("^"+b.source+"$");throw za("imatcher");}function Fc(b){var a=[];D(b)&&r(b,function(b){a.push(Ee(b))});return a}function ae(){this.SCE_CONTEXTS=fa;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=Fc(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=Fc(b));return a};this.$get=["$injector",function(c){function d(a){var b=
function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var e=function(a){throw za("unsafe");};c.has("$sanitize")&&(e=c.get("$sanitize"));var f=d(),g={};g[fa.HTML]=d(f);g[fa.CSS]=d(f);g[fa.URL]=d(f);g[fa.JS]=d(f);g[fa.RESOURCE_URL]=d(g[fa.URL]);return{trustAs:function(a,b){var c=g.hasOwnProperty(a)?g[a]:null;if(!c)throw za("icontext",
a,b);if(null===b||b===u||""===b)return b;if("string"!==typeof b)throw za("itype",a);return new c(b)},getTrusted:function(c,d){if(null===d||d===u||""===d)return d;var f=g.hasOwnProperty(c)?g[c]:null;if(f&&d instanceof f)return d.$$unwrapTrustedValue();if(c===fa.RESOURCE_URL){var f=xa(d.toString()),l,n,q=!1;l=0;for(n=b.length;l<n;l++)if("self"===b[l]?Pb(f):b[l].exec(f.href)){q=!0;break}if(q)for(l=0,n=a.length;l<n;l++)if("self"===a[l]?Pb(f):a[l].exec(f.href)){q=!1;break}if(q)return d;throw za("insecurl",
d.toString());}if(c===fa.HTML)return e(d);throw za("unsafe");},valueOf:function(a){return a instanceof f?a.$$unwrapTrustedValue():a}}}]}function $d(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sniffer","$sceDelegate",function(a,c,d){if(b&&c.msie&&8>c.msieDocumentMode)throw za("iequirks");var e=ha(fa);e.isEnabled=function(){return b};e.trustAs=d.trustAs;e.getTrusted=d.getTrusted;e.valueOf=d.valueOf;b||(e.trustAs=e.getTrusted=function(a,b){return b},
e.valueOf=ga);e.parseAs=function(b,c){var d=a(c);return d.literal&&d.constant?d:function(a,c){return e.getTrusted(b,d(a,c))}};var f=e.parseAs,g=e.getTrusted,h=e.trustAs;r(fa,function(a,b){var c=x(b);e[ab("parse_as_"+c)]=function(b){return f(a,b)};e[ab("get_trusted_"+c)]=function(b){return g(a,b)};e[ab("trust_as_"+c)]=function(b){return h(a,b)}});return e}]}function be(){this.$get=["$window","$document",function(b,a){var c={},d=U((/android (\d+)/.exec(x((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||
{}).userAgent),f=a[0]||{},g=f.documentMode,h,k=/^(Moz|webkit|O|ms)(?=[A-Z])/,m=f.body&&f.body.style,l=!1,n=!1;if(m){for(var q in m)if(l=k.exec(q)){h=l[0];h=h.substr(0,1).toUpperCase()+h.substr(1);break}h||(h="WebkitOpacity"in m&&"webkit");l=!!("transition"in m||h+"Transition"in m);n=!!("animation"in m||h+"Animation"in m);!d||l&&n||(l=G(f.body.style.webkitTransition),n=G(f.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hashchange:"onhashchange"in b&&(!g||7<
g),hasEvent:function(a){if("input"==a&&9==R)return!1;if(F(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:Za(),vendorPrefix:h,transitions:l,animations:n,android:d,msie:R,msieDocumentMode:g}}]}function de(){this.$get=["$rootScope","$browser","$q","$exceptionHandler",function(b,a,c,d){function e(e,h,k){var m=c.defer(),l=m.promise,n=D(k)&&!k;h=a.defer(function(){try{m.resolve(e())}catch(a){m.reject(a),d(a)}finally{delete f[l.$$timeoutId]}n||b.$apply()},h);l.$$timeoutId=h;f[h]=m;
return l}var f={};e.cancel=function(b){return b&&b.$$timeoutId in f?(f[b.$$timeoutId].reject("canceled"),delete f[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return e}]}function xa(b,a){var c=b;R&&(Y.setAttribute("href",c),c=Y.href);Y.setAttribute("href",c);return{href:Y.href,protocol:Y.protocol?Y.protocol.replace(/:$/,""):"",host:Y.host,search:Y.search?Y.search.replace(/^\?/,""):"",hash:Y.hash?Y.hash.replace(/^#/,""):"",hostname:Y.hostname,port:Y.port,pathname:"/"===Y.pathname.charAt(0)?Y.pathname:
"/"+Y.pathname}}function Pb(b){b=G(b)?xa(b):b;return b.protocol===Gc.protocol&&b.host===Gc.host}function ee(){this.$get=aa(W)}function kc(b){function a(d,e){if(T(d)){var f={};r(d,function(b,c){f[c]=a(c,b)});return f}return b.factory(d+c,e)}var c="Filter";this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+c)}}];a("currency",Hc);a("date",Ic);a("filter",Fe);a("json",Ge);a("limitTo",He);a("lowercase",Ie);a("number",Jc);a("orderBy",Kc);a("uppercase",Je)}function Fe(){return function(b,
a,c){if(!L(b))return b;var d=typeof c,e=[];e.check=function(a){for(var b=0;b<e.length;b++)if(!e[b](a))return!1;return!0};"function"!==d&&(c="boolean"===d&&c?function(a,b){return Xa.equals(a,b)}:function(a,b){if(a&&b&&"object"===typeof a&&"object"===typeof b){for(var d in a)if("$"!==d.charAt(0)&&lb.call(a,d)&&c(a[d],b[d]))return!0;return!1}b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var f=function(a,b){if("string"===typeof b&&"!"===b.charAt(0))return!f(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,
b);case "object":switch(typeof b){case "object":return c(a,b);default:for(var d in a)if("$"!==d.charAt(0)&&f(a[d],b))return!0}return!1;case "array":for(d=0;d<a.length;d++)if(f(a[d],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var g in a)(function(b){"undefined"!==typeof a[b]&&e.push(function(c){return f("$"==b?c:c&&c[b],a[b])})})(g);break;case "function":e.push(a);break;default:return b}d=[];for(g=0;g<b.length;g++){var h=
b[g];e.check(h)&&d.push(h)}return d}}function Hc(b){var a=b.NUMBER_FORMATS;return function(b,d){F(d)&&(d=a.CURRENCY_SYM);return Lc(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,2).replace(/\u00A4/g,d)}}function Jc(b){var a=b.NUMBER_FORMATS;return function(b,d){return Lc(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Lc(b,a,c,d,e){if(null==b||!isFinite(b)||T(b))return"";var f=0>b;b=Math.abs(b);var g=b+"",h="",k=[],m=!1;if(-1!==g.indexOf("e")){var l=g.match(/([\d\.]+)e(-?)(\d+)/);l&&"-"==l[2]&&
l[3]>e+1?(g="0",b=0):(h=g,m=!0)}if(m)0<e&&(-1<b&&1>b)&&(h=b.toFixed(e));else{g=(g.split(Mc)[1]||"").length;F(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);0===b&&(f=!1);b=(""+b).split(Mc);g=b[0];b=b[1]||"";var l=0,n=a.lgSize,q=a.gSize;if(g.length>=n+q)for(l=g.length-n,m=0;m<l;m++)0===(l-m)%q&&0!==m&&(h+=c),h+=g.charAt(m);for(m=l;m<g.length;m++)0===(g.length-m)%n&&0!==m&&(h+=c),h+=g.charAt(m);for(;b.length<e;)b+="0";e&&"0"!==e&&(h+=d+b.substr(0,
e))}k.push(f?a.negPre:a.posPre);k.push(h);k.push(f?a.negSuf:a.posSuf);return k.join("")}function Vb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function Z(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Vb(e,a,d)}}function vb(b,a){return function(c,d){var e=c["get"+b](),f=La(a?"SHORT"+b:b);return d[f][e]}}function Ic(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?
a.setUTCFullYear:a.setFullYear,k=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=U(b[9]+b[10]),g=U(b[9]+b[11]));h.call(a,U(b[1]),U(b[2])-1,U(b[3]));f=U(b[4]||0)-f;g=U(b[5]||0)-g;h=U(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));k.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e){var f="",g=[],h,k;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;G(c)&&(c=Ke.test(c)?U(c):a(c));jb(c)&&(c=new Date(c));
if(!va(c))return c;for(;e;)(k=Le.exec(e))?(g=g.concat(wa.call(k,1)),e=g.pop()):(g.push(e),e=null);r(g,function(a){h=Me[a];f+=h?h(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return f}}function Ge(){return function(b){return oa(b,!0)}}function He(){return function(b,a){if(!L(b)&&!G(b))return b;a=Infinity===Math.abs(Number(a))?Number(a):U(a);if(G(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=
b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function Kc(b){return function(a,c,d){function e(a,b){return Wa(b)?function(b,c){return a(c,b)}:a}function f(a,b){var c=typeof a,d=typeof b;return c==d?(va(a)&&va(b)&&(a=a.valueOf(),b=b.valueOf()),"string"==c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!Sa(a))return a;c=L(c)?c:[c];0===c.length&&(c=["+"]);c=Uc(c,function(a){var c=!1,d=a||ga;if(G(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);
if(""===a)return e(function(a,b){return f(a,b)},c);d=b(a);if(d.constant){var m=d();return e(function(a,b){return f(a[m],b[m])},c)}}return e(function(a,b){return f(d(a),d(b))},c)});return wa.call(a).sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function Aa(b){N(b)&&(b={link:b});b.restrict=b.restrict||"AC";return aa(b)}function Nc(b,a,c,d){function e(a,c){c=c?"-"+nb(c,"-"):"";d.setClass(b,(a?wb:xb)+c,(a?xb:wb)+c)}var f=this,g=b.parent().controller("form")||
yb,h=0,k=f.$error={},m=[];f.$name=a.name||a.ngForm;f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;g.$addControl(f);b.addClass(Ra);e(!0);f.$addControl=function(a){Ea(a.$name,"input");m.push(a);a.$name&&(f[a.$name]=a)};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];r(k,function(b,c){f.$setValidity(c,!0,a)});Ua(m,a)};f.$setValidity=function(a,b,c){var d=k[a];if(b)d&&(Ua(d,c),d.length||(h--,h||(e(b),f.$valid=!0,f.$invalid=!1),k[a]=!1,e(!0,a),g.$setValidity(a,!0,f)));else{h||
e(b);if(d){if(-1!=Ta(d,c))return}else k[a]=d=[],h++,e(!1,a),g.$setValidity(a,!1,f);d.push(c);f.$valid=!1;f.$invalid=!0}};f.$setDirty=function(){d.removeClass(b,Ra);d.addClass(b,zb);f.$dirty=!0;f.$pristine=!1;g.$setDirty()};f.$setPristine=function(){d.removeClass(b,zb);d.addClass(b,Ra);f.$dirty=!1;f.$pristine=!0;r(m,function(a){a.$setPristine()})}}function ua(b,a,c,d){b.$setValidity(a,c);return c?d:u}function Oc(b,a){var c,d;if(a)for(c=0;c<a.length;++c)if(d=a[c],b[d])return!0;return!1}function Ne(b,
a,c,d,e){T(e)&&(b.$$hasNativeValidators=!0,b.$parsers.push(function(f){if(b.$error[a]||Oc(e,d)||!Oc(e,c))return f;b.$setValidity(a,!1)}))}function Ab(b,a,c,d,e,f){var g=a.prop(Oe),h=a[0].placeholder,k={},m=x(a[0].type);d.$$validityState=g;if(!e.android){var l=!1;a.on("compositionstart",function(a){l=!0});a.on("compositionend",function(){l=!1;n()})}var n=function(e){if(!l){var f=a.val();if(R&&"input"===(e||k).type&&a[0].placeholder!==h)h=a[0].placeholder;else if("password"!==m&&Wa(c.ngTrim||"T")&&
(f=$(f)),e=g&&d.$$hasNativeValidators,d.$viewValue!==f||""===f&&e)b.$root.$$phase?d.$setViewValue(f):b.$apply(function(){d.$setViewValue(f)})}};if(e.hasEvent("input"))a.on("input",n);else{var q,p=function(){q||(q=f.defer(function(){n();q=null}))};a.on("keydown",function(a){a=a.keyCode;91===a||(15<a&&19>a||37<=a&&40>=a)||p()});if(e.hasEvent("paste"))a.on("paste cut",p)}a.on("change",n);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)};var s=c.ngPattern;s&&((e=s.match(/^\/(.*)\/([gim]*)$/))?
(s=RegExp(e[1],e[2]),e=function(a){return ua(d,"pattern",d.$isEmpty(a)||s.test(a),a)}):e=function(c){var e=b.$eval(s);if(!e||!e.test)throw z("ngPattern")("noregexp",s,e,ia(a));return ua(d,"pattern",d.$isEmpty(c)||e.test(c),c)},d.$formatters.push(e),d.$parsers.push(e));if(c.ngMinlength){var r=U(c.ngMinlength);e=function(a){return ua(d,"minlength",d.$isEmpty(a)||a.length>=r,a)};d.$parsers.push(e);d.$formatters.push(e)}if(c.ngMaxlength){var w=U(c.ngMaxlength);e=function(a){return ua(d,"maxlength",d.$isEmpty(a)||
a.length<=w,a)};d.$parsers.push(e);d.$formatters.push(e)}}function Wb(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],l=0;l<b.length;l++)if(e==b[l])continue a;c.push(e)}return c}function e(a){if(!L(a)){if(G(a))return a.split(" ");if(T(a)){var b=[];r(a,function(a,c){a&&(b=b.concat(c.split(" ")))});return b}}return a}return{restrict:"AC",link:function(f,g,h){function k(a,b){var c=g.data("$classCounts")||{},d=[];r(a,function(a){if(0<
b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function m(b){if(!0===a||f.$index%2===a){var m=e(b||[]);if(!l){var p=k(m,1);h.$addClass(p)}else if(!Ca(b,l)){var s=e(l),p=d(m,s),m=d(s,m),m=k(m,-1),p=k(p,1);0===p.length?c.removeClass(g,m):0===m.length?c.addClass(g,p):c.setClass(g,p,m)}}l=ha(b)}var l;f.$watch(h[b],m,!0);h.$observe("class",function(a){m(f.$eval(h[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var l=e(f.$eval(h[b]));
g===a?(g=k(l,1),h.$addClass(g)):(g=k(l,-1),h.$removeClass(g))}})}}}]}var Oe="validity",x=function(b){return G(b)?b.toLowerCase():b},lb=Object.prototype.hasOwnProperty,La=function(b){return G(b)?b.toUpperCase():b},R,A,Fa,wa=[].slice,Pe=[].push,Ba=Object.prototype.toString,Va=z("ng"),Xa=W.angular||(W.angular={}),$a,Pa,na=["0","0","0"];R=U((/msie (\d+)/.exec(x(navigator.userAgent))||[])[1]);isNaN(R)&&(R=U((/trident\/.*; rv:(\d+)/.exec(x(navigator.userAgent))||[])[1]));v.$inject=[];ga.$inject=[];var L=
function(){return N(Array.isArray)?Array.isArray:function(b){return"[object Array]"===Ba.call(b)}}(),$=function(){return String.prototype.trim?function(b){return G(b)?b.trim():b}:function(b){return G(b)?b.replace(/^\s\s*/,"").replace(/\s\s*$/,""):b}}();Pa=9>R?function(b){b=b.nodeName?b:b[0];return b.scopeName&&"HTML"!=b.scopeName?La(b.scopeName+":"+b.nodeName):b.nodeName}:function(b){return b.nodeName?b.nodeName:b[0].nodeName};var Za=function(){if(D(Za.isActive_))return Za.isActive_;var b=!(!X.querySelector("[ng-csp]")&&
!X.querySelector("[data-ng-csp]"));if(!b)try{new Function("")}catch(a){b=!0}return Za.isActive_=b},Xc=/[A-Z]/g,$c={full:"1.2.28",major:1,minor:2,dot:28,codeName:"finnish-disembarkation"};S.expando="ng339";var cb=S.cache={},me=1,sb=W.document.addEventListener?function(b,a,c){b.addEventListener(a,c,!1)}:function(b,a,c){b.attachEvent("on"+a,c)},bb=W.document.removeEventListener?function(b,a,c){b.removeEventListener(a,c,!1)}:function(b,a,c){b.detachEvent("on"+a,c)};S._data=function(b){return this.cache[b[this.expando]]||
{}};var he=/([\:\-\_]+(.))/g,ie=/^moz([A-Z])/,Hb=z("jqLite"),je=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Ib=/<|&#?\w+;/,ke=/<([\w:]+)/,le=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,da={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};da.optgroup=da.option;da.tbody=da.tfoot=da.colgroup=
da.caption=da.thead;da.th=da.td;var Oa=S.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===X.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),S(W).on("load",a))},toString:function(){var b=[];r(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?A(this[b]):A(this[this.length+b])},length:0,push:Pe,sort:[].sort,splice:[].splice},rb={};r("multiple selected checked disabled readOnly required open".split(" "),function(b){rb[x(b)]=b});
var pc={};r("input select option textarea button form details".split(" "),function(b){pc[La(b)]=!0});r({data:Mb,removeData:Lb},function(b,a){S[a]=b});r({data:Mb,inheritedData:qb,scope:function(b){return A.data(b,"$scope")||qb(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return A.data(b,"$isolateScope")||A.data(b,"$isolateScopeNoTemplate")},controller:mc,injector:function(b){return qb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Nb,css:function(b,
a,c){a=ab(a);if(D(c))b.style[a]=c;else{var d;8>=R&&(d=b.currentStyle&&b.currentStyle[a],""===d&&(d="auto"));d=d||b.style[a];8>=R&&(d=""===d?u:d);return d}},attr:function(b,a,c){var d=x(a);if(rb[d])if(D(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||v).specified?d:u;else if(D(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?u:b},prop:function(b,a,c){if(D(c))b[a]=c;else return b[a]},text:function(){function b(b,
d){var e=a[b.nodeType];if(F(d))return e?b[e]:"";b[e]=d}var a=[];9>R?(a[1]="innerText",a[3]="nodeValue"):a[1]=a[3]="textContent";b.$dv="";return b}(),val:function(b,a){if(F(a)){if("SELECT"===Pa(b)&&b.multiple){var c=[];r(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(F(a))return b.innerHTML;for(var c=0,d=b.childNodes;c<d.length;c++)Ma(d[c]);b.innerHTML=a},empty:nc},function(b,a){S.prototype[a]=function(a,d){var e,
f,g=this.length;if(b!==nc&&(2==b.length&&b!==Nb&&b!==mc?a:d)===u){if(T(a)){for(e=0;e<g;e++)if(b===Mb)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===u?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});r({removeData:Lb,dealoc:Ma,on:function a(c,d,e,f){if(D(f))throw Hb("onargs");var g=pa(c,"events"),h=pa(c,"handle");g||pa(c,"events",g={});h||pa(c,"handle",h=ne(c,g));r(d.split(" "),function(d){var f=g[d];if(!f){if("mouseenter"==
d||"mouseleave"==d){var l=X.body.contains||X.body.compareDocumentPosition?function(a,c){var d=9===a.nodeType?a.documentElement:a,e=c&&c.parentNode;return a===e||!!(e&&1===e.nodeType&&(d.contains?d.contains(e):a.compareDocumentPosition&&a.compareDocumentPosition(e)&16))}:function(a,c){if(c)for(;c=c.parentNode;)if(c===a)return!0;return!1};g[d]=[];a(c,{mouseleave:"mouseout",mouseenter:"mouseover"}[d],function(a){var c=a.relatedTarget;c&&(c===this||l(this,c))||h(a,d)})}else sb(c,d,h),g[d]=[];f=g[d]}f.push(e)})},
off:lc,one:function(a,c,d){a=A(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;Ma(a);r(new S(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];r(a.childNodes,function(a){1===a.nodeType&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){r(new S(c),function(c){1!==a.nodeType&&11!==a.nodeType||a.appendChild(c)})},prepend:function(a,
c){if(1===a.nodeType){var d=a.firstChild;r(new S(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=A(c)[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:function(a){Ma(a);var c=a.parentNode;c&&c.removeChild(a)},after:function(a,c){var d=a,e=a.parentNode;r(new S(c),function(a){e.insertBefore(a,d.nextSibling);d=a})},addClass:pb,removeClass:ob,toggleClass:function(a,c,d){c&&r(c.split(" "),function(c){var f=d;F(f)&&(f=!Nb(a,c));(f?pb:ob)(a,c)})},parent:function(a){return(a=
a.parentNode)&&11!==a.nodeType?a:null},next:function(a){if(a.nextElementSibling)return a.nextElementSibling;for(a=a.nextSibling;null!=a&&1!==a.nodeType;)a=a.nextSibling;return a},find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Kb,triggerHandler:function(a,c,d){var e,f;e=c.type||c;var g=(pa(a,"events")||{})[e];g&&(e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopPropagation:v,type:e,target:a},
c.type&&(e=E(e,c)),c=ha(g),f=d?[e].concat(d):[e],r(c,function(c){c.apply(a,f)}))}},function(a,c){S.prototype[c]=function(c,e,f){for(var g,h=0;h<this.length;h++)F(g)?(g=a(this[h],c,e,f),D(g)&&(g=A(g))):Jb(g,a(this[h],c,e,f));return D(g)?g:this};S.prototype.bind=S.prototype.on;S.prototype.unbind=S.prototype.off});db.prototype={put:function(a,c){this[Na(a,this.nextUid)]=c},get:function(a){return this[Na(a,this.nextUid)]},remove:function(a){var c=this[a=Na(a,this.nextUid)];delete this[a];return c}};var pe=
/^function\s*[^\(]*\(\s*([^\)]*)\)/m,qe=/,/,re=/^\s*(_?)(\S+?)\1\s*$/,oe=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,eb=z("$injector"),Qe=z("$animate"),Ld=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Qe("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null);return this.$$classNameFilter};this.$get=["$timeout","$$asyncCallback",
function(a,d){return{enter:function(a,c,g,h){g?g.after(a):(c&&c[0]||(c=g.parent()),c.append(a));h&&d(h)},leave:function(a,c){a.remove();c&&d(c)},move:function(a,c,d,h){this.enter(a,c,d,h)},addClass:function(a,c,g){c=G(c)?c:L(c)?c.join(" "):"";r(a,function(a){pb(a,c)});g&&d(g)},removeClass:function(a,c,g){c=G(c)?c:L(c)?c.join(" "):"";r(a,function(a){ob(a,c)});g&&d(g)},setClass:function(a,c,g,h){r(a,function(a){pb(a,c);ob(a,g)});h&&d(h)},enabled:v}}]}],ja=z("$compile");gc.$inject=["$provide","$$sanitizeUriProvider"];
var we=/^(x[\:\-_]|data[\:\-_])/i,wc=z("$interpolate"),Re=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,ze={http:80,https:443,ftp:21},Sb=z("$location");Ac.prototype=Tb.prototype=zc.prototype={$$html5:!1,$$replace:!1,absUrl:tb("$$absUrl"),url:function(a){if(F(a))return this.$$url;a=Re.exec(a);a[1]&&this.path(decodeURIComponent(a[1]));(a[2]||a[1])&&this.search(a[3]||"");this.hash(a[5]||"");return this},protocol:tb("$$protocol"),host:tb("$$host"),port:tb("$$port"),path:Bc("$$path",function(a){a=null!==a?a.toString():
"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(G(a)||jb(a))a=a.toString(),this.$$search=cc(a);else if(T(a))r(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw Sb("isrcharg");break;default:F(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:Bc("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};var la=z("$parse"),Ec=
{},ya,Se=Function.prototype.call,Te=Function.prototype.apply,Pc=Function.prototype.bind,hb={"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:v,"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return D(d)?D(e)?d+e:d:D(e)?e:u},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(D(d)?d:0)-(D(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"^":function(a,c,d,e){return d(a,c)^
e(a,c)},"=":v,"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"&":function(a,c,d,e){return d(a,
c)&e(a,c)},"|":function(a,c,d,e){return e(a,c)(a,c,d(a,c))},"!":function(a,c,d){return!d(a,c)}},Ue={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},Ub=function(a){this.options=a};Ub.prototype={constructor:Ub,lex:function(a){this.text=a;this.index=0;this.ch=u;this.lastCh=":";for(this.tokens=[];this.index<this.text.length;){this.ch=this.text.charAt(this.index);if(this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent();
else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch}),this.index++;else if(this.isWhitespace(this.ch)){this.index++;continue}else{a=this.ch+this.peek();var c=a+this.peek(2),d=hb[this.ch],e=hb[a],f=hb[c];f?(this.tokens.push({index:this.index,text:c,fn:f}),this.index+=3):e?(this.tokens.push({index:this.index,text:a,fn:e}),this.index+=2):d?(this.tokens.push({index:this.index,text:this.ch,fn:d}),this.index+=1):this.throwError("Unexpected next character ",this.index,this.index+
1)}this.lastCh=this.ch}return this.tokens},is:function(a){return-1!==a.indexOf(this.ch)},was:function(a){return-1!==a.indexOf(this.lastCh)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},
throwError:function(a,c,d){d=d||this.index;c=D(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw la("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=x(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-
1))break;else this.throwError("Invalid exponent")}this.index++}a*=1;this.tokens.push({index:c,text:a,literal:!0,constant:!0,fn:function(){return a}})},readIdent:function(){for(var a=this,c="",d=this.index,e,f,g,h;this.index<this.text.length;){h=this.text.charAt(this.index);if("."===h||this.isIdent(h)||this.isNumber(h))"."===h&&(e=this.index),c+=h;else break;this.index++}if(e)for(f=this.index;f<this.text.length;){h=this.text.charAt(f);if("("===h){g=c.substr(e-d+1);c=c.substr(0,e-d);this.index=f;break}if(this.isWhitespace(h))f++;
else break}d={index:d,text:c};if(hb.hasOwnProperty(c))d.fn=hb[c],d.literal=!0,d.constant=!0;else{var k=Dc(c,this.options,this.text);d.fn=E(function(a,c){return k(a,c)},{assign:function(d,e){return ub(d,c,e,a.text,a.options)}})}this.tokens.push(d);g&&(this.tokens.push({index:e,text:"."}),this.tokens.push({index:e+1,text:g}))},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+
1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d+=Ue[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,string:d,literal:!0,constant:!0,fn:function(){return d}});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var gb=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};gb.ZERO=E(function(){return 0},{constant:!0});gb.prototype={constructor:gb,
parse:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);a.literal=!!a.literal;a.constant=!!a.constant;return a},primary:function(){var a;if(this.expect("("))a=this.filterChain(),this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();else if(this.expect("{"))a=this.object();else{var c=this.expect();(a=c.fn)||this.throwError("not a primary expression",c);a.literal=!!c.literal;a.constant=
!!c.constant}for(var d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw la("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw la("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){if(0<this.tokens.length){var f=this.tokens[0],g=f.text;if(g===
a||g===c||g===d||g===e||!(a||c||d||e))return f}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},consume:function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},unaryFn:function(a,c){return E(function(d,e){return a(d,e,c)},{constant:c.constant})},ternaryFn:function(a,c,d){return E(function(e,f){return a(e,f)?c(e,f):d(e,f)},{constant:a.constant&&c.constant&&d.constant})},binaryFn:function(a,c,d){return E(function(e,f){return c(e,
f,a,d)},{constant:a.constant&&d.constant})},statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,f=0;f<a.length;f++){var g=a[f];g&&(e=g(c,d))}return e}},filterChain:function(){for(var a=this.expression(),c;;)if(c=this.expect("|"))a=this.binaryFn(a,c.fn,this.filter());else return a},filter:function(){for(var a=this.expect(),c=this.$filter(a.text),d=[];;)if(a=this.expect(":"))d.push(this.expression());
else{var e=function(a,e,h){h=[h];for(var k=0;k<d.length;k++)h.push(d[k](a,e));return c.apply(a,h)};return function(){return e}}},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),function(d,f){return a.assign(d,c(d,f),f)}):a},ternary:function(){var a=this.logicalOR(),c,d;if(this.expect("?")){c=this.assignment();
if(d=this.expect(":"))return this.ternaryFn(a,c,this.assignment());this.throwError("expected :",d)}else return a},logicalOR:function(){for(var a=this.logicalAND(),c;;)if(c=this.expect("||"))a=this.binaryFn(a,c.fn,this.logicalAND());else return a},logicalAND:function(){var a=this.equality(),c;if(c=this.expect("&&"))a=this.binaryFn(a,c.fn,this.logicalAND());return a},equality:function(){var a=this.relational(),c;if(c=this.expect("==","!=","===","!=="))a=this.binaryFn(a,c.fn,this.equality());return a},
relational:function(){var a=this.additive(),c;if(c=this.expect("<",">","<=",">="))a=this.binaryFn(a,c.fn,this.relational());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.fn,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.fn,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(gb.ZERO,a.fn,
this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):this.primary()},fieldAccess:function(a){var c=this,d=this.expect().text,e=Dc(d,this.options,this.text);return E(function(c,d,h){return e(h||a(c,d))},{assign:function(e,g,h){(h=a(e,h))||a.assign(e,h={});return ub(h,d,g,c.text,c.options)}})},objectIndex:function(a){var c=this,d=this.expression();this.consume("]");return E(function(e,f){var g=a(e,f),h=d(e,f),k;ka(h,c.text);if(!g)return u;(g=ma(g[h],c.text))&&(g.then&&c.options.unwrapPromises)&&
(k=g,"$$v"in g||(k.$$v=u,k.then(function(a){k.$$v=a})),g=g.$$v);return g},{assign:function(e,f,g){var h=ka(d(e,g),c.text);(g=ma(a(e,g),c.text))||a.assign(e,g={});return g[h]=f}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");var e=this;return function(f,g){for(var h=[],k=c?c(f,g):f,m=0;m<d.length;m++)h.push(ma(d[m](f,g),e.text));m=a(f,g,k)||v;ma(k,e.text);var l=e.text;if(m){if(m.constructor===m)throw la("isecfn",
l);if(m===Se||m===Te||Pc&&m===Pc)throw la("isecff",l);}h=m.apply?m.apply(k,h):m(h[0],h[1],h[2],h[3],h[4]);return ma(h,e.text)}},arrayDeclaration:function(){var a=[],c=!0;if("]"!==this.peekToken().text){do{if(this.peek("]"))break;var d=this.expression();a.push(d);d.constant||(c=!1)}while(this.expect(","))}this.consume("]");return E(function(c,d){for(var g=[],h=0;h<a.length;h++)g.push(a[h](c,d));return g},{literal:!0,constant:c})},object:function(){var a=[],c=!0;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;
var d=this.expect(),d=d.string||d.text;this.consume(":");var e=this.expression();a.push({key:d,value:e});e.constant||(c=!1)}while(this.expect(","))}this.consume("}");return E(function(c,d){for(var e={},k=0;k<a.length;k++){var m=a[k];e[m.key]=m.value(c,d)}return e},{literal:!0,constant:c})}};var Ce={},Be={},za=z("$sce"),fa={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},Y=X.createElement("a"),Gc=xa(W.location.href,!0);kc.$inject=["$provide"];Hc.$inject=["$locale"];Jc.$inject=["$locale"];
var Mc=".",Me={yyyy:Z("FullYear",4),yy:Z("FullYear",2,0,!0),y:Z("FullYear",1),MMMM:vb("Month"),MMM:vb("Month",!0),MM:Z("Month",2,1),M:Z("Month",1,1),dd:Z("Date",2),d:Z("Date",1),HH:Z("Hours",2),H:Z("Hours",1),hh:Z("Hours",2,-12),h:Z("Hours",1,-12),mm:Z("Minutes",2),m:Z("Minutes",1),ss:Z("Seconds",2),s:Z("Seconds",1),sss:Z("Milliseconds",3),EEEE:vb("Day"),EEE:vb("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Vb(Math[0<
a?"floor":"ceil"](a/60),2)+Vb(Math.abs(a%60),2))}},Le=/((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,Ke=/^\-?\d+$/;Ic.$inject=["$locale"];var Ie=aa(x),Je=aa(La);Kc.$inject=["$parse"];var cd=aa({restrict:"E",compile:function(a,c){8>=R&&(c.href||c.name||c.$set("href",""),a.append(X.createComment("IE fix")));if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){var f="[object SVGAnimatedString]"===Ba.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||
a.preventDefault()})}}}),Fb={};r(rb,function(a,c){if("multiple"!=a){var d=qa("ng-"+c);Fb[d]=function(){return{priority:100,link:function(a,f,g){a.$watch(g[d],function(a){g.$set(c,!!a)})}}}}});r(["src","srcset","href"],function(a){var c=qa("ng-"+a);Fb[c]=function(){return{priority:99,link:function(d,e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===Ba.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",g=null);f.$observe(c,function(c){c?(f.$set(h,c),R&&g&&e.prop(g,f[h])):"href"===
a&&f.$set(h,null)})}}}});var yb={$addControl:v,$removeControl:v,$setValidity:v,$setDirty:v,$setPristine:v};Nc.$inject=["$element","$attrs","$scope","$animate"];var Qc=function(a){return["$timeout",function(c){return{name:"form",restrict:a?"EAC":"E",controller:Nc,compile:function(){return{pre:function(a,e,f,g){if(!f.action){var h=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1};sb(e[0],"submit",h);e.on("$destroy",function(){c(function(){bb(e[0],"submit",h)},0,!1)})}var k=e.parent().controller("form"),
m=f.name||f.ngForm;m&&ub(a,m,g,m);if(k)e.on("$destroy",function(){k.$removeControl(g);m&&ub(a,m,u,m);E(g,yb)})}}}}}]},dd=Qc(),qd=Qc(!0),Ve=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,We=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,Xe=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,Rc={text:Ab,number:function(a,c,d,e,f,g){Ab(a,c,d,e,f,g);e.$parsers.push(function(a){var c=e.$isEmpty(a);if(c||Xe.test(a))return e.$setValidity("number",
!0),""===a?null:c?a:parseFloat(a);e.$setValidity("number",!1);return u});Ne(e,"number",Ye,null,e.$$validityState);e.$formatters.push(function(a){return e.$isEmpty(a)?"":""+a});d.min&&(a=function(a){var c=parseFloat(d.min);return ua(e,"min",e.$isEmpty(a)||a>=c,a)},e.$parsers.push(a),e.$formatters.push(a));d.max&&(a=function(a){var c=parseFloat(d.max);return ua(e,"max",e.$isEmpty(a)||a<=c,a)},e.$parsers.push(a),e.$formatters.push(a));e.$formatters.push(function(a){return ua(e,"number",e.$isEmpty(a)||
jb(a),a)})},url:function(a,c,d,e,f,g){Ab(a,c,d,e,f,g);a=function(a){return ua(e,"url",e.$isEmpty(a)||Ve.test(a),a)};e.$formatters.push(a);e.$parsers.push(a)},email:function(a,c,d,e,f,g){Ab(a,c,d,e,f,g);a=function(a){return ua(e,"email",e.$isEmpty(a)||We.test(a),a)};e.$formatters.push(a);e.$parsers.push(a)},radio:function(a,c,d,e){F(d.name)&&c.attr("name",ib());c.on("click",function(){c[0].checked&&a.$apply(function(){e.$setViewValue(d.value)})});e.$render=function(){c[0].checked=d.value==e.$viewValue};
d.$observe("value",e.$render)},checkbox:function(a,c,d,e){var f=d.ngTrueValue,g=d.ngFalseValue;G(f)||(f=!0);G(g)||(g=!1);c.on("click",function(){a.$apply(function(){e.$setViewValue(c[0].checked)})});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return a!==f};e.$formatters.push(function(a){return a===f});e.$parsers.push(function(a){return a?f:g})},hidden:v,button:v,submit:v,reset:v,file:v},Ye=["badInput"],hc=["$browser","$sniffer",function(a,c){return{restrict:"E",require:"?ngModel",
link:function(d,e,f,g){g&&(Rc[x(f.type)]||Rc.text)(d,e,f,g,c,a)}}}],wb="ng-valid",xb="ng-invalid",Ra="ng-pristine",zb="ng-dirty",Ze=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate",function(a,c,d,e,f,g){function h(a,c){c=c?"-"+nb(c,"-"):"";g.removeClass(e,(a?xb:wb)+c);g.addClass(e,(a?wb:xb)+c)}this.$modelValue=this.$viewValue=Number.NaN;this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$name=
d.name;var k=f(d.ngModel),m=k.assign;if(!m)throw z("ngModel")("nonassign",d.ngModel,ia(e));this.$render=v;this.$isEmpty=function(a){return F(a)||""===a||null===a||a!==a};var l=e.inheritedData("$formController")||yb,n=0,q=this.$error={};e.addClass(Ra);h(!0);this.$setValidity=function(a,c){q[a]!==!c&&(c?(q[a]&&n--,n||(h(!0),this.$valid=!0,this.$invalid=!1)):(h(!1),this.$invalid=!0,this.$valid=!1,n++),q[a]=!c,h(c,a),l.$setValidity(a,c,this))};this.$setPristine=function(){this.$dirty=!1;this.$pristine=
!0;g.removeClass(e,zb);g.addClass(e,Ra)};this.$setViewValue=function(d){this.$viewValue=d;this.$pristine&&(this.$dirty=!0,this.$pristine=!1,g.removeClass(e,Ra),g.addClass(e,zb),l.$setDirty());r(this.$parsers,function(a){d=a(d)});this.$modelValue!==d&&(this.$modelValue=d,m(a,d),r(this.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}}))};var p=this;a.$watch(function(){var c=k(a);if(p.$modelValue!==c){var d=p.$formatters,e=d.length;for(p.$modelValue=c;e--;)c=d[e](c);p.$viewValue!==c&&(p.$viewValue=
c,p.$render())}return c})}],Fd=function(){return{require:["ngModel","^?form"],controller:Ze,link:function(a,c,d,e){var f=e[0],g=e[1]||yb;g.$addControl(f);a.$on("$destroy",function(){g.$removeControl(f)})}}},Hd=aa({require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),ic=function(){return{require:"?ngModel",link:function(a,c,d,e){if(e){d.required=!0;var f=function(a){if(d.required&&e.$isEmpty(a))e.$setValidity("required",!1);else return e.$setValidity("required",
!0),a};e.$formatters.push(f);e.$parsers.unshift(f);d.$observe("required",function(){f(e.$viewValue)})}}}},Gd=function(){return{require:"ngModel",link:function(a,c,d,e){var f=(a=/\/(.*)\//.exec(d.ngList))&&RegExp(a[1])||d.ngList||",";e.$parsers.push(function(a){if(!F(a)){var c=[];a&&r(a.split(f),function(a){a&&c.push($(a))});return c}});e.$formatters.push(function(a){return L(a)?a.join(", "):u});e.$isEmpty=function(a){return!a||!a.length}}}},$e=/^(true|false|\d+)$/,Id=function(){return{priority:100,
compile:function(a,c){return $e.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},id=Aa({compile:function(a){a.addClass("ng-binding");return function(a,d,e){d.data("$binding",e.ngBind);a.$watch(e.ngBind,function(a){d.text(a==u?"":a)})}}}),kd=["$interpolate",function(a){return function(c,d,e){c=a(d.attr(e.$attr.ngBindTemplate));d.addClass("ng-binding").data("$binding",c);e.$observe("ngBindTemplate",function(a){d.text(a)})}}],
jd=["$sce","$parse",function(a,c){return{compile:function(d){d.addClass("ng-binding");return function(d,f,g){f.data("$binding",g.ngBindHtml);var h=c(g.ngBindHtml);d.$watch(function(){return(h(d)||"").toString()},function(c){f.html(a.getTrustedHtml(h(d))||"")})}}}}],ld=Wb("",!0),nd=Wb("Odd",0),md=Wb("Even",1),od=Aa({compile:function(a,c){c.$set("ngCloak",u);a.removeClass("ng-cloak")}}),pd=[function(){return{scope:!0,controller:"@",priority:500}}],jc={},af={blur:!0,focus:!0};r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),
function(a){var c=qa("ng-"+a);jc[c]=["$parse","$rootScope",function(d,e){return{compile:function(f,g){var h=d(g[c],!0);return function(c,d){d.on(a,function(d){var f=function(){h(c,{$event:d})};af[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var sd=["$animate",function(a){return{transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,k,m;c.$watch(e.ngIf,function(f){Wa(f)?k||(k=c.$new(),g(k,function(c){c[c.length++]=X.createComment(" end ngIf: "+e.ngIf+
" ");h={clone:c};a.enter(c,d.parent(),d)})):(m&&(m.remove(),m=null),k&&(k.$destroy(),k=null),h&&(m=Eb(h.clone),a.leave(m,function(){m=null}),h=null))})}}}],td=["$http","$templateCache","$anchorScroll","$animate","$sce",function(a,c,d,e,f){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:Xa.noop,compile:function(g,h){var k=h.ngInclude||h.src,m=h.onload||"",l=h.autoscroll;return function(g,h,p,r,J){var w=0,t,y,u,B=function(){y&&(y.remove(),y=null);t&&(t.$destroy(),t=null);
u&&(e.leave(u,function(){y=null}),y=u,u=null)};g.$watch(f.parseAsResourceUrl(k),function(f){var k=function(){!D(l)||l&&!g.$eval(l)||d()},p=++w;f?(a.get(f,{cache:c}).success(function(a){if(p===w){var c=g.$new();r.template=a;a=J(c,function(a){B();e.enter(a,null,h,k)});t=c;u=a;t.$emit("$includeContentLoaded");g.$eval(m)}}).error(function(){p===w&&B()}),g.$emit("$includeContentRequested")):(B(),r.template=null)})}}}}],Jd=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",
link:function(c,d,e,f){d.html(f.template);a(d.contents())(c)}}}],ud=Aa({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),vd=Aa({terminal:!0,priority:1E3}),wd=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",link:function(e,f,g){var h=g.count,k=g.$attr.when&&f.attr(g.$attr.when),m=g.offset||0,l=e.$eval(k)||{},n={},q=c.startSymbol(),p=c.endSymbol(),s=/^when(Minus)?(.+)$/;r(g,function(a,c){s.test(c)&&(l[x(c.replace("when","").replace("Minus","-"))]=
f.attr(g.$attr[c]))});r(l,function(a,e){n[e]=c(a.replace(d,q+h+"-"+m+p))});e.$watch(function(){var c=parseFloat(e.$eval(h));if(isNaN(c))return"";c in l||(c=a.pluralCat(c-m));return n[c](e,f,!0)},function(a){f.text(a)})}}}],xd=["$parse","$animate",function(a,c){var d=z("ngRepeat");return{transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,link:function(e,f,g,h,k){var m=g.ngRepeat,l=m.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),n,q,p,s,u,w,t={$id:Na};if(!l)throw d("iexp",
m);g=l[1];h=l[2];(l=l[3])?(n=a(l),q=function(a,c,d){w&&(t[w]=a);t[u]=c;t.$index=d;return n(e,t)}):(p=function(a,c){return Na(c)},s=function(a){return a});l=g.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!l)throw d("iidexp",g);u=l[3]||l[1];w=l[2];var y={};e.$watchCollection(h,function(a){var g,h,l=f[0],n,t={},D,C,I,x,G,v,z,F=[];if(Sa(a))v=a,G=q||p;else{G=q||s;v=[];for(I in a)a.hasOwnProperty(I)&&"$"!=I.charAt(0)&&v.push(I);v.sort()}D=v.length;h=F.length=v.length;for(g=0;g<h;g++)if(I=a===
v?g:v[g],x=a[I],n=G(I,x,g),Ea(n,"`track by` id"),y.hasOwnProperty(n))z=y[n],delete y[n],t[n]=z,F[g]=z;else{if(t.hasOwnProperty(n))throw r(F,function(a){a&&a.scope&&(y[a.id]=a)}),d("dupes",m,n,oa(x));F[g]={id:n};t[n]=!1}for(I in y)y.hasOwnProperty(I)&&(z=y[I],g=Eb(z.clone),c.leave(g),r(g,function(a){a.$$NG_REMOVED=!0}),z.scope.$destroy());g=0;for(h=v.length;g<h;g++){I=a===v?g:v[g];x=a[I];z=F[g];F[g-1]&&(l=F[g-1].clone[F[g-1].clone.length-1]);if(z.scope){C=z.scope;n=l;do n=n.nextSibling;while(n&&n.$$NG_REMOVED);
z.clone[0]!=n&&c.move(Eb(z.clone),null,A(l));l=z.clone[z.clone.length-1]}else C=e.$new();C[u]=x;w&&(C[w]=I);C.$index=g;C.$first=0===g;C.$last=g===D-1;C.$middle=!(C.$first||C.$last);C.$odd=!(C.$even=0===(g&1));z.scope||k(C,function(a){a[a.length++]=X.createComment(" end ngRepeat: "+m+" ");c.enter(a,null,A(l));l=a;z.scope=C;z.clone=a;t[z.id]=z})}y=t})}}}],yd=["$animate",function(a){return function(c,d,e){c.$watch(e.ngShow,function(c){a[Wa(c)?"removeClass":"addClass"](d,"ng-hide")})}}],rd=["$animate",
function(a){return function(c,d,e){c.$watch(e.ngHide,function(c){a[Wa(c)?"addClass":"removeClass"](d,"ng-hide")})}}],zd=Aa(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&r(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),Ad=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],h=[],k=[],m=[];c.$watch(e.ngSwitch||e.on,function(d){var n,q;n=0;for(q=k.length;n<q;++n)k[n].remove();n=k.length=0;for(q=
m.length;n<q;++n){var p=h[n];m[n].$destroy();k[n]=p;a.leave(p,function(){k.splice(n,1)})}h.length=0;m.length=0;if(g=f.cases["!"+d]||f.cases["?"])c.$eval(e.change),r(g,function(d){var e=c.$new();m.push(e);d.transclude(e,function(c){var e=d.element;h.push(c);a.enter(c,e.parent(),e)})})})}}}],Bd=Aa({transclude:"element",priority:800,require:"^ngSwitch",link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),Cd=
Aa({transclude:"element",priority:800,require:"^ngSwitch",link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),Ed=Aa({link:function(a,c,d,e,f){if(!f)throw z("ngTransclude")("orphan",ia(c));f(function(a){c.empty();c.append(a)})}}),ed=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],bf=z("ngOptions"),Dd=aa({terminal:!0}),fd=["$compile","$parse",function(a,c){var d=
/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,e={$setViewValue:v};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var k=this,m={},l=e,n;k.databound=d.ngModel;k.init=function(a,c,d){l=a;n=d};k.addOption=function(c){Ea(c,'"option value"');m[c]=!0;l.$viewValue==c&&(a.val(c),n.parent()&&n.remove())};
k.removeOption=function(a){this.hasOption(a)&&(delete m[a],l.$viewValue==a&&this.renderUnknownOption(a))};k.renderUnknownOption=function(c){c="? "+Na(c)+" ?";n.val(c);a.prepend(n);a.val(c);n.prop("selected",!0)};k.hasOption=function(a){return m.hasOwnProperty(a)};c.$on("$destroy",function(){k.renderUnknownOption=v})}],link:function(e,g,h,k){function m(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(x.parent()&&x.remove(),c.val(a),""===a&&w.prop("selected",!0)):F(a)&&w?c.val(""):e.renderUnknownOption(a)};
c.on("change",function(){a.$apply(function(){x.parent()&&x.remove();d.$setViewValue(c.val())})})}function l(a,c,d){var e;d.$render=function(){var a=new db(d.$viewValue);r(c.find("option"),function(c){c.selected=D(a.get(c.value))})};a.$watch(function(){Ca(e,d.$viewValue)||(e=ha(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];r(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function n(e,f,g){function h(){var a={"":[]},c=[""],d,k,
s,u,v;s=g.$modelValue;u=A(e)||[];var F=n?Xb(u):u,G,Q,C;Q={};C=!1;if(p)if(k=g.$modelValue,w&&L(k))for(C=new db([]),d={},v=0;v<k.length;v++)d[m]=k[v],C.put(w(e,d),k[v]);else C=new db(k);v=C;var E,K;for(C=0;G=F.length,C<G;C++){k=C;if(n){k=F[C];if("$"===k.charAt(0))continue;Q[n]=k}Q[m]=u[k];d=r(e,Q)||"";(k=a[d])||(k=a[d]=[],c.push(d));p?d=D(v.remove(w?w(e,Q):x(e,Q))):(w?(d={},d[m]=s,d=w(e,d)===w(e,Q)):d=s===x(e,Q),v=v||d);E=l(e,Q);E=D(E)?E:"";k.push({id:w?w(e,Q):n?F[C]:C,label:E,selected:d})}p||(z||null===
s?a[""].unshift({id:"",label:"",selected:!v}):v||a[""].unshift({id:"?",label:"",selected:!0}));Q=0;for(F=c.length;Q<F;Q++){d=c[Q];k=a[d];B.length<=Q?(s={element:y.clone().attr("label",d),label:k.label},u=[s],B.push(u),f.append(s.element)):(u=B[Q],s=u[0],s.label!=d&&s.element.attr("label",s.label=d));E=null;C=0;for(G=k.length;C<G;C++)d=k[C],(v=u[C+1])?(E=v.element,v.label!==d.label&&(E.text(v.label=d.label),E.prop("label",v.label)),v.id!==d.id&&E.val(v.id=d.id),E[0].selected!==d.selected&&(E.prop("selected",
v.selected=d.selected),R&&E.prop("selected",v.selected))):(""===d.id&&z?K=z:(K=t.clone()).val(d.id).prop("selected",d.selected).attr("selected",d.selected).prop("label",d.label).text(d.label),u.push({element:K,label:d.label,id:d.id,selected:d.selected}),q.addOption(d.label,K),E?E.after(K):s.element.append(K),E=K);for(C++;u.length>C;)d=u.pop(),q.removeOption(d.label),d.element.remove()}for(;B.length>Q;)B.pop()[0].element.remove()}var k;if(!(k=s.match(d)))throw bf("iexp",s,ia(f));var l=c(k[2]||k[1]),
m=k[4]||k[6],n=k[5],r=c(k[3]||""),x=c(k[2]?k[1]:m),A=c(k[7]),w=k[8]?c(k[8]):null,B=[[{element:f,label:""}]];z&&(a(z)(e),z.removeClass("ng-scope"),z.remove());f.empty();f.on("change",function(){e.$apply(function(){var a,c=A(e)||[],d={},k,l,q,r,s,t,v;if(p)for(l=[],r=0,t=B.length;r<t;r++)for(a=B[r],q=1,s=a.length;q<s;q++){if((k=a[q].element)[0].selected){k=k.val();n&&(d[n]=k);if(w)for(v=0;v<c.length&&(d[m]=c[v],w(e,d)!=k);v++);else d[m]=c[k];l.push(x(e,d))}}else if(k=f.val(),"?"==k)l=u;else if(""===
k)l=null;else if(w)for(v=0;v<c.length;v++){if(d[m]=c[v],w(e,d)==k){l=x(e,d);break}}else d[m]=c[k],n&&(d[n]=k),l=x(e,d);g.$setViewValue(l);h()})});g.$render=h;e.$watchCollection(A,h);e.$watchCollection(function(){var a={},c=A(e);if(c){for(var d=Array(c.length),f=0,g=c.length;f<g;f++)a[m]=c[f],d[f]=l(e,a);return d}},h);p&&e.$watchCollection(function(){return g.$modelValue},h)}if(k[1]){var q=k[0];k=k[1];var p=h.multiple,s=h.ngOptions,z=!1,w,t=A(X.createElement("option")),y=A(X.createElement("optgroup")),
x=t.clone();h=0;for(var B=g.children(),v=B.length;h<v;h++)if(""===B[h].value){w=z=B.eq(h);break}q.init(k,z,x);p&&(k.$isEmpty=function(a){return!a||0===a.length});s?n(e,g,k):p?l(e,g,k):m(e,g,k,q)}}}}],hd=["$interpolate",function(a){var c={addOption:v,removeOption:v};return{restrict:"E",priority:100,compile:function(d,e){if(F(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var m=d.parent(),l=m.data("$selectController")||m.parent().data("$selectController");l&&l.databound?
d.prop("selected",!1):l=c;f?a.$watch(f,function(a,c){e.$set("value",a);a!==c&&l.removeOption(c);l.addOption(a)}):l.addOption(e.value);d.on("$destroy",function(){l.removeOption(e.value)})}}}}],gd=aa({restrict:"E",terminal:!0});W.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):((Fa=W.jQuery)&&Fa.fn.on?(A=Fa,E(Fa.fn,{scope:Oa.scope,isolateScope:Oa.isolateScope,controller:Oa.controller,injector:Oa.injector,inheritedData:Oa.inheritedData}),Gb("remove",!0,!0,!1),Gb("empty",
!1,!1,!1),Gb("html",!1,!1,!0)):A=S,Xa.element=A,Zc(Xa),A(X).ready(function(){Wc(X,dc)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>');
//# sourceMappingURL=angular.min.js.map

/*
 AngularJS v1.2.28
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,f,n){'use strict';f.module("ngCookies",["ng"]).factory("$cookies",["$rootScope","$browser",function(e,b){var c={},g={},h,k=!1,l=f.copy,m=f.isUndefined;b.addPollFn(function(){var a=b.cookies();h!=a&&(h=a,l(a,g),l(a,c),k&&e.$apply())})();k=!0;e.$watch(function(){var a,d,e;for(a in g)m(c[a])&&b.cookies(a,n);for(a in c)d=c[a],f.isString(d)||(d=""+d,c[a]=d),d!==g[a]&&(b.cookies(a,d),e=!0);if(e)for(a in d=b.cookies(),c)c[a]!==d[a]&&(m(d[a])?delete c[a]:c[a]=d[a])});return c}]).factory("$cookieStore",
["$cookies",function(e){return{get:function(b){return(b=e[b])?f.fromJson(b):b},put:function(b,c){e[b]=f.toJson(c)},remove:function(b){delete e[b]}}}])})(window,window.angular);
//# sourceMappingURL=angular-cookies.min.js.map

/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.12.0 - 2014-11-16
 * License: MIT
 */
angular.module("ui.bootstrap",["ui.bootstrap.transition","ui.bootstrap.collapse","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.bindHtml","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.dateparser","ui.bootstrap.position","ui.bootstrap.datepicker","ui.bootstrap.dropdown","ui.bootstrap.modal","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]),angular.module("ui.bootstrap.transition",[]).factory("$transition",["$q","$timeout","$rootScope",function(a,b,c){function d(a){for(var b in a)if(void 0!==f.style[b])return a[b]}var e=function(d,f,g){g=g||{};var h=a.defer(),i=e[g.animation?"animationEndEventName":"transitionEndEventName"],j=function(){c.$apply(function(){d.unbind(i,j),h.resolve(d)})};return i&&d.bind(i,j),b(function(){angular.isString(f)?d.addClass(f):angular.isFunction(f)?f(d):angular.isObject(f)&&d.css(f),i||h.resolve(d)}),h.promise.cancel=function(){i&&d.unbind(i,j),h.reject("Transition cancelled")},h.promise},f=document.createElement("trans"),g={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"},h={WebkitTransition:"webkitAnimationEnd",MozTransition:"animationend",OTransition:"oAnimationEnd",transition:"animationend"};return e.transitionEndEventName=d(g),e.animationEndEventName=d(h),e}]),angular.module("ui.bootstrap.collapse",["ui.bootstrap.transition"]).directive("collapse",["$transition",function(a){return{link:function(b,c,d){function e(b){function d(){j===e&&(j=void 0)}var e=a(c,b);return j&&j.cancel(),j=e,e.then(d,d),e}function f(){k?(k=!1,g()):(c.removeClass("collapse").addClass("collapsing"),e({height:c[0].scrollHeight+"px"}).then(g))}function g(){c.removeClass("collapsing"),c.addClass("collapse in"),c.css({height:"auto"})}function h(){if(k)k=!1,i(),c.css({height:0});else{c.css({height:c[0].scrollHeight+"px"});{c[0].offsetWidth}c.removeClass("collapse in").addClass("collapsing"),e({height:0}).then(i)}}function i(){c.removeClass("collapsing"),c.addClass("collapse")}var j,k=!0;b.$watch(d.collapse,function(a){a?h():f()})}}}]),angular.module("ui.bootstrap.accordion",["ui.bootstrap.collapse"]).constant("accordionConfig",{closeOthers:!0}).controller("AccordionController",["$scope","$attrs","accordionConfig",function(a,b,c){this.groups=[],this.closeOthers=function(d){var e=angular.isDefined(b.closeOthers)?a.$eval(b.closeOthers):c.closeOthers;e&&angular.forEach(this.groups,function(a){a!==d&&(a.isOpen=!1)})},this.addGroup=function(a){var b=this;this.groups.push(a),a.$on("$destroy",function(){b.removeGroup(a)})},this.removeGroup=function(a){var b=this.groups.indexOf(a);-1!==b&&this.groups.splice(b,1)}}]).directive("accordion",function(){return{restrict:"EA",controller:"AccordionController",transclude:!0,replace:!1,templateUrl:"template/accordion/accordion.html"}}).directive("accordionGroup",function(){return{require:"^accordion",restrict:"EA",transclude:!0,replace:!0,templateUrl:"template/accordion/accordion-group.html",scope:{heading:"@",isOpen:"=?",isDisabled:"=?"},controller:function(){this.setHeading=function(a){this.heading=a}},link:function(a,b,c,d){d.addGroup(a),a.$watch("isOpen",function(b){b&&d.closeOthers(a)}),a.toggleOpen=function(){a.isDisabled||(a.isOpen=!a.isOpen)}}}}).directive("accordionHeading",function(){return{restrict:"EA",transclude:!0,template:"",replace:!0,require:"^accordionGroup",link:function(a,b,c,d,e){d.setHeading(e(a,function(){}))}}}).directive("accordionTransclude",function(){return{require:"^accordionGroup",link:function(a,b,c,d){a.$watch(function(){return d[c.accordionTransclude]},function(a){a&&(b.html(""),b.append(a))})}}}),angular.module("ui.bootstrap.alert",[]).controller("AlertController",["$scope","$attrs",function(a,b){a.closeable="close"in b,this.close=a.close}]).directive("alert",function(){return{restrict:"EA",controller:"AlertController",templateUrl:"template/alert/alert.html",transclude:!0,replace:!0,scope:{type:"@",close:"&"}}}).directive("dismissOnTimeout",["$timeout",function(a){return{require:"alert",link:function(b,c,d,e){a(function(){e.close()},parseInt(d.dismissOnTimeout,10))}}}]),angular.module("ui.bootstrap.bindHtml",[]).directive("bindHtmlUnsafe",function(){return function(a,b,c){b.addClass("ng-binding").data("$binding",c.bindHtmlUnsafe),a.$watch(c.bindHtmlUnsafe,function(a){b.html(a||"")})}}),angular.module("ui.bootstrap.buttons",[]).constant("buttonConfig",{activeClass:"active",toggleEvent:"click"}).controller("ButtonsController",["buttonConfig",function(a){this.activeClass=a.activeClass||"active",this.toggleEvent=a.toggleEvent||"click"}]).directive("btnRadio",function(){return{require:["btnRadio","ngModel"],controller:"ButtonsController",link:function(a,b,c,d){var e=d[0],f=d[1];f.$render=function(){b.toggleClass(e.activeClass,angular.equals(f.$modelValue,a.$eval(c.btnRadio)))},b.bind(e.toggleEvent,function(){var d=b.hasClass(e.activeClass);(!d||angular.isDefined(c.uncheckable))&&a.$apply(function(){f.$setViewValue(d?null:a.$eval(c.btnRadio)),f.$render()})})}}}).directive("btnCheckbox",function(){return{require:["btnCheckbox","ngModel"],controller:"ButtonsController",link:function(a,b,c,d){function e(){return g(c.btnCheckboxTrue,!0)}function f(){return g(c.btnCheckboxFalse,!1)}function g(b,c){var d=a.$eval(b);return angular.isDefined(d)?d:c}var h=d[0],i=d[1];i.$render=function(){b.toggleClass(h.activeClass,angular.equals(i.$modelValue,e()))},b.bind(h.toggleEvent,function(){a.$apply(function(){i.$setViewValue(b.hasClass(h.activeClass)?f():e()),i.$render()})})}}}),angular.module("ui.bootstrap.carousel",["ui.bootstrap.transition"]).controller("CarouselController",["$scope","$timeout","$interval","$transition",function(a,b,c,d){function e(){f();var b=+a.interval;!isNaN(b)&&b>0&&(h=c(g,b))}function f(){h&&(c.cancel(h),h=null)}function g(){var b=+a.interval;i&&!isNaN(b)&&b>0?a.next():a.pause()}var h,i,j=this,k=j.slides=a.slides=[],l=-1;j.currentSlide=null;var m=!1;j.select=a.select=function(c,f){function g(){if(!m){if(j.currentSlide&&angular.isString(f)&&!a.noTransition&&c.$element){c.$element.addClass(f);{c.$element[0].offsetWidth}angular.forEach(k,function(a){angular.extend(a,{direction:"",entering:!1,leaving:!1,active:!1})}),angular.extend(c,{direction:f,active:!0,entering:!0}),angular.extend(j.currentSlide||{},{direction:f,leaving:!0}),a.$currentTransition=d(c.$element,{}),function(b,c){a.$currentTransition.then(function(){h(b,c)},function(){h(b,c)})}(c,j.currentSlide)}else h(c,j.currentSlide);j.currentSlide=c,l=i,e()}}function h(b,c){angular.extend(b,{direction:"",active:!0,leaving:!1,entering:!1}),angular.extend(c||{},{direction:"",active:!1,leaving:!1,entering:!1}),a.$currentTransition=null}var i=k.indexOf(c);void 0===f&&(f=i>l?"next":"prev"),c&&c!==j.currentSlide&&(a.$currentTransition?(a.$currentTransition.cancel(),b(g)):g())},a.$on("$destroy",function(){m=!0}),j.indexOfSlide=function(a){return k.indexOf(a)},a.next=function(){var b=(l+1)%k.length;return a.$currentTransition?void 0:j.select(k[b],"next")},a.prev=function(){var b=0>l-1?k.length-1:l-1;return a.$currentTransition?void 0:j.select(k[b],"prev")},a.isActive=function(a){return j.currentSlide===a},a.$watch("interval",e),a.$on("$destroy",f),a.play=function(){i||(i=!0,e())},a.pause=function(){a.noPause||(i=!1,f())},j.addSlide=function(b,c){b.$element=c,k.push(b),1===k.length||b.active?(j.select(k[k.length-1]),1==k.length&&a.play()):b.active=!1},j.removeSlide=function(a){var b=k.indexOf(a);k.splice(b,1),k.length>0&&a.active?j.select(b>=k.length?k[b-1]:k[b]):l>b&&l--}}]).directive("carousel",[function(){return{restrict:"EA",transclude:!0,replace:!0,controller:"CarouselController",require:"carousel",templateUrl:"template/carousel/carousel.html",scope:{interval:"=",noTransition:"=",noPause:"="}}}]).directive("slide",function(){return{require:"^carousel",restrict:"EA",transclude:!0,replace:!0,templateUrl:"template/carousel/slide.html",scope:{active:"=?"},link:function(a,b,c,d){d.addSlide(a,b),a.$on("$destroy",function(){d.removeSlide(a)}),a.$watch("active",function(b){b&&d.select(a)})}}}),angular.module("ui.bootstrap.dateparser",[]).service("dateParser",["$locale","orderByFilter",function(a,b){function c(a){var c=[],d=a.split("");return angular.forEach(e,function(b,e){var f=a.indexOf(e);if(f>-1){a=a.split(""),d[f]="("+b.regex+")",a[f]="$";for(var g=f+1,h=f+e.length;h>g;g++)d[g]="",a[g]="$";a=a.join(""),c.push({index:f,apply:b.apply})}}),{regex:new RegExp("^"+d.join("")+"$"),map:b(c,"index")}}function d(a,b,c){return 1===b&&c>28?29===c&&(a%4===0&&a%100!==0||a%400===0):3===b||5===b||8===b||10===b?31>c:!0}this.parsers={};var e={yyyy:{regex:"\\d{4}",apply:function(a){this.year=+a}},yy:{regex:"\\d{2}",apply:function(a){this.year=+a+2e3}},y:{regex:"\\d{1,4}",apply:function(a){this.year=+a}},MMMM:{regex:a.DATETIME_FORMATS.MONTH.join("|"),apply:function(b){this.month=a.DATETIME_FORMATS.MONTH.indexOf(b)}},MMM:{regex:a.DATETIME_FORMATS.SHORTMONTH.join("|"),apply:function(b){this.month=a.DATETIME_FORMATS.SHORTMONTH.indexOf(b)}},MM:{regex:"0[1-9]|1[0-2]",apply:function(a){this.month=a-1}},M:{regex:"[1-9]|1[0-2]",apply:function(a){this.month=a-1}},dd:{regex:"[0-2][0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a}},d:{regex:"[1-2]?[0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a}},EEEE:{regex:a.DATETIME_FORMATS.DAY.join("|")},EEE:{regex:a.DATETIME_FORMATS.SHORTDAY.join("|")}};this.parse=function(b,e){if(!angular.isString(b)||!e)return b;e=a.DATETIME_FORMATS[e]||e,this.parsers[e]||(this.parsers[e]=c(e));var f=this.parsers[e],g=f.regex,h=f.map,i=b.match(g);if(i&&i.length){for(var j,k={year:1900,month:0,date:1,hours:0},l=1,m=i.length;m>l;l++){var n=h[l-1];n.apply&&n.apply.call(k,i[l])}return d(k.year,k.month,k.date)&&(j=new Date(k.year,k.month,k.date,k.hours)),j}}}]),angular.module("ui.bootstrap.position",[]).factory("$position",["$document","$window",function(a,b){function c(a,c){return a.currentStyle?a.currentStyle[c]:b.getComputedStyle?b.getComputedStyle(a)[c]:a.style[c]}function d(a){return"static"===(c(a,"position")||"static")}var e=function(b){for(var c=a[0],e=b.offsetParent||c;e&&e!==c&&d(e);)e=e.offsetParent;return e||c};return{position:function(b){var c=this.offset(b),d={top:0,left:0},f=e(b[0]);f!=a[0]&&(d=this.offset(angular.element(f)),d.top+=f.clientTop-f.scrollTop,d.left+=f.clientLeft-f.scrollLeft);var g=b[0].getBoundingClientRect();return{width:g.width||b.prop("offsetWidth"),height:g.height||b.prop("offsetHeight"),top:c.top-d.top,left:c.left-d.left}},offset:function(c){var d=c[0].getBoundingClientRect();return{width:d.width||c.prop("offsetWidth"),height:d.height||c.prop("offsetHeight"),top:d.top+(b.pageYOffset||a[0].documentElement.scrollTop),left:d.left+(b.pageXOffset||a[0].documentElement.scrollLeft)}},positionElements:function(a,b,c,d){var e,f,g,h,i=c.split("-"),j=i[0],k=i[1]||"center";e=d?this.offset(a):this.position(a),f=b.prop("offsetWidth"),g=b.prop("offsetHeight");var l={center:function(){return e.left+e.width/2-f/2},left:function(){return e.left},right:function(){return e.left+e.width}},m={center:function(){return e.top+e.height/2-g/2},top:function(){return e.top},bottom:function(){return e.top+e.height}};switch(j){case"right":h={top:m[k](),left:l[j]()};break;case"left":h={top:m[k](),left:e.left-f};break;case"bottom":h={top:m[j](),left:l[k]()};break;default:h={top:e.top-g,left:l[k]()}}return h}}}]),angular.module("ui.bootstrap.datepicker",["ui.bootstrap.dateparser","ui.bootstrap.position"]).constant("datepickerConfig",{formatDay:"dd",formatMonth:"MMMM",formatYear:"yyyy",formatDayHeader:"EEE",formatDayTitle:"MMMM yyyy",formatMonthTitle:"yyyy",datepickerMode:"day",minMode:"day",maxMode:"year",showWeeks:!0,startingDay:0,yearRange:20,minDate:null,maxDate:null}).controller("DatepickerController",["$scope","$attrs","$parse","$interpolate","$timeout","$log","dateFilter","datepickerConfig",function(a,b,c,d,e,f,g,h){var i=this,j={$setViewValue:angular.noop};this.modes=["day","month","year"],angular.forEach(["formatDay","formatMonth","formatYear","formatDayHeader","formatDayTitle","formatMonthTitle","minMode","maxMode","showWeeks","startingDay","yearRange"],function(c,e){i[c]=angular.isDefined(b[c])?8>e?d(b[c])(a.$parent):a.$parent.$eval(b[c]):h[c]}),angular.forEach(["minDate","maxDate"],function(d){b[d]?a.$parent.$watch(c(b[d]),function(a){i[d]=a?new Date(a):null,i.refreshView()}):i[d]=h[d]?new Date(h[d]):null}),a.datepickerMode=a.datepickerMode||h.datepickerMode,a.uniqueId="datepicker-"+a.$id+"-"+Math.floor(1e4*Math.random()),this.activeDate=angular.isDefined(b.initDate)?a.$parent.$eval(b.initDate):new Date,a.isActive=function(b){return 0===i.compare(b.date,i.activeDate)?(a.activeDateId=b.uid,!0):!1},this.init=function(a){j=a,j.$render=function(){i.render()}},this.render=function(){if(j.$modelValue){var a=new Date(j.$modelValue),b=!isNaN(a);b?this.activeDate=a:f.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'),j.$setValidity("date",b)}this.refreshView()},this.refreshView=function(){if(this.element){this._refreshView();var a=j.$modelValue?new Date(j.$modelValue):null;j.$setValidity("date-disabled",!a||this.element&&!this.isDisabled(a))}},this.createDateObject=function(a,b){var c=j.$modelValue?new Date(j.$modelValue):null;return{date:a,label:g(a,b),selected:c&&0===this.compare(a,c),disabled:this.isDisabled(a),current:0===this.compare(a,new Date)}},this.isDisabled=function(c){return this.minDate&&this.compare(c,this.minDate)<0||this.maxDate&&this.compare(c,this.maxDate)>0||b.dateDisabled&&a.dateDisabled({date:c,mode:a.datepickerMode})},this.split=function(a,b){for(var c=[];a.length>0;)c.push(a.splice(0,b));return c},a.select=function(b){if(a.datepickerMode===i.minMode){var c=j.$modelValue?new Date(j.$modelValue):new Date(0,0,0,0,0,0,0);c.setFullYear(b.getFullYear(),b.getMonth(),b.getDate()),j.$setViewValue(c),j.$render()}else i.activeDate=b,a.datepickerMode=i.modes[i.modes.indexOf(a.datepickerMode)-1]},a.move=function(a){var b=i.activeDate.getFullYear()+a*(i.step.years||0),c=i.activeDate.getMonth()+a*(i.step.months||0);i.activeDate.setFullYear(b,c,1),i.refreshView()},a.toggleMode=function(b){b=b||1,a.datepickerMode===i.maxMode&&1===b||a.datepickerMode===i.minMode&&-1===b||(a.datepickerMode=i.modes[i.modes.indexOf(a.datepickerMode)+b])},a.keys={13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down"};var k=function(){e(function(){i.element[0].focus()},0,!1)};a.$on("datepicker.focus",k),a.keydown=function(b){var c=a.keys[b.which];if(c&&!b.shiftKey&&!b.altKey)if(b.preventDefault(),b.stopPropagation(),"enter"===c||"space"===c){if(i.isDisabled(i.activeDate))return;a.select(i.activeDate),k()}else!b.ctrlKey||"up"!==c&&"down"!==c?(i.handleKeyDown(c,b),i.refreshView()):(a.toggleMode("up"===c?1:-1),k())}}]).directive("datepicker",function(){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/datepicker.html",scope:{datepickerMode:"=?",dateDisabled:"&"},require:["datepicker","?^ngModel"],controller:"DatepickerController",link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f)}}}).directive("daypicker",["dateFilter",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/day.html",require:"^datepicker",link:function(b,c,d,e){function f(a,b){return 1!==b||a%4!==0||a%100===0&&a%400!==0?i[b]:29}function g(a,b){var c=new Array(b),d=new Date(a),e=0;for(d.setHours(12);b>e;)c[e++]=new Date(d),d.setDate(d.getDate()+1);return c}function h(a){var b=new Date(a);b.setDate(b.getDate()+4-(b.getDay()||7));var c=b.getTime();return b.setMonth(0),b.setDate(1),Math.floor(Math.round((c-b)/864e5)/7)+1}b.showWeeks=e.showWeeks,e.step={months:1},e.element=c;var i=[31,28,31,30,31,30,31,31,30,31,30,31];e._refreshView=function(){var c=e.activeDate.getFullYear(),d=e.activeDate.getMonth(),f=new Date(c,d,1),i=e.startingDay-f.getDay(),j=i>0?7-i:-i,k=new Date(f);j>0&&k.setDate(-j+1);for(var l=g(k,42),m=0;42>m;m++)l[m]=angular.extend(e.createDateObject(l[m],e.formatDay),{secondary:l[m].getMonth()!==d,uid:b.uniqueId+"-"+m});b.labels=new Array(7);for(var n=0;7>n;n++)b.labels[n]={abbr:a(l[n].date,e.formatDayHeader),full:a(l[n].date,"EEEE")};if(b.title=a(e.activeDate,e.formatDayTitle),b.rows=e.split(l,7),b.showWeeks){b.weekNumbers=[];for(var o=h(b.rows[0][0].date),p=b.rows.length;b.weekNumbers.push(o++)<p;);}},e.compare=function(a,b){return new Date(a.getFullYear(),a.getMonth(),a.getDate())-new Date(b.getFullYear(),b.getMonth(),b.getDate())},e.handleKeyDown=function(a){var b=e.activeDate.getDate();if("left"===a)b-=1;else if("up"===a)b-=7;else if("right"===a)b+=1;else if("down"===a)b+=7;else if("pageup"===a||"pagedown"===a){var c=e.activeDate.getMonth()+("pageup"===a?-1:1);e.activeDate.setMonth(c,1),b=Math.min(f(e.activeDate.getFullYear(),e.activeDate.getMonth()),b)}else"home"===a?b=1:"end"===a&&(b=f(e.activeDate.getFullYear(),e.activeDate.getMonth()));e.activeDate.setDate(b)},e.refreshView()}}}]).directive("monthpicker",["dateFilter",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/month.html",require:"^datepicker",link:function(b,c,d,e){e.step={years:1},e.element=c,e._refreshView=function(){for(var c=new Array(12),d=e.activeDate.getFullYear(),f=0;12>f;f++)c[f]=angular.extend(e.createDateObject(new Date(d,f,1),e.formatMonth),{uid:b.uniqueId+"-"+f});b.title=a(e.activeDate,e.formatMonthTitle),b.rows=e.split(c,3)},e.compare=function(a,b){return new Date(a.getFullYear(),a.getMonth())-new Date(b.getFullYear(),b.getMonth())},e.handleKeyDown=function(a){var b=e.activeDate.getMonth();if("left"===a)b-=1;else if("up"===a)b-=3;else if("right"===a)b+=1;else if("down"===a)b+=3;else if("pageup"===a||"pagedown"===a){var c=e.activeDate.getFullYear()+("pageup"===a?-1:1);e.activeDate.setFullYear(c)}else"home"===a?b=0:"end"===a&&(b=11);e.activeDate.setMonth(b)},e.refreshView()}}}]).directive("yearpicker",["dateFilter",function(){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/year.html",require:"^datepicker",link:function(a,b,c,d){function e(a){return parseInt((a-1)/f,10)*f+1}var f=d.yearRange;d.step={years:f},d.element=b,d._refreshView=function(){for(var b=new Array(f),c=0,g=e(d.activeDate.getFullYear());f>c;c++)b[c]=angular.extend(d.createDateObject(new Date(g+c,0,1),d.formatYear),{uid:a.uniqueId+"-"+c});a.title=[b[0].label,b[f-1].label].join(" - "),a.rows=d.split(b,5)},d.compare=function(a,b){return a.getFullYear()-b.getFullYear()},d.handleKeyDown=function(a){var b=d.activeDate.getFullYear();"left"===a?b-=1:"up"===a?b-=5:"right"===a?b+=1:"down"===a?b+=5:"pageup"===a||"pagedown"===a?b+=("pageup"===a?-1:1)*d.step.years:"home"===a?b=e(d.activeDate.getFullYear()):"end"===a&&(b=e(d.activeDate.getFullYear())+f-1),d.activeDate.setFullYear(b)},d.refreshView()}}}]).constant("datepickerPopupConfig",{datepickerPopup:"yyyy-MM-dd",currentText:"Today",clearText:"Clear",closeText:"Done",closeOnDateSelection:!0,appendToBody:!1,showButtonBar:!0}).directive("datepickerPopup",["$compile","$parse","$document","$position","dateFilter","dateParser","datepickerPopupConfig",function(a,b,c,d,e,f,g){return{restrict:"EA",require:"ngModel",scope:{isOpen:"=?",currentText:"@",clearText:"@",closeText:"@",dateDisabled:"&"},link:function(h,i,j,k){function l(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function m(a){if(a){if(angular.isDate(a)&&!isNaN(a))return k.$setValidity("date",!0),a;if(angular.isString(a)){var b=f.parse(a,n)||new Date(a);return isNaN(b)?void k.$setValidity("date",!1):(k.$setValidity("date",!0),b)}return void k.$setValidity("date",!1)}return k.$setValidity("date",!0),null}var n,o=angular.isDefined(j.closeOnDateSelection)?h.$parent.$eval(j.closeOnDateSelection):g.closeOnDateSelection,p=angular.isDefined(j.datepickerAppendToBody)?h.$parent.$eval(j.datepickerAppendToBody):g.appendToBody;h.showButtonBar=angular.isDefined(j.showButtonBar)?h.$parent.$eval(j.showButtonBar):g.showButtonBar,h.getText=function(a){return h[a+"Text"]||g[a+"Text"]},j.$observe("datepickerPopup",function(a){n=a||g.datepickerPopup,k.$render()});var q=angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");q.attr({"ng-model":"date","ng-change":"dateSelection()"});var r=angular.element(q.children()[0]);j.datepickerOptions&&angular.forEach(h.$parent.$eval(j.datepickerOptions),function(a,b){r.attr(l(b),a)}),h.watchData={},angular.forEach(["minDate","maxDate","datepickerMode"],function(a){if(j[a]){var c=b(j[a]);if(h.$parent.$watch(c,function(b){h.watchData[a]=b}),r.attr(l(a),"watchData."+a),"datepickerMode"===a){var d=c.assign;h.$watch("watchData."+a,function(a,b){a!==b&&d(h.$parent,a)})}}}),j.dateDisabled&&r.attr("date-disabled","dateDisabled({ date: date, mode: mode })"),k.$parsers.unshift(m),h.dateSelection=function(a){angular.isDefined(a)&&(h.date=a),k.$setViewValue(h.date),k.$render(),o&&(h.isOpen=!1,i[0].focus())},i.bind("input change keyup",function(){h.$apply(function(){h.date=k.$modelValue})}),k.$render=function(){var a=k.$viewValue?e(k.$viewValue,n):"";i.val(a),h.date=m(k.$modelValue)};var s=function(a){h.isOpen&&a.target!==i[0]&&h.$apply(function(){h.isOpen=!1})},t=function(a){h.keydown(a)};i.bind("keydown",t),h.keydown=function(a){27===a.which?(a.preventDefault(),a.stopPropagation(),h.close()):40!==a.which||h.isOpen||(h.isOpen=!0)},h.$watch("isOpen",function(a){a?(h.$broadcast("datepicker.focus"),h.position=p?d.offset(i):d.position(i),h.position.top=h.position.top+i.prop("offsetHeight"),c.bind("click",s)):c.unbind("click",s)}),h.select=function(a){if("today"===a){var b=new Date;angular.isDate(k.$modelValue)?(a=new Date(k.$modelValue),a.setFullYear(b.getFullYear(),b.getMonth(),b.getDate())):a=new Date(b.setHours(0,0,0,0))}h.dateSelection(a)},h.close=function(){h.isOpen=!1,i[0].focus()};var u=a(q)(h);q.remove(),p?c.find("body").append(u):i.after(u),h.$on("$destroy",function(){u.remove(),i.unbind("keydown",t),c.unbind("click",s)})}}}]).directive("datepickerPopupWrap",function(){return{restrict:"EA",replace:!0,transclude:!0,templateUrl:"template/datepicker/popup.html",link:function(a,b){b.bind("click",function(a){a.preventDefault(),a.stopPropagation()})}}}),angular.module("ui.bootstrap.dropdown",[]).constant("dropdownConfig",{openClass:"open"}).service("dropdownService",["$document",function(a){var b=null;this.open=function(e){b||(a.bind("click",c),a.bind("keydown",d)),b&&b!==e&&(b.isOpen=!1),b=e},this.close=function(e){b===e&&(b=null,a.unbind("click",c),a.unbind("keydown",d))};var c=function(a){if(b){var c=b.getToggleElement();a&&c&&c[0].contains(a.target)||b.$apply(function(){b.isOpen=!1})}},d=function(a){27===a.which&&(b.focusToggleElement(),c())}}]).controller("DropdownController",["$scope","$attrs","$parse","dropdownConfig","dropdownService","$animate",function(a,b,c,d,e,f){var g,h=this,i=a.$new(),j=d.openClass,k=angular.noop,l=b.onToggle?c(b.onToggle):angular.noop;this.init=function(d){h.$element=d,b.isOpen&&(g=c(b.isOpen),k=g.assign,a.$watch(g,function(a){i.isOpen=!!a}))},this.toggle=function(a){return i.isOpen=arguments.length?!!a:!i.isOpen},this.isOpen=function(){return i.isOpen},i.getToggleElement=function(){return h.toggleElement},i.focusToggleElement=function(){h.toggleElement&&h.toggleElement[0].focus()},i.$watch("isOpen",function(b,c){f[b?"addClass":"removeClass"](h.$element,j),b?(i.focusToggleElement(),e.open(i)):e.close(i),k(a,b),angular.isDefined(b)&&b!==c&&l(a,{open:!!b})}),a.$on("$locationChangeSuccess",function(){i.isOpen=!1}),a.$on("$destroy",function(){i.$destroy()})}]).directive("dropdown",function(){return{controller:"DropdownController",link:function(a,b,c,d){d.init(b)}}}).directive("dropdownToggle",function(){return{require:"?^dropdown",link:function(a,b,c,d){if(d){d.toggleElement=b;var e=function(e){e.preventDefault(),b.hasClass("disabled")||c.disabled||a.$apply(function(){d.toggle()})};b.bind("click",e),b.attr({"aria-haspopup":!0,"aria-expanded":!1}),a.$watch(d.isOpen,function(a){b.attr("aria-expanded",!!a)}),a.$on("$destroy",function(){b.unbind("click",e)})}}}}),angular.module("ui.bootstrap.modal",["ui.bootstrap.transition"]).factory("$$stackedMap",function(){return{createNew:function(){var a=[];return{add:function(b,c){a.push({key:b,value:c})},get:function(b){for(var c=0;c<a.length;c++)if(b==a[c].key)return a[c]},keys:function(){for(var b=[],c=0;c<a.length;c++)b.push(a[c].key);return b},top:function(){return a[a.length-1]},remove:function(b){for(var c=-1,d=0;d<a.length;d++)if(b==a[d].key){c=d;break}return a.splice(c,1)[0]},removeTop:function(){return a.splice(a.length-1,1)[0]},length:function(){return a.length}}}}}).directive("modalBackdrop",["$timeout",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/modal/backdrop.html",link:function(b,c,d){b.backdropClass=d.backdropClass||"",b.animate=!1,a(function(){b.animate=!0})}}}]).directive("modalWindow",["$modalStack","$timeout",function(a,b){return{restrict:"EA",scope:{index:"@",animate:"="},replace:!0,transclude:!0,templateUrl:function(a,b){return b.templateUrl||"template/modal/window.html"},link:function(c,d,e){d.addClass(e.windowClass||""),c.size=e.size,b(function(){c.animate=!0,d[0].querySelectorAll("[autofocus]").length||d[0].focus()}),c.close=function(b){var c=a.getTop();c&&c.value.backdrop&&"static"!=c.value.backdrop&&b.target===b.currentTarget&&(b.preventDefault(),b.stopPropagation(),a.dismiss(c.key,"backdrop click"))}}}}]).directive("modalTransclude",function(){return{link:function(a,b,c,d,e){e(a.$parent,function(a){b.empty(),b.append(a)})}}}).factory("$modalStack",["$transition","$timeout","$document","$compile","$rootScope","$$stackedMap",function(a,b,c,d,e,f){function g(){for(var a=-1,b=n.keys(),c=0;c<b.length;c++)n.get(b[c]).value.backdrop&&(a=c);return a}function h(a){var b=c.find("body").eq(0),d=n.get(a).value;n.remove(a),j(d.modalDomEl,d.modalScope,300,function(){d.modalScope.$destroy(),b.toggleClass(m,n.length()>0),i()})}function i(){if(k&&-1==g()){var a=l;j(k,l,150,function(){a.$destroy(),a=null}),k=void 0,l=void 0}}function j(c,d,e,f){function g(){g.done||(g.done=!0,c.remove(),f&&f())}d.animate=!1;var h=a.transitionEndEventName;if(h){var i=b(g,e);c.bind(h,function(){b.cancel(i),g(),d.$apply()})}else b(g)}var k,l,m="modal-open",n=f.createNew(),o={};return e.$watch(g,function(a){l&&(l.index=a)}),c.bind("keydown",function(a){var b;27===a.which&&(b=n.top(),b&&b.value.keyboard&&(a.preventDefault(),e.$apply(function(){o.dismiss(b.key,"escape key press")})))}),o.open=function(a,b){n.add(a,{deferred:b.deferred,modalScope:b.scope,backdrop:b.backdrop,keyboard:b.keyboard});var f=c.find("body").eq(0),h=g();if(h>=0&&!k){l=e.$new(!0),l.index=h;var i=angular.element("<div modal-backdrop></div>");i.attr("backdrop-class",b.backdropClass),k=d(i)(l),f.append(k)}var j=angular.element("<div modal-window></div>");j.attr({"template-url":b.windowTemplateUrl,"window-class":b.windowClass,size:b.size,index:n.length()-1,animate:"animate"}).html(b.content);var o=d(j)(b.scope);n.top().value.modalDomEl=o,f.append(o),f.addClass(m)},o.close=function(a,b){var c=n.get(a);c&&(c.value.deferred.resolve(b),h(a))},o.dismiss=function(a,b){var c=n.get(a);c&&(c.value.deferred.reject(b),h(a))},o.dismissAll=function(a){for(var b=this.getTop();b;)this.dismiss(b.key,a),b=this.getTop()},o.getTop=function(){return n.top()},o}]).provider("$modal",function(){var a={options:{backdrop:!0,keyboard:!0},$get:["$injector","$rootScope","$q","$http","$templateCache","$controller","$modalStack",function(b,c,d,e,f,g,h){function i(a){return a.template?d.when(a.template):e.get(angular.isFunction(a.templateUrl)?a.templateUrl():a.templateUrl,{cache:f}).then(function(a){return a.data})}function j(a){var c=[];return angular.forEach(a,function(a){(angular.isFunction(a)||angular.isArray(a))&&c.push(d.when(b.invoke(a)))}),c}var k={};return k.open=function(b){var e=d.defer(),f=d.defer(),k={result:e.promise,opened:f.promise,close:function(a){h.close(k,a)},dismiss:function(a){h.dismiss(k,a)}};if(b=angular.extend({},a.options,b),b.resolve=b.resolve||{},!b.template&&!b.templateUrl)throw new Error("One of template or templateUrl options is required.");var l=d.all([i(b)].concat(j(b.resolve)));return l.then(function(a){var d=(b.scope||c).$new();d.$close=k.close,d.$dismiss=k.dismiss;var f,i={},j=1;b.controller&&(i.$scope=d,i.$modalInstance=k,angular.forEach(b.resolve,function(b,c){i[c]=a[j++]}),f=g(b.controller,i),b.controllerAs&&(d[b.controllerAs]=f)),h.open(k,{scope:d,deferred:e,content:a[0],backdrop:b.backdrop,keyboard:b.keyboard,backdropClass:b.backdropClass,windowClass:b.windowClass,windowTemplateUrl:b.windowTemplateUrl,size:b.size})},function(a){e.reject(a)}),l.then(function(){f.resolve(!0)},function(){f.reject(!1)}),k},k}]};return a}),angular.module("ui.bootstrap.pagination",[]).controller("PaginationController",["$scope","$attrs","$parse",function(a,b,c){var d=this,e={$setViewValue:angular.noop},f=b.numPages?c(b.numPages).assign:angular.noop;this.init=function(f,g){e=f,this.config=g,e.$render=function(){d.render()},b.itemsPerPage?a.$parent.$watch(c(b.itemsPerPage),function(b){d.itemsPerPage=parseInt(b,10),a.totalPages=d.calculateTotalPages()}):this.itemsPerPage=g.itemsPerPage},this.calculateTotalPages=function(){var b=this.itemsPerPage<1?1:Math.ceil(a.totalItems/this.itemsPerPage);return Math.max(b||0,1)},this.render=function(){a.page=parseInt(e.$viewValue,10)||1},a.selectPage=function(b){a.page!==b&&b>0&&b<=a.totalPages&&(e.$setViewValue(b),e.$render())},a.getText=function(b){return a[b+"Text"]||d.config[b+"Text"]},a.noPrevious=function(){return 1===a.page},a.noNext=function(){return a.page===a.totalPages},a.$watch("totalItems",function(){a.totalPages=d.calculateTotalPages()}),a.$watch("totalPages",function(b){f(a.$parent,b),a.page>b?a.selectPage(b):e.$render()})}]).constant("paginationConfig",{itemsPerPage:10,boundaryLinks:!1,directionLinks:!0,firstText:"First",previousText:"Previous",nextText:"Next",lastText:"Last",rotate:!0}).directive("pagination",["$parse","paginationConfig",function(a,b){return{restrict:"EA",scope:{totalItems:"=",firstText:"@",previousText:"@",nextText:"@",lastText:"@"},require:["pagination","?ngModel"],controller:"PaginationController",templateUrl:"template/pagination/pagination.html",replace:!0,link:function(c,d,e,f){function g(a,b,c){return{number:a,text:b,active:c}}function h(a,b){var c=[],d=1,e=b,f=angular.isDefined(k)&&b>k;f&&(l?(d=Math.max(a-Math.floor(k/2),1),e=d+k-1,e>b&&(e=b,d=e-k+1)):(d=(Math.ceil(a/k)-1)*k+1,e=Math.min(d+k-1,b)));for(var h=d;e>=h;h++){var i=g(h,h,h===a);c.push(i)}if(f&&!l){if(d>1){var j=g(d-1,"...",!1);c.unshift(j)}if(b>e){var m=g(e+1,"...",!1);c.push(m)}}return c}var i=f[0],j=f[1];if(j){var k=angular.isDefined(e.maxSize)?c.$parent.$eval(e.maxSize):b.maxSize,l=angular.isDefined(e.rotate)?c.$parent.$eval(e.rotate):b.rotate;c.boundaryLinks=angular.isDefined(e.boundaryLinks)?c.$parent.$eval(e.boundaryLinks):b.boundaryLinks,c.directionLinks=angular.isDefined(e.directionLinks)?c.$parent.$eval(e.directionLinks):b.directionLinks,i.init(j,b),e.maxSize&&c.$parent.$watch(a(e.maxSize),function(a){k=parseInt(a,10),i.render()});var m=i.render;i.render=function(){m(),c.page>0&&c.page<=c.totalPages&&(c.pages=h(c.page,c.totalPages))}}}}}]).constant("pagerConfig",{itemsPerPage:10,previousText:"« Previous",nextText:"Next »",align:!0}).directive("pager",["pagerConfig",function(a){return{restrict:"EA",scope:{totalItems:"=",previousText:"@",nextText:"@"},require:["pager","?ngModel"],controller:"PaginationController",templateUrl:"template/pagination/pager.html",replace:!0,link:function(b,c,d,e){var f=e[0],g=e[1];g&&(b.align=angular.isDefined(d.align)?b.$parent.$eval(d.align):a.align,f.init(g,a))}}}]),angular.module("ui.bootstrap.tooltip",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).provider("$tooltip",function(){function a(a){var b=/[A-Z]/g,c="-";return a.replace(b,function(a,b){return(b?c:"")+a.toLowerCase()
})}var b={placement:"top",animation:!0,popupDelay:0},c={mouseenter:"mouseleave",click:"click",focus:"blur"},d={};this.options=function(a){angular.extend(d,a)},this.setTriggers=function(a){angular.extend(c,a)},this.$get=["$window","$compile","$timeout","$document","$position","$interpolate",function(e,f,g,h,i,j){return function(e,k,l){function m(a){var b=a||n.trigger||l,d=c[b]||b;return{show:b,hide:d}}var n=angular.extend({},b,d),o=a(e),p=j.startSymbol(),q=j.endSymbol(),r="<div "+o+'-popup title="'+p+"title"+q+'" content="'+p+"content"+q+'" placement="'+p+"placement"+q+'" animation="animation" is-open="isOpen"></div>';return{restrict:"EA",compile:function(){var a=f(r);return function(b,c,d){function f(){D.isOpen?l():j()}function j(){(!C||b.$eval(d[k+"Enable"]))&&(s(),D.popupDelay?z||(z=g(o,D.popupDelay,!1),z.then(function(a){a()})):o()())}function l(){b.$apply(function(){p()})}function o(){return z=null,y&&(g.cancel(y),y=null),D.content?(q(),w.css({top:0,left:0,display:"block"}),A?h.find("body").append(w):c.after(w),E(),D.isOpen=!0,D.$digest(),E):angular.noop}function p(){D.isOpen=!1,g.cancel(z),z=null,D.animation?y||(y=g(r,500)):r()}function q(){w&&r(),x=D.$new(),w=a(x,angular.noop)}function r(){y=null,w&&(w.remove(),w=null),x&&(x.$destroy(),x=null)}function s(){t(),u()}function t(){var a=d[k+"Placement"];D.placement=angular.isDefined(a)?a:n.placement}function u(){var a=d[k+"PopupDelay"],b=parseInt(a,10);D.popupDelay=isNaN(b)?n.popupDelay:b}function v(){var a=d[k+"Trigger"];F(),B=m(a),B.show===B.hide?c.bind(B.show,f):(c.bind(B.show,j),c.bind(B.hide,l))}var w,x,y,z,A=angular.isDefined(n.appendToBody)?n.appendToBody:!1,B=m(void 0),C=angular.isDefined(d[k+"Enable"]),D=b.$new(!0),E=function(){var a=i.positionElements(c,w,D.placement,A);a.top+="px",a.left+="px",w.css(a)};D.isOpen=!1,d.$observe(e,function(a){D.content=a,!a&&D.isOpen&&p()}),d.$observe(k+"Title",function(a){D.title=a});var F=function(){c.unbind(B.show,j),c.unbind(B.hide,l)};v();var G=b.$eval(d[k+"Animation"]);D.animation=angular.isDefined(G)?!!G:n.animation;var H=b.$eval(d[k+"AppendToBody"]);A=angular.isDefined(H)?H:A,A&&b.$on("$locationChangeSuccess",function(){D.isOpen&&p()}),b.$on("$destroy",function(){g.cancel(y),g.cancel(z),F(),r(),D=null})}}}}}]}).directive("tooltipPopup",function(){return{restrict:"EA",replace:!0,scope:{content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-popup.html"}}).directive("tooltip",["$tooltip",function(a){return a("tooltip","tooltip","mouseenter")}]).directive("tooltipHtmlUnsafePopup",function(){return{restrict:"EA",replace:!0,scope:{content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-html-unsafe-popup.html"}}).directive("tooltipHtmlUnsafe",["$tooltip",function(a){return a("tooltipHtmlUnsafe","tooltip","mouseenter")}]),angular.module("ui.bootstrap.popover",["ui.bootstrap.tooltip"]).directive("popoverPopup",function(){return{restrict:"EA",replace:!0,scope:{title:"@",content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/popover/popover.html"}}).directive("popover",["$tooltip",function(a){return a("popover","popover","click")}]),angular.module("ui.bootstrap.progressbar",[]).constant("progressConfig",{animate:!0,max:100}).controller("ProgressController",["$scope","$attrs","progressConfig",function(a,b,c){var d=this,e=angular.isDefined(b.animate)?a.$parent.$eval(b.animate):c.animate;this.bars=[],a.max=angular.isDefined(b.max)?a.$parent.$eval(b.max):c.max,this.addBar=function(b,c){e||c.css({transition:"none"}),this.bars.push(b),b.$watch("value",function(c){b.percent=+(100*c/a.max).toFixed(2)}),b.$on("$destroy",function(){c=null,d.removeBar(b)})},this.removeBar=function(a){this.bars.splice(this.bars.indexOf(a),1)}}]).directive("progress",function(){return{restrict:"EA",replace:!0,transclude:!0,controller:"ProgressController",require:"progress",scope:{},templateUrl:"template/progressbar/progress.html"}}).directive("bar",function(){return{restrict:"EA",replace:!0,transclude:!0,require:"^progress",scope:{value:"=",type:"@"},templateUrl:"template/progressbar/bar.html",link:function(a,b,c,d){d.addBar(a,b)}}}).directive("progressbar",function(){return{restrict:"EA",replace:!0,transclude:!0,controller:"ProgressController",scope:{value:"=",type:"@"},templateUrl:"template/progressbar/progressbar.html",link:function(a,b,c,d){d.addBar(a,angular.element(b.children()[0]))}}}),angular.module("ui.bootstrap.rating",[]).constant("ratingConfig",{max:5,stateOn:null,stateOff:null}).controller("RatingController",["$scope","$attrs","ratingConfig",function(a,b,c){var d={$setViewValue:angular.noop};this.init=function(e){d=e,d.$render=this.render,this.stateOn=angular.isDefined(b.stateOn)?a.$parent.$eval(b.stateOn):c.stateOn,this.stateOff=angular.isDefined(b.stateOff)?a.$parent.$eval(b.stateOff):c.stateOff;var f=angular.isDefined(b.ratingStates)?a.$parent.$eval(b.ratingStates):new Array(angular.isDefined(b.max)?a.$parent.$eval(b.max):c.max);a.range=this.buildTemplateObjects(f)},this.buildTemplateObjects=function(a){for(var b=0,c=a.length;c>b;b++)a[b]=angular.extend({index:b},{stateOn:this.stateOn,stateOff:this.stateOff},a[b]);return a},a.rate=function(b){!a.readonly&&b>=0&&b<=a.range.length&&(d.$setViewValue(b),d.$render())},a.enter=function(b){a.readonly||(a.value=b),a.onHover({value:b})},a.reset=function(){a.value=d.$viewValue,a.onLeave()},a.onKeydown=function(b){/(37|38|39|40)/.test(b.which)&&(b.preventDefault(),b.stopPropagation(),a.rate(a.value+(38===b.which||39===b.which?1:-1)))},this.render=function(){a.value=d.$viewValue}}]).directive("rating",function(){return{restrict:"EA",require:["rating","ngModel"],scope:{readonly:"=?",onHover:"&",onLeave:"&"},controller:"RatingController",templateUrl:"template/rating/rating.html",replace:!0,link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f)}}}),angular.module("ui.bootstrap.tabs",[]).controller("TabsetController",["$scope",function(a){var b=this,c=b.tabs=a.tabs=[];b.select=function(a){angular.forEach(c,function(b){b.active&&b!==a&&(b.active=!1,b.onDeselect())}),a.active=!0,a.onSelect()},b.addTab=function(a){c.push(a),1===c.length?a.active=!0:a.active&&b.select(a)},b.removeTab=function(a){var e=c.indexOf(a);if(a.active&&c.length>1&&!d){var f=e==c.length-1?e-1:e+1;b.select(c[f])}c.splice(e,1)};var d;a.$on("$destroy",function(){d=!0})}]).directive("tabset",function(){return{restrict:"EA",transclude:!0,replace:!0,scope:{type:"@"},controller:"TabsetController",templateUrl:"template/tabs/tabset.html",link:function(a,b,c){a.vertical=angular.isDefined(c.vertical)?a.$parent.$eval(c.vertical):!1,a.justified=angular.isDefined(c.justified)?a.$parent.$eval(c.justified):!1}}}).directive("tab",["$parse",function(a){return{require:"^tabset",restrict:"EA",replace:!0,templateUrl:"template/tabs/tab.html",transclude:!0,scope:{active:"=?",heading:"@",onSelect:"&select",onDeselect:"&deselect"},controller:function(){},compile:function(b,c,d){return function(b,c,e,f){b.$watch("active",function(a){a&&f.select(b)}),b.disabled=!1,e.disabled&&b.$parent.$watch(a(e.disabled),function(a){b.disabled=!!a}),b.select=function(){b.disabled||(b.active=!0)},f.addTab(b),b.$on("$destroy",function(){f.removeTab(b)}),b.$transcludeFn=d}}}}]).directive("tabHeadingTransclude",[function(){return{restrict:"A",require:"^tab",link:function(a,b){a.$watch("headingElement",function(a){a&&(b.html(""),b.append(a))})}}}]).directive("tabContentTransclude",function(){function a(a){return a.tagName&&(a.hasAttribute("tab-heading")||a.hasAttribute("data-tab-heading")||"tab-heading"===a.tagName.toLowerCase()||"data-tab-heading"===a.tagName.toLowerCase())}return{restrict:"A",require:"^tabset",link:function(b,c,d){var e=b.$eval(d.tabContentTransclude);e.$transcludeFn(e.$parent,function(b){angular.forEach(b,function(b){a(b)?e.headingElement=b:c.append(b)})})}}}),angular.module("ui.bootstrap.timepicker",[]).constant("timepickerConfig",{hourStep:1,minuteStep:1,showMeridian:!0,meridians:null,readonlyInput:!1,mousewheel:!0}).controller("TimepickerController",["$scope","$attrs","$parse","$log","$locale","timepickerConfig",function(a,b,c,d,e,f){function g(){var b=parseInt(a.hours,10),c=a.showMeridian?b>0&&13>b:b>=0&&24>b;return c?(a.showMeridian&&(12===b&&(b=0),a.meridian===p[1]&&(b+=12)),b):void 0}function h(){var b=parseInt(a.minutes,10);return b>=0&&60>b?b:void 0}function i(a){return angular.isDefined(a)&&a.toString().length<2?"0"+a:a}function j(a){k(),o.$setViewValue(new Date(n)),l(a)}function k(){o.$setValidity("time",!0),a.invalidHours=!1,a.invalidMinutes=!1}function l(b){var c=n.getHours(),d=n.getMinutes();a.showMeridian&&(c=0===c||12===c?12:c%12),a.hours="h"===b?c:i(c),a.minutes="m"===b?d:i(d),a.meridian=n.getHours()<12?p[0]:p[1]}function m(a){var b=new Date(n.getTime()+6e4*a);n.setHours(b.getHours(),b.getMinutes()),j()}var n=new Date,o={$setViewValue:angular.noop},p=angular.isDefined(b.meridians)?a.$parent.$eval(b.meridians):f.meridians||e.DATETIME_FORMATS.AMPMS;this.init=function(c,d){o=c,o.$render=this.render;var e=d.eq(0),g=d.eq(1),h=angular.isDefined(b.mousewheel)?a.$parent.$eval(b.mousewheel):f.mousewheel;h&&this.setupMousewheelEvents(e,g),a.readonlyInput=angular.isDefined(b.readonlyInput)?a.$parent.$eval(b.readonlyInput):f.readonlyInput,this.setupInputEvents(e,g)};var q=f.hourStep;b.hourStep&&a.$parent.$watch(c(b.hourStep),function(a){q=parseInt(a,10)});var r=f.minuteStep;b.minuteStep&&a.$parent.$watch(c(b.minuteStep),function(a){r=parseInt(a,10)}),a.showMeridian=f.showMeridian,b.showMeridian&&a.$parent.$watch(c(b.showMeridian),function(b){if(a.showMeridian=!!b,o.$error.time){var c=g(),d=h();angular.isDefined(c)&&angular.isDefined(d)&&(n.setHours(c),j())}else l()}),this.setupMousewheelEvents=function(b,c){var d=function(a){a.originalEvent&&(a=a.originalEvent);var b=a.wheelDelta?a.wheelDelta:-a.deltaY;return a.detail||b>0};b.bind("mousewheel wheel",function(b){a.$apply(d(b)?a.incrementHours():a.decrementHours()),b.preventDefault()}),c.bind("mousewheel wheel",function(b){a.$apply(d(b)?a.incrementMinutes():a.decrementMinutes()),b.preventDefault()})},this.setupInputEvents=function(b,c){if(a.readonlyInput)return a.updateHours=angular.noop,void(a.updateMinutes=angular.noop);var d=function(b,c){o.$setViewValue(null),o.$setValidity("time",!1),angular.isDefined(b)&&(a.invalidHours=b),angular.isDefined(c)&&(a.invalidMinutes=c)};a.updateHours=function(){var a=g();angular.isDefined(a)?(n.setHours(a),j("h")):d(!0)},b.bind("blur",function(){!a.invalidHours&&a.hours<10&&a.$apply(function(){a.hours=i(a.hours)})}),a.updateMinutes=function(){var a=h();angular.isDefined(a)?(n.setMinutes(a),j("m")):d(void 0,!0)},c.bind("blur",function(){!a.invalidMinutes&&a.minutes<10&&a.$apply(function(){a.minutes=i(a.minutes)})})},this.render=function(){var a=o.$modelValue?new Date(o.$modelValue):null;isNaN(a)?(o.$setValidity("time",!1),d.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')):(a&&(n=a),k(),l())},a.incrementHours=function(){m(60*q)},a.decrementHours=function(){m(60*-q)},a.incrementMinutes=function(){m(r)},a.decrementMinutes=function(){m(-r)},a.toggleMeridian=function(){m(720*(n.getHours()<12?1:-1))}}]).directive("timepicker",function(){return{restrict:"EA",require:["timepicker","?^ngModel"],controller:"TimepickerController",replace:!0,scope:{},templateUrl:"template/timepicker/timepicker.html",link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f,b.find("input"))}}}),angular.module("ui.bootstrap.typeahead",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).factory("typeaheadParser",["$parse",function(a){var b=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;return{parse:function(c){var d=c.match(b);if(!d)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+c+'".');return{itemName:d[3],source:a(d[4]),viewMapper:a(d[2]||d[1]),modelMapper:a(d[1])}}}}]).directive("typeahead",["$compile","$parse","$q","$timeout","$document","$position","typeaheadParser",function(a,b,c,d,e,f,g){var h=[9,13,27,38,40];return{require:"ngModel",link:function(i,j,k,l){var m,n=i.$eval(k.typeaheadMinLength)||1,o=i.$eval(k.typeaheadWaitMs)||0,p=i.$eval(k.typeaheadEditable)!==!1,q=b(k.typeaheadLoading).assign||angular.noop,r=b(k.typeaheadOnSelect),s=k.typeaheadInputFormatter?b(k.typeaheadInputFormatter):void 0,t=k.typeaheadAppendToBody?i.$eval(k.typeaheadAppendToBody):!1,u=i.$eval(k.typeaheadFocusFirst)!==!1,v=b(k.ngModel).assign,w=g.parse(k.typeahead),x=i.$new();i.$on("$destroy",function(){x.$destroy()});var y="typeahead-"+x.$id+"-"+Math.floor(1e4*Math.random());j.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":y});var z=angular.element("<div typeahead-popup></div>");z.attr({id:y,matches:"matches",active:"activeIdx",select:"select(activeIdx)",query:"query",position:"position"}),angular.isDefined(k.typeaheadTemplateUrl)&&z.attr("template-url",k.typeaheadTemplateUrl);var A=function(){x.matches=[],x.activeIdx=-1,j.attr("aria-expanded",!1)},B=function(a){return y+"-option-"+a};x.$watch("activeIdx",function(a){0>a?j.removeAttr("aria-activedescendant"):j.attr("aria-activedescendant",B(a))});var C=function(a){var b={$viewValue:a};q(i,!0),c.when(w.source(i,b)).then(function(c){var d=a===l.$viewValue;if(d&&m)if(c.length>0){x.activeIdx=u?0:-1,x.matches.length=0;for(var e=0;e<c.length;e++)b[w.itemName]=c[e],x.matches.push({id:B(e),label:w.viewMapper(x,b),model:c[e]});x.query=a,x.position=t?f.offset(j):f.position(j),x.position.top=x.position.top+j.prop("offsetHeight"),j.attr("aria-expanded",!0)}else A();d&&q(i,!1)},function(){A(),q(i,!1)})};A(),x.query=void 0;var D,E=function(a){D=d(function(){C(a)},o)},F=function(){D&&d.cancel(D)};l.$parsers.unshift(function(a){return m=!0,a&&a.length>=n?o>0?(F(),E(a)):C(a):(q(i,!1),F(),A()),p?a:a?void l.$setValidity("editable",!1):(l.$setValidity("editable",!0),a)}),l.$formatters.push(function(a){var b,c,d={};return s?(d.$model=a,s(i,d)):(d[w.itemName]=a,b=w.viewMapper(i,d),d[w.itemName]=void 0,c=w.viewMapper(i,d),b!==c?b:a)}),x.select=function(a){var b,c,e={};e[w.itemName]=c=x.matches[a].model,b=w.modelMapper(i,e),v(i,b),l.$setValidity("editable",!0),r(i,{$item:c,$model:b,$label:w.viewMapper(i,e)}),A(),d(function(){j[0].focus()},0,!1)},j.bind("keydown",function(a){0!==x.matches.length&&-1!==h.indexOf(a.which)&&(-1!=x.activeIdx||13!==a.which&&9!==a.which)&&(a.preventDefault(),40===a.which?(x.activeIdx=(x.activeIdx+1)%x.matches.length,x.$digest()):38===a.which?(x.activeIdx=(x.activeIdx>0?x.activeIdx:x.matches.length)-1,x.$digest()):13===a.which||9===a.which?x.$apply(function(){x.select(x.activeIdx)}):27===a.which&&(a.stopPropagation(),A(),x.$digest()))}),j.bind("blur",function(){m=!1});var G=function(a){j[0]!==a.target&&(A(),x.$digest())};e.bind("click",G),i.$on("$destroy",function(){e.unbind("click",G),t&&H.remove()});var H=a(z)(x);t?e.find("body").append(H):j.after(H)}}}]).directive("typeaheadPopup",function(){return{restrict:"EA",scope:{matches:"=",query:"=",active:"=",position:"=",select:"&"},replace:!0,templateUrl:"template/typeahead/typeahead-popup.html",link:function(a,b,c){a.templateUrl=c.templateUrl,a.isOpen=function(){return a.matches.length>0},a.isActive=function(b){return a.active==b},a.selectActive=function(b){a.active=b},a.selectMatch=function(b){a.select({activeIdx:b})}}}}).directive("typeaheadMatch",["$http","$templateCache","$compile","$parse",function(a,b,c,d){return{restrict:"EA",scope:{index:"=",match:"=",query:"="},link:function(e,f,g){var h=d(g.templateUrl)(e.$parent)||"template/typeahead/typeahead-match.html";a.get(h,{cache:b}).success(function(a){f.replaceWith(c(a.trim())(e))})}}}]).filter("typeaheadHighlight",function(){function a(a){return a.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}return function(b,c){return c?(""+b).replace(new RegExp(a(c),"gi"),"<strong>$&</strong>"):b}});
/**
 * State-based routing for AngularJS
 * @version v0.2.13
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(a,b,c){"use strict";function d(a,b){return M(new(M(function(){},{prototype:a})),b)}function e(a){return L(arguments,function(b){b!==a&&L(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)})}),a}function f(a,b){var c=[];for(var d in a.path){if(a.path[d]!==b.path[d])break;c.push(a.path[d])}return c}function g(a){if(Object.keys)return Object.keys(a);var c=[];return b.forEach(a,function(a,b){c.push(b)}),c}function h(a,b){if(Array.prototype.indexOf)return a.indexOf(b,Number(arguments[2])||0);var c=a.length>>>0,d=Number(arguments[2])||0;for(d=0>d?Math.ceil(d):Math.floor(d),0>d&&(d+=c);c>d;d++)if(d in a&&a[d]===b)return d;return-1}function i(a,b,c,d){var e,i=f(c,d),j={},k=[];for(var l in i)if(i[l].params&&(e=g(i[l].params),e.length))for(var m in e)h(k,e[m])>=0||(k.push(e[m]),j[e[m]]=a[e[m]]);return M({},j,b)}function j(a,b,c){if(!c){c=[];for(var d in a)c.push(d)}for(var e=0;e<c.length;e++){var f=c[e];if(a[f]!=b[f])return!1}return!0}function k(a,b){var c={};return L(a,function(a){c[a]=b[a]}),c}function l(a){var b={},c=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var d in a)-1==h(c,d)&&(b[d]=a[d]);return b}function m(a,b){var c=K(a),d=c?[]:{};return L(a,function(a,e){b(a,e)&&(d[c?d.length:e]=a)}),d}function n(a,b){var c=K(a)?[]:{};return L(a,function(a,d){c[d]=b(a,d)}),c}function o(a,b){var d=1,f=2,i={},j=[],k=i,m=M(a.when(i),{$$promises:i,$$values:i});this.study=function(i){function n(a,c){if(s[c]!==f){if(r.push(c),s[c]===d)throw r.splice(0,h(r,c)),new Error("Cyclic dependency: "+r.join(" -> "));if(s[c]=d,I(a))q.push(c,[function(){return b.get(a)}],j);else{var e=b.annotate(a);L(e,function(a){a!==c&&i.hasOwnProperty(a)&&n(i[a],a)}),q.push(c,a,e)}r.pop(),s[c]=f}}function o(a){return J(a)&&a.then&&a.$$promises}if(!J(i))throw new Error("'invocables' must be an object");var p=g(i||{}),q=[],r=[],s={};return L(i,n),i=r=s=null,function(d,f,g){function h(){--u||(v||e(t,f.$$values),r.$$values=t,r.$$promises=r.$$promises||!0,delete r.$$inheritedValues,n.resolve(t))}function i(a){r.$$failure=a,n.reject(a)}function j(c,e,f){function j(a){l.reject(a),i(a)}function k(){if(!G(r.$$failure))try{l.resolve(b.invoke(e,g,t)),l.promise.then(function(a){t[c]=a,h()},j)}catch(a){j(a)}}var l=a.defer(),m=0;L(f,function(a){s.hasOwnProperty(a)&&!d.hasOwnProperty(a)&&(m++,s[a].then(function(b){t[a]=b,--m||k()},j))}),m||k(),s[c]=l.promise}if(o(d)&&g===c&&(g=f,f=d,d=null),d){if(!J(d))throw new Error("'locals' must be an object")}else d=k;if(f){if(!o(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else f=m;var n=a.defer(),r=n.promise,s=r.$$promises={},t=M({},d),u=1+q.length/3,v=!1;if(G(f.$$failure))return i(f.$$failure),r;f.$$inheritedValues&&e(t,l(f.$$inheritedValues,p)),M(s,f.$$promises),f.$$values?(v=e(t,l(f.$$values,p)),r.$$inheritedValues=l(f.$$values,p),h()):(f.$$inheritedValues&&(r.$$inheritedValues=l(f.$$inheritedValues,p)),f.then(h,i));for(var w=0,x=q.length;x>w;w+=3)d.hasOwnProperty(q[w])?h():j(q[w],q[w+1],q[w+2]);return r}},this.resolve=function(a,b,c,d){return this.study(a)(b,c,d)}}function p(a,b,c){this.fromConfig=function(a,b,c){return G(a.template)?this.fromString(a.template,b):G(a.templateUrl)?this.fromUrl(a.templateUrl,b):G(a.templateProvider)?this.fromProvider(a.templateProvider,b,c):null},this.fromString=function(a,b){return H(a)?a(b):a},this.fromUrl=function(c,d){return H(c)&&(c=c(d)),null==c?null:a.get(c,{cache:b,headers:{Accept:"text/html"}}).then(function(a){return a.data})},this.fromProvider=function(a,b,d){return c.invoke(a,null,d||{params:b})}}function q(a,b,e){function f(b,c,d,e){if(q.push(b),o[b])return o[b];if(!/^\w+(-+\w+)*(?:\[\])?$/.test(b))throw new Error("Invalid parameter name '"+b+"' in pattern '"+a+"'");if(p[b])throw new Error("Duplicate parameter name '"+b+"' in pattern '"+a+"'");return p[b]=new O.Param(b,c,d,e),p[b]}function g(a,b,c){var d=["",""],e=a.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!b)return e;switch(c){case!1:d=["(",")"];break;case!0:d=["?(",")?"];break;default:d=["("+c+"|",")?"]}return e+d[0]+b+d[1]}function h(c,e){var f,g,h,i,j;return f=c[2]||c[3],j=b.params[f],h=a.substring(m,c.index),g=e?c[4]:c[4]||("*"==c[1]?".*":null),i=O.type(g||"string")||d(O.type("string"),{pattern:new RegExp(g)}),{id:f,regexp:g,segment:h,type:i,cfg:j}}b=M({params:{}},J(b)?b:{});var i,j=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,k=/([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,l="^",m=0,n=this.segments=[],o=e?e.params:{},p=this.params=e?e.params.$$new():new O.ParamSet,q=[];this.source=a;for(var r,s,t;(i=j.exec(a))&&(r=h(i,!1),!(r.segment.indexOf("?")>=0));)s=f(r.id,r.type,r.cfg,"path"),l+=g(r.segment,s.type.pattern.source,s.squash),n.push(r.segment),m=j.lastIndex;t=a.substring(m);var u=t.indexOf("?");if(u>=0){var v=this.sourceSearch=t.substring(u);if(t=t.substring(0,u),this.sourcePath=a.substring(0,m+u),v.length>0)for(m=0;i=k.exec(v);)r=h(i,!0),s=f(r.id,r.type,r.cfg,"search"),m=j.lastIndex}else this.sourcePath=a,this.sourceSearch="";l+=g(t)+(b.strict===!1?"/?":"")+"$",n.push(t),this.regexp=new RegExp(l,b.caseInsensitive?"i":c),this.prefix=n[0],this.$$paramNames=q}function r(a){M(this,a)}function s(){function a(a){return null!=a?a.toString().replace(/\//g,"%2F"):a}function e(a){return null!=a?a.toString().replace(/%2F/g,"/"):a}function f(a){return this.pattern.test(a)}function i(){return{strict:t,caseInsensitive:p}}function j(a){return H(a)||K(a)&&H(a[a.length-1])}function k(){for(;x.length;){var a=x.shift();if(a.pattern)throw new Error("You cannot override a type's .pattern at runtime.");b.extend(v[a.name],o.invoke(a.def))}}function l(a){M(this,a||{})}O=this;var o,p=!1,t=!0,u=!1,v={},w=!0,x=[],y={string:{encode:a,decode:e,is:f,pattern:/[^/]*/},"int":{encode:a,decode:function(a){return parseInt(a,10)},is:function(a){return G(a)&&this.decode(a.toString())===a},pattern:/\d+/},bool:{encode:function(a){return a?1:0},decode:function(a){return 0!==parseInt(a,10)},is:function(a){return a===!0||a===!1},pattern:/0|1/},date:{encode:function(a){return this.is(a)?[a.getFullYear(),("0"+(a.getMonth()+1)).slice(-2),("0"+a.getDate()).slice(-2)].join("-"):c},decode:function(a){if(this.is(a))return a;var b=this.capture.exec(a);return b?new Date(b[1],b[2]-1,b[3]):c},is:function(a){return a instanceof Date&&!isNaN(a.valueOf())},equals:function(a,b){return this.is(a)&&this.is(b)&&a.toISOString()===b.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:b.toJson,decode:b.fromJson,is:b.isObject,equals:b.equals,pattern:/[^/]*/},any:{encode:b.identity,decode:b.identity,is:b.identity,equals:b.equals,pattern:/.*/}};s.$$getDefaultValue=function(a){if(!j(a.value))return a.value;if(!o)throw new Error("Injectable functions cannot be called at configuration time");return o.invoke(a.value)},this.caseInsensitive=function(a){return G(a)&&(p=a),p},this.strictMode=function(a){return G(a)&&(t=a),t},this.defaultSquashPolicy=function(a){if(!G(a))return u;if(a!==!0&&a!==!1&&!I(a))throw new Error("Invalid squash policy: "+a+". Valid policies: false, true, arbitrary-string");return u=a,a},this.compile=function(a,b){return new q(a,M(i(),b))},this.isMatcher=function(a){if(!J(a))return!1;var b=!0;return L(q.prototype,function(c,d){H(c)&&(b=b&&G(a[d])&&H(a[d]))}),b},this.type=function(a,b,c){if(!G(b))return v[a];if(v.hasOwnProperty(a))throw new Error("A type named '"+a+"' has already been defined.");return v[a]=new r(M({name:a},b)),c&&(x.push({name:a,def:c}),w||k()),this},L(y,function(a,b){v[b]=new r(M({name:b},a))}),v=d(v,{}),this.$get=["$injector",function(a){return o=a,w=!1,k(),L(y,function(a,b){v[b]||(v[b]=new r(a))}),this}],this.Param=function(a,b,d,e){function f(a){var b=J(a)?g(a):[],c=-1===h(b,"value")&&-1===h(b,"type")&&-1===h(b,"squash")&&-1===h(b,"array");return c&&(a={value:a}),a.$$fn=j(a.value)?a.value:function(){return a.value},a}function i(b,c,d){if(b.type&&c)throw new Error("Param '"+a+"' has two type configurations.");return c?c:b.type?b.type instanceof r?b.type:new r(b.type):"config"===d?v.any:v.string}function k(){var b={array:"search"===e?"auto":!1},c=a.match(/\[\]$/)?{array:!0}:{};return M(b,c,d).array}function l(a,b){var c=a.squash;if(!b||c===!1)return!1;if(!G(c)||null==c)return u;if(c===!0||I(c))return c;throw new Error("Invalid squash policy: '"+c+"'. Valid policies: false, true, or arbitrary string")}function p(a,b,d,e){var f,g,i=[{from:"",to:d||b?c:""},{from:null,to:d||b?c:""}];return f=K(a.replace)?a.replace:[],I(e)&&f.push({from:e,to:c}),g=n(f,function(a){return a.from}),m(i,function(a){return-1===h(g,a.from)}).concat(f)}function q(){if(!o)throw new Error("Injectable functions cannot be called at configuration time");return o.invoke(d.$$fn)}function s(a){function b(a){return function(b){return b.from===a}}function c(a){var c=n(m(w.replace,b(a)),function(a){return a.to});return c.length?c[0]:a}return a=c(a),G(a)?w.type.decode(a):q()}function t(){return"{Param:"+a+" "+b+" squash: '"+z+"' optional: "+y+"}"}var w=this;d=f(d),b=i(d,b,e);var x=k();b=x?b.$asArray(x,"search"===e):b,"string"!==b.name||x||"path"!==e||d.value!==c||(d.value="");var y=d.value!==c,z=l(d,y),A=p(d,x,y,z);M(this,{id:a,type:b,location:e,array:x,squash:z,replace:A,isOptional:y,value:s,dynamic:c,config:d,toString:t})},l.prototype={$$new:function(){return d(this,M(new l,{$$parent:this}))},$$keys:function(){for(var a=[],b=[],c=this,d=g(l.prototype);c;)b.push(c),c=c.$$parent;return b.reverse(),L(b,function(b){L(g(b),function(b){-1===h(a,b)&&-1===h(d,b)&&a.push(b)})}),a},$$values:function(a){var b={},c=this;return L(c.$$keys(),function(d){b[d]=c[d].value(a&&a[d])}),b},$$equals:function(a,b){var c=!0,d=this;return L(d.$$keys(),function(e){var f=a&&a[e],g=b&&b[e];d[e].type.equals(f,g)||(c=!1)}),c},$$validates:function(a){var b,c,d,e=!0,f=this;return L(this.$$keys(),function(g){d=f[g],c=a[g],b=!c&&d.isOptional,e=e&&(b||!!d.type.is(c))}),e},$$parent:c},this.ParamSet=l}function t(a,d){function e(a){var b=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);return null!=b?b[1].replace(/\\(.)/g,"$1"):""}function f(a,b){return a.replace(/\$(\$|\d{1,2})/,function(a,c){return b["$"===c?0:Number(c)]})}function g(a,b,c){if(!c)return!1;var d=a.invoke(b,b,{$match:c});return G(d)?d:!0}function h(d,e,f,g){function h(a,b,c){return"/"===p?a:b?p.slice(0,-1)+a:c?p.slice(1)+a:a}function m(a){function b(a){var b=a(f,d);return b?(I(b)&&d.replace().url(b),!0):!1}if(!a||!a.defaultPrevented){var e=o&&d.url()===o;if(o=c,e)return!0;var g,h=j.length;for(g=0;h>g;g++)if(b(j[g]))return;k&&b(k)}}function n(){return i=i||e.$on("$locationChangeSuccess",m)}var o,p=g.baseHref(),q=d.url();return l||n(),{sync:function(){m()},listen:function(){return n()},update:function(a){return a?void(q=d.url()):void(d.url()!==q&&(d.url(q),d.replace()))},push:function(a,b,e){d.url(a.format(b||{})),o=e&&e.$$avoidResync?d.url():c,e&&e.replace&&d.replace()},href:function(c,e,f){if(!c.validates(e))return null;var g=a.html5Mode();b.isObject(g)&&(g=g.enabled);var i=c.format(e);if(f=f||{},g||null===i||(i="#"+a.hashPrefix()+i),i=h(i,g,f.absolute),!f.absolute||!i)return i;var j=!g&&i?"/":"",k=d.port();return k=80===k||443===k?"":":"+k,[d.protocol(),"://",d.host(),k,j,i].join("")}}}var i,j=[],k=null,l=!1;this.rule=function(a){if(!H(a))throw new Error("'rule' must be a function");return j.push(a),this},this.otherwise=function(a){if(I(a)){var b=a;a=function(){return b}}else if(!H(a))throw new Error("'rule' must be a function");return k=a,this},this.when=function(a,b){var c,h=I(b);if(I(a)&&(a=d.compile(a)),!h&&!H(b)&&!K(b))throw new Error("invalid 'handler' in when()");var i={matcher:function(a,b){return h&&(c=d.compile(b),b=["$match",function(a){return c.format(a)}]),M(function(c,d){return g(c,b,a.exec(d.path(),d.search()))},{prefix:I(a.prefix)?a.prefix:""})},regex:function(a,b){if(a.global||a.sticky)throw new Error("when() RegExp must not be global or sticky");return h&&(c=b,b=["$match",function(a){return f(c,a)}]),M(function(c,d){return g(c,b,a.exec(d.path()))},{prefix:e(a)})}},j={matcher:d.isMatcher(a),regex:a instanceof RegExp};for(var k in j)if(j[k])return this.rule(i[k](a,b));throw new Error("invalid 'what' in when()")},this.deferIntercept=function(a){a===c&&(a=!0),l=a},this.$get=h,h.$inject=["$location","$rootScope","$injector","$browser"]}function u(a,e){function f(a){return 0===a.indexOf(".")||0===a.indexOf("^")}function l(a,b){if(!a)return c;var d=I(a),e=d?a:a.name,g=f(e);if(g){if(!b)throw new Error("No reference point given for path '"+e+"'");b=l(b);for(var h=e.split("."),i=0,j=h.length,k=b;j>i;i++)if(""!==h[i]||0!==i){if("^"!==h[i])break;if(!k.parent)throw new Error("Path '"+e+"' not valid for state '"+b.name+"'");k=k.parent}else k=b;h=h.slice(i).join("."),e=k.name+(k.name&&h?".":"")+h}var m=y[e];return!m||!d&&(d||m!==a&&m.self!==a)?c:m}function m(a,b){z[a]||(z[a]=[]),z[a].push(b)}function o(a){for(var b=z[a]||[];b.length;)p(b.shift())}function p(b){b=d(b,{self:b,resolve:b.resolve||{},toString:function(){return this.name}});var c=b.name;if(!I(c)||c.indexOf("@")>=0)throw new Error("State must have a valid name");if(y.hasOwnProperty(c))throw new Error("State '"+c+"'' is already defined");var e=-1!==c.indexOf(".")?c.substring(0,c.lastIndexOf(".")):I(b.parent)?b.parent:J(b.parent)&&I(b.parent.name)?b.parent.name:"";if(e&&!y[e])return m(e,b.self);for(var f in B)H(B[f])&&(b[f]=B[f](b,B.$delegates[f]));return y[c]=b,!b[A]&&b.url&&a.when(b.url,["$match","$stateParams",function(a,c){x.$current.navigable==b&&j(a,c)||x.transitionTo(b,a,{inherit:!0,location:!1})}]),o(c),b}function q(a){return a.indexOf("*")>-1}function r(a){var b=a.split("."),c=x.$current.name.split(".");if("**"===b[0]&&(c=c.slice(h(c,b[1])),c.unshift("**")),"**"===b[b.length-1]&&(c.splice(h(c,b[b.length-2])+1,Number.MAX_VALUE),c.push("**")),b.length!=c.length)return!1;for(var d=0,e=b.length;e>d;d++)"*"===b[d]&&(c[d]="*");return c.join("")===b.join("")}function s(a,b){return I(a)&&!G(b)?B[a]:H(b)&&I(a)?(B[a]&&!B.$delegates[a]&&(B.$delegates[a]=B[a]),B[a]=b,this):this}function t(a,b){return J(a)?b=a:b.name=a,p(b),this}function u(a,e,f,h,m,o,p){function s(b,c,d,f){var g=a.$broadcast("$stateNotFound",b,c,d);if(g.defaultPrevented)return p.update(),B;if(!g.retry)return null;if(f.$retry)return p.update(),C;var h=x.transition=e.when(g.retry);return h.then(function(){return h!==x.transition?u:(b.options.$retry=!0,x.transitionTo(b.to,b.toParams,b.options))},function(){return B}),p.update(),h}function t(a,c,d,g,i,j){var l=d?c:k(a.params.$$keys(),c),n={$stateParams:l};i.resolve=m.resolve(a.resolve,n,i.resolve,a);var o=[i.resolve.then(function(a){i.globals=a})];return g&&o.push(g),L(a.views,function(c,d){var e=c.resolve&&c.resolve!==a.resolve?c.resolve:{};e.$template=[function(){return f.load(d,{view:c,locals:n,params:l,notify:j.notify})||""}],o.push(m.resolve(e,n,i.resolve,a).then(function(f){if(H(c.controllerProvider)||K(c.controllerProvider)){var g=b.extend({},e,n);f.$$controller=h.invoke(c.controllerProvider,null,g)}else f.$$controller=c.controller;f.$$state=a,f.$$controllerAs=c.controllerAs,i[d]=f}))}),e.all(o).then(function(){return i})}var u=e.reject(new Error("transition superseded")),z=e.reject(new Error("transition prevented")),B=e.reject(new Error("transition aborted")),C=e.reject(new Error("transition failed"));return w.locals={resolve:null,globals:{$stateParams:{}}},x={params:{},current:w.self,$current:w,transition:null},x.reload=function(){return x.transitionTo(x.current,o,{reload:!0,inherit:!1,notify:!0})},x.go=function(a,b,c){return x.transitionTo(a,b,M({inherit:!0,relative:x.$current},c))},x.transitionTo=function(b,c,f){c=c||{},f=M({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},f||{});var g,j=x.$current,m=x.params,n=j.path,q=l(b,f.relative);if(!G(q)){var r={to:b,toParams:c,options:f},y=s(r,j.self,m,f);if(y)return y;if(b=r.to,c=r.toParams,f=r.options,q=l(b,f.relative),!G(q)){if(!f.relative)throw new Error("No such state '"+b+"'");throw new Error("Could not resolve '"+b+"' from state '"+f.relative+"'")}}if(q[A])throw new Error("Cannot transition to abstract state '"+b+"'");if(f.inherit&&(c=i(o,c||{},x.$current,q)),!q.params.$$validates(c))return C;c=q.params.$$values(c),b=q;var B=b.path,D=0,E=B[D],F=w.locals,H=[];if(!f.reload)for(;E&&E===n[D]&&E.ownParams.$$equals(c,m);)F=H[D]=E.locals,D++,E=B[D];if(v(b,j,F,f))return b.self.reloadOnSearch!==!1&&p.update(),x.transition=null,e.when(x.current);if(c=k(b.params.$$keys(),c||{}),f.notify&&a.$broadcast("$stateChangeStart",b.self,c,j.self,m).defaultPrevented)return p.update(),z;for(var I=e.when(F),J=D;J<B.length;J++,E=B[J])F=H[J]=d(F),I=t(E,c,E===b,I,F,f);var K=x.transition=I.then(function(){var d,e,g;if(x.transition!==K)return u;for(d=n.length-1;d>=D;d--)g=n[d],g.self.onExit&&h.invoke(g.self.onExit,g.self,g.locals.globals),g.locals=null;for(d=D;d<B.length;d++)e=B[d],e.locals=H[d],e.self.onEnter&&h.invoke(e.self.onEnter,e.self,e.locals.globals);return x.transition!==K?u:(x.$current=b,x.current=b.self,x.params=c,N(x.params,o),x.transition=null,f.location&&b.navigable&&p.push(b.navigable.url,b.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===f.location}),f.notify&&a.$broadcast("$stateChangeSuccess",b.self,c,j.self,m),p.update(!0),x.current)},function(d){return x.transition!==K?u:(x.transition=null,g=a.$broadcast("$stateChangeError",b.self,c,j.self,m,d),g.defaultPrevented||p.update(),e.reject(d))});return K},x.is=function(a,b,d){d=M({relative:x.$current},d||{});var e=l(a,d.relative);return G(e)?x.$current!==e?!1:b?j(e.params.$$values(b),o):!0:c},x.includes=function(a,b,d){if(d=M({relative:x.$current},d||{}),I(a)&&q(a)){if(!r(a))return!1;a=x.$current.name}var e=l(a,d.relative);return G(e)?G(x.$current.includes[e.name])?b?j(e.params.$$values(b),o,g(b)):!0:!1:c},x.href=function(a,b,d){d=M({lossy:!0,inherit:!0,absolute:!1,relative:x.$current},d||{});var e=l(a,d.relative);if(!G(e))return null;d.inherit&&(b=i(o,b||{},x.$current,e));var f=e&&d.lossy?e.navigable:e;return f&&f.url!==c&&null!==f.url?p.href(f.url,k(e.params.$$keys(),b||{}),{absolute:d.absolute}):null},x.get=function(a,b){if(0===arguments.length)return n(g(y),function(a){return y[a].self});var c=l(a,b||x.$current);return c&&c.self?c.self:null},x}function v(a,b,c,d){return a!==b||(c!==b.locals||d.reload)&&a.self.reloadOnSearch!==!1?void 0:!0}var w,x,y={},z={},A="abstract",B={parent:function(a){if(G(a.parent)&&a.parent)return l(a.parent);var b=/^(.+)\.[^.]+$/.exec(a.name);return b?l(b[1]):w},data:function(a){return a.parent&&a.parent.data&&(a.data=a.self.data=M({},a.parent.data,a.data)),a.data},url:function(a){var b=a.url,c={params:a.params||{}};if(I(b))return"^"==b.charAt(0)?e.compile(b.substring(1),c):(a.parent.navigable||w).url.concat(b,c);if(!b||e.isMatcher(b))return b;throw new Error("Invalid url '"+b+"' in state '"+a+"'")},navigable:function(a){return a.url?a:a.parent?a.parent.navigable:null},ownParams:function(a){var b=a.url&&a.url.params||new O.ParamSet;return L(a.params||{},function(a,c){b[c]||(b[c]=new O.Param(c,null,a,"config"))}),b},params:function(a){return a.parent&&a.parent.params?M(a.parent.params.$$new(),a.ownParams):new O.ParamSet},views:function(a){var b={};return L(G(a.views)?a.views:{"":a},function(c,d){d.indexOf("@")<0&&(d+="@"+a.parent.name),b[d]=c}),b},path:function(a){return a.parent?a.parent.path.concat(a):[]},includes:function(a){var b=a.parent?M({},a.parent.includes):{};return b[a.name]=!0,b},$delegates:{}};w=p({name:"",url:"^",views:null,"abstract":!0}),w.navigable=null,this.decorator=s,this.state=t,this.$get=u,u.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function v(){function a(a,b){return{load:function(c,d){var e,f={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return d=M(f,d),d.view&&(e=b.fromConfig(d.view,d.params,d.locals)),e&&d.notify&&a.$broadcast("$viewContentLoading",d),e}}}this.$get=a,a.$inject=["$rootScope","$templateFactory"]}function w(){var a=!1;this.useAnchorScroll=function(){a=!0},this.$get=["$anchorScroll","$timeout",function(b,c){return a?b:function(a){c(function(){a[0].scrollIntoView()},0,!1)}}]}function x(a,c,d,e){function f(){return c.has?function(a){return c.has(a)?c.get(a):null}:function(a){try{return c.get(a)}catch(b){return null}}}function g(a,b){var c=function(){return{enter:function(a,b,c){b.after(a),c()},leave:function(a,b){a.remove(),b()}}};if(j)return{enter:function(a,b,c){var d=j.enter(a,null,b,c);d&&d.then&&d.then(c)},leave:function(a,b){var c=j.leave(a,b);c&&c.then&&c.then(b)}};if(i){var d=i&&i(b,a);return{enter:function(a,b,c){d.enter(a,null,b),c()},leave:function(a,b){d.leave(a),b()}}}return c()}var h=f(),i=h("$animator"),j=h("$animate"),k={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(c,f,h){return function(c,f,i){function j(){l&&(l.remove(),l=null),n&&(n.$destroy(),n=null),m&&(r.leave(m,function(){l=null}),l=m,m=null)}function k(g){var k,l=z(c,i,f,e),s=l&&a.$current&&a.$current.locals[l];if(g||s!==o){k=c.$new(),o=a.$current.locals[l];var t=h(k,function(a){r.enter(a,f,function(){n&&n.$emit("$viewContentAnimationEnded"),(b.isDefined(q)&&!q||c.$eval(q))&&d(a)}),j()});m=t,n=k,n.$emit("$viewContentLoaded"),n.$eval(p)}}var l,m,n,o,p=i.onload||"",q=i.autoscroll,r=g(i,c);c.$on("$stateChangeSuccess",function(){k(!1)}),c.$on("$viewContentLoading",function(){k(!1)}),k(!0)}}};return k}function y(a,b,c,d){return{restrict:"ECA",priority:-400,compile:function(e){var f=e.html();return function(e,g,h){var i=c.$current,j=z(e,h,g,d),k=i&&i.locals[j];if(k){g.data("$uiView",{name:j,state:k.$$state}),g.html(k.$template?k.$template:f);var l=a(g.contents());if(k.$$controller){k.$scope=e;var m=b(k.$$controller,k);k.$$controllerAs&&(e[k.$$controllerAs]=m),g.data("$ngControllerController",m),g.children().data("$ngControllerController",m)}l(e)}}}}}function z(a,b,c,d){var e=d(b.uiView||b.name||"")(a),f=c.inheritedData("$uiView");return e.indexOf("@")>=0?e:e+"@"+(f?f.state.name:"")}function A(a,b){var c,d=a.match(/^\s*({[^}]*})\s*$/);if(d&&(a=b+"("+d[1]+")"),c=a.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!c||4!==c.length)throw new Error("Invalid state ref '"+a+"'");return{state:c[1],paramExpr:c[3]||null}}function B(a){var b=a.parent().inheritedData("$uiView");return b&&b.state&&b.state.name?b.state:void 0}function C(a,c){var d=["location","inherit","reload"];return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(e,f,g,h){var i=A(g.uiSref,a.current.name),j=null,k=B(f)||a.$current,l=null,m="A"===f.prop("tagName"),n="FORM"===f[0].nodeName,o=n?"action":"href",p=!0,q={relative:k,inherit:!0},r=e.$eval(g.uiSrefOpts)||{};b.forEach(d,function(a){a in r&&(q[a]=r[a])});var s=function(c){if(c&&(j=b.copy(c)),p){l=a.href(i.state,j,q);var d=h[1]||h[0];return d&&d.$$setStateInfo(i.state,j),null===l?(p=!1,!1):void g.$set(o,l)}};i.paramExpr&&(e.$watch(i.paramExpr,function(a){a!==j&&s(a)},!0),j=b.copy(e.$eval(i.paramExpr))),s(),n||f.bind("click",function(b){var d=b.which||b.button;if(!(d>1||b.ctrlKey||b.metaKey||b.shiftKey||f.attr("target"))){var e=c(function(){a.go(i.state,j,q)});b.preventDefault();var g=m&&!l?1:0;b.preventDefault=function(){g--<=0&&c.cancel(e)}}})}}}function D(a,b,c){return{restrict:"A",controller:["$scope","$element","$attrs",function(b,d,e){function f(){g()?d.addClass(j):d.removeClass(j)}function g(){return"undefined"!=typeof e.uiSrefActiveEq?h&&a.is(h.name,i):h&&a.includes(h.name,i)}var h,i,j;j=c(e.uiSrefActiveEq||e.uiSrefActive||"",!1)(b),this.$$setStateInfo=function(b,c){h=a.get(b,B(d)),i=c,f()},b.$on("$stateChangeSuccess",f)}]}}function E(a){var b=function(b){return a.is(b)};return b.$stateful=!0,b}function F(a){var b=function(b){return a.includes(b)};return b.$stateful=!0,b}var G=b.isDefined,H=b.isFunction,I=b.isString,J=b.isObject,K=b.isArray,L=b.forEach,M=b.extend,N=b.copy;b.module("ui.router.util",["ng"]),b.module("ui.router.router",["ui.router.util"]),b.module("ui.router.state",["ui.router.router","ui.router.util"]),b.module("ui.router",["ui.router.state"]),b.module("ui.router.compat",["ui.router"]),o.$inject=["$q","$injector"],b.module("ui.router.util").service("$resolve",o),p.$inject=["$http","$templateCache","$injector"],b.module("ui.router.util").service("$templateFactory",p);var O;q.prototype.concat=function(a,b){var c={caseInsensitive:O.caseInsensitive(),strict:O.strictMode(),squash:O.defaultSquashPolicy()};return new q(this.sourcePath+a+this.sourceSearch,M(c,b),this)},q.prototype.toString=function(){return this.source},q.prototype.exec=function(a,b){function c(a){function b(a){return a.split("").reverse().join("")}function c(a){return a.replace(/\\-/,"-")}var d=b(a).split(/-(?!\\)/),e=n(d,b);return n(e,c).reverse()}var d=this.regexp.exec(a);if(!d)return null;b=b||{};var e,f,g,h=this.parameters(),i=h.length,j=this.segments.length-1,k={};if(j!==d.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(e=0;j>e;e++){g=h[e];var l=this.params[g],m=d[e+1];for(f=0;f<l.replace;f++)l.replace[f].from===m&&(m=l.replace[f].to);m&&l.array===!0&&(m=c(m)),k[g]=l.value(m)}for(;i>e;e++)g=h[e],k[g]=this.params[g].value(b[g]);return k},q.prototype.parameters=function(a){return G(a)?this.params[a]||null:this.$$paramNames},q.prototype.validates=function(a){return this.params.$$validates(a)},q.prototype.format=function(a){function b(a){return encodeURIComponent(a).replace(/-/g,function(a){return"%5C%"+a.charCodeAt(0).toString(16).toUpperCase()})}a=a||{};var c=this.segments,d=this.parameters(),e=this.params;if(!this.validates(a))return null;var f,g=!1,h=c.length-1,i=d.length,j=c[0];for(f=0;i>f;f++){var k=h>f,l=d[f],m=e[l],o=m.value(a[l]),p=m.isOptional&&m.type.equals(m.value(),o),q=p?m.squash:!1,r=m.type.encode(o);if(k){var s=c[f+1];if(q===!1)null!=r&&(j+=K(r)?n(r,b).join("-"):encodeURIComponent(r)),j+=s;else if(q===!0){var t=j.match(/\/$/)?/\/?(.*)/:/(.*)/;j+=s.match(t)[1]}else I(q)&&(j+=q+s)}else{if(null==r||p&&q!==!1)continue;K(r)||(r=[r]),r=n(r,encodeURIComponent).join("&"+l+"="),j+=(g?"&":"?")+(l+"="+r),g=!0}}return j},r.prototype.is=function(){return!0},r.prototype.encode=function(a){return a},r.prototype.decode=function(a){return a},r.prototype.equals=function(a,b){return a==b},r.prototype.$subPattern=function(){var a=this.pattern.toString();return a.substr(1,a.length-2)},r.prototype.pattern=/.*/,r.prototype.toString=function(){return"{Type:"+this.name+"}"},r.prototype.$asArray=function(a,b){function d(a,b){function d(a,b){return function(){return a[b].apply(a,arguments)}}function e(a){return K(a)?a:G(a)?[a]:[]}function f(a){switch(a.length){case 0:return c;case 1:return"auto"===b?a[0]:a;default:return a}}function g(a){return!a}function h(a,b){return function(c){c=e(c);var d=n(c,a);return b===!0?0===m(d,g).length:f(d)}}function i(a){return function(b,c){var d=e(b),f=e(c);if(d.length!==f.length)return!1;for(var g=0;g<d.length;g++)if(!a(d[g],f[g]))return!1;return!0}}this.encode=h(d(a,"encode")),this.decode=h(d(a,"decode")),this.is=h(d(a,"is"),!0),this.equals=i(d(a,"equals")),this.pattern=a.pattern,this.$arrayMode=b}if(!a)return this;if("auto"===a&&!b)throw new Error("'auto' array mode is for query parameters only");return new d(this,a)},b.module("ui.router.util").provider("$urlMatcherFactory",s),b.module("ui.router.util").run(["$urlMatcherFactory",function(){}]),t.$inject=["$locationProvider","$urlMatcherFactoryProvider"],b.module("ui.router.router").provider("$urlRouter",t),u.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],b.module("ui.router.state").value("$stateParams",{}).provider("$state",u),v.$inject=[],b.module("ui.router.state").provider("$view",v),b.module("ui.router.state").provider("$uiViewScroll",w),x.$inject=["$state","$injector","$uiViewScroll","$interpolate"],y.$inject=["$compile","$controller","$state","$interpolate"],b.module("ui.router.state").directive("uiView",x),b.module("ui.router.state").directive("uiView",y),C.$inject=["$state","$timeout"],D.$inject=["$state","$stateParams","$interpolate"],b.module("ui.router.state").directive("uiSref",C).directive("uiSrefActive",D).directive("uiSrefActiveEq",D),E.$inject=["$state"],F.$inject=["$state"],b.module("ui.router.state").filter("isState",E).filter("includedByState",F)}(window,window.angular);
/**
 * @license Angulartics v0.17.2
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * License: MIT
 */
!function(a){"use strict";var b=window.angulartics||(window.angulartics={});b.waitForVendorCount=0,b.waitForVendorApi=function(a,c,d,e,f){f||b.waitForVendorCount++,e||(e=d,d=void 0),!Object.prototype.hasOwnProperty.call(window,a)||void 0!==d&&void 0===window[a][d]?setTimeout(function(){b.waitForVendorApi(a,c,d,e,!0)},c):(b.waitForVendorCount--,e(window[a]))},a.module("angulartics",[]).provider("$analytics",function(){var c={pageTracking:{autoTrackFirstPage:!0,autoTrackVirtualPages:!0,trackRelativePath:!1,autoBasePath:!1,basePath:""},eventTracking:{},bufferFlushDelay:1e3,developerMode:!1},d=["pageTrack","eventTrack","setAlias","setUsername","setAlias","setUserProperties","setUserPropertiesOnce","setSuperProperties","setSuperPropertiesOnce"],e={},f={},g=function(a){return function(){b.waitForVendorCount&&(e[a]||(e[a]=[]),e[a].push(arguments))}},h=function(b,c){return f[b]||(f[b]=[]),f[b].push(c),function(){var c=arguments;a.forEach(f[b],function(a){a.apply(this,c)},this)}},i={settings:c},j=function(a,b){b?setTimeout(a,b):a()},k={$get:function(){return i},api:i,settings:c,virtualPageviews:function(a){this.settings.pageTracking.autoTrackVirtualPages=a},firstPageview:function(a){this.settings.pageTracking.autoTrackFirstPage=a},withBase:function(b){this.settings.pageTracking.basePath=b?a.element("base").attr("href").slice(0,-1):""},withAutoBase:function(a){this.settings.pageTracking.autoBasePath=a},developerMode:function(a){this.settings.developerMode=a}},l=function(b,d){i[b]=h(b,d);var f=c[b],g=f?f.bufferFlushDelay:null,k=null!==g?g:c.bufferFlushDelay;a.forEach(e[b],function(a,b){j(function(){d.apply(this,a)},b*k)})},m=function(a){return a.replace(/^./,function(a){return a.toUpperCase()})},n=function(a){var b="register"+m(a);k[b]=function(b){l(a,b)},i[a]=h(a,g(a))};return a.forEach(d,n),k}).run(["$rootScope","$window","$analytics","$injector",function(b,c,d,e){d.settings.pageTracking.autoTrackFirstPage&&e.invoke(["$location",function(a){var b=!0;if(e.has("$route")){var f=e.get("$route");for(var g in f.routes){b=!1;break}}else if(e.has("$state")){var h=e.get("$state");for(var i in h.get()){b=!1;break}}if(b)if(d.settings.pageTracking.autoBasePath&&(d.settings.pageTracking.basePath=c.location.pathname),d.settings.trackRelativePath){var j=d.settings.pageTracking.basePath+a.url();d.pageTrack(j,a)}else d.pageTrack(a.absUrl(),a)}]),d.settings.pageTracking.autoTrackVirtualPages&&e.invoke(["$location",function(a){d.settings.pageTracking.autoBasePath&&(d.settings.pageTracking.basePath=c.location.pathname+"#"),e.has("$route")&&b.$on("$routeChangeSuccess",function(b,c){if(!c||!(c.$$route||c).redirectTo){var e=d.settings.pageTracking.basePath+a.url();d.pageTrack(e,a)}}),e.has("$state")&&b.$on("$stateChangeSuccess",function(){var b=d.settings.pageTracking.basePath+a.url();d.pageTrack(b,a)})}]),d.settings.developerMode&&a.forEach(d,function(a,b){"function"==typeof a&&(d[b]=function(){})})}]).directive("analyticsOn",["$analytics",function(b){function c(a){return["a:","button:","button:button","button:submit","input:button","input:submit"].indexOf(a.tagName.toLowerCase()+":"+(a.type||""))>=0}function d(a){return c(a)?"click":"click"}function e(a){return c(a)?a.innerText||a.value:a.id||a.name||a.tagName}function f(a){return"analytics"===a.substr(0,9)&&-1===["On","Event","If","Properties","EventType"].indexOf(a.substr(9))}function g(a){var b=a.slice(9);return"undefined"!=typeof b&&null!==b&&b.length>0?b.substring(0,1).toLowerCase()+b.substring(1):b}return{restrict:"A",link:function(c,h,i){var j=i.analyticsOn||d(h[0]),k={};a.forEach(i.$attr,function(a,b){f(b)&&(k[g(b)]=i[b],i.$observe(b,function(a){k[g(b)]=a}))}),a.element(h[0]).bind(j,function(d){var f=i.analyticsEvent||e(h[0]);k.eventType=d.type,(!i.analyticsIf||c.$eval(i.analyticsIf))&&(i.analyticsProperties&&a.extend(k,c.$eval(i.analyticsProperties)),b.eventTrack(f,k))})}}}])}(angular);
/**
 * @license Angulartics v0.17.2
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * Universal Analytics update contributed by http://github.com/willmcclellan
 * License: MIT
 */
!function(a){"use strict";a.module("angulartics.google.analytics",["angulartics"]).config(["$analyticsProvider",function(b){b.settings.trackRelativePath=!0,b.settings.ga={additionalAccountNames:void 0},b.registerPageTrack(function(c){window._gaq&&_gaq.push(["_trackPageview",c]),window.ga&&(ga("send","pageview",c),a.forEach(b.settings.ga.additionalAccountNames,function(a){ga(a+".send","pageview",c)}))}),b.registerEventTrack(function(c,d){if(d&&d.category){if(d.value){var e=parseInt(d.value,10);d.value=isNaN(e)?0:e}if(window.ga){for(var f={eventCategory:d.category||null,eventAction:c||null,eventLabel:d.label||null,eventValue:d.value||null,nonInteraction:d.noninteraction||null},g=1;20>=g;g++)d["dimension"+g.toString()]&&(f["dimension"+g.toString()]=d["dimension"+g.toString()]),d["metric"+g.toString()]&&(f["metric"+g.toString()]=d["metric"+g.toString()]);ga("send","event",f),a.forEach(b.settings.ga.additionalAccountNames,function(a){ga(a+".send","event",f)})}else window._gaq&&_gaq.push(["_trackEvent",d.category,c,d.label,d.value,d.noninteraction])}})}])}(angular);
"use strict";angular.module("colorpicker.module",[]).factory("Helper",function(){return{closestSlider:function(e){var o=e.matches||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector;return o.bind(e)("I")?e.parentNode:e},getOffset:function(e,o){for(var t=0,n=0,r=0,i=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft,n+=e.offsetTop,o||"BODY"!==e.tagName?(r+=e.scrollLeft,i+=e.scrollTop):(r+=document.documentElement.scrollLeft||e.scrollLeft,i+=document.documentElement.scrollTop||e.scrollTop),e=e.offsetParent;return{top:n,left:t,scrollX:r,scrollY:i}},stringParsers:[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}}]}}).factory("Color",["Helper",function(e){return{value:{h:1,s:1,b:1,a:1},rgb:function(){var e=this.toRGB();return"rgb("+e.r+","+e.g+","+e.b+")"},rgba:function(){var e=this.toRGB();return"rgba("+e.r+","+e.g+","+e.b+","+e.a+")"},hex:function(){return this.toHex()},RGBtoHSB:function(e,o,t,n){e/=255,o/=255,t/=255;var r,i,a,l;return a=Math.max(e,o,t),l=a-Math.min(e,o,t),r=0===l?null:a===e?(o-t)/l:a===o?(t-e)/l+2:(e-o)/l+4,r=(r+360)%6*60/360,i=0===l?0:l/a,{h:r||1,s:i,b:a,a:n||1}},setColor:function(o){o=o.toLowerCase();for(var t in e.stringParsers)if(e.stringParsers.hasOwnProperty(t)){var n=e.stringParsers[t],r=n.re.exec(o),i=r&&n.parse(r);if(i)return this.value=this.RGBtoHSB.apply(null,i),!1}},setHue:function(e){this.value.h=1-e},setSaturation:function(e){this.value.s=e},setLightness:function(e){this.value.b=1-e},setAlpha:function(e){this.value.a=parseInt(100*(1-e),10)/100},toRGB:function(e,o,t,n){e||(e=this.value.h,o=this.value.s,t=this.value.b),e*=360;var r,i,a,l,s;return e=e%360/60,s=t*o,l=s*(1-Math.abs(e%2-1)),r=i=a=t-s,e=~~e,r+=[s,l,0,0,l,s][e],i+=[l,s,s,l,0,0][e],a+=[0,0,l,s,s,l][e],{r:Math.round(255*r),g:Math.round(255*i),b:Math.round(255*a),a:n||this.value.a}},toHex:function(e,o,t,n){var r=this.toRGB(e,o,t,n);return"#"+(1<<24|parseInt(r.r,10)<<16|parseInt(r.g,10)<<8|parseInt(r.b,10)).toString(16).substr(1)}}}]).factory("Slider",["Helper",function(e){var o={maxLeft:0,maxTop:0,callLeft:null,callTop:null,knob:{top:0,left:0}},t={};return{getSlider:function(){return o},getLeftPosition:function(e){return Math.max(0,Math.min(o.maxLeft,o.left+((e.pageX||t.left)-t.left)))},getTopPosition:function(e){return Math.max(0,Math.min(o.maxTop,o.top+((e.pageY||t.top)-t.top)))},setSlider:function(n,r){var i=e.closestSlider(n.target),a=e.getOffset(i,r);o.knob=i.children[0].style,o.left=n.pageX-a.left-window.pageXOffset+a.scrollX,o.top=n.pageY-a.top-window.pageYOffset+a.scrollY,t={left:n.pageX,top:n.pageY}},setSaturation:function(e,t){o={maxLeft:100,maxTop:100,callLeft:"setSaturation",callTop:"setLightness"},this.setSlider(e,t)},setHue:function(e,t){o={maxLeft:0,maxTop:100,callLeft:!1,callTop:"setHue"},this.setSlider(e,t)},setAlpha:function(e,t){o={maxLeft:0,maxTop:100,callLeft:!1,callTop:"setAlpha"},this.setSlider(e,t)},setKnob:function(e,t){o.knob.top=e+"px",o.knob.left=t+"px"}}}]).directive("colorpicker",["$document","$compile","Color","Slider","Helper",function(e,o,t,n,r){return{require:"?ngModel",restrict:"A",link:function(i,a,l,s){var c,u=l.colorpicker?l.colorpicker:"hex",p=angular.isDefined(l.colorpickerPosition)?l.colorpickerPosition:"bottom",f=angular.isDefined(l.colorpickerInline)?l.colorpickerInline:!1,d=angular.isDefined(l.colorpickerFixedPosition)?l.colorpickerFixedPosition:!1,v=angular.isDefined(l.colorpickerParent)?a.parent():angular.element(document.body),h=angular.isDefined(l.colorpickerWithInput)?l.colorpickerWithInput:!1,g=h?'<input type="text" name="colorpicker-input">':"",m=f?"":'<button type="button" class="close close-colorpicker">&times;</button>',k='<div class="colorpicker dropdown"><div class="dropdown-menu"><colorpicker-saturation><i></i></colorpicker-saturation><colorpicker-hue><i></i></colorpicker-hue><colorpicker-alpha><i></i></colorpicker-alpha><colorpicker-preview></colorpicker-preview>'+g+m+"</div></div>",b=angular.element(k),x=t,w=b.find("colorpicker-hue"),L=b.find("colorpicker-saturation"),S=b.find("colorpicker-preview"),P=b.find("i");if(o(b)(i),h){var T=b.find("input");T.on("mousedown",function(e){e.stopPropagation()}).on("keyup",function(e){var o=this.value;a.val(o),s&&i.$apply(s.$setViewValue(o)),e.stopPropagation(),e.preventDefault()}),a.on("keyup",function(){T.val(a.val())})}var C=function(){e.on("mousemove",M),e.on("mouseup",y)};"rgba"===u&&(b.addClass("alpha"),c=b.find("colorpicker-alpha"),c.on("click",function(e){n.setAlpha(e,d),M(e)}).on("mousedown",function(e){n.setAlpha(e,d),C()})),w.on("click",function(e){n.setHue(e,d),M(e)}).on("mousedown",function(e){n.setHue(e,d),C()}),L.on("click",function(e){n.setSaturation(e,d),M(e)}).on("mousedown",function(e){n.setSaturation(e,d),C()}),d&&b.addClass("colorpicker-fixed-position"),b.addClass("colorpicker-position-"+p),"true"===f&&b.addClass("colorpicker-inline"),v.append(b),s&&(s.$render=function(){a.val(s.$viewValue)},i.$watch(l.ngModel,function(e){I(),h&&T.val(e)})),a.on("$destroy",function(){b.remove()});var H=function(){try{S.css("backgroundColor",x[u]())}catch(e){S.css("backgroundColor",x.toHex())}L.css("backgroundColor",x.toHex(x.value.h,1,1,1)),"rgba"===u&&(c.css.backgroundColor=x.toHex())},M=function(e){var o=n.getLeftPosition(e),t=n.getTopPosition(e),r=n.getSlider();n.setKnob(t,o),r.callLeft&&x[r.callLeft].call(x,o/100),r.callTop&&x[r.callTop].call(x,t/100),H();var l=x[u]();return a.val(l),s&&i.$apply(s.$setViewValue(l)),h&&T.val(l),!1},y=function(){e.off("mousemove",M),e.off("mouseup",y)},I=function(){x.setColor(a.val()),P.eq(0).css({left:100*x.value.s+"px",top:100-100*x.value.b+"px"}),P.eq(1).css("top",100*(1-x.value.h)+"px"),P.eq(2).css("top",100*(1-x.value.a)+"px"),H()},A=function(){var e,o=r.getOffset(a[0]);return angular.isDefined(l.colorpickerParent)&&(o.left=0,o.top=0),"top"===p?e={top:o.top-147,left:o.left}:"right"===p?e={top:o.top,left:o.left+126}:"bottom"===p?e={top:o.top+a[0].offsetHeight+2,left:o.left}:"left"===p&&(e={top:o.top,left:o.left-150}),{top:e.top+"px",left:e.left+"px"}},$=function(){D()};f===!1?a.on("click",function(){I(),b.addClass("colorpicker-visible").css(A()),e.on("mousedown",$)}):(I(),b.addClass("colorpicker-visible").css(A())),b.on("mousedown",function(e){e.stopPropagation(),e.preventDefault()});var B=function(e){s&&i.$emit(e,{name:l.ngModel,value:s.$modelValue})},D=function(){b.hasClass("colorpicker-visible")&&(b.removeClass("colorpicker-visible"),B("colorpicker-closed"),e.off("mousedown",$))};b.find("button").on("click",function(){D()})}}}]);
/*! 2.2.2 */
!function(){function a(a,b){window.XMLHttpRequest.prototype[a]=b(window.XMLHttpRequest.prototype[a])}function b(a,b,c,d,e,f,g){function h(a,b,c,d,g){for(var h=[],i=0;i<a.length;i++)h.push(a.item(i));c&&f(function(){d[b.ngModel]?d[b.ngModel].value=h:d[b.ngModel]=h,c&&c.$setViewValue(null!=h&&0==h.length?"":h)}),b.ngFileChange&&""!=b.ngFileChange&&f(function(){e(b.ngFileChange)(d,{$files:h,$event:g})})}c.ngMultiple&&e(c.ngMultiple)(a)&&(b.attr("multiple","true"),c.multiple="true");var i=c.ngAccept&&e(c.ngAccept)(a);i&&(b.attr("accept",i),c.accept=i);var j=c.ngCapture&&e(c.ngCapture)(a);if(j&&(b.attr("capture",j),c.capture=j),"input"!==b[0].tagName.toLowerCase()||"file"!==(b.attr("type")&&b.attr("type").toLowerCase())){var k="--ng-file-upload-"+Math.random(),l=angular.element('<input type="file" id="'+k+'">');c.multiple&&l.attr("multiple",c.multiple),c.accept&&l.attr("accept",c.accept),c.capture&&l.attr("capture",c.capture);for(var m in c)if(0==m.indexOf("inputFile")){var n=m.substring("inputFile".length);n=n[0].toLowerCase()+n.substring(1),l.attr(n,c[m])}l.css("width","0px").css("height","0px").css("position","absolute").css("padding",0).css("margin",0).css("overflow","hidden").attr("tabindex","-1").css("opacity",0).attr("ng-file-generated-elem--",!0),b.parent()[0].insertBefore(l[0],b[0]),b.attr("onclick",'document.getElementById("'+k+'").click()'),b.css("overflow","hidden"),b.attr("id","e"+k);b=l}if(""!=c.ngFileSelect&&(c.ngFileChange=c.ngFileSelect),0!=e(c.resetOnClick)(a))if(-1!==navigator.appVersion.indexOf("MSIE 10")){var o=function(c){var d=b.clone();d.val(""),b.replaceWith(d),g(d)(a),l=d,b=d,b.bind("change",p),b.unbind("click"),b[0].click(),b.bind("click",o),c.preventDefault(),c.stopPropagation()};b.bind("click",o)}else b.bind("click",function(){b[0].value=null});var p=function(b){var e;e=b.__files_||b.target.files,h(e,c,d,a,b)};b.bind("change",p)}function c(a,b,c,g,h,i,j){function k(a,b,c){var d=!0;if(s){var e=c.dataTransfer.items;if(null!=e)for(var f=0;f<e.length&&d;f++)d=d&&("file"==e[f].kind||""==e[f].kind)&&(null!=e[f].type.match(s)||null!=e[f].name&&null!=e[f].name.match(s))}var g=h(b.dragOverClass)(a,{$event:c});return g&&(g.delay&&(q=g.delay),g.accept&&(g=d?g.accept:g.reject)),g||b.dragOverClass||"dragover"}function l(a,b,c,d){function f(a){!s||a.type.match(s)||null!=a.name&&a.name.match(s)?h.push(a):k.push(a)}function g(a,b,c){if(null!=b)if(b.isDirectory){var d=(c||"")+b.name;f({name:b.name,type:"directory",path:d});var e=b.createReader(),h=[];m++;var i=function(){e.readEntries(function(d){try{if(d.length)h=h.concat(Array.prototype.slice.call(d||[],0)),i();else{for(var e=0;e<h.length;e++)g(a,h[e],(c?c:"")+b.name+"/");m--}}catch(f){m--,console.error(f)}},function(){m--})};i()}else m++,b.file(function(a){try{m--,a.path=(c?c:"")+a.name,f(a)}catch(b){m--,console.error(b)}},function(){m--})}var h=[],k=[],l=a.dataTransfer.items,m=0;if(l&&l.length>0&&"file"!=j.protocol())for(var n=0;n<l.length;n++){if(l[n].webkitGetAsEntry&&l[n].webkitGetAsEntry()&&l[n].webkitGetAsEntry().isDirectory){var o=l[n].webkitGetAsEntry();if(o.isDirectory&&!c)continue;null!=o&&(e(o.name)?g(h,o):l[n].webkitGetAsEntry().isDirectory||f(l[n].getAsFile()))}else{var p=l[n].getAsFile();null!=p&&f(p)}if(!d&&h.length>0)break}else{var q=a.dataTransfer.files;if(null!=q)for(var n=0;n<q.length&&(f(q.item(n)),d||!(h.length>0));n++);}var r=0;!function t(a){i(function(){if(m)10*r++<2e4&&t(10);else{if(!d&&h.length>1){for(var a=0;"directory"==h[a].type;)a++;h=[h[a]]}b(h,k)}},a||0)}()}var m=d();if(c.dropAvailable&&i(function(){a.dropAvailable?a.dropAvailable.value=m:a.dropAvailable=m}),!m)return 0!=h(c.hideOnDropNotAvailable)(a)&&b.css("display","none"),void 0;var n,o=null,p=h(c.stopPropagation)(a),q=1,r=h(c.ngAccept)(a)||c.accept,s=r?new RegExp(f(r)):null;b[0].addEventListener("dragover",function(d){d.preventDefault(),p&&d.stopPropagation(),i.cancel(o),a.actualDragOverClass||(n=k(a,c,d)),b.addClass(n)},!1),b[0].addEventListener("dragenter",function(a){a.preventDefault(),p&&a.stopPropagation()},!1),b[0].addEventListener("dragleave",function(){o=i(function(){b.removeClass(n),n=null},q||1)},!1),""!=c.ngFileDrop&&(c.ngFileChange=a.ngFileDrop),b[0].addEventListener("drop",function(d){d.preventDefault(),p&&d.stopPropagation(),b.removeClass(n),n=null,l(d,function(b,e){g&&(a[c.ngModel]?a[c.ngModel].value=b:a[c.ngModel]=b,g&&g.$setViewValue(null!=b&&0==b.length?"":b)),c.ngFileRejectedModel&&(a[c.ngFileRejectedModel]?a[c.ngFileRejectedModel].value=e:a[c.ngFileRejectedModel]=e),i(function(){h(c.ngFileChange)(a,{$files:b,$rejectedFiles:e,$event:d})})},0!=h(c.allowDir)(a),c.multiple||h(c.ngMultiple)(a))},!1)}function d(){var a=document.createElement("div");return"draggable"in a&&"ondrop"in a}function e(a){return/^[\000-\177]*$/.test(a)}function f(a){if(a.length>2&&"/"===a[0]&&"/"===a[a.length-1])return a.substring(1,a.length-1);var b=a.split(","),c="";if(b.length>1)for(var d=0;d<b.length;d++)c+="("+f(b[d])+")",d<b.length-1&&(c+="|");else c="^"+a.replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]","g"),"\\$&")+"$",c=c.replace(/\\\*/g,".*").replace(/\\\?/g,".");return c}window.XMLHttpRequest&&!window.XMLHttpRequest.__isFileAPIShim&&a("setRequestHeader",function(a){return function(b,c){if("__setXHR_"===b){var d=c(this);d instanceof Function&&d(this)}else a.apply(this,arguments)}});var g=angular.module("angularFileUpload",[]);g.version="2.2.2",g.service("$upload",["$http","$q","$timeout",function(a,b,c){function d(d){d.method=d.method||"POST",d.headers=d.headers||{},d.transformRequest=d.transformRequest||function(b,c){return window.ArrayBuffer&&b instanceof window.ArrayBuffer?b:a.defaults.transformRequest[0](b,c)};var e=b.defer(),f=e.promise;return d.headers.__setXHR_=function(){return function(a){a&&(d.__XHR=a,d.xhrFn&&d.xhrFn(a),a.upload.addEventListener("progress",function(a){a.config=d,e.notify?e.notify(a):f.progress_fn&&c(function(){f.progress_fn(a)})},!1),a.upload.addEventListener("load",function(a){a.lengthComputable&&(a.config=d,e.notify?e.notify(a):f.progress_fn&&c(function(){f.progress_fn(a)}))},!1))}},a(d).then(function(a){e.resolve(a)},function(a){e.reject(a)},function(a){e.notify(a)}),f.success=function(a){return f.then(function(b){a(b.data,b.status,b.headers,d)}),f},f.error=function(a){return f.then(null,function(b){a(b.data,b.status,b.headers,d)}),f},f.progress=function(a){return f.progress_fn=a,f.then(null,null,function(b){a(b)}),f},f.abort=function(){return d.__XHR&&c(function(){d.__XHR.abort()}),f},f.xhr=function(a){return d.xhrFn=function(b){return function(){b&&b.apply(f,arguments),a.apply(f,arguments)}}(d.xhrFn),f},f}this.upload=function(b){b.headers=b.headers||{},b.headers["Content-Type"]=void 0,b.transformRequest=b.transformRequest||a.defaults.transformRequest;var c=new FormData,e=b.transformRequest,f=b.data;return b.transformRequest=function(a,c){function d(a){if("function"==typeof e)a=e(a,c);else for(var b=0;b<e.length;b++)"function"==typeof e[b]&&(a=e[b](a,c));return a}if(f)if(b.formDataAppender)for(var g in f){var h=f[g];b.formDataAppender(a,g,h)}else if(b.sendDataAsJson)f=d(f),a.append("data",new Blob([f],{type:"application/json"}));else for(var g in f){var h=d(f[g]);void 0!==h&&(b.sendObjectAsJson&&"object"==typeof h&&"[object String]"!==Object.prototype.toString.call(i)?a.append(g,new Blob(h),{type:"application/json"}):a.append(g,h))}if(null!=b.file){var i=b.fileFormDataName||"file";if("[object Array]"===Object.prototype.toString.call(b.file))for(var j="[object String]"===Object.prototype.toString.call(i),k=0;k<b.file.length;k++)a.append(j?i:i[k],b.file[k],b.fileName&&b.fileName[k]||b.file[k].name);else a.append(i,b.file,b.fileName||b.file.name)}return a},b.data=c,d(b)},this.http=function(a){return d(a)}}]),g.directive("ngFileSelect",["$parse","$timeout","$compile",function(a,c,d){return{restrict:"AEC",require:"?ngModel",link:function(e,f,g,h){b(e,f,g,h,a,c,d)}}}]),g.directive("ngFileDrop",["$parse","$timeout","$location",function(a,b,d){return{restrict:"AEC",require:"?ngModel",link:function(e,f,g,h){c(e,f,g,h,a,b,d)}}}]),g.directive("ngNoFileDrop",function(){return function(a,b){d()&&b.css("display","none")}}),g.directive("ngFileDropAvailable",["$parse","$timeout",function(a,b){return function(c,e,f){if(d()){var g=a(f.ngFileDropAvailable);b(function(){g(c)})}}}])}();
angular.module("EE.Templates",[]).run(["$templateCache",function(e){e.put("components/ee-catalog-product.html",'<div style=min-height:80px;margin-bottom:10px><div class=media><a href class=media-left><div class="thumb margin-2 gray-border" style="background-image:url(\'{{ product.image_meta.cloudinary.main_image.url | thumbnail }}\')"></div></a><div class=media-body><a href><h4 class="media-heading margin-0">{{ product.title }}</h4></a> <i class="fa fa-star gold-color"></i> <i class="fa fa-star gold-color"></i> <i class="fa fa-star gold-color"></i> <i class="fa fa-star gold-color"></i> <i class="fa fa-star-half-o gold-color"></i> <small>(28)</small> <small><span class=hidden-xs>Loc:&nbsp;</span>United States</small><br><div class="btn-group btn-group-xs vert-5 hidden-xs"><button class="btn btn-default" ng-class="{ active: currentMargin == 0.05 }" ng-click=setCurrentPrice(0.05)>5%</button> <button class="btn btn-default" ng-class="{ active: currentMargin == 0.10 }" ng-click=setCurrentPrice(0.10)>10%</button> <button class="btn btn-default" ng-class="{ active: currentMargin == 0.15 }" ng-click=setCurrentPrice(0.15)>15%</button> <button class="btn btn-default" ng-class="{ active: currentMargin == 0.20 }" ng-click=setCurrentPrice(0.20)>20%</button> <button class="btn btn-default" ng-class="{ active: currentMargin == 0.25 }" ng-click=setCurrentPrice(0.25)>25%</button> <button class="btn btn-default" ng-class="{ active: currentMargin == 0.30 }" ng-click=setCurrentPrice(0.30)>30%</button> <button class="btn btn-default" ng-class="{ active: currentMargin == 0.35 }" ng-click=setCurrentPrice(0.35)>35%</button> <button class="btn btn-default" ng-class="{ active: currentMargin == 0.40 }" ng-click=setCurrentPrice(0.40)>40%</button></div><small class=hidden-xs>&nbsp;margin</small><div><h4 class="margin-0 inline-block">Sell for {{ currentPrice | centToDollar }}&nbsp;</h4><small><span class=hidden-xs>You&nbsp;</span>earn {{ currentPrice - product.baseline_price | centToDollar }}<span class=hidden-xs>&nbsp;each sale</span></small></div><div class=hidden-xs><div class="btn btn-sm btn-success"><i class="fa fa-plus"></i> Add to store</div><div class="btn btn-sm btn-link">preview</div></div></div></div></div>'),e.put("components/ee-navbar.html",'<nav class="navbar navbar-absolute-top navbar-transparent"><div class=container-fluid><div class=margin-5><a ui-sref=landing class=pull-left style=margin-left:38px analytics-on analytics-category=sell analytics-event=click analytics-label=sell><img src=../img/eeosk_250x67.png class="img-responsive width-120" alt="eeosk logo"></a><div class="collapse navbar-collapse"><div class=pull-right role=form><a ui-sref=login class="btn btn-default gray-btn" analytics-on analytics-category=user-management analytics-event=Login name=login>Login</a> <a ui-sref=signup class="btn btn-primary" analytics-on analytics-category=user-management analytics-event=Signup>Sign up</a></div></div></div></div></nav>'),e.put("components/ee-offscreen-default.html",'<div class="position-fixed width-250 pad-10 hover-pointer blue-background"><img src=../img/eeosk_250x67.png class=img-responsive alt="eeosk logo" style="width:185px"></div><div class="vert-20 full-width inline-block"></div><div class="vert-10 full-width inline-block"></div><div class=pad-10><mark>ee·osk</mark><br><em class=text-muted>noun: eeosk; plural noun: eeosks</em><p class=pad-5>An online storefront created from a catalog of thousands of products and suppliers.</p><hr>eeosks are:<br>- simple<br>- free<br>- customizable<br>- embeddable<hr><a ui-sref=signup class="btn btn-primary btn-block">Create your eeosk</a> <a ui-sref=login class="btn btn-default btn-block visible-xs">Login</a></div>'),e.put("components/ee-offscreen.html",'<div class=open-nav ng-class="{ open: toggle, narrow: narrowToggle }" ng-click=toggleOffscreen()><div class="btn btn-primary"><div class=icon></div></div></div><nav ng-class="{ open: toggle }" class="position-fixed full-height white-background"><div id=wrap class="width-250 light-{{ offscreenColor }}-background"><div class=width-250><div ng-if=offscreenCategory><div class="dropdown btn-group position-fixed width-250 pad-10 hover-pointer {{ offscreenColor }}-background" dropdown><h2 class="margin-0 white-color" dropdown-toggle>{{ offscreenCategory }} <span class=caret></span></h2><ul class="dropdown-menu width-250 margin-0"><li ng-hide="offscreenCategory == \'Storefront\'"><a ui-sref=app.storefront.home><h3 class=vert-5>Storefront</h3></a></li><li ng-hide="offscreenCategory == \'Catalog\'"><a ui-sref=app.catalog><h3 class=vert-5>Catalog</h3></a></li><li ng-hide="offscreenCategory == \'Orders\'"><a ui-sref=app.orders><h3 class=vert-5>Orders</h3></a></li><li ng-hide="offscreenCategory == \'Account\'"><a ui-sref=app.account><h3 class=vert-5>Account</h3></a></li></ul></div><div ng-switch on=offscreenCategory><div class="vert-20 full-width inline-block"></div><div class="vert-5 full-width inline-block"></div><ee-offscreen-storefront ng-switch-when=Storefront></ee-offscreen-storefront><ee-offscreen-catalog ng-switch-when=Catalog></ee-offscreen-catalog><ee-offscreen-orders ng-switch-when=Orders></ee-offscreen-orders><ee-offscreen-account ng-switch-when=Account></ee-offscreen-account></div></div><ee-offscreen-default ng-if=!offscreenCategory></ee-offscreen-default></div><div id=push></div></div><div id=footer-region><div class=container><div><a ui-sref=landing>home</a>&nbsp;&nbsp; <a ui-sref=signup>sell</a>&nbsp;&nbsp; <a ui-sref=signupSupply>supply</a>&nbsp;&nbsp; <a href=mailto:team@eeosk.com target=_blank>contact</a></div><div class=text-muted>&copy; eeosk 2014</div></div></div></nav>'),e.put("components/ee-order.html",""),e.put("components/ee-previewer.html",'<div class="container vert-10"><div><button class="btn btn-default btn-block vert-10" ng-click=setFullScreen(false)><i class="glyphicon glyphicon-remove"></i> Close Preview</button></div><div class=row><div class="col-sm-offset-2 col-sm-6"><img ng-src="https://s3.amazonaws.com/eeosk/products/{{ product.images[currentImgI] }}" class=full-width></div><div class=col-sm-4><div ng-repeat="img in product.images" class=product-preview-thumb><a href="" ng-click=setCurrentImgI($index) analytics-on analytics-category=previewer analytics-event=interact><img ng-src="https://s3.amazonaws.com/eeosk/products/{{ img }}" class="margin-5 max-width-80"></a></div></div></div><div class=row><div class="col-sm-offset-2 col-sm-8"><h3>{{ product.title }} <small ng-show=product.brand>{{ product.brand }}</small></h3><p>by {{ product.lister }}</p><p marked=product.description></p></div></div><div><button class="btn btn-default btn-block" ng-click=setFullScreen(false)><i class="glyphicon glyphicon-remove"></i> Close Preview</button></div></div>'),e.put("components/ee-product-editor.html",'<h4>Helpers</h4><form class=form-horizontal><div class=form-group><label for=image_gen class="col-sm-3 control-label">image_gen</label><div class=col-sm-9><input id=image_gen class=form-control ng-model=image_gen_text placeholder="{{ inputFieldsAdditional[0].placeholder }}" ng-list ng-change="imageGen(image_gen_text)"></div></div></form><h4>Product obj that goes into firebase</h4><form name=editProductForm ng-submit="type === \'new\' ? createProduct({product: product}) : updateProduct()" class=form-horizontal role=form><div ng-repeat="inputField in inputFields" class=form-group ng-switch on=inputField.name><label for="{{ inputField.name }}" class="col-sm-3 control-label" ng-if="[\'freeShipping\', \'trade\'].indexOf(inputField.name) === -1">{{ inputField.name }} <span ng-if=inputField.required>*</span></label><div class=col-sm-9 ng-switch-when=images><input type="{{ inputField.type }}" id="{{ inputField.name }}" class=form-control ng-model=product[inputField.name] placeholder="{{ inputField.placeholder }}" ng-list ng-required="inputField.required"><div><em>https://s3.amazonaws.com/eeosk/products/[image]</em></div><div ng-repeat="img in product[inputField.name]" class="inline-block vert-5"><img ng-src="https://s3.amazonaws.com/eeosk/products/{{ img }}" class="margin-2 max-width-80"></div></div><div class=col-sm-9 ng-switch-when=tags><input type="{{ inputField.type }}" id="{{ inputField.name }}" class=form-control placeholder="{{ inputField.placeholder }}" ng-model=product[inputField.name] ng-list></div><div class=col-sm-9 ng-switch-when=condition><select ng-model=product[inputField.name] class=form-control id="{{ inputField.name }}" ng-options="condition for condition in conditions" ng-required=inputField.required></select></div><div class=col-sm-9 ng-switch-when=category><select ng-model=product[inputField.name] class=form-control id="{{ inputField.name }}" ng-options="cateogry for cateogry in categories" ng-required=inputField.required></select></div><div class="col-sm-offset-3 col-sm-9" ng-switch-when=trade><div class=checkbox><label for="{{ inputField.name }}"><input type="{{ inputField.type }}" id="{{ inputField.name }}" ng-model=product[inputField.name] ng-required="inputField.required"> {{inputField.name + \'(visible in trade catalog)\'}}</label></div></div><div class="col-sm-offset-3 col-sm-9" ng-switch-when=freeShipping><div class=checkbox><label for="{{ inputField.name }}"><input type="{{ inputField.type }}" id="{{ inputField.name }}" ng-model="product[inputField.name]"> {{inputField.name}}</label></div></div><div class=col-sm-9 ng-switch-when=description><textarea id="{{ inputField.name }}" class=form-control placeholder="{{ inputField.placeholder }}" ng-model=product[inputField.name] ng-required=inputField.required rows=10>\n      </textarea></div><div class=col-sm-9 ng-switch-default><input type="{{ inputField.type }}" id="{{ inputField.name }}" class=form-control placeholder="{{ inputField.placeholder }}" ng-model=product[inputField.name] ng-required=inputField.required step="{{ inputField.step }}" min="{{ inputField.min }}"></div></div><div class=form-group><div class="col-sm-offset-3 col-sm-9" ng-if="type === \'edit\'"><button class="btn btn-primary" type=submit ng-disabled=editProductForm.$invalid>Update product</button> <a class="btn btn-danger" ng-click=deleteProduct()>Delete</a></div><div class="col-sm-offset-3 col-sm-9" ng-if="type === \'new\'"><button class="btn btn-primary" type=submit ng-disabled=editProductForm.$invalid>Add product</button></div></div><h3>Product json preview</h3><pre>{{ product | json }}</pre></form>'),e.put("components/ee-product-listing.html",'<div class="e-product-listing col-xs-3 text-center"><a href="" ng-click=setFullScreenProduct(product) analytics-on analytics-category="{{ route }}" analytics-event=preview analytics-label="{{ product.title }}" ng-show="route !== \'success\'"><img ng-src="https://s3.amazonaws.com/eeosk/products/{{ product.images[0] }}" class="full-width margin-0"></a> <img ng-src="https://s3.amazonaws.com/eeosk/products/{{ product.images[0] }}" class="full-width margin-0" ng-show="route === \'success\'"></div><div class="e-product-listing col-xs-9"><h4><a href="" ng-click=setFullScreenProduct(product) analytics-on analytics-category="{{ route }}" analytics-event=preview analytics-label="{{ product.title }}" ng-show="route !== \'success\'">{{ product.title }}</a> <small ng-show=product.brand>{{ product.brand }}</small> <span ng-show="route === \'success\'">{{ product.title }} <small ng-show=product.brand>{{ product.brand }}</small></span></h4>by {{ product.lister }}<br>Baseline price: {{ product.baselinePrice | currency }} <strong ng-show="route === \'success\' && link" class=text-success><br>Your price: {{ link.sellerPrice | currency }}</strong><br><button class="btn btn-default vert-2" ng-click=setFullScreenProduct(product) analytics-on analytics-category="{{ route }}" analytics-event=preview analytics-label="{{ product.title }}" ng-show="route === \'catalog\' || route === \'generate\'"><i class="glyphicon glyphicon-eye-open"></i> Preview</button> <a class="btn btn-success vert-2" ui-sref="generate({id: product.id})" ng-show="route === \'catalog\'">Sell <i class="glyphicon glyphicon-arrow-right"></i></a> <a ui-sref="generate({id: product.id})" class="btn btn-default vert-2" ng-show="route === \'success\'">Set another price</a> <a ui-sref=catalog class="btn btn-default vert-2" ng-show="route === \'success\'">Back to Catalog</a></div>'),e.put("components/ee-storefront-product.html",'<img ng-src="{{ product.image_meta.cloudinary.main_image.url | thumbnail }}" class="img-responsive full-width"><div class=vert-5><span class=product-title>{{ product.title }}</span><br><strong>{{ product.baselinePrice / (1 - 0.15) | currency }}</strong> &nbsp;<div class=btn-group><div class="btn btn-default btn-xs"><i class="fa fa-fw fa-arrow-left hidden-xs"></i> <i class="fa fa-fw fa-arrow-up visible-xs-inline-block"></i></div><div class="btn btn-default btn-xs"><i class="fa fa-fw fa-pencil"></i></div><div class="btn btn-default btn-xs"><i class="fa fa-fw fa-arrow-down visible-xs-inline-block"></i> <i class="fa fa-fw fa-arrow-right hidden-xs"></i></div></div></div>')}]);
(function(){"use strict";angular.module("eeApp",["ui.router","ui.bootstrap","ngCookies","angulartics","angulartics.google.analytics","colorpicker.module","angularFileUpload","app.core","app.auth","app.landing","app.about","app.contact","app.storefront","app.catalog","app.orders","app.account","ee-navbar","ee-offscreen","ee-catalogProduct","ee-storefrontProduct","ee-order","EE.Templates"])}).call(this);
(function(){"use strict";angular.module("app.core",[])}).call(this);
(function(){"use strict";angular.module("app.core").run(["$rootScope","$state","$cookies","$location","eeBack",function(e,o,t,a,n){e.$state=o,e.$on("$stateChangeStart",function(e,t){var a;return a=["landing","login","logout","about","signup"],a.indexOf(t.name)>-1||n.hasToken()?void 0:(e.preventDefault(),o.go("login"))}),e.eeUser={storefront:{categories:{"New Arrivals":"New Arrivals","Home Decor":"Home Decor",Paper:"Paper",Bags:"Bags",Jewelry:"Jewelry",Accessories:"Accessories",Vintage:"Vintage",Apparel:"Apparel"},home:{name:"Common Deer VT",topBarColor:"#f6f6f6",topBarBackgroundColor:"#222222",carousel:{1:{imgUrl:"http://cdn.shopify.com/s/files/1/0269/1895/t/2/assets/slideshow_6.jpg?5116",headline:"TOPO DESIGNS",byline:"OUR FAVORITE PACKS",btnText:"SHOP NOW",btnPosition:"right",linkCategory:"Bags"}}},shop:{},blog:{url:"http://www.myblog.com"},about:{imgUrl:"http://res.cloudinary.com/eeosk/image/upload/v1422583052/storefront_about/mkld3jahfvljsd0knnhh.jpg",headline:"Common Deer was founded on the idea that life is better with a bit of character.",content:'We also believe that “cheap” is actually quite expensive… in the long run. So, we’re obsessed with awesome things that make us feel good. We comb vintage sales, auctions, craft fairs, etsy, and more to find products worthy of our Common Deer stamp. We love small business, small batch production and products that are USA-made, eco-friendly, fair-trade, re-purposed, or vintage. As we grow, we are working towards having our entire collection fit those buzz words. We know that with your help in supporting small business, new designers, artisans, and craftspeople it will result in collective success. We want you to feel great about the products you purchase, how you decorate your home, and the gifts you give. At our core is the exploration of how it is made, the people behind the product, and why. The story is what sells us – and we encourage you to think more about “the story” behind what you’re purchasing even outside of Common Deer. The people behind Common Deer…\n\nYes, it’s a family. With Sharon at the helm, the Beal family is on an adventure. With over 40 years in the business world, Sharon decided it was finally time to make an impact while pursuing her passion for décor and fine things. With an eye for design and a passion for supporting small business – Sharon is obsessed with “the story” behind each product and “putting it all together.” John, Sarah, and Johnny all provide support in managing aspects of the business, including the hunt for cool things with character. About the name… No one ever said that naming a business is an easy feat. With many months, pre-mature domain name purchases, and endless brainstorms – landing on “Common Deer” – was a completely accident. Yes, Common Deer is meant to be a play on “commandeer” – as we are a sailing family. Luckily, we are not the type to pirate your ship. Further breaking down the name – “Deer”, because we are nature-obsessed and are concerned with the impact of our items, environmentally, as well as socially. Also, it’s super fun to explain how to spell our name by throwing up hand antlers – do it, you’ll enjoy it too. “Common” because we know that if everyone would live with the ‘common good’ in mind, we would all benefit. Common Deer - the act of making something your own by embracing the character and story behind each purchase and gift."'},audience:{social:{facebook:"CommonDeer",pinterest:"commondeer",twitter:"commondeervt",instagram:"commondeer"},contact:{email:"info@commondeervt.com",address:{street1:"5224 Shelburne Rd",street2:"Suite 102",city:"Shelburne",state:"VT",zip:"05482"}},newsletterSignup:!0}}}}])}).call(this);
(function(){"use strict";angular.module("app.core").constant("eeFirebaseUrl","https://fiery-inferno-1584.firebaseIO.com/").constant("eeBackUrl","http://localhost:3000/v0/")}).call(this);
(function(){"use strict";angular.module("app.core").filter("eeShopCategories",function(){return function(r,n){var e,t,u,o,l;if(!r||!n||"All"===n)return r;for(e=[],u=0,o=r.length;o>u;u++)t=r[u],(null!=(l=t.categories)?l.indexOf(n):void 0)>=0&&e.push(t);return e}}),angular.module("app.core").filter("centToDollar",["$filter",function(r){return function(n){var e;return(e=r("currency"))(Math.floor(n)/100)}}]),angular.module("app.core").filter("thumbnail",function(){return function(r){return r.split("image/upload").join("image/upload/c_pad,w_150,h_150")}})}).call(this);
(function(){"use strict";angular.module("app.core").config(["$locationProvider","$stateProvider","$urlRouterProvider","$httpProvider",function(e,t,o,a){e.html5Mode(!0),a.defaults.useXDomain=!0,a.defaults.withCredentials=!0,delete a.defaults.headers.common["X-Requested-With"],a.defaults.headers.common.Accept="application/json",a.defaults.headers.common["Content-Type"]="application/json",t.state("app",{url:"",template:'<div ui-view class="white-background"></div>',data:{narrowToggle:!0}}),o.otherwise("/")}])}).call(this);
(function(){"use strict";angular.module("app.core").factory("eeBack",["$rootScope","$cookies","$http","$q","eeBackUrl",function(e,r,t,n,o){var u,c;return c="",u=r.loginToken,{authWithPassword:function(e,r){var i,s;return s={method:"POST",url:o+"auth",headers:{authorization:"Basic "+e+":"+r}},i=n.defer(),t(s).success(function(e){return c=e.user,u=e.token,i.resolve(e)}).error(function(e){return i.resolve(e)}),i.promise},loginWithToken:function(e){var r,u;return u={method:"POST",url:o+"token",headers:{authorization:e}},r=n.defer(),t(u).success(function(e){return e.username&&(c=e),r.resolve(e)}).error(function(e){return r.reject(e)}),r.promise},getUser:function(){return c},setUser:function(){return e.eeUser=c},hasToken:function(){return!!u},getProducts:function(){var e,r;return r={method:"GET",url:o+"products",headers:{authorization:u}},e=n.defer(),t(r).success(function(r){return e.resolve(r)}).error(function(r){return e.resolve(r)}),e.promise}}}]),angular.module("app.core").factory("eeEnvSvc",["$location",function(e){return{envFromHost:function(){return e.host()&&e.host().indexOf("eeosk")>-1?"production":"development"}}}]),angular.module("app.core").factory("eeGlobalSvc",["$state","$document",function(e,r){return{getTitle:function(){return e.current.data.pageTitle},setTitle:function(r){e.current.data.pageTitle=r},addBodyClass:function(e){r.find("body").addClass(e)},removeBodyClass:function(e){r.find("body").removeClass(e)}}}]),angular.module("app.core").factory("eePathMaker",function(){var e;return e="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_",{createPath:function(){var r,t,n,o;for(r=Date.now()+"",t=parseInt(r.substr(8,5)+r.substr(1,7)),n="";;)if(o=t%64,n=e.charAt(o)+n,t=Math.floor(t/64),0===t)break;return n}}}),angular.module("app.core").factory("eeFirebaseSvc",["$http","$q","$location","eeFirebaseUrl","eeEnvSvc",function(e,r,t,n,o){var u,c,i;return i=new Firebase(n).child(o.envFromHost()),c=o.envFromHost(),u=function(e){c=e,i=new Firebase(n).child(e)},{getFirebaseEnv:function(){return c},setRef:u,getProducts:function(){var t;return t=r.defer(),e.get("/products.json").success(function(e){return t.resolve(e)}).error(function(e){return t.resolve(e)}),t.promise},getProduct:function(e){var t;return t=r.defer(),i.child("products").child(e).once("value",function(e){return t.resolve(e.val())}),t.promise},createProduct:function(e){var t;return t=r.defer(),i.child("products").push(e,function(e){return e?t.reject(e):t.resolve()}),t.promise},updateProduct:function(e,t){var n;return n=r.defer(),i.child("products").child(e).set(t,function(e){return e?n.reject(e):n.resolve()}),n.promise},deleteProduct:function(e){var t;return t=r.defer(),i.child("products").child(e).remove(function(e){return e?t.reject(e):t.resolve()}),t.promise},getLink:function(e){var t;return t=r.defer(),i.child("links").child(e).once("value",function(e){return t.resolve(e.val())}),t.promise},createLink:function(e,r,t,n){return i.child("links").child(n).setWithPriority({productId:e,email:r,sellerPrice:t},n),i.child("links")},getAuth:function(){return i.getAuth()},authWithPassword:function(e,t){var n;return n=r.defer(),i.authWithPassword({email:e,password:t},function(e,r){return n.resolve(r)}),n.promise},unauth:function(){return i.unauth()},redirectUnlessAuth:function(){return i.getAuth()?void 0:t.path("user/login")},createSignup:function(e){var t;return t=r.defer(),i.child("signups").push(e,function(e){return e?t.reject(e):t.resolve()}),t.promise},getOrders:function(){var t;return t=r.defer(),e.get("/orders.json").success(function(e){return t.resolve(e)}).error(function(e){return t.resolve(e)}),t.promise}}}]),angular.module("app.core").factory("eeFullScreenSvc",["$rootScope",function(e){var r;return r=!1,{get:function(){return r},set:function(t){r=t,e.$broadcast("setFullScreen",r)}}}])}).call(this);
(function(){"use strict";angular.module("app.about",["app.core"])}).call(this);
(function(){"use strict";angular.module("app.account",["app.core"])}).call(this);
(function(){"use strict";angular.module("app.auth",["app.core"])}).call(this);
(function(){"use strict";angular.module("app.catalog",["app.core"])}).call(this);
(function(){"use strict";angular.module("app.contact",["app.core"])}).call(this);
(function(){"use strict";angular.module("app.landing",[])}).call(this);
(function(){"use strict";angular.module("app.orders",["app.core"])}).call(this);
(function(){"use strict";angular.module("app.storefront",["app.core"])}).call(this);
(function(){"use strict";angular.module("app.about").config(["$stateProvider",function(){}])}).call(this);
(function(){"use strict";angular.module("app.account").config(["$stateProvider",function(t){return t.state("app.account",{url:"/account",templateUrl:"app/account/account.html",controller:"app.catalogCtrl",data:{pageTitle:"Account | eeosk",offscreenCategory:"Account",offscreenColor:"dark"}})}])}).call(this);
(function(){"use strict";angular.module("app.auth").config(["$stateProvider",function(t){return t.state("login",{url:"/login",templateUrl:"app/auth/auth.login.html",controller:"loginCtrl",data:{pageTitle:"Login | eeosk"}}).state("logout",{url:"/logout",template:"",controller:"logoutCtrl",data:{pageTitle:"Logout | eeosk"}})}])}).call(this);
(function(){"use strict";angular.module("app.catalog").config(["$stateProvider",function(a){return a.state("app.catalog",{url:"/catalog",templateUrl:"app/catalog/catalog.html",controller:"app.catalogCtrl",data:{pageTitle:"Add products | eeosk",offscreenCategory:"Catalog",offscreenColor:"gold"}})}])}).call(this);
(function(){"use strict";angular.module("app.contact").config(["$stateProvider",function(t){return t.state("signup",{url:"/create-online-store",templateUrl:"app/contact/contact.signup.html",controller:"contactCtrl",data:{pageTitle:"Create your store | eeosk"}})}])}).call(this);
(function(){"use strict";angular.module("app.landing").config(["$stateProvider","$locationProvider",function(t,e){e.html5Mode(!0),t.state("landing",{url:"/",templateUrl:"app/landing/landing.html",controller:"landingCtrl",data:{pageTitle:"Online store builder, ecommerce storefront, dropship product catalog | eeosk",pageDescription:"Create an online store from a catalog of products."}})}])}).call(this);
(function(){"use strict";angular.module("app.orders").config(["$stateProvider",function(e){return e.state("app.orders",{url:"/orders",templateUrl:"app/orders/orders.html",controller:"app.ordersCtrl",resolve:{eeOrderData:["eeFirebaseSvc",function(e){return e.getOrders()}]},data:{pageTitle:"My orders | eeosk",offscreenCategory:"Orders",offscreenColor:"green"}})}])}).call(this);
(function(){"use strict";angular.module("app.storefront").config(["$stateProvider",function(t){return t.state("app.storefront",{url:"/storefront",templateUrl:"app/storefront/storefront.view.container.html",controller:"app.storefrontCtrl",data:{pageTitle:"Build your store | eeosk",offscreenCategory:"Storefront",offscreenColor:"blue"}}).state("app.storefront.home",{url:"/home",templateUrl:"app/storefront/storefront.home.html"}).state("app.storefront.shop",{url:"/shop/:shopCategory",templateUrl:"app/storefront/storefront.shop.html"}).state("app.storefront.blog",{url:"/blog",templateUrl:"app/storefront/storefront.blog.html"}).state("app.storefront.about",{url:"/about",templateUrl:"app/storefront/storefront.about.html"}).state("app.storefront.audience",{url:"/audience",templateUrl:"app/storefront/storefront.audience.html"})}])}).call(this);
(function(){"use strict";angular.module("app.about").controller("aboutCtrl",["$scope","eeProductData",function(e){e.sellerPrice=3,e.examplePrice=50,e.slidePos="slide-1"}])}).call(this);
(function(){"use strict";angular.module("app.account").controller("app.accountCtrl",["$scope","$rootScope",function(o,c){c.toggle=!0}])}).call(this);
(function(){"use strict";angular.module("app.auth").controller("loginCtrl",["$scope","$state","$cookies","$cookieStore","eeBack","$rootScope",function(o,n,e,t,r){o.res="",e.loginToken&&r.loginWithToken(e.loginToken).then(function(o){return o.username?n.go("app.storefront.home"):void 0})["catch"](function(){return t.remove("loginToken")}),o.authWithPassword=function(){return r.authWithPassword(o.email,o.password).then(function(t){return e.loginToken=t.token,t.token?n.go("app.storefront.home"):o.res=t.message})["catch"](function(){return o.res="problem logging in"})}}]),angular.module("app.auth").controller("logoutCtrl",["$location","$cookieStore",function(o,n){n.remove("loginToken"),o.path("/")}])}).call(this);
(function(){"use strict";angular.module("app.catalog").controller("app.catalogCtrl",["$scope","$rootScope","eeBack",function(t,o,c){o.toggle=!0,c.getProducts().then(function(o){return t.products=o})}])}).call(this);
(function(){"use strict";angular.module("app.contact").controller("contactCtrl",["$scope","$location","eeFirebaseSvc",function(t,n,c){t.signup={},t.signup.location=n.path(),t.submitForm=function(){t.buttonDisabled=!0,c.createSignup(t.signup).then(function(){t.signupCreated=!0})["catch"](function(){alert("Failed to process signup"),t.buttonDisabled=!1})}}])}).call(this);
(function(){"use strict";angular.module("app.landing").controller("landingCtrl",["$scope","$location","$anchorScroll",function(l,n,o){l.navbarCollapsed=!0,l.scrollToMore=function(){return n.hash("more"),o()}}])}).call(this);
(function(){"use strict";angular.module("app.orders").controller("app.ordersCtrl",["$scope","$rootScope","eeOrderData",function(r,o,e){o.toggle=!0,r.orders=e}])}).call(this);
(function(){"use strict";angular.module("app.storefront").controller("app.storefrontCtrl",["$scope","$rootScope","eeBack",function(t,o,r){o.toggle=!0,r.getProducts().then(function(o){return t.products=o})}])}).call(this);
(function(){angular.module("ee-catalogProduct",[]),angular.module("ee-catalogProduct").directive("eeCatalogProduct",["$rootScope",function(){return{templateUrl:"components/ee-catalog-product.html",restrict:"E",scope:{product:"="},link:function(r){var e,t,c,n,u;e=r.product.baseline_price,n=.05,c=.4,u=.15,t=function(r,e){return r/(1-e)},r.currentMargin=u,r.currentPrice=t(e,r.currentMargin),r.setCurrentPrice=function(u){var o;o=u,u>=c&&(o=c),n>=u&&(o=n),r.currentMargin=o,r.currentPrice=t(e,r.currentMargin)}}}}])}).call(this);
(function(){angular.module("ee-navbar",[]),angular.module("ee-navbar").directive("eeNavbar",function(){return{templateUrl:"components/ee-navbar.html",restrict:"E",scope:{},link:function(){}}})}).call(this);
(function(){"use strict";angular.module("ee-offscreen",[]),angular.module("ee-offscreen").directive("eeOffscreen",["$rootScope",function(e){return{templateUrl:"components/ee-offscreen.html",restrict:"E",scope:{toggle:"=",narrowToggle:"=",offscreenCategory:"=",offscreenColor:"="},link:function(r){r.categoryToggle=!1,r.toggleOffscreen=function(){return e.toggle=!e.toggle},r.setCategory=function(e){return r.offscreenCategory=e,r.categoryToggle=!1}}}}]),angular.module("ee-offscreen").directive("eeOffscreenDefault",function(){return{templateUrl:"components/ee-offscreen-default.html",restrict:"E",scope:{},link:function(){}}}),angular.module("ee-offscreen").directive("eeOffscreenStorefront",["$state","$rootScope",function(e,r){return{templateUrl:"app/storefront/storefront.offscreen.html",restrict:"E",scope:{},link:function(t){t.$state=e,t.eeUser=r.eeUser}}}]),angular.module("ee-offscreen").directive("eeOffscreenStorefrontHome",["$upload","$http",function(){return{templateUrl:"app/storefront/storefront.home.offscreen.html",restrict:"E",link:function(){$(".upload_form").append($.cloudinary.unsigned_upload_tag("storefront_home",{cloud_name:"eeosk"}))}}}]),angular.module("ee-offscreen").directive("eeOffscreenStorefrontShop",function(){return{templateUrl:"app/storefront/storefront.shop.offscreen.html",restrict:"E",link:function(){}}}),angular.module("ee-offscreen").directive("eeOffscreenStorefrontBlog",function(){return{templateUrl:"app/storefront/storefront.blog.offscreen.html",restrict:"E",link:function(){}}}),angular.module("ee-offscreen").directive("eeOffscreenStorefrontAbout",function(){return{templateUrl:"app/storefront/storefront.about.offscreen.html",restrict:"E",link:function(){$(".upload_form").append($.cloudinary.unsigned_upload_tag("storefront_about",{cloud_name:"eeosk"}))}}}),angular.module("ee-offscreen").directive("eeOffscreenStorefrontAudience",function(){return{templateUrl:"app/storefront/storefront.audience.offscreen.html",restrict:"E",link:function(){}}}),angular.module("ee-offscreen").directive("eeOffscreenCatalog",function(){return{templateUrl:"app/catalog/catalog.offscreen.html",restrict:"E",scope:{},link:function(){}}}),angular.module("ee-offscreen").directive("eeOffscreenOrders",function(){return{templateUrl:"app/orders/orders.offscreen.html",restrict:"E",scope:{},link:function(){}}}),angular.module("ee-offscreen").directive("eeOffscreenAccount",function(){return{templateUrl:"app/account/account.offscreen.html",restrict:"E",scope:{},link:function(){}}})}).call(this);
(function(){var e;e=angular.module("ee-order",[]),e.directive("eeOrder",function(){return{templateUrl:"components/ee-order.html",restrict:"E",scope:{order:"="},link:function(){}}})}).call(this);
(function(){angular.module("EE.Previewer",["hc.marked"]),angular.module("EE.Previewer").directive("eePreviewer",["eeFullScreenSvc","eeGlobalSvc",function(e,r){return{templateUrl:"components/ee-previewer.html",restrict:"E",scope:{},link:function(n){n.currentImgI=0,n.setCurrentImgI=function(e){n.currentImgI=e},n.setFullScreen=e.set,n.$on("setFullScreen",function(e,t){t===!1?(n.setCurrentImgI(0),r.removeBodyClass("no-scroll")):r.addBodyClass("no-scroll")}),n.product={},n.$on("setProduct",function(e,r){n.product=r})}}}])}).call(this);
(function(){angular.module("EE.ProductEditor",[]),angular.module("EE.ProductEditor").directive("eeProductEditor",function(){return{templateUrl:"components/ee-product-editor.html",restrict:"E",scope:{product:"=",createProduct:"&",updateProduct:"&",deleteProduct:"&"},controller:["$scope",function(e){e.conditions=["New","Used - Like New","Used - Very Good","Used - Acceptable","Used - Good","Refurbished"],e.conditions=["New","Used - Like New","Used - Very Good","Used - Acceptable","Used - Good","Refurbished"],e.categories=["Apparel","Shoes & Accessories","Home & Garden","Everything Else"],e.product||(e.product={trade:!0,condition:"New",quantity:1,freeShipping:!0}),e.inputFields=[{name:"title",type:"text",required:!0},{name:"description",type:"textarea",required:!0,placeholder:"supports markdown"},{name:"images",type:"text",required:!0,placeholder:"comma separated w/o quotes, e.g. '1.jpg, 2.jpg'"},{name:"brand",type:"text"},{name:"condition",type:"select",required:!0},{name:"trade",type:"checkbox"},{name:"lister",type:"text",required:!0,placeholder:"that's you!"},{name:"listerPrice",type:"number",step:.01,min:0},{name:"baselinePrice",type:"number",required:!0,step:.01,min:0},{name:"shippingPrice",type:"number",step:.01,min:0},{name:"freeShipping",type:"checkbox",required:!0},{name:"quantity",type:"number",required:!0,step:1,min:0},{name:"category",type:"select",required:!0},{name:"tags",type:"text",placeholder:"<= 5; comma separated w/o quotes; e.g. 'pet, book'"},{name:"url",type:"url",placeholder:"url to manufacture's page"}],e.inputFieldsAdditional=[{name:"image_gen",type:"text",placeholder:"e.g.: 'product-image, 5'"}],e.imageGen=function(t){var r;2===t.length&&t[1].length<=2&&(e.product.images=[],function(){r=[];for(var e=1,o=t[1];o>=1?o>=e:e>=o;o>=1?e++:e--)r.push(e);return r}.apply(this).forEach(function(r){e.product.images.push(""+t[0]+"-"+r+".jpg")}))}}],link:function(e,t,r){e.type=r.type}}})}).call(this);
(function(){var t;t=angular.module("ee.productListing",[]),t.directive("eeProductListing",["eeFullScreenSvc","$rootScope",function(t,e){return{templateUrl:"components/ee-product-listing.html",restrict:"E",scope:{link:"=",product:"="},link:function(c,o,r){c.route=r.route,c.setFullScreenProduct=function(c){e.$broadcast("setProduct",c),t.set(!0)}}}}])}).call(this);
(function(){var t;t=angular.module("ee-storefrontProduct",[]),t.directive("eeStorefrontProduct",function(){return{templateUrl:"components/ee-storefront-product.html",restrict:"E",scope:{product:"="}}})}).call(this);
!function(){function n(t){return void 0!==t}function ba(){}function ca(t){t.Qb=function(){return t.ef?t.ef:t.ef=new t}}function da(t){var e=typeof t;if("object"==e){if(!t)return"null";if(t instanceof Array)return"array";if(t instanceof Object)return e;var n=Object.prototype.toString.call(t);if("[object Window]"==n)return"object";if("[object Array]"==n||"number"==typeof t.length&&"undefined"!=typeof t.splice&&"undefined"!=typeof t.propertyIsEnumerable&&!t.propertyIsEnumerable("splice"))return"array";if("[object Function]"==n||"undefined"!=typeof t.call&&"undefined"!=typeof t.propertyIsEnumerable&&!t.propertyIsEnumerable("call"))return"function"}else if("function"==e&&"undefined"==typeof t.call)return"object";return e}function ea(t){return"array"==da(t)}function fa(t){var e=da(t);return"array"==e||"object"==e&&"number"==typeof t.length}function p(t){return"string"==typeof t}function ga(t){return"number"==typeof t}function ha(t){return"function"==da(t)}function ia(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}function ja(t){return t.call.apply(t.bind,arguments)}function ka(t,e){if(!t)throw Error();if(2<arguments.length){var n=Array.prototype.slice.call(arguments,2);return function(){var i=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(i,n),t.apply(e,i)}}return function(){return t.apply(e,arguments)}}function q(){return q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ja:ka,q.apply(null,arguments)}function la(t){var e=Array.prototype.slice.call(arguments,1);return function(){var n=e.slice();return n.push.apply(n,arguments),t.apply(this,n)}}function na(t,e){function n(){}n.prototype=e.prototype,t.oc=e.prototype,t.prototype=new n,t.Ag=function(t,n){return e.prototype[n].apply(t,Array.prototype.slice.call(arguments,2))}}function oa(a){if(a=String(a),/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a)}function pa(){this.Id=void 0}function qa(t,e,n){switch(typeof e){case"string":ra(e,n);break;case"number":n.push(isFinite(e)&&!isNaN(e)?e:"null");break;case"boolean":n.push(e);break;case"undefined":n.push("null");break;case"object":if(null==e){n.push("null");break}if(ea(e)){var i=e.length;n.push("[");for(var r="",o=0;i>o;o++)n.push(r),r=e[o],qa(t,t.Id?t.Id.call(e,String(o),r):r,n),r=",";n.push("]");break}n.push("{"),i="";for(o in e)Object.prototype.hasOwnProperty.call(e,o)&&(r=e[o],"function"!=typeof r&&(n.push(i),ra(o,n),n.push(":"),qa(t,t.Id?t.Id.call(e,o,r):r,n),i=","));n.push("}");break;case"function":break;default:throw Error("Unknown type: "+typeof e)}}function ra(t,e){e.push('"',t.replace(ta,function(t){if(t in sa)return sa[t];var e=t.charCodeAt(0),n="\\u";return 16>e?n+="000":256>e?n+="00":4096>e&&(n+="0"),sa[t]=n+e.toString(16)}),'"')}function ua(t){return"undefined"!=typeof JSON&&n(JSON.parse)?JSON.parse(t):oa(t)}function t(t){if("undefined"!=typeof JSON&&n(JSON.stringify))t=JSON.stringify(t);else{var e=[];qa(new pa,t,e),t=e.join("")}return t}function u(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function v(t,e){return Object.prototype.hasOwnProperty.call(t,e)?t[e]:void 0}function va(t,e){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function wa(t){var e={};return va(t,function(t,n){e[t]=n}),e}function xa(t){this.xc=t,this.Hd="firebase:"}function ya(){this.ha={}}function za(t){try{if("undefined"!=typeof window&&"undefined"!=typeof window[t]){var e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new xa(e)}}catch(n){}return new ya}function Ca(t,e,n,i,r){this.host=t.toLowerCase(),this.domain=this.host.substr(this.host.indexOf(".")+1),this.Cb=e,this.yb=n,this.yg=i,this.Gd=r||"",this.Ka=Aa.get("host:"+t)||this.host}function Da(t,e){e!==t.Ka&&(t.Ka=e,"s-"===t.Ka.substr(0,2)&&Aa.set("host:"+t.host,t.Ka))}function Ea(){this.Ta=-1}function Fa(){this.Ta=-1,this.Ta=64,this.R=[],this.be=[],this.Af=[],this.Dd=[],this.Dd[0]=128;for(var t=1;t<this.Ta;++t)this.Dd[t]=0;this.Rd=this.Tb=0,this.reset()}function Ga(t,e,n){n||(n=0);var i=t.Af;if(p(e))for(var r=0;16>r;r++)i[r]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(r=0;16>r;r++)i[r]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(r=16;80>r;r++){var o=i[r-3]^i[r-8]^i[r-14]^i[r-16];i[r]=4294967295&(o<<1|o>>>31)}e=t.R[0],n=t.R[1];for(var a,s=t.R[2],u=t.R[3],h=t.R[4],r=0;80>r;r++)40>r?20>r?(o=u^n&(s^u),a=1518500249):(o=n^s^u,a=1859775393):60>r?(o=n&s|u&(n|s),a=2400959708):(o=n^s^u,a=3395469782),o=(e<<5|e>>>27)+o+h+a+i[r]&4294967295,h=u,u=s,s=4294967295&(n<<30|n>>>2),n=e,e=o;t.R[0]=t.R[0]+e&4294967295,t.R[1]=t.R[1]+n&4294967295,t.R[2]=t.R[2]+s&4294967295,t.R[3]=t.R[3]+u&4294967295,t.R[4]=t.R[4]+h&4294967295}function Ha(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^ma()).toString(36)}function Oa(t,e){var n=Pa(t,e,void 0);return 0>n?null:p(t)?t.charAt(n):t[n]}function Pa(t,e,n){for(var i=t.length,r=p(t)?t.split(""):t,o=0;i>o;o++)if(o in r&&e.call(n,r[o],o,t))return o;return-1}function Qa(t,e){var n=Ia(t,e);n>=0&&w.splice.call(t,n,1)}function Ra(t){return w.splice.apply(t,Sa(arguments,1))}function Sa(t,e,n){return 2>=arguments.length?w.slice.call(t,e):w.slice.call(t,e,n)}function Ta(t,e){t.sort(e||Ua)}function Ua(t,e){return t>e?1:e>t?-1:0}function Ya(t){return-1!=Va.indexOf(t)}function fb(t,e){if(!fa(t))throw Error("encodeByteArray takes an array as a parameter");gb();for(var n=e?db:cb,i=[],r=0;r<t.length;r+=3){var o=t[r],a=r+1<t.length,s=a?t[r+1]:0,u=r+2<t.length,h=u?t[r+2]:0,c=o>>2,o=(3&o)<<4|s>>4,s=(15&s)<<2|h>>6,h=63&h;u||(h=64,a||(s=64)),i.push(n[c],n[o],n[s],n[h])}return i.join("")}function gb(){if(!cb){cb={},db={},eb={};for(var t=0;65>t;t++)cb[t]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(t),db[t]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(t),eb[db[t]]=t}}function x(t,e){if(!t)throw ib(e)}function ib(t){return Error("Firebase INTERNAL ASSERT FAILED:"+t)}function jb(t){try{var e;if("undefined"!=typeof atob)e=atob(t);else{gb();for(var n=eb,i=[],r=0;r<t.length;){var o=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;var s=r<t.length?n[t.charAt(r)]:64;++r;var u=r<t.length?n[t.charAt(r)]:64;if(++r,null==o||null==a||null==s||null==u)throw Error();i.push(o<<2|a>>4),64!=s&&(i.push(a<<4&240|s>>2),64!=u&&i.push(s<<6&192|u))}if(8192>i.length)e=String.fromCharCode.apply(null,i);else{for(t="",n=0;n<i.length;n+=8192)t+=String.fromCharCode.apply(null,Sa(i,n,n+8192));e=t}}return e}catch(h){kb("base64Decode failed: ",h)}return null}function lb(t){var e=mb(t);t=new Fa,t.update(e);var e=[],n=8*t.Rd;56>t.Tb?t.update(t.Dd,56-t.Tb):t.update(t.Dd,t.Ta-(t.Tb-56));for(var i=t.Ta-1;i>=56;i--)t.be[i]=255&n,n/=256;for(Ga(t,t.be),i=n=0;5>i;i++)for(var r=24;r>=0;r-=8)e[n]=t.R[i]>>r&255,++n;return fb(e)}function nb(){for(var e="",n=0;n<arguments.length;n++)e=fa(arguments[n])?e+nb.apply(null,arguments[n]):"object"==typeof arguments[n]?e+t(arguments[n]):e+arguments[n],e+=" ";return e}function kb(){if(!0===pb&&(pb=!1,null===ob&&!0===Ba.get("logging_enabled")&&qb(!0)),ob){var t=nb.apply(null,arguments);ob(t)}}function rb(t){return function(){kb(t,arguments)}}function sb(){if("undefined"!=typeof console){var t="FIREBASE INTERNAL ERROR: "+nb.apply(null,arguments);"undefined"!=typeof console.error?console.error(t):console.log(t)}}function tb(){var t=nb.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+t)}function z(){if("undefined"!=typeof console){var t="FIREBASE WARNING: "+nb.apply(null,arguments);"undefined"!=typeof console.warn?console.warn(t):console.log(t)}}function ub(t){var e="",n="",i="",r=!0,o="https",a="";if(p(t)){var s=t.indexOf("//");s>=0&&(o=t.substring(0,s-1),t=t.substring(s+2)),s=t.indexOf("/"),-1===s&&(s=t.length),e=t.substring(0,s),t=t.substring(s+1);var u=e.split(".");if(3===u.length){for(s=u[2].indexOf(":"),r=s>=0?"https"===o||"wss"===o:!0,n=u[1],i=u[0],a="",t=("/"+t).split("/"),s=0;s<t.length;s++)if(0<t[s].length){u=t[s];try{u=decodeURIComponent(u.replace(/\+/g," "))}catch(h){}a+="/"+u}i=i.toLowerCase()}else 2===u.length&&(n=u[0])}return{host:e,domain:n,vg:i,Cb:r,scheme:o,Pc:a}}function vb(t){return ga(t)&&(t!=t||t==Number.POSITIVE_INFINITY||t==Number.NEGATIVE_INFINITY)}function wb(t){if("complete"===document.readyState)t();else{var e=!1,n=function(){document.body?e||(e=!0,t()):setTimeout(n,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&n()}),window.attachEvent("onload",n))}}function xb(t,e){if(t===e)return 0;if("[MIN_NAME]"===t||"[MAX_NAME]"===e)return-1;if("[MIN_NAME]"===e||"[MAX_NAME]"===t)return 1;var n=yb(t),i=yb(e);return null!==n?null!==i?0==n-i?t.length-e.length:n-i:-1:null!==i?1:e>t?-1:1}function zb(e,n){if(n&&e in n)return n[e];throw Error("Missing required key ("+e+") in object: "+t(n))}function Ab(e){if("object"!=typeof e||null===e)return t(e);var n,i=[];for(n in e)i.push(n);i.sort(),n="{";for(var r=0;r<i.length;r++)0!==r&&(n+=","),n+=t(i[r]),n+=":",n+=Ab(e[i[r]]);return n+"}"}function Bb(t,e){if(t.length<=e)return[t];for(var n=[],i=0;i<t.length;i+=e)n.push(i+e>t?t.substring(i,t.length):t.substring(i,i+e));return n}function Cb(t,e){if(ea(t))for(var n=0;n<t.length;++n)e(n,t[n]);else A(t,e)}function Db(t){x(!vb(t),"Invalid JSON number");var e,n,i,r;for(0===t?(i=n=0,e=-1/0===1/t?1:0):(e=0>t,t=Math.abs(t),t>=Math.pow(2,-1022)?(i=Math.min(Math.floor(Math.log(t)/Math.LN2),1023),n=i+1023,i=Math.round(t*Math.pow(2,52-i)-Math.pow(2,52))):(n=0,i=Math.round(t/Math.pow(2,-1074)))),r=[],t=52;t;t-=1)r.push(i%2?1:0),i=Math.floor(i/2);for(t=11;t;t-=1)r.push(n%2?1:0),n=Math.floor(n/2);for(r.push(e?1:0),r.reverse(),e=r.join(""),n="",t=0;64>t;t+=8)i=parseInt(e.substr(t,8),2).toString(16),1===i.length&&(i="0"+i),n+=i;return n.toLowerCase()}function yb(t){return Eb.test(t)&&(t=Number(t),t>=-2147483648&&2147483647>=t)?t:null}function Fb(t){try{t()}catch(e){setTimeout(function(){throw e},Math.floor(0))}}function B(t){if(ha(t)){var e=Array.prototype.slice.call(arguments,1).slice();Fb(function(){t.apply(null,e)})}}function Gb(t,e,n,i){this.me=e,this.Ld=n,this.Rc=i,this.nd=t}function Hb(t,e,n){this.me=t,this.error=e,this.path=n}function Ib(t,e,n){this.Kb=t,this.mb=e,this.vc=n||null}function Jb(t,e,n){this.ba=t,this.mb=e,this.vc=n}function mb(t){for(var e=[],n=0,i=0;i<t.length;i++){var r=t.charCodeAt(i);r>=55296&&56319>=r&&(r-=55296,i++,x(i<t.length,"Surrogate pair missing trail surrogate."),r=65536+(r<<10)+(t.charCodeAt(i)-56320)),128>r?e[n++]=r:(2048>r?e[n++]=r>>6|192:(65536>r?e[n++]=r>>12|224:(e[n++]=r>>18|240,e[n++]=r>>12&63|128),e[n++]=r>>6&63|128),e[n++]=63&r|128)}return e}function D(t,e,n,i){var r;if(e>i?r="at least "+e:i>n&&(r=0===n?"none":"no more than "+n),r)throw Error(t+" failed: Was called with "+i+(1===i?" argument.":" arguments.")+" Expects "+r+".")}function E(t,e,n){var i="";switch(e){case 1:i=n?"first":"First";break;case 2:i=n?"second":"Second";break;case 3:i=n?"third":"Third";break;case 4:i=n?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?")}return t=t+" failed: "+(i+" argument ")}function F(t,e,i,r){if((!r||n(i))&&!ha(i))throw Error(E(t,e,r)+"must be a valid function.")}function Nb(t,e,i){if(n(i)&&(!ia(i)||null===i))throw Error(E(t,e,!0)+"must be a valid context object.")}function Qb(t){return p(t)&&0!==t.length&&!Ob.test(t)}function Rb(t){return null===t||p(t)||ga(t)&&!vb(t)||ia(t)&&u(t,".sv")}function Sb(t,e,i){i&&!n(e)||Tb(E(t,1,i),e)}function Tb(t,e,i,r){if(i||(i=0),r=r||[],!n(e))throw Error(t+"contains undefined"+Ub(r));if(ha(e))throw Error(t+"contains a function"+Ub(r)+" with contents: "+e.toString());if(vb(e))throw Error(t+"contains "+e.toString()+Ub(r));if(i>1e3)throw new TypeError(t+"contains a cyclic object value ("+r.slice(0,100).join(".")+"...)");if(p(e)&&e.length>10485760/3&&10485760<mb(e).length)throw Error(t+"contains a string greater than 10485760 utf8 bytes"+Ub(r)+" ('"+e.substring(0,50)+"...')");if(ia(e))for(var o in e)if(u(e,o)){var a=e[o];if(".priority"!==o&&".value"!==o&&".sv"!==o&&!Qb(o))throw Error(t+" contains an invalid key ("+o+")"+Ub(r)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');r.push(o),Tb(t,a,i+1,r),r.pop()}}function Ub(t){return 0==t.length?"":" in property '"+t.join(".")+"'"}function Vb(t,e){if(!ia(e)||ea(e))throw Error(E(t,1,!1)+" must be an Object containing the children to replace.");Sb(t,e,!1)}function Wb(t,e,n){if(vb(n))throw Error(E(t,e,!1)+"is "+n.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Rb(n))throw Error(E(t,e,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).")}function Xb(t,e,i){if(!i||n(e))switch(e){case"value":case"child_added":case"child_removed":case"child_changed":case"child_moved":break;default:throw Error(E(t,1,i)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".')}}function Yb(t,e,i,r){if((!r||n(i))&&!Qb(i))throw Error(E(t,e,r)+'was an invalid key: "'+i+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").')}function Zb(t,e){if(!p(e)||0===e.length||Pb.test(e))throw Error(E(t,1,!1)+'was an invalid path: "'+e+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')}function $b(t,e){if(".info"===G(e))throw Error(t+" failed: Can't modify data under /.info/")}function ac(t,e){if(!p(e))throw Error(E(t,1,!1)+"must be a valid credential (a string).")}function bc(t,e,n){if(!p(n))throw Error(E(t,e,!1)+"must be a valid string.")}function cc(t,e,i,r){if(!(r&&!n(i)||ia(i)&&null!==i))throw Error(E(t,e,r)+"must be a valid object.")}function dc(t,e,n){if(!ia(e)||null===e||!u(e,n))throw Error(E(t,1,!1)+'must contain the key "'+n+'"');if(!p(v(e,n)))throw Error(E(t,1,!1)+'must contain the key "'+n+'" with type "string"')}function ec(t,e){return xb(t.name,e.name)}function fc(t,e){return xb(t,e)}function gc(){}function H(t){return q(t.compare,t)}function jc(t){this.Vb=t}function lc(){}function nc(){this.yc=this.na=this.nc=this.ga=this.ka=!1,this.xb=0,this.Hb="",this.Bc=null,this.Xb="",this.Ac=null,this.Ub="",this.m=L}function pc(t){return x(t.ga,"Only valid if start has been set"),t.Bc}function qc(t){return x(t.ga,"Only valid if start has been set"),t.nc?t.Xb:"[MIN_NAME]"}function rc(t){return x(t.na,"Only valid if end has been set"),t.Ac}function sc(t){return x(t.na,"Only valid if end has been set"),t.yc?t.Ub:"[MAX_NAME]"}function tc(t){return x(t.ka,"Only valid if limit has been set"),t.xb}function uc(t){var e=new nc;return e.ka=t.ka,e.xb=t.xb,e.ga=t.ga,e.Bc=t.Bc,e.nc=t.nc,e.Xb=t.Xb,e.na=t.na,e.Ac=t.Ac,e.yc=t.yc,e.Ub=t.Ub,e.m=t.m,e}function vc(t,e){var n=uc(t);return n.m=e,n}function wc(t){return!(t.ga||t.na||t.ka)}function M(t,e,n,i){this.g=t,this.path=e,this.w=n,this.dc=i}function xc(t){var e=null,n=null;if(t.ga&&(e=pc(t)),t.na&&(n=rc(t)),t.m===mc){if(t.ga){if("[MIN_NAME]"!=qc(t))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if(null!=e&&"string"!=typeof e)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.")}if(t.na){if("[MAX_NAME]"!=sc(t))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if(null!=n&&"string"!=typeof n)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.")}}else if(t.m===L){if(null!=e&&!Rb(e)||null!=n&&!Rb(n))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(x(t.m instanceof jc,"unknown index type."),null!=e&&"object"==typeof e||null!=n&&"object"==typeof n)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.")}function yc(t){if(t.ga&&t.na&&t.ka&&(!t.ka||""===t.Hb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.")}function zc(t,e){if(!0===t.dc)throw Error(e+": You can't combine multiple orderBy calls.")}function Dc(t){t=t.w;var e={};if(t.ga&&(e.sp=t.Bc,t.nc&&(e.sn=t.Xb)),t.na&&(e.ep=t.Ac,t.yc&&(e.en=t.Ub)),t.ka){e.l=t.xb;var n=t.Hb;""===n&&(n=t.ga?"l":"r"),e.vf=n}return t.m!==L&&(e.i=t.m.toString()),e}function Ac(t,e,n){var i={cancel:null,Ha:null};if(e&&n)i.cancel=e,F(t,3,i.cancel,!0),i.Ha=n,Nb(t,4,i.Ha);else if(e)if("object"==typeof e&&null!==e)i.Ha=e;else{if("function"!=typeof e)throw Error(E(t,3,!0)+" must either be a cancel callback or a context object.");i.cancel=e}return i}function P(t,e){if(1==arguments.length){this.n=t.split("/");for(var n=0,i=0;i<this.n.length;i++)0<this.n[i].length&&(this.n[n]=this.n[i],n++);this.n.length=n,this.aa=0}else this.n=t,this.aa=e}function G(t){return t.aa>=t.n.length?null:t.n[t.aa]}function Q(t){return t.n.length-t.aa}function R(t){var e=t.aa;return e<t.n.length&&e++,new P(t.n,e)}function T(t,e){var n=G(t);if(null===n)return e;if(n===G(e))return T(R(t),R(e));throw Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Ec(){this.children={},this.dd=0,this.value=null}function Fc(t,e,n){this.yd=t?t:"",this.Oc=e?e:null,this.D=n?n:new Ec}function Gc(t,e){for(var n,i=e instanceof P?e:new P(e),r=t;null!==(n=G(i));)r=new Fc(n,r,v(r.D.children,n)||new Ec),i=R(i);return r}function Hc(t,e){x("undefined"!=typeof e,"Cannot set value to undefined"),t.D.value=e,Ic(t)}function Jc(t,e,n,i){n&&!i&&e(t),t.ca(function(t){Jc(t,e,!0,i)}),n&&i&&e(t)}function Kc(t,e){for(var n=t.parent();null!==n&&!e(n);)n=n.parent()}function Ic(t){if(null!==t.Oc){var e=t.Oc,n=t.yd,i=t.e(),r=u(e.D.children,n);i&&r?(delete e.D.children[n],e.D.dd--,Ic(e)):i||r||(e.D.children[n]=t.D,e.D.dd++,Ic(e))}}function Lc(t,e){this.Ga=t,this.pa=e?e:Mc}function Nc(t,e){for(var n,i=t.pa,r=null;!i.e();){if(n=t.Ga(e,i.key),0===n){if(i.left.e())return r?r.key:null;for(i=i.left;!i.right.e();)i=i.right;return i.key}0>n?i=i.left:n>0&&(r=i,i=i.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}function Oc(t,e,n,i,r){for(this.qf=r||null,this.te=i,this.ac=[],r=1;!t.e();)if(r=e?n(t.key,e):1,i&&(r*=-1),0>r)t=this.te?t.left:t.right;else{if(0===r){this.ac.push(t);break}this.ac.push(t),t=this.te?t.right:t.left}}function U(t){if(0===t.ac.length)return null;var e,n=t.ac.pop();if(e=t.qf?t.qf(n.key,n.value):{key:n.key,value:n.value},t.te)for(n=n.left;!n.e();)t.ac.push(n),n=n.right;else for(n=n.right;!n.e();)t.ac.push(n),n=n.left;return e}function Pc(t,e,n,i,r){this.key=t,this.value=e,this.color=null!=n?n:!0,this.left=null!=i?i:Mc,this.right=null!=r?r:Mc}function Qc(t){return t.left.e()?t:Qc(t.left)}function Sc(t){return t.left.e()?Mc:(t.left.$()||t.left.left.$()||(t=Tc(t)),t=t.W(null,null,null,Sc(t.left),null),Rc(t))}function Rc(t){return t.right.$()&&!t.left.$()&&(t=Wc(t)),t.left.$()&&t.left.left.$()&&(t=Uc(t)),t.left.$()&&t.right.$()&&(t=Vc(t)),t}function Tc(t){return t=Vc(t),t.right.left.$()&&(t=t.W(null,null,null,null,Uc(t.right)),t=Wc(t),t=Vc(t)),t}function Wc(t){return t.right.W(null,null,t.color,t.W(null,null,!0,null,t.right.left),null)}function Uc(t){return t.left.W(null,null,t.color,null,t.W(null,null,!0,t.left.right,null))}function Vc(t){return t.W(null,null,!t.color,t.left.W(null,null,!t.left.color,null,null),t.right.W(null,null,!t.right.color,null,null))}function Xc(){}function I(t,e){this.name=t,this.K=e}function Yc(t,e){return new I(t,e)}function Zc(t,e){this.A=t,x(null!==this.A,"LeafNode shouldn't be created with null value."),this.fa=e||K,$c(this.fa),this.wb=null}function dd(t,e){this.td=t,this.Wb=e}function ed(t,e,n){var i=fd(t.td,function(i,r){var o=v(t.Wb,r);if(x(o,"Missing index implementation for "+r),i===hc){if(o.se(e.K)){for(var a=[],s=n.Aa(Yc),u=U(s);u;)u.name!=e.name&&a.push(u),u=U(s);return a.push(e),gd(a,H(o))}return hc}return o=n.get(e.name),a=i,o&&(a=a.remove(new I(e.name,o))),a.Ja(e,e.K)});return new dd(i,t.Wb)}function hd(t,e,n){var i=fd(t.td,function(t){if(t===hc)return t;var i=n.get(e.name);return i?t.remove(new I(e.name,i)):t});return new dd(i,t.Wb)}function bd(t,e,n){this.j=t,(this.fa=e)&&$c(this.fa),this.sb=n,this.wb=null}function ld(t,e){var n;return n=(n=kd(t,e))?(n=n.Ic())&&n.name:t.j.Ic(),n?new I(n,t.j.get(n)):null}function md(t,e){var n;return n=(n=kd(t,e))?(n=n.Zb())&&n.name:t.j.Zb(),n?new I(n,t.j.get(n)):null}function kd(t,e){return e===mc?null:t.sb.get(e.toString())}function J(t,e){if(null===t)return K;var n=null;if("object"==typeof t&&".priority"in t?n=t[".priority"]:"undefined"!=typeof e&&(n=e),x(null===n||"string"==typeof n||"number"==typeof n||"object"==typeof n&&".sv"in n,"Invalid priority type found: "+typeof n),"object"==typeof t&&".value"in t&&null!==t[".value"]&&(t=t[".value"]),"object"!=typeof t||".sv"in t)return new Zc(t,J(n));if(t instanceof Array){var i=K,r=t;return A(r,function(t,e){if(u(r,e)&&"."!==e.substring(0,1)){var n=J(t);(n.P()||!n.e())&&(i=i.I(e,n))}}),i.ib(J(n))}var o=[],a=!1,s=t;va(s,function(t){if("string"!=typeof t||"."!==t.substring(0,1)){var e=J(s[t]);e.e()||(a=a||!e.O().e(),o.push(new I(t,e)))}});var h=gd(o,ec,function(t){return t.name},fc);if(a){var c=gd(o,H(L));return new bd(h,J(n),new dd({".priority":c},{".priority":L}))}return new bd(h,J(n),id)}function qd(t){this.count=parseInt(Math.log(t+1)/pd,10),this.Ve=this.count-1,this.Jf=t+1&parseInt(Array(this.count+1).join("1"),2)}function rd(t){var e=!(t.Jf&1<<t.Ve);return t.Ve--,e}function gd(t,e,n,i){function r(e,i){var o=i-e;if(0==o)return null;if(1==o){var a=t[e],s=n?n(a):a;return new Pc(s,a.K,!1,null,null)}var a=parseInt(o/2,10)+e,o=r(e,a),u=r(a+1,i),a=t[a],s=n?n(a):a;return new Pc(s,a.K,!1,o,u)}t.sort(e);var o=function(e){function i(e,i){var u=s-e,h=s;s-=e;var h=r(u+1,h),u=t[u],c=n?n(u):u,h=new Pc(c,u.K,i,null,h);o?o.left=h:a=h,o=h}for(var o=null,a=null,s=t.length,u=0;u<e.count;++u){var h=rd(e),c=Math.pow(2,e.count-(u+1));h?i(c,!1):(i(c,!1),i(c,!0))}return a}(new qd(t.length));return null!==o?new Lc(i||e,o):new Lc(i||e)}function ad(t){return"number"==typeof t?"number:"+Db(t):"string:"+t}function $c(t){if(t.P()){var e=t.N();x("string"==typeof e||"number"==typeof e||"object"==typeof e&&u(e,".sv"),"Priority must be a string or number.")}else x(t===kc||t.e(),"priority of unexpected type.");x(t===kc||t.O().e(),"Priority nodes can't have a priority of their own.")}function sd(){bd.call(this,new Lc(fc),K,id)}function C(t,e,n){this.D=t,this.U=e,this.m=n}function td(t){x(ea(t)&&0<t.length,"Requires a non-empty array"),this.Bf=t,this.Gc={}}function ud(t,e){x(Oa(t.Bf,function(t){return t===e}),"Unknown event: "+e)}function vd(){td.call(this,["visible"]);var t,e;if("undefined"!=typeof document&&"undefined"!=typeof document.addEventListener&&("undefined"!=typeof document.hidden?(e="visibilitychange",t="hidden"):"undefined"!=typeof document.mozHidden?(e="mozvisibilitychange",t="mozHidden"):"undefined"!=typeof document.msHidden?(e="msvisibilitychange",t="msHidden"):"undefined"!=typeof document.webkitHidden&&(e="webkitvisibilitychange",t="webkitHidden")),this.qc=!0,e){var n=this;document.addEventListener(e,function(){var e=!document[t];e!==n.qc&&(n.qc=e,n.Td("visible",e))},!1)}}function wd(){if(td.call(this,["online"]),this.Lc=!0,"undefined"!=typeof window&&"undefined"!=typeof window.addEventListener){var t=this;window.addEventListener("online",function(){t.Lc||t.Td("online",!0),t.Lc=!0},!1),window.addEventListener("offline",function(){t.Lc&&t.Td("online",!1),t.Lc=!1},!1)}}function A(t,e){for(var n in t)e.call(void 0,t[n],n,t)}function fd(t,e){var n,i={};for(n in t)i[n]=e.call(void 0,t[n],n,t);return i}function Mb(t,e){for(var n in t)if(!e.call(void 0,t[n],n,t))return!1;return!0}function Kb(t){var e,n=0;for(e in t)n++;return n}function Lb(t){for(var e in t)return e}function xd(t){var e,n=[],i=0;for(e in t)n[i++]=t[e];return n}function yd(t){var e,n=[],i=0;for(e in t)n[i++]=e;return n}function nd(t,e){for(var n in t)if(t[n]==e)return!0;return!1}function zd(t,e,n){for(var i in t)if(e.call(n,t[i],i,t))return i}function Ad(t,e){var n=zd(t,e,void 0);return n&&t[n]}function Bd(t){for(var e in t)return!1;return!0}function Cd(t,e){return e in t?t[e]:void 0}function od(t){var e,n={};for(e in t)n[e]=t[e];return n}function Ed(t){for(var e,n,i=1;i<arguments.length;i++){n=arguments[i];for(e in n)t[e]=n[e];for(var r=0;r<Dd.length;r++)e=Dd[r],Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])}}function Fd(){this.wc={}}function Gd(t,e,i){n(i)||(i=1),u(t.wc,e)||(t.wc[e]=0),t.wc[e]+=i}function Hd(t){this.Kf=t,this.vd=null}function Id(t,e){this.uf={},this.Nd=new Hd(t),this.S=e;var n=1e4+2e4*Math.random();setTimeout(q(this.nf,this),Math.floor(n))}function Ld(t){return t=t.toString(),Jd[t]||(Jd[t]=new Fd),Jd[t]}function Md(t,e){var n=t.toString();return Kd[n]||(Kd[n]=e()),Kd[n]}function Od(t,e,n){this.ie=t,this.f=rb(this.ie),this.frames=this.Cc=null,this.kb=this.lb=this.Oe=0,this.Qa=Ld(e),this.Za=(e.Cb?"wss://":"ws://")+e.Ka+"/.ws?v=5","undefined"!=typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(this.Za+="&r=f"),e.host!==e.Ka&&(this.Za=this.Za+"&ns="+e.yb),n&&(this.Za=this.Za+"&s="+n)}function Rd(t,e){if(t.frames.push(e),t.frames.length==t.Oe){var n=t.frames.join("");t.frames=null,n=ua(n),t.cg(n)}}function Qd(t){clearInterval(t.Cc),t.Cc=setInterval(function(){t.oa&&t.oa.send("0"),Qd(t)},Math.floor(45e3))}function Sd(t){this.cc=t,this.Fd=[],this.Mb=0,this.ge=-1,this.Ab=null}function Td(t,e,n){t.ge=e,t.Ab=n,t.ge<t.Mb&&(t.Ab(),t.Ab=null)}function Ud(t,e,n){for(t.Fd[e]=n;t.Fd[t.Mb];){var i=t.Fd[t.Mb];delete t.Fd[t.Mb];for(var r=0;r<i.length;++r)if(i[r]){var o=t;Fb(function(){o.cc(i[r])})}if(t.Mb===t.ge){t.Ab&&(clearTimeout(t.Ab),t.Ab(),t.Ab=null);break}t.Mb++}}function Vd(){this.set={}}function Wd(t,e){A(t.set,function(t,n){e(n,t)})}function Xd(t,e,n){this.ie=t,this.f=rb(t),this.kb=this.lb=0,this.Qa=Ld(e),this.Kd=n,this.zc=!1,this.bd=function(t){e.host!==e.Ka&&(t.ns=e.yb);var n,i=[];for(n in t)t.hasOwnProperty(n)&&i.push(n+"="+t[n]);return(e.Cb?"https://":"http://")+e.Ka+"/.lp?"+i.join("&")}}function ae(e,n){var i=t(n).length;e.kb+=i,Gd(e.Qa,"bytes_received",i)}function $d(t,e,n,i){if(this.bd=i,this.fb=n,this.Fe=new Vd,this.Qc=[],this.ke=Math.floor(1e8*Math.random()),this.Jd=!0,this.Ud=hb(),window["pLPCommand"+this.Ud]=t,window["pRTLPCB"+this.Ud]=e,t=document.createElement("iframe"),t.style.display="none",!document.body)throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";document.body.appendChild(t);try{t.contentWindow.document||kb("No IE domain setting required")}catch(r){t.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}t.contentDocument?t.$a=t.contentDocument:t.contentWindow?t.$a=t.contentWindow.document:t.document&&(t.$a=t.document),this.va=t,t="",this.va.src&&"javascript:"===this.va.src.substr(0,11)&&(t='<script>document.domain="'+document.domain+'";</script>'),t="<html><body>"+t+"</body></html>";try{this.va.$a.open(),this.va.$a.write(t),this.va.$a.close()}catch(o){kb("frame writing exception"),o.stack&&kb(o.stack),kb(o)}}function ce(t){if(t.Zd&&t.Jd&&t.Fe.count()<(0<t.Qc.length?2:1)){t.ke++;var e={};e.id=t.Xf,e.pw=t.Yf,e.ser=t.ke;for(var e=t.bd(e),n="",i=0;0<t.Qc.length&&1870>=t.Qc[0].We.length+30+n.length;){var r=t.Qc.shift(),n=n+"&seg"+i+"="+r.og+"&ts"+i+"="+r.wg+"&d"+i+"="+r.We;i++}return de(t,e+n,t.ke),!0}return!1}function de(t,e,n){function i(){t.Fe.remove(n),ce(t)}t.Fe.add(n);var r=setTimeout(i,Math.floor(25e3));be(t,e,function(){clearTimeout(r),i()})}function be(t,e,n){setTimeout(function(){try{if(t.Jd){var i=t.va.$a.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){var t=i.readyState;t&&"loaded"!==t&&"complete"!==t||(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=function(){kb("Long-poll script failed to load: "+e),t.Jd=!1,t.close()},t.va.$a.body.appendChild(i)}}catch(r){}},Math.floor(1))}function ee(t){fe(this,t)}function fe(t,e){var n=Od&&Od.isAvailable(),i=n&&!(Aa.ff||!0===Aa.get("previous_websocket_failure"));if(e.yg&&(n||z("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)t.$c=[Od];else{var r=t.$c=[];Cb(ge,function(t,e){e&&e.isAvailable()&&r.push(e)})}}function he(t){if(0<t.$c.length)return t.$c[0];throw Error("No transports available")}function ie(t,e,n,i,r,o){this.id=t,this.f=rb("c:"+this.id+":"),this.cc=n,this.Kc=i,this.ea=r,this.De=o,this.Q=e,this.Ed=[],this.Se=0,this.xf=new ee(e),this.Pa=0,this.f("Connection created"),je(this)}function je(t){var e=he(t.xf);t.J=new e("c:"+t.id+":"+t.Se++,t.Q),t.He=e.responsesRequiredToBeHealthy||0;var n=ke(t,t.J),i=le(t,t.J);t.ad=t.J,t.Xc=t.J,t.C=null,t.vb=!1,setTimeout(function(){t.J&&t.J.open(n,i)},Math.floor(0)),e=e.healthyTimeout||0,e>0&&(t.rd=setTimeout(function(){t.rd=null,t.vb||(t.J&&102400<t.J.kb?(t.f("Connection exceeded healthy timeout but has received "+t.J.kb+" bytes.  Marking connection healthy."),t.vb=!0,t.J.wd()):t.J&&10240<t.J.lb?t.f("Connection exceeded healthy timeout but has sent "+t.J.lb+" bytes.  Leaving connection alive."):(t.f("Closing unhealthy connection after timeout."),t.close()))},Math.floor(e)))}function le(t,e){return function(n){e===t.J?(t.J=null,n||0!==t.Pa?1===t.Pa&&t.f("Realtime connection lost."):(t.f("Realtime connection failed."),"s-"===t.Q.Ka.substr(0,2)&&(Aa.remove("host:"+t.Q.host),t.Q.Ka=t.Q.host)),t.close()):e===t.C?(t.f("Secondary connection lost."),n=t.C,t.C=null,t.ad!==n&&t.Xc!==n||t.close()):t.f("closing an old connection")}}function ke(t,e){return function(n){if(2!=t.Pa)if(e===t.Xc){var i=zb("t",n);if(n=zb("d",n),"c"==i){if(i=zb("t",n),"d"in n)if(n=n.d,"h"===i){var i=n.ts,r=n.v,o=n.h;t.Kd=n.s,Da(t.Q,o),0==t.Pa&&(t.J.start(),me(t,t.J,i),"5"!==r&&z("Protocol version mismatch detected"),n=t.xf,(n=1<n.$c.length?n.$c[1]:null)&&ne(t,n))}else if("n"===i){for(t.f("recvd end transmission on primary"),t.Xc=t.C,n=0;n<t.Ed.length;++n)t.Bd(t.Ed[n]);t.Ed=[],oe(t)}else"s"===i?(t.f("Connection shutdown command received. Shutting down..."),t.De&&(t.De(n),t.De=null),t.ea=null,t.close()):"r"===i?(t.f("Reset packet received.  New host: "+n),Da(t.Q,n),1===t.Pa?t.close():(pe(t),je(t))):"e"===i?sb("Server Error: "+n):"o"===i?(t.f("got pong on primary."),qe(t),re(t)):sb("Unknown control packet command: "+i)}else"d"==i&&t.Bd(n)}else if(e===t.C)if(i=zb("t",n),n=zb("d",n),"c"==i)"t"in n&&(n=n.t,"a"===n?se(t):"r"===n?(t.f("Got a reset on secondary, closing it"),t.C.close(),t.ad!==t.C&&t.Xc!==t.C||t.close()):"o"===n&&(t.f("got pong on secondary."),t.tf--,se(t)));else{if("d"!=i)throw Error("Unknown protocol layer: "+i);t.Ed.push(n)}else t.f("message on old connection")}}function oe(t){t.ad===t.C&&t.Xc===t.C&&(t.f("cleaning up and promoting a connection: "+t.C.ie),t.J=t.C,t.C=null)}function se(t){0>=t.tf?(t.f("Secondary connection is healthy."),t.vb=!0,t.C.wd(),t.C.start(),t.f("sending client ack on secondary"),t.C.send({t:"c",d:{t:"a",d:{}}}),t.f("Ending transmission on primary"),t.J.send({t:"c",d:{t:"n",d:{}}}),t.ad=t.C,oe(t)):(t.f("sending ping on secondary."),t.C.send({t:"c",d:{t:"p",d:{}}}))}function qe(t){t.vb||(t.He--,0>=t.He&&(t.f("Primary connection is healthy."),t.vb=!0,t.J.wd()))}function ne(t,e){t.C=new e("c:"+t.id+":"+t.Se++,t.Q,t.Kd),t.tf=e.responsesRequiredToBeHealthy||0,t.C.open(ke(t,t.C),le(t,t.C)),setTimeout(function(){t.C&&(t.f("Timed out trying to upgrade."),t.C.close())
},Math.floor(6e4))}function me(t,e,n){t.f("Realtime connection established."),t.J=e,t.Pa=1,t.Kc&&(t.Kc(n),t.Kc=null),0===t.He?(t.f("Primary connection is healthy."),t.vb=!0):setTimeout(function(){re(t)},Math.floor(5e3))}function re(t){t.vb||1!==t.Pa||(t.f("sending ping on primary."),te(t,{t:"c",d:{t:"p",d:{}}}))}function te(t,e){if(1!==t.Pa)throw"Connection is not connected";t.ad.send(e)}function pe(t){t.f("Shutting down all connections"),t.J&&(t.J.close(),t.J=null),t.C&&(t.C.close(),t.C=null),t.rd&&(clearTimeout(t.rd),t.rd=null)}function ue(t){var e={},n={},i={},r="";try{var o=t.split("."),e=ua(jb(o[0])||""),n=ua(jb(o[1])||""),r=o[2],i=n.d||{};delete n.d}catch(a){}return{Bg:e,fe:n,data:i,sg:r}}function ve(t){return t=ue(t).fe,"object"==typeof t&&t.hasOwnProperty("iat")?v(t,"iat"):null}function we(t){t=ue(t);var e=t.fe;return!!t.sg&&!!e&&"object"==typeof e&&e.hasOwnProperty("iat")}function xe(t,e,n,i){this.id=ye++,this.f=rb("p:"+this.id+":"),this.Eb=!0,this.ua={},this.la=[],this.Nc=0,this.Jc=[],this.ia=!1,this.Va=1e3,this.xd=3e5,this.Cd=e,this.Ad=n,this.Ee=i,this.Q=t,this.Ke=null,this.Tc={},this.ng=0,this.Dc=this.ue=null,ze(this,0),vd.Qb().zb("visible",this.fg,this),-1===t.host.indexOf("fblocal")&&wd.Qb().zb("online",this.dg,this)}function Be(t,e,n,i,r){var o=e.Da(),a=e.path.toString();t.f("Listen called for "+a+" "+o),t.ua[a]=t.ua[a]||{},x(!t.ua[a][o],"listen() called twice for same path/queryId."),e={H:r,qd:n,kg:Dc(e),tag:i},t.ua[a][o]=e,t.ia&&Ce(t,a,o,e)}function Ce(t,e,n,i){t.f("Listen on "+e+" for "+n);var r={p:e};i.tag&&(r.q=i.kg,r.t=i.tag),r.h=i.qd(),t.wa("q",r,function(r){if((t.ua[e]&&t.ua[e][n])===i){t.f("listen response",r);var o=r.s;"ok"!==o&&De(t,e,n),r=r.d,i.H&&i.H(o,r)}})}function Ee(t){var e=t.Lb;t.ia&&e&&t.wa("auth",{cred:e.Mf},function(n){var i=n.s;n=n.d||"error","ok"!==i&&t.Lb===e&&delete t.Lb,e.Ye?"ok"!==i&&e.cd&&e.cd(i,n):(e.Ye=!0,e.sc&&e.sc(i,n))})}function Fe(t,e,n,i){t.ia?Ge(t,"o",e,n,i):t.Jc.push({Pc:e,action:"o",data:n,H:i})}function He(t,e,n,i){t.ia?Ge(t,"om",e,n,i):t.Jc.push({Pc:e,action:"om",data:n,H:i})}function Ge(t,e,n,i,r){n={p:n,d:i},t.f("onDisconnect "+e,n),t.wa(e,n,function(t){r&&setTimeout(function(){r(t.s,t.d)},Math.floor(0))})}function Ke(t,e,n,i){Ie(t,"m",e,n,i,void 0)}function Ie(t,e,i,r,o,a){r={p:i,d:r},n(a)&&(r.h=a),t.la.push({action:e,of:r,H:o}),t.Nc++,e=t.la.length-1,t.ia?Le(t,e):t.f("Buffering put: "+i)}function Le(t,e){var n=t.la[e].action,i=t.la[e].of,r=t.la[e].H;t.la[e].lg=t.ia,t.wa(n,i,function(i){t.f(n+" response",i),delete t.la[e],t.Nc--,0===t.Nc&&(t.la=[]),r&&r(i.s,i.d)})}function ze(t,e){x(!t.La,"Scheduling a connect when we're already connected/ing?"),t.Nb&&clearTimeout(t.Nb),t.Nb=setTimeout(function(){t.Nb=null,Oe(t)},Math.floor(e))}function Oe(t){if(t.Eb){t.f("Making a connection attempt"),t.ue=(new Date).getTime(),t.Dc=null;var e=q(t.Bd,t),n=q(t.Kc,t),i=q(t.jf,t),r=t.id+":"+Ae++;t.La=new ie(r,t.Q,e,n,i,function(e){z(e+" ("+t.Q.toString()+")"),t.Eb=!1})}}function Me(t,e,n){n=n?La(n,function(t){return Ab(t)}).join("$"):"default",(t=De(t,e,n))&&t.H&&t.H("permission_denied")}function De(t,e,n){e=new P(e).toString();var i=t.ua[e][n];return delete t.ua[e][n],0===Kb(t.ua[e])&&delete t.ua[e],i}function Ne(t){Ee(t),A(t.ua,function(e,n){A(e,function(e,i){Ce(t,n,i,e)})});for(var e=0;e<t.la.length;e++)t.la[e]&&Le(t,e);for(;t.Jc.length;)e=t.Jc.shift(),Ge(t,e.action,e.Pc,e.data,e.H)}function Pe(){this.j=this.A=null}function Qe(t,e){if(e.e())return t.A=null,t.j=null,!0;if(null!==t.A){if(t.A.P())return!1;var n=t.A;return t.A=null,n.ca(L,function(e,n){t.ic(new P(e),n)}),Qe(t,e)}return null!==t.j?(n=G(e),e=R(e),t.j.contains(n)&&Qe(t.j.get(n),e)&&t.j.remove(n),t.j.e()?(t.j=null,!0):!1):!0}function Re(t,e,n){null!==t.A?n(e,t.A):t.ca(function(t,i){var r=new P(e.toString()+"/"+t);Re(i,r,n)})}function Se(){this.Wc=K}function Te(){this.qb=[]}function Ue(t,e){for(var n=null,i=0;i<e.length;i++){var r=e[i],o=r.Rb();null===n||o.ja(n.Rb())||(t.qb.push(n),n=null),null===n&&(n=new Ve(o)),n.add(r)}n&&t.qb.push(n)}function Cc(t,e,n){Ue(t,n),We(t,function(t){return t.ja(e)})}function Xe(t,e,n){Ue(t,n),We(t,function(t){return t.contains(e)||e.contains(t)})}function We(t,e){for(var n=!0,i=0;i<t.qb.length;i++){var r=t.qb[i];if(r)if(r=r.Rb(),e(r)){for(var r=t.qb[i],o=0;o<r.od.length;o++){var a=r.od[o];if(null!==a){r.od[o]=null;var s=a.Pb();ob&&kb("event: "+a.toString()),Fb(s)}}t.qb[i]=null}else n=!1}n&&(t.qb=[])}function Ve(t){this.Ca=t,this.od=[]}function Ze(t,e,n){this.ed=t||{},this.Sd=e||{},this.lc=n||{},this.ed.remember||(this.ed.remember="default")}function af(t){var e={},n={};return va(t||{},function(t,i){0<=Ia($e,t)?e[t]=i:n[t]=i}),new Ze(e,{},n)}function V(t){var e=Error(v(bf,t),t);return e.code=t,e}function cf(){var t,e=window.opener.frames;for(t=e.length-1;t>=0;t--)try{if(e[t].location.protocol===window.location.protocol&&e[t].location.host===window.location.host&&"__winchan_relay_frame"===e[t].name)return e[t]}catch(n){}return null}function df(t,e,n){t.attachEvent?t.attachEvent("on"+e,n):t.addEventListener&&t.addEventListener(e,n,!1)}function ef(t,e,n){t.detachEvent?t.detachEvent("on"+e,n):t.removeEventListener&&t.removeEventListener(e,n,!1)}function ff(t){/^https?:\/\//.test(t)||(t=window.location.href);var e=/^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(t);return e?e[1]:t}function gf(t){var e="";try{t=t.replace("#","");var n={},i=t.replace(/^\?/,"").split("&");for(t=0;t<i.length;t++)if(i[t]){var r=i[t].split("=");n[r[0]]=r[1]}n&&u(n,"__firebase_request_key")&&(e=v(n,"__firebase_request_key"))}catch(o){}return e}function hf(t){var e,n=[];for(e in t)if(u(t,e)){var i=v(t,e);if(ea(i))for(var r=0;r<i.length;r++)n.push(encodeURIComponent(e)+"="+encodeURIComponent(i[r]));else n.push(encodeURIComponent(e)+"="+encodeURIComponent(v(t,e)))}return n.join("&")}function jf(){var t=ub(Ye);return t.scheme+"://"+t.host+"/v2"}function kf(){return!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator.userAgent)}function lf(){var t=navigator.userAgent;if("Microsoft Internet Explorer"===navigator.appName){if((t=t.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/))&&1<t.length)return 8<=parseFloat(t[1])}else if(-1<t.indexOf("Trident")&&(t=t.match(/rv:([0-9]{2,2}[\.0-9]{0,})/))&&1<t.length)return 8<=parseFloat(t[1]);return!1}function mf(t){t=t||{},t.method||(t.method="GET"),t.headers||(t.headers={}),t.headers.content_type||(t.headers.content_type="application/json"),t.headers.content_type=t.headers.content_type.toLowerCase(),this.options=t}function nf(t){t=t||{},this.Uc=Ha()+Ha()+Ha(),this.kf=t||{}}function of(t){t=t||{},(!t.window_features||-1!==navigator.userAgent.indexOf("Fennec/")||-1!==navigator.userAgent.indexOf("Firefox/")&&-1!==navigator.userAgent.indexOf("Android"))&&(t.window_features=void 0),t.window_name||(t.window_name="_blank"),t.relay_url||(t.relay_url=jf()+"/auth/channel"),this.options=t}function pf(t){t=t||{},t.callback_parameter||(t.callback_parameter="callback"),this.options=t,window.__firebase_auth_jsonp=window.__firebase_auth_jsonp||{}}function qf(t,e,n){setTimeout(function(){try{var i=document.createElement("script");i.type="text/javascript",i.id=t,i.async=!0,i.src=e,i.onerror=function(){var e=document.getElementById(t);null!==e&&e.parentNode.removeChild(e),n&&n(V("NETWORK_ERROR"))};var r=document.getElementsByTagName("head");(r&&0!=r.length?r[0]:document.documentElement).appendChild(i)}catch(o){n&&n(V("NETWORK_ERROR"))}},0)}function rf(t,e){this.Ge=["session",t.Gd,t.yb].join(":"),this.Pd=e}function sf(t){t=t||{},this.Uc=Ha()+Ha()+Ha(),this.kf=t||{}}function tf(t,e,n,i){td.call(this,["auth_status"]),this.Q=t,this.Re=e,this.xg=n,this.Be=i,this.mc=new rf(t,[Aa,Ba]),this.jb=null,uf(this)}function uf(t){Ba.get("redirect_request_id")&&vf(t);var e=t.mc.get();e&&e.token?(wf(t,e),t.Re(e.token,function(n,i){xf(t,n,i,!1,e.token,e)},function(e,n){yf(t,"resumeSession()",e,n)})):wf(t,null)}function zf(t,e,n,i,r,o){"firebaseio-demo.com"===t.Q.domain&&z("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com."),t.Re(e,function(o,a){xf(t,o,a,!0,e,n,i||{},r)},function(e,n){yf(t,"auth()",e,n,o)})}function Af(t,e){t.mc.clear(),wf(t,null),t.xg(function(t,n){if("ok"===t)B(e,null);else{var i=(t||"error").toUpperCase(),r=i;n&&(r+=": "+n),r=Error(r),r.code=i,B(e,r)}})}function xf(t,e,n,i,r,o,a,s){"ok"===e?(i&&(e=n.auth,o.auth=e,o.expires=n.expires,o.token=we(r)?r:"",n=null,e&&u(e,"uid")?n=v(e,"uid"):u(o,"uid")&&(n=v(o,"uid")),o.uid=n,n="custom",e&&u(e,"provider")?n=v(e,"provider"):u(o,"provider")&&(n=v(o,"provider")),o.provider=n,t.mc.clear(),we(r)&&(a=a||{},n=Aa,"sessionOnly"===a.remember&&(n=Ba),"none"!==a.remember&&t.mc.set(o,n)),wf(t,o)),B(s,null,o)):(t.mc.clear(),wf(t,null),o=t=(e||"error").toUpperCase(),n&&(o+=": "+n),o=Error(o),o.code=t,B(s,o))}function yf(t,e,n,i,r){z(e+" was canceled: "+i),t.mc.clear(),wf(t,null),t=Error(i),t.code=n.toUpperCase(),B(r,t)}function Bf(t,e,n,i,r){Cf(t);var o=[mf,pf];n=new Ze(i||{},{},n||{}),Df(t,o,"/auth/"+e,n,r)}function Ef(t,e,n,i){Cf(t);var r=[of,nf];n=af(n),"anonymous"===e||"password"===e?setTimeout(function(){B(i,V("TRANSPORT_UNAVAILABLE"))},0):(n.Sd.window_features="menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top="+("object"==typeof screen?.5*(screen.height-625):0)+",left="+("object"==typeof screen?.5*(screen.width-625):0),n.Sd.relay_url=jf()+"/"+t.Q.yb+"/auth/channel",n.Sd.requestWithCredential=q(t.Vc,t),Df(t,r,"/auth/"+e,n,i))}function vf(t){var e=Ba.get("redirect_request_id");if(e){var n=Ba.get("redirect_client_options");Ba.remove("redirect_request_id"),Ba.remove("redirect_client_options");var i=[mf,pf],e={requestId:e,requestKey:gf(document.location.hash)},n=new Ze(n,{},e);try{document.location.hash=document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/,"")}catch(r){}Df(t,i,"/auth/session",n)}}function Df(t,e,n,i,r){Ff(t,e,n,i,function(e,n){!e&&n&&n.token&&n.uid?zf(t,n.token,n,i.ed,function(t,e){t?B(r,t):B(r,null,e)}):B(r,e||V("UNKNOWN_ERROR"))})}function Ff(t,e,n,i,r){e=Ka(e,function(t){return"function"==typeof t.isAvailable&&t.isAvailable()}),0===e.length?setTimeout(function(){B(r,V("TRANSPORT_UNAVAILABLE"))},0):(e=new(e.shift())(i.Sd),i=wa(i.lc),i.v="js-2.0.6",i.transport=e.uc(),i.suppress_status_codes=!0,t=jf()+"/"+t.Q.yb+n,e.open(t,i,function(t,e){if(t)B(r,t);else if(e&&e.error){var n=Error(e.error.message);n.code=e.error.code,n.details=e.error.details,B(r,n)}else B(r,null,e)}))}function wf(t,e){var n=null!==t.jb||null!==e;t.jb=e,n&&t.Td("auth_status",e),t.Be(null!==e)}function Cf(t){var e=t.Q;if("firebaseio.com"!==e.domain&&"firebaseio-demo.com"!==e.domain&&"auth.firebase.com"===Ye)throw Error("This custom Firebase server ('"+t.Q.domain+"') does not support delegated login.")}function Gf(t,e){return t&&"object"==typeof t?(x(".sv"in t,"Unexpected leaf node or priority contents"),e[t[".sv"]]):t}function Hf(t,e){var n=new Pe;return Re(t,new P(""),function(t,i){n.ic(t,If(i,e))}),n}function If(t,e){var n,i=t.O().N(),i=Gf(i,e);if(t.P()){var r=Gf(t.ta(),e);return r!==t.ta()||i!==t.O().N()?new Zc(r,J(i)):t}return n=t,i!==t.O().N()&&(n=n.ib(new Zc(i))),t.ca(L,function(t,i){var r=If(i,e);r!==i&&(n=n.I(t,r))}),n}function W(t,e,n,i){this.type=t,this.Wa=e,this.nb=n,this.Rc=null,this.$f=i}function Jf(){}function Lf(t,e,n,i){var r,o;return o=X(n),r=X(e),i.e()?n.u?(t=[],r?r.ja(o)||(r.P()?t=Mf(o):o.P()?(t=[],r.P()||r.e()||t.push(new W("children_removed",r))):t=Nf(r,o),t.push(new W("value",o))):(t=Mf(o),t.push(new W("value",o))),0!==t.length||e.u||t.push(new W("value",o)),t):r?Nf(r,o):Mf(o):".priority"===G(i)?!n.u||r&&r.ja(o)?[]:[new W("value",o)]:n.u||1===Q(i)?(r=G(i),o=o.B(r),t.kd(e,n,r,o)):(r=G(i),o.Y(r)?(o=o.B(r),t.kd(e,n,r,o)):[])}function Mf(t){var e=[];return t.P()||t.e()||e.push(new W("children_added",t)),e}function Nf(t,e){var i,r,o,a,s=[],u=[],h=[],c=[],f={},l={};i=t.Aa(L),o=U(i),r=e.Aa(L),a=U(r);for(var d=H(L);null!==o||null!==a;){var p;p=o?a?d(o,a):-1:1,0>p?(p=v(f,o.name),n(p)?(c.push(u[p]),u[p]=null):(l[o.name]=h.length,h.push(o)),o=U(i)):(p>0?(p=v(l,a.name),n(p)?(c.push(a),h[p]=null):(f[a.name]=u.length,u.push(a))):((o=o.K.hash()!==a.K.hash())&&c.push(a),o=U(i)),a=U(r))}for(f=0;f<h.length;f++)(l=h[f])&&s.push(new W("child_removed",l.K,l.name));for(f=0;f<u.length;f++)(h=u[f])&&s.push(new W("child_added",h.K,h.name));for(f=0;f<c.length;f++)u=c[f],s.push(new W("child_changed",u.K,u.name,t.B(u.name)));return s}function Of(t,e,n){this.bb=t,this.Ma=n,this.m=e}function Pf(){}function Tf(t,e){Wf(t,e.F),Wf(t,e.o),Wf(t,e.u),Wf(t,e.X)}function Wf(t,e){x(!e||t.Yb(e),"Expected an indexed snap")}function Yf(t,e){var n=X(t),i=t.ab();return!!(n&&n.Y(e)||i&&i.Y(e))}function Zf(t){this.gb=t,this.index=t.m,this.gb.ga&&n(pc(this.gb))?(t=qc(this.gb),t=this.index.ye(pc(this.gb),t)):t=this.index.Ae(),this.Fb=t,this.gb.na&&n(rc(this.gb))?(t=sc(this.gb),t=this.index.ye(rc(this.gb),t)):t=this.index.ze(),this.pb=t}function $f(t){Zf.call(this,t),this.Ma=!(""===t.Hb?t.ga:"l"===t.Hb),this.bb=tc(t)}function ag(t,e,n,i,r,o){var a,s=H(t.index);a=t.Ma?function(t,e){return-1*s(t,e)}:s,e=X(e),x(e.Ua()===t.bb,"Limit should be full.");var u=new I(n,i),h=t.Ma?ld(e,t.index):md(e,t.index);x(null!=h,"Shouldn't be null, since oldEventCache shouldn't be empty.");var c=0>=H(t.index)(t.Fb,u)&&0>=H(t.index)(u,t.pb);return e.Y(n)?(o=r.de(o,h,1,t.Ma,t.index),r=null,0<o.length&&(r=o[0],r.name===n&&(r=2<=o.length?o[1]:null)),a=null==r?1:a(r,u),c&&!i.e()&&a>=0?e.I(n,i):(n=e.I(n,K),null!=r&&0>=H(t.index)(t.Fb,r)&&0>=H(t.index)(r,t.pb)?n.I(r.name,r.K):n)):i.e()?null:c&&0<=a(h,u)?e.I(n,i).I(h.name,K):null}function bg(t){this.m=t}function cg(t){this.U=t,this.m=t.w.m}function dg(t,e,n,i){var r=[],o=t.m,a=La(Ka(e,function(t){return"child_changed"===t.type&&o.df(t.$f,t.Wa)}),function(t){return new W("child_moved",t.Wa,t.nb)}),s=Pa(e,function(t){return"child_removed"!==t.type&&"child_added"!==t.type});for(la(Ra,e,s,0).apply(null,a);0<e.length;){var a=e[0].type,s=eg(e,a),u=e.slice(0,s);e=e.slice(s),"value"===a||"children_added"===a||"children_removed"===a?x(1===u.length,"We should not have more than one of these at a view"):Ta(u,q(t.Lf,t)),r=r.concat(fg(t,i,u,n))}return r}function eg(t,e){var n=Pa(t,function(t){return t.type!==e});return-1===n?t.length:n}function fg(t,e,n,i){for(var r=[],o=0;o<n.length;++o)for(var a=n[o],s=null,u=null,h=0;h<e.length;++h){var c=e[h];if(c.pf(a.type)){if(!s&&!u)if("children_added"===a.type){var f=t,l=a.Wa,u=[];if(!l.P()&&!l.e())for(var f=l.Aa(f.m),l=null,d=U(f);d;){var p=new W("child_added",d.K,d.name);p.Rc=l,u.push(p),l=d.name,d=U(f)}}else if("children_removed"===a.type){if(f=t,l=a.Wa,u=[],!l.P()&&!l.e())for(f=l.Aa(f.m),l=U(f);l;)u.push(new W("child_removed",l.K,l.name)),l=U(f)}else s=a,"value"!==s.type&&"child_removed"!==s.type&&(s.Rc=i.af(s.nb,s.Wa,t.m));if(s)r.push(c.createEvent(s,t.U));else for(f=0;f<u.length;++f)r.push(c.createEvent(u[f],t.U))}}return r}function gg(t,e){this.U=t;var n=t.w;wc(n)?(this.ec=new bg(n.m),this.ld=Kf):n.ka?(this.ec=new $f(n),this.ld=new Of(tc(n),n.m,this.ec.Ma)):(this.ec=new Zf(n),this.ld=Kf),n=this.ec,this.ha=new Uf(e.F&&n.G(e.F,!1),e.o&&n.G(e.o,!1),e.u&&n.G(e.u),e.X&&n.G(e.X)),this.ya=[],this.le=new cg(t)}function hg(t){return t.U}function Uf(t,e,n,i){this.F=t,this.o=e,this.u=n,this.X=i,x(null==t||null==e,"Only one of serverSnap / serverChildren can be non-null."),x(null==n||null==i,"Only one of eventSnap / eventChildren can be non-null.")}function X(t){return t.u||t.X}function jg(t,e){this.value=t,this.children=e||kg}function mg(t){var e=lg;return A(t,function(t,n){e=e.set(new P(n),t)}),e}function ng(t,e,n){if(null!=t.value&&n(t.value))return{path:S,value:t.value};if(e.e())return null;var i=G(e);return t=t.children.get(i),null!==t?(e=ng(t,R(e),n),null!=e?{path:new P(i).k(e.path),value:e.value}:null):null}function og(t,e){return ng(t,e,function(){return!0})}function pg(t,e,n){if(e.e())return n;var i=G(e);return e=pg(t.children.get(i)||lg,R(e),n),i=e.e()?t.children.remove(i):t.children.Ja(i,e),new jg(t.value,i)}function qg(t,e){return rg(t,S,e)}function rg(t,e,n){var i={};return t.children.Ba(function(t,r){i[t]=rg(r,e.k(t),n)}),n(e,t.value,i)}function sg(t,e,n){return tg(t,e,S,n)}function tg(t,e,n,i){var r=t.value?i(n,t.value):!1;return r?r:e.e()?null:(r=G(e),(t=t.children.get(r))?tg(t,R(e),n.k(r),i):null)}function ug(t,e,n){if(!e.e()){var i=!0;t.value&&(i=n(S,t.value)),!0===i&&(i=G(e),(t=t.children.get(i))&&vg(t,R(e),S.k(i),n))}}function vg(t,e,n,i){if(e.e())return t;t.value&&i(n,t.value);var r=G(e);return(t=t.children.get(r))?vg(t,R(e),n.k(r),i):lg}function Xf(t,e){wg(t,S,e)}function wg(t,e,n){t.children.Ba(function(t,i){wg(i,e.k(t),n)}),t.value&&n(e,t.value)}function xg(t,e){t.children.Ba(function(t,n){n.value&&e(t,n.value)})}function yg(){this.qa={}}function Ag(t){return Ka(xd(t.qa),function(t){return!wc(t.U.w)})}function Bg(t,e){if(wc(e.w))return zg(t);var n=e.Da();return v(t.qa,n)}function zg(t){return Ad(t.qa,function(t){return wc(t.U.w)})||null}function Cg(){this.V=lg,this.ra=[],this.Ec=-1}function Dg(t,e){var n=Pa(t.ra,function(t){return t.Xd===e});x(n>=0,"removeWrite called with nonexistent writeId.");var i=t.ra[n];t.ra.splice(n,1);for(var r=!1,o=!1,a=!1,s=t.ra.length-1;!r&&s>=0;){var u=t.ra[s];s>=n&&Eg(u,i.path)?r=!0:!o&&i.path.contains(u.path)&&(s>=n?o=!0:a=!0),s--}return r||(o||a?Fg(t):i.Oa?t.V=t.V.remove(i.path):A(i.children,function(e,n){t.V=t.V.remove(i.path.k(n))})),n=i.path,og(t.V,n)?a?n:(x(r,"Must have found a shadow"),null):n}function Eg(t,e){return t.Oa?t.path.contains(e):!!zd(t.children,function(n,i){return t.path.k(i).contains(e)})}function Fg(t){t.V=Gg(t.ra,Hg,S),t.Ec=0<t.ra.length?t.ra[t.ra.length-1].Xd:-1}function Hg(t){return t.visible}function Gg(t,e,n){for(var i=lg,r=0;r<t.length;++r){var o=t[r];if(e(o)){var a,s=o.path;o.Oa?(n.contains(s)?(a=T(n,s),o=o.Oa):(a=S,o=o.Oa.da(T(s,n))),i=Ig(i,a,o)):i=Jg(i,o.path,o.children)}}return i}function Ig(t,e,n){var i=og(t,e);if(i){var r=i.value,i=i.path;e=T(i,e),n=r.L(e,n),t=pg(t,i,new jg(n))}else t=pg(t,e,new jg(n));return t}function Jg(t,e,n){var i=og(t,e);if(i){var r=i.value,i=i.path,o=T(i,e),a=r;A(n,function(t,e){a=a.L(o.k(e),t)}),t=pg(t,i,new jg(a))}else A(n,function(n,i){t=pg(t,e.k(i),new jg(n))});return t}function Kg(t,e){this.Gb=t,this.Ib=e}function Lg(t,e,n){this.type=Qf,this.source=t,this.path=e,this.Oa=n}function Mg(t,e){this.type=Sf,this.source=Ng,this.path=t,this.sf=e}function Og(t,e){this.type=Vf,this.source=t,this.path=e}function Pg(t,e,n){this.type=Rf,this.source=t,this.path=e,this.children=n}function Qg(t,e,n,i){this.$e=t,this.Ze=e,this.fc=n,this.wf=i,x(!i||e,"Tagged queries must be from server.")}function Sg(t){this.ma=lg,this.Bb=new Cg,this.Zc={},this.gc={},this.Fc=t}function Ug(t,e,n,i){if(i=Cd(t.Zc,"_"+i),null!=i){var r=Vg(i);return i=r.path,r=r.fc,e=T(i,e),n=new Lg(new Qg(!1,!0,r,!0),e,n),Wg(t,i,n)}return[]}function Xg(t,e,n,i){if(i=Cd(t.Zc,"_"+i)){var r=Vg(i);return i=r.path,r=r.fc,e=T(i,e),n=mg(n),n=new Pg(new Qg(!1,!0,r,!0),e,n),Wg(t,i,n)}return[]}function ah(t){return qg(t,function(t,e,n){if(e&&null!=zg(e))return[zg(e)];var i=[];return e&&(i=Ag(e)),A(n,function(t){i=i.concat(t)}),i})}function dh(t,e){for(var n=0;n<e.length;++n){var i=e[n];if(!wc(i.w)){var i=Yg(i),r=t.gc[i];delete t.gc[i],delete t.Zc["_"+r]}}}function $g(t,e,n){var i=e.path,r=ch(t,e);if(n=bh(t,n),e=t.Fc.Le(e,r,n.qd,n.H),i=t.ma.subtree(i),r)x(null==zg(i.value),"If we're adding a query, it shouldn't be shadowed");else for(r=qg(i,function(t,e,n){if(!t.e()&&e&&null!=zg(e))return[hg(zg(e))];var i=[];return e&&(i=i.concat(La(Ag(e),function(t){return t.U}))),A(n,function(t){i=i.concat(t)}),i}),i=0;i<r.length;++i)n=r[i],t.Fc.Od(n,ch(t,n));return e}function bh(t,e){var n=e.U,i=ch(t,n);return{qd:function(){return(e.ab()||K).hash()},H:function(e,r){if("ok"===e){if(r&&"object"==typeof r&&u(r,"w")){var o=v(r,"w");ea(o)&&0<=Ia(o,"no_index")&&z("Using an unspecified index. Consider adding "+('".indexOn": "'+n.w.m.toString()+'"')+" at "+n.path.toString()+" to your security rules for better performance")}if(i){var a=n.path;if(o=Cd(t.Zc,"_"+i))var s=Vg(o),o=s.path,s=s.fc,a=T(o,a),a=new Og(new Qg(!1,!0,s,!0),a),o=Wg(t,o,a);else o=[]}else o=Tg(t,new Og(Rg,n.path));return o}return o="Unknown Error","too_big"===e?o="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==e?o="Client doesn't have permission to access the desired data.":"unavailable"==e&&(o="The service is unavailable"),o=Error(e+": "+o),o.code=e.toUpperCase(),t.hb(n,null,o)}}}function Yg(t){return t.path.toString()+"$"+t.Da()}function Vg(t){var e=t.indexOf("$");return x(-1!==e&&e<t.length-1,"Bad queryKey."),{fc:t.substr(e+1),path:new P(t.substr(0,e))}}function ch(t,e){var n=Yg(e);return v(t.gc,n)}function Wg(t,e,n){var i=t.ma.get(e);return x(i,"Missing sync point for query tag that we're tracking"),i.Xa(n,new Kg(e,t.Bb),null)}function Tg(t,e){return eh(t,e,t.ma,null,new Kg(S,t.Bb))}function eh(t,e,n,i,r){if(e.path.e())return fh(t,e,n,i,r);var o=n.get(S);null==i&&null!=o&&(i=o.za(S));var a=[],s=G(e.path),u=e.Mc(s);if((n=n.children.get(s))&&u)var h=i?i.B(s):null,s=r.k(s),a=a.concat(eh(t,u,n,h,s));return o&&(a=a.concat(o.Xa(e,r,i))),a}function fh(t,e,n,i,r){var o=n.get(S);null==i&&null!=o&&(i=o.za(S));var a=[];return n.children.Ba(function(n,o){var s=i?i.B(n):null,u=r.k(n),h=e.Mc(n);h&&(a=a.concat(fh(t,h,o,s,u)))}),o&&(a=a.concat(o.Xa(e,r,i))),a}function gh(t){this.Q=t,this.Qa=Ld(t),this.Z=new Te,this.zd=1,this.S=new xe(this.Q,q(this.Cd,this),q(this.Ad,this),q(this.Ee,this)),this.ug=Md(t,q(function(){return new Id(this.Qa,this.S)},this)),this.pc=new Fc,this.qe=new Se;var e=this;this.ud=new Sg({Le:function(t,n,i,r){return n=[],i=e.qe.Wc.da(t.path),i.e()||(n=e.ud.Sa(t.path,i),setTimeout(function(){r("ok")},0)),n},Od:ba}),hh(this,"connected",!1),this.ea=new Pe,this.T=new tf(t,q(this.S.T,this.S),q(this.S.Pe,this.S),q(this.Be,this)),this.jd=0,this.re=null,this.M=new Sg({Le:function(t,n,i,r){return Be(e.S,t,i,n,function(n,i){var o=r(n,i);Xe(e.Z,t.path,o)}),[]},Od:function(t,n){var i=e.S,r=t.path.toString(),o=t.Da();if(i.f("Unlisten called for "+r+" "+o),De(i,r,o)&&i.ia){var a=Dc(t);i.f("Unlisten on "+r+" for "+o),r={p:r},n&&(r.q=a,r.t=n),i.wa("n",r)}}})}function ih(t){var e=new P(".info/serverTimeOffset");return t=t.qe.Wc.da(e).N()||0,(new Date).getTime()+t}function jh(t){return t=t={timestamp:ih(t)},t.timestamp=t.timestamp||(new Date).getTime(),t}function hh(t,e,n){e=new P("/.info/"+e),n=J(n);var i=t.qe;i.Wc=i.Wc.L(e,n),n=t.ud.Sa(e,n),Xe(t.Z,e,n)}function lh(t){t.f("onDisconnectEvents");var e=jh(t),n=[];Re(Hf(t.ea,e),S,function(e,i){n=n.concat(t.M.Sa(e,i));var r=nh(t,e);kh(t,r)}),t.ea=new Pe,Xe(t.Z,S,n)}function oh(t,e,n,i){var r=J(n);Fe(t.S,e.toString(),r.N(!0),function(n,o){"ok"===n&&t.ea.ic(e,r),mh(i,n,o)})}function ph(t,e,n,i,r){var o=J(n,i);Fe(t.S,e.toString(),o.N(!0),function(n,i){"ok"===n&&t.ea.ic(e,o),mh(r,n,i)})}function qh(t,e,n,i){var r,o=!0;for(r in n)o=!1;o?(kb("onDisconnect().update() called with empty data.  Don't do anything."),mh(i,"ok")):He(t.S,e.toString(),n,function(r,o){if("ok"===r)for(var a in n){var s=J(n[a]);t.ea.ic(e.k(a),s)}mh(i,r,o)})}function Bc(t,e,n){n=".info"===G(e.path)?t.ud.Jb(e,n):t.M.Jb(e,n),Cc(t.Z,e.path,n)}function mh(t,e,n){t&&Fb(function(){if("ok"==e)t(null);else{var i=(e||"error").toUpperCase(),r=i;n&&(r+=": "+n),r=Error(r),r.code=i,t(r)}})}function rh(t,e,i,r,o){function a(){}t.f("transaction on "+e);var s=new O(t,e);if(s.zb("value",a),i={path:e,update:i,H:r,status:null,lf:hb(),Qe:o,rf:0,Vd:function(){s.bc("value",a)},Yd:null,sa:null,fd:null,gd:null,hd:null},r=t.M.xa(e,void 0)||K,i.fd=r,r=i.update(r.N()),n(r)){Tb("transaction failed: Data returned ",r),i.status=1,o=Gc(t.pc,e);var h=o.ta()||[];h.push(i),Hc(o,h),"object"==typeof r&&null!==r&&u(r,".priority")?(h=v(r,".priority"),x(Rb(h),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):h=(t.M.xa(e)||K).O().N(),o=jh(t),r=J(r,h),o=If(r,o),i.gd=r,i.hd=o,i.sa=t.zd++,i=t.M.Fa(e,o,i.sa,i.Qe),Xe(t.Z,e,i),sh(t)}else i.Vd(),i.gd=null,i.hd=null,i.H&&(t=new C(i.fd,new O(t,i.path),L),i.H(null,!1,t))}function sh(t,e){var n=e||t.pc;if(e||th(t,n),null!==n.ta()){var i=uh(t,n);x(0<i.length,"Sending zero length transaction queue"),Na(i,function(t){return 1===t.status})&&vh(t,n.path(),i)}else n.pd()&&n.ca(function(e){sh(t,e)})}function vh(t,e,n){for(var i=La(n,function(t){return t.sa}),r=t.M.xa(e,i)||K,i=r,r=r.hash(),o=0;o<n.length;o++){var a=n[o];x(1===a.status,"tryToSendTransactionQueue_: items in queue should all be run."),a.status=2,a.rf++;var s=T(e,a.path),i=i.L(s,a.gd)}i=i.N(!0),t.S.put(e.toString(),i,function(i){t.f("transaction put response",{path:e.toString(),status:i});var r=[];if("ok"===i){for(i=[],o=0;o<n.length;o++){if(n[o].status=3,r=r.concat(t.M.Ea(n[o].sa)),n[o].H){var a=n[o].hd,s=new O(t,n[o].path);i.push(q(n[o].H,null,null,!0,new C(a,s,L)))}n[o].Vd()}for(th(t,Gc(t.pc,e)),sh(t),Xe(t.Z,e,r),o=0;o<i.length;o++)Fb(i[o])}else{if("datastale"===i)for(o=0;o<n.length;o++)n[o].status=4===n[o].status?5:1;else for(z("transaction at "+e.toString()+" failed: "+i),o=0;o<n.length;o++)n[o].status=5,n[o].Yd=i;kh(t,e)}},r)}function kh(t,e){var n=wh(t,e),i=n.path(),n=uh(t,n);return xh(t,n,i),i}function xh(t,e,i){if(0!==e.length){for(var r=[],o=[],a=La(e,function(t){return t.sa}),s=0;s<e.length;s++){var h,c=e[s],f=T(i,c.path),l=!1;if(x(null!==f,"rerunTransactionsUnderNode_: relativePath should not be null."),5===c.status)l=!0,h=c.Yd,o=o.concat(t.M.Ea(c.sa,!0));else if(1===c.status)if(25<=c.rf)l=!0,h="maxretry",o=o.concat(t.M.Ea(c.sa,!0));else{var d=t.M.xa(c.path,a)||K;c.fd=d;var p=e[s].update(d.N());n(p)?(Tb("transaction failed: Data returned ",p),f=J(p),"object"==typeof p&&null!=p&&u(p,".priority")||(f=f.ib(d.O())),d=c.sa,p=jh(t),p=If(f,p),c.gd=f,c.hd=p,c.sa=t.zd++,Qa(a,d),o=o.concat(t.M.Fa(c.path,p,c.sa,c.Qe)),o=o.concat(t.M.Ea(d,!0))):(l=!0,h="nodata",o=o.concat(t.M.Ea(c.sa,!0)))}Xe(t.Z,i,o),o=[],l&&(e[s].status=3,setTimeout(e[s].Vd,Math.floor(0)),e[s].H&&("nodata"===h?(c=new O(t,e[s].path),r.push(q(e[s].H,null,null,!1,new C(e[s].fd,c,L)))):r.push(q(e[s].H,null,Error(h),!1,null))))}for(th(t,t.pc),s=0;s<r.length;s++)Fb(r[s]);sh(t)}}function wh(t,e){for(var n,i=t.pc;null!==(n=G(e))&&null===i.ta();)i=Gc(i,n),e=R(e);return i}function uh(t,e){var n=[];return yh(t,e,n),n.sort(function(t,e){return t.lf-e.lf}),n}function yh(t,e,n){var i=e.ta();if(null!==i)for(var r=0;r<i.length;r++)n.push(i[r]);e.ca(function(e){yh(t,e,n)})}function th(t,e){var n=e.ta();if(n){for(var i=0,r=0;r<n.length;r++)3!==n[r].status&&(n[i]=n[r],i++);n.length=i,Hc(e,0<n.length?n:null)}e.ca(function(e){th(t,e)})}function nh(t,e){var n=wh(t,e).path(),i=Gc(t.pc,e);return Kc(i,function(e){zh(t,e)}),zh(t,i),Jc(i,function(e){zh(t,e)}),n}function zh(t,e){var n=e.ta();if(null!==n){for(var i=[],r=[],o=-1,a=0;a<n.length;a++)4!==n[a].status&&(2===n[a].status?(x(o===a-1,"All SENT items should be at beginning of queue."),o=a,n[a].status=4,n[a].Yd="set"):(x(1===n[a].status,"Unexpected transaction status in abort"),n[a].Vd(),r=r.concat(t.M.Ea(n[a].sa,!0)),n[a].H&&i.push(q(n[a].H,null,Error("set"),!1,null))));for(-1===o?Hc(e,null):n.length=o+1,Xe(t.Z,e.path(),r),a=0;a<i.length;a++)Fb(i[a])}}function Ah(){this.jc={}}function Bh(t){var e=this;if(this.tc=t,this.Qd="*",lf()?this.Hc=this.sd=cf():(this.Hc=window.opener,this.sd=window),!e.Hc)throw"Unable to find relay frame";df(this.sd,"message",q(this.cc,this)),df(this.sd,"message",q(this.hf,this));try{Ch(this,{a:"ready"})}catch(n){df(this.Hc,"load",function(){Ch(e,{a:"ready"})})}df(window,"unload",q(this.eg,this))}function Ch(e,n){n=t(n),lf()?e.Hc.doPost(n,e.Qd):e.Hc.postMessage(n,e.Qd)}function Z(t,e){this.Sc=t,this.Ca=e}function O(t,e){var n,i,r;if(t instanceof gh)n=t,i=e;else{D("new Firebase",1,2,arguments.length),i=ub(arguments[0]),n=i.vg,"firebase"===i.domain&&tb(i.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),n||tb("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),i.Cb||"undefined"!=typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&z("Insecure Firebase access from a secure page. Please use https in calls to new Firebase()."),n=new Ca(i.host,i.Cb,n,"ws"===i.scheme||"wss"===i.scheme),i=new P(i.Pc),r=i.toString();var o;if(!(o=!p(n.host)||0===n.host.length||!Qb(n.yb))&&(o=0!==r.length)&&(r&&(r=r.replace(/^\/*\.info(\/|$)/,"/")),o=!(p(r)&&0!==r.length&&!Pb.test(r))),o)throw Error(E("new Firebase",1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');if(e)if(e instanceof Ah)r=e;else{if(!p(e))throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");r=Ah.Qb(),n.Gd=e}else r=Ah.Qb();o=n.toString();var a=v(r.jc,o);a||(a=new gh(n),r.jc[o]=a),n=a}M.call(this,n,i,oc,!1)}function qb(t,e){x(!e||!0===t||!1===t,"Can't turn on custom loggers persistently."),!0===t?("undefined"!=typeof console&&("function"==typeof console.log?ob=q(console.log,console):"object"==typeof console.log&&(ob=function(t){console.log(t)})),e&&Ba.set("logging_enabled",!0)):t?ob=t:(ob=null,Ba.remove("logging_enabled"))}var h,aa=this,ma=Date.now||function(){return+new Date},sa={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t","":"\\u000b"},ta=/\uffff/.test("￿")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;h=xa.prototype,h.set=function(e,n){null==n?this.xc.removeItem(this.Hd+e):this.xc.setItem(this.Hd+e,t(n))},h.get=function(t){return t=this.xc.getItem(this.Hd+t),null==t?null:ua(t)},h.remove=function(t){this.xc.removeItem(this.Hd+t)},h.ff=!1,h.toString=function(){return this.xc.toString()},ya.prototype.set=function(t,e){null==e?delete this.ha[t]:this.ha[t]=e},ya.prototype.get=function(t){return u(this.ha,t)?this.ha[t]:null},ya.prototype.remove=function(t){delete this.ha[t]},ya.prototype.ff=!0;var Aa=za("localStorage"),Ba=za("sessionStorage");Ca.prototype.toString=function(){var t=(this.Cb?"https://":"http://")+this.host;return this.Gd&&(t+="<"+this.Gd+">"),t},na(Fa,Ea),Fa.prototype.reset=function(){this.R[0]=1732584193,this.R[1]=4023233417,this.R[2]=2562383102,this.R[3]=271733878,this.R[4]=3285377520,this.Rd=this.Tb=0},Fa.prototype.update=function(t,e){n(e)||(e=t.length);for(var i=e-this.Ta,r=0,o=this.be,a=this.Tb;e>r;){if(0==a)for(;i>=r;)Ga(this,t,r),r+=this.Ta;if(p(t)){for(;e>r;)if(o[a]=t.charCodeAt(r),++a,++r,a==this.Ta){Ga(this,o),a=0;break}}else for(;e>r;)if(o[a]=t[r],++a,++r,a==this.Ta){Ga(this,o),a=0;break}}this.Tb=a,this.Rd+=e};var w=Array.prototype,Ia=w.indexOf?function(t,e,n){return w.indexOf.call(t,e,n)}:function(t,e,n){if(n=null==n?0:0>n?Math.max(0,t.length+n):n,p(t))return p(e)&&1==e.length?t.indexOf(e,n):-1;for(;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},Ja=w.forEach?function(t,e,n){w.forEach.call(t,e,n)}:function(t,e,n){for(var i=t.length,r=p(t)?t.split(""):t,o=0;i>o;o++)o in r&&e.call(n,r[o],o,t)},Ka=w.filter?function(t,e,n){return w.filter.call(t,e,n)}:function(t,e,n){for(var i=t.length,r=[],o=0,a=p(t)?t.split(""):t,s=0;i>s;s++)if(s in a){var u=a[s];e.call(n,u,s,t)&&(r[o++]=u)}return r},La=w.map?function(t,e,n){return w.map.call(t,e,n)}:function(t,e,n){for(var i=t.length,r=Array(i),o=p(t)?t.split(""):t,a=0;i>a;a++)a in o&&(r[a]=e.call(n,o[a],a,t));return r},Ma=w.reduce?function(t,e,n,i){return i&&(e=q(e,i)),w.reduce.call(t,e,n)}:function(t,e,n,i){var r=n;return Ja(t,function(n,o){r=e.call(i,r,n,o,t)}),r},Na=w.every?function(t,e,n){return w.every.call(t,e,n)}:function(t,e,n){for(var i=t.length,r=p(t)?t.split(""):t,o=0;i>o;o++)if(o in r&&!e.call(n,r[o],o,t))return!1;return!0},Va;t:{var Wa=aa.navigator;if(Wa){var Xa=Wa.userAgent;if(Xa){Va=Xa;break t}}Va=""}var Za=Ya("Opera")||Ya("OPR"),$a=Ya("Trident")||Ya("MSIE"),ab=Ya("Gecko")&&-1==Va.toLowerCase().indexOf("webkit")&&!(Ya("Trident")||Ya("MSIE")),bb=-1!=Va.toLowerCase().indexOf("webkit");
!function(){var t,e="";return Za&&aa.opera?(e=aa.opera.version,ha(e)?e():e):(ab?t=/rv\:([^\);]+)(\)|;)/:$a?t=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:bb&&(t=/WebKit\/(\S+)/),t&&(e=(e=t.exec(Va))?e[1]:""),$a&&(t=(t=aa.document)?t.documentMode:void 0,t>parseFloat(e))?String(t):e)}();var cb=null,db=null,eb=null,hb=function(){var t=1;return function(){return t++}}(),ob=null,pb=!0,Eb=/^-?\d{1,10}$/;Gb.prototype.Rb=function(){var t=this.Ld.hc();return"value"===this.nd?t.path:t.parent().path},Gb.prototype.oe=function(){return this.nd},Gb.prototype.Pb=function(){return this.me.Pb(this)},Gb.prototype.toString=function(){return this.Rb().toString()+":"+this.nd+":"+t(this.Ld.Xe())},Hb.prototype.Rb=function(){return this.path},Hb.prototype.oe=function(){return"cancel"},Hb.prototype.Pb=function(){return this.me.Pb(this)},Hb.prototype.toString=function(){return this.path.toString()+":cancel"},h=Ib.prototype,h.pf=function(t){return"value"===t},h.createEvent=function(t,e){var n=e.w.m;return new Gb("value",this,new C(t.Wa,e.hc(),n))},h.Pb=function(t){var e=this.vc;if("cancel"===t.oe()){x(this.mb,"Raising a cancel event on a listener with no cancel callback");var n=this.mb;return function(){n.call(e,t.error)}}var i=this.Kb;return function(){i.call(e,t.Ld)}},h.Te=function(t,e){return this.mb?new Hb(this,t,e):null},h.matches=function(t){return t instanceof Ib&&(!t.Kb||!this.Kb||t.Kb===this.Kb)&&t.vc===this.vc},h.cf=function(){return null!==this.Kb},h=Jb.prototype,h.pf=function(t){return t="children_added"===t?"child_added":t,("children_removed"===t?"child_removed":t)in this.ba},h.Te=function(t,e){return this.mb?new Hb(this,t,e):null},h.createEvent=function(t,e){var n=e.hc().k(t.nb);return new Gb(t.type,this,new C(t.Wa,n,e.w.m),t.Rc)},h.Pb=function(t){var e=this.vc;if("cancel"===t.oe()){x(this.mb,"Raising a cancel event on a listener with no cancel callback");var n=this.mb;return function(){n.call(e,t.error)}}var i=this.ba[t.nd];return function(){i.call(e,t.Ld,t.Rc)}},h.matches=function(t){if(t instanceof Jb){if(this.ba&&t.ba){var e=Kb(t.ba);if(e===Kb(this.ba)){if(1===e){var e=Lb(t.ba),n=Lb(this.ba);return!(n!==e||t.ba[e]&&this.ba[n]&&t.ba[e]!==this.ba[n])}return Mb(this.ba,function(e,n){return t.ba[n]===e})}return!1}return!0}return!1},h.cf=function(){return null!==this.ba};var Ob=/[\[\].#$\/\u0000-\u001F\u007F]/,Pb=/[\[\].#$\u0000-\u001F\u007F]/,hc={};gc.prototype.df=function(t,e){return 0!==this.compare(new I("[MIN_NAME]",t),new I("[MIN_NAME]",e))},gc.prototype.Ae=function(){return ic},na(jc,gc),h=jc.prototype,h.se=function(t){return!t.B(this.Vb).e()},h.compare=function(t,e){var n=t.K.B(this.Vb),i=e.K.B(this.Vb),n=n.he(i);return 0===n?xb(t.name,e.name):n},h.ye=function(t,e){var n=J(t),n=K.I(this.Vb,n);return new I(e,n)},h.ze=function(){var t=K.I(this.Vb,kc);return new I("[MAX_NAME]",t)},h.toString=function(){return this.Vb};var L=new jc(".priority");na(lc,gc),h=lc.prototype,h.compare=function(t,e){return xb(t.name,e.name)},h.se=function(){throw ib("KeyIndex.isDefinedOn not expected to be called.")},h.df=function(){return!1},h.Ae=function(){return ic},h.ze=function(){return new I("[MAX_NAME]",K)},h.ye=function(t){return x(p(t),"KeyIndex indexValue must always be a string."),new I(t,K)},h.toString=function(){return".key"};var mc=new lc,oc=new nc;h=nc.prototype,h.ve=function(t){var e=uc(this);return e.ka=!0,e.xb=t,e.Hb="",e},h.we=function(t){var e=uc(this);return e.ka=!0,e.xb=t,e.Hb="l",e},h.xe=function(t){var e=uc(this);return e.ka=!0,e.xb=t,e.Hb="r",e},h.Md=function(t,e){var n=uc(this);return n.ga=!0,n.Bc=t,null!=e?(n.nc=!0,n.Xb=e):(n.nc=!1,n.Xb=""),n},h.md=function(t,e){var i=uc(this);return i.na=!0,i.Ac=t,n(e)?(i.yc=!0,i.Ub=e):(i.Dg=!1,i.Ub=""),i},M.prototype.hc=function(){return D("Query.ref",0,0,arguments.length),new O(this.g,this.path)},M.prototype.ref=M.prototype.hc,M.prototype.zb=function(t,e,n,i){D("Query.on",2,4,arguments.length),Xb("Query.on",t,!1),F("Query.on",2,e,!1);var r=Ac("Query.on",n,i);if("value"===t)Bc(this.g,this,new Ib(e,r.cancel||null,r.Ha||null));else{var o={};o[t]=e,Bc(this.g,this,new Jb(o,r.cancel,r.Ha))}return e},M.prototype.on=M.prototype.zb,M.prototype.bc=function(t,e,n){D("Query.off",0,3,arguments.length),Xb("Query.off",t,!0),F("Query.off",2,e,!0),Nb("Query.off",3,n);var i=null,r=null;"value"===t?i=new Ib(e||null,null,n||null):t&&(e&&(r={},r[t]=e),i=new Jb(r,null,n||null)),r=this.g,i=".info"===G(this.path)?r.ud.hb(this,i):r.M.hb(this,i),Cc(r.Z,this.path,i)},M.prototype.off=M.prototype.bc,M.prototype.gg=function(t,e){function n(a){o&&(o=!1,r.bc(t,n),e.call(i.Ha,a))}D("Query.once",2,4,arguments.length),Xb("Query.once",t,!1),F("Query.once",2,e,!1);var i=Ac("Query.once",arguments[2],arguments[3]),r=this,o=!0;this.zb(t,n,function(e){r.bc(t,n),i.cancel&&i.cancel.call(i.Ha,e)})},M.prototype.once=M.prototype.gg,M.prototype.ve=function(t){if(z("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead."),D("Query.limit",1,1,arguments.length),!ga(t)||Math.floor(t)!==t||0>=t)throw Error("Query.limit: First argument must be a positive integer.");if(this.w.ka)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");var e=this.w.ve(t);return yc(e),new M(this.g,this.path,e,this.dc)},M.prototype.limit=M.prototype.ve,M.prototype.we=function(t){if(D("Query.limitToFirst",1,1,arguments.length),!ga(t)||Math.floor(t)!==t||0>=t)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.w.ka)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new M(this.g,this.path,this.w.we(t),this.dc)},M.prototype.limitToFirst=M.prototype.we,M.prototype.xe=function(t){if(D("Query.limitToLast",1,1,arguments.length),!ga(t)||Math.floor(t)!==t||0>=t)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.w.ka)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new M(this.g,this.path,this.w.xe(t),this.dc)},M.prototype.limitToLast=M.prototype.xe,M.prototype.hg=function(t){if(D("Query.orderByChild",1,1,arguments.length),"$key"===t)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===t)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');Yb("Query.orderByChild",1,t,!1),zc(this,"Query.orderByChild");var e=vc(this.w,new jc(t));return xc(e),new M(this.g,this.path,e,!0)},M.prototype.orderByChild=M.prototype.hg,M.prototype.ig=function(){D("Query.orderByKey",0,0,arguments.length),zc(this,"Query.orderByKey");var t=vc(this.w,mc);return xc(t),new M(this.g,this.path,t,!0)},M.prototype.orderByKey=M.prototype.ig,M.prototype.jg=function(){D("Query.orderByPriority",0,0,arguments.length),zc(this,"Query.orderByPriority");var t=vc(this.w,L);return xc(t),new M(this.g,this.path,t,!0)},M.prototype.orderByPriority=M.prototype.jg,M.prototype.Md=function(t,e){D("Query.startAt",0,2,arguments.length),Sb("Query.startAt",t,!0),Yb("Query.startAt",2,e,!0);var i=this.w.Md(t,e);if(yc(i),xc(i),this.w.ga)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");return n(t)||(e=t=null),new M(this.g,this.path,i,this.dc)},M.prototype.startAt=M.prototype.Md,M.prototype.md=function(t,e){D("Query.endAt",0,2,arguments.length),Sb("Query.endAt",t,!0),Yb("Query.endAt",2,e,!0);var n=this.w.md(t,e);if(yc(n),xc(n),this.w.na)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new M(this.g,this.path,n,this.dc)},M.prototype.endAt=M.prototype.md,M.prototype.Of=function(t,e){if(D("Query.equalTo",1,2,arguments.length),Sb("Query.equalTo",t,!1),Yb("Query.equalTo",2,e,!0),this.w.ga)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.w.na)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Md(t,e).md(t,e)},M.prototype.equalTo=M.prototype.Of,M.prototype.Da=function(){var t=Ab(Dc(this));return"{}"===t?"default":t},P.prototype.toString=function(){for(var t="",e=this.aa;e<this.n.length;e++)""!==this.n[e]&&(t+="/"+this.n[e]);return t||"/"},P.prototype.parent=function(){if(this.aa>=this.n.length)return null;for(var t=[],e=this.aa;e<this.n.length-1;e++)t.push(this.n[e]);return new P(t,0)},P.prototype.k=function(t){for(var e=[],n=this.aa;n<this.n.length;n++)e.push(this.n[n]);if(t instanceof P)for(n=t.aa;n<t.n.length;n++)e.push(t.n[n]);else for(t=t.split("/"),n=0;n<t.length;n++)0<t[n].length&&e.push(t[n]);return new P(e,0)},P.prototype.e=function(){return this.aa>=this.n.length};var S=new P("");P.prototype.ja=function(t){if(Q(this)!==Q(t))return!1;for(var e=this.aa,n=t.aa;e<=this.n.length;e++,n++)if(this.n[e]!==t.n[n])return!1;return!0},P.prototype.contains=function(t){var e=this.aa,n=t.aa;if(Q(this)>Q(t))return!1;for(;e<this.n.length;){if(this.n[e]!==t.n[n])return!1;++e,++n}return!0},h=Fc.prototype,h.ta=function(){return this.D.value},h.clear=function(){this.D.value=null,this.D.children={},this.D.dd=0,Ic(this)},h.pd=function(){return 0<this.D.dd},h.e=function(){return null===this.ta()&&!this.pd()},h.ca=function(t){var e=this;A(this.D.children,function(n,i){t(new Fc(i,e,n))})},h.path=function(){return new P(null===this.Oc?this.yd:this.Oc.path()+"/"+this.yd)},h.name=function(){return this.yd},h.parent=function(){return this.Oc},h=Lc.prototype,h.Ja=function(t,e){return new Lc(this.Ga,this.pa.Ja(t,e,this.Ga).W(null,null,!1,null,null))},h.remove=function(t){return new Lc(this.Ga,this.pa.remove(t,this.Ga).W(null,null,!1,null,null))},h.get=function(t){for(var e,n=this.pa;!n.e();){if(e=this.Ga(t,n.key),0===e)return n.value;0>e?n=n.left:e>0&&(n=n.right)}return null},h.e=function(){return this.pa.e()},h.count=function(){return this.pa.count()},h.Ic=function(){return this.pa.Ic()},h.Zb=function(){return this.pa.Zb()},h.Ba=function(t){return this.pa.Ba(t)},h.Aa=function(t){return new Oc(this.pa,null,this.Ga,!1,t)},h.rb=function(t,e){return new Oc(this.pa,t,this.Ga,!1,e)},h.Sb=function(t,e){return new Oc(this.pa,t,this.Ga,!0,e)},h.bf=function(t){return new Oc(this.pa,null,this.Ga,!0,t)},h=Pc.prototype,h.W=function(t,e,n,i,r){return new Pc(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=i?i:this.left,null!=r?r:this.right)},h.count=function(){return this.left.count()+1+this.right.count()},h.e=function(){return!1},h.Ba=function(t){return this.left.Ba(t)||t(this.key,this.value)||this.right.Ba(t)},h.Ic=function(){return Qc(this).key},h.Zb=function(){return this.right.e()?this.key:this.right.Zb()},h.Ja=function(t,e,n){var i,r;return r=this,i=n(t,r.key),r=0>i?r.W(null,null,null,r.left.Ja(t,e,n),null):0===i?r.W(null,e,null,null,null):r.W(null,null,null,null,r.right.Ja(t,e,n)),Rc(r)},h.remove=function(t,e){var n,i;if(n=this,0>e(t,n.key))n.left.e()||n.left.$()||n.left.left.$()||(n=Tc(n)),n=n.W(null,null,null,n.left.remove(t,e),null);else{if(n.left.$()&&(n=Uc(n)),n.right.e()||n.right.$()||n.right.left.$()||(n=Vc(n),n.left.left.$()&&(n=Uc(n),n=Vc(n))),0===e(t,n.key)){if(n.right.e())return Mc;i=Qc(n.right),n=n.W(i.key,i.value,null,null,Sc(n.right))}n=n.W(null,null,null,null,n.right.remove(t,e))}return Rc(n)},h.$=function(){return this.color},h=Xc.prototype,h.W=function(){return this},h.Ja=function(t,e){return new Pc(t,e,null)},h.remove=function(){return this},h.count=function(){return 0},h.e=function(){return!0},h.Ba=function(){return!1},h.Ic=function(){return null},h.Zb=function(){return null},h.$=function(){return!1};var Mc=new Xc;h=Zc.prototype,h.P=function(){return!0},h.O=function(){return this.fa},h.ib=function(t){return new Zc(this.A,t)},h.B=function(t){return".priority"===t?this.fa:K},h.da=function(t){return t.e()?this:".priority"===G(t)?this.fa:K},h.Y=function(){return!1},h.af=function(){return null},h.I=function(t,e){return".priority"===t?this.ib(e):K.I(t,e).ib(this.fa)},h.L=function(t,e){var n=G(t);return null===n?e:(x(".priority"!==n||1===Q(t),".priority must be the last token in a path"),this.I(n,K.L(R(t),e)))},h.e=function(){return!1},h.Ua=function(){return 0},h.N=function(t){return t&&!this.O().e()?{".value":this.ta(),".priority":this.O().N()}:this.ta()},h.hash=function(){if(null===this.wb){var t="";this.fa.e()||(t+="priority:"+ad(this.fa.N())+":");var e=typeof this.A,t=t+(e+":"),t="number"===e?t+Db(this.A):t+this.A;this.wb=lb(t)}return this.wb},h.ta=function(){return this.A},h.he=function(t){if(t===K)return 1;if(t instanceof bd)return-1;x(t.P(),"Unknown node type");var e=typeof t.A,n=typeof this.A,i=Ia(cd,e),r=Ia(cd,n);return x(i>=0,"Unknown leaf type: "+e),x(r>=0,"Unknown leaf type: "+n),i===r?"object"===n?0:this.A<t.A?-1:this.A===t.A?0:1:r-i};var cd=["object","boolean","number","string"];Zc.prototype.Wd=function(){return this},Zc.prototype.Yb=function(){return!0},Zc.prototype.ja=function(t){return t===this?!0:t.P()?this.A===t.A&&this.fa.ja(t.fa):!1},Zc.prototype.toString=function(){return"string"==typeof this.A?this.A:'"'+this.A+'"'},dd.prototype.get=function(t){var e=v(this.td,t);if(!e)throw Error("No index defined for "+t);return e===hc?null:e};var id=new dd({".priority":hc},{".priority":L});h=bd.prototype,h.P=function(){return!1},h.O=function(){return this.fa||K},h.ib=function(t){return new bd(this.j,t,this.sb)},h.B=function(t){return".priority"===t?this.O():(t=this.j.get(t),null===t?K:t)},h.da=function(t){var e=G(t);return null===e?this:this.B(e).da(R(t))},h.Y=function(t){return null!==this.j.get(t)},h.I=function(t,e){if(x(e,"We should always be passing snapshot nodes"),".priority"===t)return this.ib(e);var n,i=new I(t,e);return e.e()?(n=this.j.remove(t),i=hd(this.sb,i,this.j)):(n=this.j.Ja(t,e),i=ed(this.sb,i,this.j)),new bd(n,this.fa,i)},h.L=function(t,e){var n=G(t);if(null===n)return e;x(".priority"!==G(t)||1===Q(t),".priority must be the last token in a path");var i=this.B(n).L(R(t),e);return this.I(n,i)},h.e=function(){return this.j.e()},h.Ua=function(){return this.j.count()};var jd=/^(0|[1-9]\d*)$/;h=bd.prototype,h.N=function(t){if(this.e())return null;var e={},n=0,i=0,r=!0;if(this.ca(L,function(o,a){e[o]=a.N(t),n++,r&&jd.test(o)?i=Math.max(i,Number(o)):r=!1}),!t&&r&&2*n>i){var o,a=[];for(o in e)a[o]=e[o];return a}return t&&!this.O().e()&&(e[".priority"]=this.O().N()),e},h.hash=function(){if(null===this.wb){var t="";this.O().e()||(t+="priority:"+ad(this.O().N())+":"),this.ca(L,function(e,n){var i=n.hash();""!==i&&(t+=":"+e+":"+i)}),this.wb=""===t?"":lb(t)}return this.wb},h.af=function(t,e,n){return(n=kd(this,n))?(t=Nc(n,new I(t,e)))?t.name:null:Nc(this.j,t)},h.ca=function(t,e){var n=kd(this,t);return n?n.Ba(function(t){return e(t.name,t.K)}):this.j.Ba(e)},h.Aa=function(t){return this.rb(t.Ae(),t)},h.rb=function(t,e){var n=kd(this,e);return n?n.rb(t,function(t){return t}):this.j.rb(t.name,Yc)},h.bf=function(t){return this.Sb(t.ze(),t)},h.Sb=function(t,e){var n=kd(this,e);return n?n.Sb(t,function(t){return t}):this.j.Sb(t.name,Yc)},h.he=function(t){return this.e()?t.e()?0:-1:t.P()||t.e()?1:t===kc?-1:0},h.Wd=function(t){if(t===mc||nd(this.sb.Wb,t.toString()))return this;var e=this.sb,n=this.j;x(t!==mc,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var i=[],r=!1,n=n.Aa(Yc),o=U(n);o;)r=r||t.se(o.K),i.push(o),o=U(n);return i=r?gd(i,H(t)):hc,r=t.toString(),n=od(e.Wb),n[r]=t,t=od(e.td),t[r]=i,new bd(this.j,this.fa,new dd(t,n))},h.Yb=function(t){return t===mc||nd(this.sb.Wb,t.toString())},h.ja=function(t){if(t===this)return!0;if(t.P())return!1;if(this.O().ja(t.O())&&this.j.count()===t.j.count()){var e=this.Aa(L);t=t.Aa(L);for(var n=U(e),i=U(t);n&&i;){if(n.name!==i.name||!n.K.ja(i.K))return!1;n=U(e),i=U(t)}return null===n&&null===i}return!1},h.toString=function(){var t="{",e=!0;return this.ca(L,function(n,i){e?e=!1:t+=", ",t+='"'+n+'" : '+i.toString()}),t+="}"};var pd=Math.log(2),K=new bd(new Lc(fc),null,id);na(sd,bd),h=sd.prototype,h.he=function(t){return t===this?0:1},h.ja=function(t){return t===this},h.O=function(){throw ib("Why is this called?")},h.B=function(){return K},h.e=function(){return!1};var kc=new sd,ic=new I("[MIN_NAME]",K);C.prototype.N=function(){return D("Firebase.DataSnapshot.val",0,0,arguments.length),this.D.N()},C.prototype.val=C.prototype.N,C.prototype.Xe=function(){return D("Firebase.DataSnapshot.exportVal",0,0,arguments.length),this.D.N(!0)},C.prototype.exportVal=C.prototype.Xe,C.prototype.Qf=function(){return D("Firebase.DataSnapshot.exists",0,0,arguments.length),!this.D.e()},C.prototype.exists=C.prototype.Qf,C.prototype.k=function(t){D("Firebase.DataSnapshot.child",0,1,arguments.length),ga(t)&&(t=String(t)),Zb("Firebase.DataSnapshot.child",t);var e=new P(t),n=this.U.k(e);return new C(this.D.da(e),n,L)},C.prototype.child=C.prototype.k,C.prototype.Y=function(t){D("Firebase.DataSnapshot.hasChild",1,1,arguments.length),Zb("Firebase.DataSnapshot.hasChild",t);var e=new P(t);return!this.D.da(e).e()},C.prototype.hasChild=C.prototype.Y,C.prototype.O=function(){return D("Firebase.DataSnapshot.getPriority",0,0,arguments.length),this.D.O().N()},C.prototype.getPriority=C.prototype.O,C.prototype.forEach=function(t){if(D("Firebase.DataSnapshot.forEach",1,1,arguments.length),F("Firebase.DataSnapshot.forEach",1,t,!1),this.D.P())return!1;var e=this;return!!this.D.ca(this.m,function(n,i){return t(new C(i,e.U.k(n),L))})},C.prototype.forEach=C.prototype.forEach,C.prototype.pd=function(){return D("Firebase.DataSnapshot.hasChildren",0,0,arguments.length),this.D.P()?!1:!this.D.e()},C.prototype.hasChildren=C.prototype.pd,C.prototype.name=function(){return z("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead."),D("Firebase.DataSnapshot.name",0,0,arguments.length),this.key()},C.prototype.name=C.prototype.name,C.prototype.key=function(){return D("Firebase.DataSnapshot.key",0,0,arguments.length),this.U.key()},C.prototype.key=C.prototype.key,C.prototype.Ua=function(){return D("Firebase.DataSnapshot.numChildren",0,0,arguments.length),this.D.Ua()},C.prototype.numChildren=C.prototype.Ua,C.prototype.hc=function(){return D("Firebase.DataSnapshot.ref",0,0,arguments.length),this.U},C.prototype.ref=C.prototype.hc,td.prototype.Td=function(t){for(var e=this.Gc[t]||[],n=0;n<e.length;n++)e[n].sc.apply(e[n].Ha,Array.prototype.slice.call(arguments,1))},td.prototype.zb=function(t,e,n){ud(this,t),this.Gc[t]=this.Gc[t]||[],this.Gc[t].push({sc:e,Ha:n}),(t=this.pe(t))&&e.apply(n,t)},td.prototype.bc=function(t,e,n){ud(this,t),t=this.Gc[t]||[];for(var i=0;i<t.length;i++)if(t[i].sc===e&&(!n||n===t[i].Ha)){t.splice(i,1);break}},na(vd,td),ca(vd),vd.prototype.pe=function(t){return x("visible"===t,"Unknown event type: "+t),[this.qc]},na(wd,td),ca(wd),wd.prototype.pe=function(t){return x("online"===t,"Unknown event type: "+t),[this.Lc]};var Dd="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");Fd.prototype.get=function(){return od(this.wc)},Hd.prototype.get=function(){var t=this.Kf.get(),e=od(t);if(this.vd)for(var n in this.vd)e[n]-=this.vd[n];return this.vd=t,e},Id.prototype.nf=function(){var t,e=this.Nd.get(),n={},i=!1;for(t in e)0<e[t]&&u(this.uf,t)&&(n[t]=e[t],i=!0);i&&(e=this.S,e.ia&&(n={c:n},e.f("reportStats",n),e.wa("s",n))),setTimeout(q(this.nf,this),Math.floor(6e5*Math.random()))};var Jd={},Kd={},Nd=null;"undefined"!=typeof MozWebSocket?Nd=MozWebSocket:"undefined"!=typeof WebSocket&&(Nd=WebSocket);var Pd;Od.prototype.open=function(t,e){this.fb=e,this.cg=t,this.f("Websocket connecting to "+this.Za),this.zc=!1,Aa.set("previous_websocket_failure",!0);try{this.oa=new Nd(this.Za)}catch(n){this.f("Error instantiating WebSocket.");var i=n.message||n.data;return i&&this.f(i),void this.eb()}var r=this;this.oa.onopen=function(){r.f("Websocket connected."),r.zc=!0},this.oa.onclose=function(){r.f("Websocket connection was disconnected."),r.oa=null,r.eb()},this.oa.onmessage=function(t){if(null!==r.oa)if(t=t.data,r.kb+=t.length,Gd(r.Qa,"bytes_received",t.length),Qd(r),null!==r.frames)Rd(r,t);else{t:{if(x(null===r.frames,"We already have a frame buffer"),6>=t.length){var e=Number(t);if(!isNaN(e)){r.Oe=e,r.frames=[],t=null;break t}}r.Oe=1,r.frames=[]}null!==t&&Rd(r,t)}},this.oa.onerror=function(t){r.f("WebSocket error.  Closing connection."),(t=t.message||t.data)&&r.f(t),r.eb()}},Od.prototype.start=function(){},Od.isAvailable=function(){var t=!1;if("undefined"!=typeof navigator&&navigator.userAgent){var e=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);e&&1<e.length&&4.4>parseFloat(e[1])&&(t=!0)}return!t&&null!==Nd&&!Pd},Od.responsesRequiredToBeHealthy=2,Od.healthyTimeout=3e4,h=Od.prototype,h.wd=function(){Aa.remove("previous_websocket_failure")},h.send=function(e){Qd(this),e=t(e),this.lb+=e.length,Gd(this.Qa,"bytes_sent",e.length),e=Bb(e,16384),1<e.length&&this.oa.send(String(e.length));for(var n=0;n<e.length;n++)this.oa.send(e[n])},h.Yc=function(){this.ub=!0,this.Cc&&(clearInterval(this.Cc),this.Cc=null),this.oa&&(this.oa.close(),this.oa=null)},h.eb=function(){this.ub||(this.f("WebSocket is closing itself"),this.Yc(),this.fb&&(this.fb(this.zc),this.fb=null))},h.close=function(){this.ub||(this.f("WebSocket is being closed"),this.Yc())},h=Vd.prototype,h.add=function(t,e){this.set[t]=null!==e?e:!0},h.contains=function(t){return u(this.set,t)},h.get=function(t){return this.contains(t)?this.set[t]:void 0},h.remove=function(t){delete this.set[t]},h.clear=function(){this.set={}},h.e=function(){return Bd(this.set)},h.count=function(){return Kb(this.set)};var Yd,Zd;Xd.prototype.open=function(t,e){this.Ue=0,this.ea=e,this.gf=new Sd(t),this.ub=!1;var n=this;this.ob=setTimeout(function(){n.f("Timed out trying to connect."),n.eb(),n.ob=null},Math.floor(3e4)),wb(function(){if(!n.ub){n.Na=new $d(function(t,e,i){if(ae(n,arguments),n.Na)if(n.ob&&(clearTimeout(n.ob),n.ob=null),n.zc=!0,"start"==t)n.id=e,n.mf=i;else{if("close"!==t)throw Error("Unrecognized command received: "+t);e?(n.Na.Jd=!1,Td(n.gf,e,function(){n.eb()})):n.eb()}},function(t,e){ae(n,arguments),Ud(n.gf,t,e)},function(){n.eb()},n.bd);var t={start:"t"};t.ser=Math.floor(1e8*Math.random()),n.Na.Ud&&(t.cb=n.Na.Ud),t.v="5",n.Kd&&(t.s=n.Kd),"undefined"!=typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(t.r="f"),t=n.bd(t),n.f("Connecting via long-poll to "+t),be(n.Na,t,function(){})}})},Xd.prototype.start=function(){var t=this.Na,e=this.mf;for(t.Xf=this.id,t.Yf=e,t.Zd=!0;ce(t););t=this.id,e=this.mf,this.$b=document.createElement("iframe");var n={dframe:"t"};n.id=t,n.pw=e,this.$b.src=this.bd(n),this.$b.style.display="none",document.body.appendChild(this.$b)},Xd.isAvailable=function(){return!(Zd||"object"==typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href)||"object"==typeof Windows&&"object"==typeof Windows.zg)},h=Xd.prototype,h.wd=function(){},h.Yc=function(){this.ub=!0,this.Na&&(this.Na.close(),this.Na=null),this.$b&&(document.body.removeChild(this.$b),this.$b=null),this.ob&&(clearTimeout(this.ob),this.ob=null)},h.eb=function(){this.ub||(this.f("Longpoll is closing itself"),this.Yc(),this.ea&&(this.ea(this.zc),this.ea=null))},h.close=function(){this.ub||(this.f("Longpoll is being closed."),this.Yc())},h.send=function(e){e=t(e),this.lb+=e.length,Gd(this.Qa,"bytes_sent",e.length),e=mb(e),e=fb(e,!0),e=Bb(e,1840);for(var n=0;n<e.length;n++){var i=this.Na;i.Qc.push({og:this.Ue,wg:e.length,We:e[n]}),i.Zd&&ce(i),this.Ue++}},$d.prototype.close=function(){if(this.Zd=!1,this.va){this.va.$a.body.innerHTML="";var t=this;setTimeout(function(){null!==t.va&&(document.body.removeChild(t.va),t.va=null)},Math.floor(0))}var e=this.fb;e&&(this.fb=null,e())};var ge=[Xd,Od];ie.prototype.wa=function(t){te(this,{t:"d",d:t})},ie.prototype.Bd=function(t){qe(this),this.cc(t)},ie.prototype.close=function(){2!==this.Pa&&(this.f("Closing realtime connection."),this.Pa=2,pe(this),this.ea&&(this.ea(),this.ea=null))};var ye=0,Ae=0;h=xe.prototype,h.wa=function(e,n,i){var r=++this.ng;e={r:r,a:e,b:n},this.f(t(e)),x(this.ia,"sendRequest call when we're not connected not allowed."),this.La.wa(e),i&&(this.Tc[r]=i)},h.T=function(t,e,n){this.Lb={Mf:t,Ye:!1,sc:e,cd:n},this.f("Authenticating using credential: "+t),Ee(this),(e=40==t.length)||(t=ue(t).fe,e="object"==typeof t&&!0===v(t,"admin")),e&&(this.f("Admin auth credential detected.  Reducing max reconnect time."),this.xd=3e4)},h.Pe=function(t){delete this.Lb,this.ia&&this.wa("unauth",{},function(e){t(e.s,e.d)})},h.Ce=function(t,e){this.ia?Ge(this,"oc",t,null,e):this.Jc.push({Pc:t,action:"oc",data:null,H:e})},h.put=function(t,e,n,i){Ie(this,"p",t,e,n,i)},h.Bd=function(e){if("r"in e){this.f("from server: "+t(e));var n=e.r,i=this.Tc[n];i&&(delete this.Tc[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&(n=e.a,i=e.b,this.f("handleServerMessage",n,i),"d"===n?this.Cd(i.p,i.d,!1,i.t):"m"===n?this.Cd(i.p,i.d,!0,i.t):"c"===n?Me(this,i.p,i.q):"ac"===n?(e=i.s,n=i.d,i=this.Lb,delete this.Lb,i&&i.cd&&i.cd(e,n)):"sd"===n?this.Ke?this.Ke(i):"msg"in i&&"undefined"!=typeof console&&console.log("FIREBASE: "+i.msg.replace("\n","\nFIREBASE: ")):sb("Unrecognized action received from server: "+t(n)+"\nAre you using the latest client?"))}},h.Kc=function(t){this.f("connection ready"),this.ia=!0,this.Dc=(new Date).getTime(),this.Ee({serverTimeOffset:t-(new Date).getTime()}),Ne(this),this.Ad(!0)},h.fg=function(t){t&&!this.qc&&this.Va===this.xd&&(this.f("Window became visible.  Reducing delay."),this.Va=1e3,this.La||ze(this,0)),this.qc=t},h.dg=function(t){t?(this.f("Browser went online.  Reconnecting."),this.Va=1e3,this.Eb=!0,this.La||ze(this,0)):(this.f("Browser went offline.  Killing connection; don't reconnect."),this.Eb=!1,this.La&&this.La.close())},h.jf=function(){this.f("data client disconnected"),this.ia=!1,this.La=null;for(var t=0;t<this.la.length;t++){var e=this.la[t];e&&"h"in e.of&&e.lg&&(e.H&&e.H("disconnect"),delete this.la[t],this.Nc--)}if(0===this.Nc&&(this.la=[]),this.Eb)this.qc?this.Dc&&(3e4<(new Date).getTime()-this.Dc&&(this.Va=1e3),this.Dc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.Va=this.xd,this.ue=(new Date).getTime()),t=Math.max(0,this.Va-((new Date).getTime()-this.ue)),t*=Math.random(),this.f("Trying to reconnect in "+t+"ms"),ze(this,t),this.Va=Math.min(this.xd,1.3*this.Va);else for(var n in this.Tc)delete this.Tc[n];this.Ad(!1)},h.tb=function(){this.Eb=!1,this.La?this.La.close():(this.Nb&&(clearTimeout(this.Nb),this.Nb=null),this.ia&&this.jf())},h.kc=function(){this.Eb=!0,this.Va=1e3,this.La||ze(this,0)},Pe.prototype.ic=function(t,e){if(t.e())this.A=e,this.j=null;else if(null!==this.A)this.A=this.A.L(t,e);else{null==this.j&&(this.j=new Vd);var n=G(t);this.j.contains(n)||this.j.add(n,new Pe),n=this.j.get(n),t=R(t),n.ic(t,e)}},Pe.prototype.ca=function(t){null!==this.j&&Wd(this.j,function(e,n){t(e,n)})},Se.prototype.toString=function(){return this.Wc.toString()},Ve.prototype.add=function(t){this.od.push(t)},Ve.prototype.Rb=function(){return this.Ca};var Ye="auth.firebase.com",$e=["remember","redirectTo"],bf={NETWORK_ERROR:"Unable to contact the Firebase server.",SERVER_ERROR:"An unknown server error occurred.",TRANSPORT_UNAVAILABLE:"There are no login transports available for the requested method.",REQUEST_INTERRUPTED:"The browser redirected the page before the login request could complete.",USER_CANCELLED:"The user cancelled authentication."};mf.prototype.open=function(e,n,i){function r(){i&&(i(V("REQUEST_INTERRUPTED")),i=null)}var o,a=new XMLHttpRequest,s=this.options.method.toUpperCase();if(df(window,"beforeunload",r),a.onreadystatechange=function(){if(i&&4===a.readyState){var t;if(200<=a.status&&300>a.status){try{t=ua(a.responseText)}catch(e){}i(null,t)}else i(500<=a.status&&600>a.status?V("SERVER_ERROR"):V("NETWORK_ERROR"));i=null,ef(window,"beforeunload",r)}},"GET"===s)e+=(/\?/.test(e)?"":"?")+hf(n),o=null;else{var u=this.options.headers.content_type;"application/json"===u&&(o=t(n)),"application/x-www-form-urlencoded"===u&&(o=hf(n))}a.open(s,e,!0),e={"X-Requested-With":"XMLHttpRequest",Accept:"application/json;text/plain"},Ed(e,this.options.headers);for(var h in e)a.setRequestHeader(h,e[h]);a.send(o)},mf.isAvailable=function(){return!!window.XMLHttpRequest&&"string"==typeof(new XMLHttpRequest).responseType&&(!(navigator.userAgent.match(/MSIE/)||navigator.userAgent.match(/Trident/))||lf())},mf.prototype.uc=function(){return"json"},nf.prototype.open=function(t,e,n){function i(){n&&(n(V("USER_CANCELLED")),n=null)}var r,o=this,a=ub(Ye);e.requestId=this.Uc,e.redirectTo=a.scheme+"://"+a.host+"/blank/page.html",t+=/\?/.test(t)?"":"?",t+=hf(e),(r=window.open(t,"_blank","location=no"))&&ha(r.addEventListener)?(r.addEventListener("loadstart",function(t){var e;if(e=t&&t.url)t:{var a=t.url;try{var s=document.createElement("a");s.href=a,e=s.host===ub(Ye).host&&"/blank/page.html"===s.pathname;break t}catch(u){}e=!1}e&&(t=gf(t.url),r.removeEventListener("exit",i),r.close(),t=new Ze(null,null,{requestId:o.Uc,requestKey:t}),o.kf.requestWithCredential("/auth/session",t,n),n=null)}),r.addEventListener("exit",i)):n(V("TRANSPORT_UNAVAILABLE"))},nf.isAvailable=function(){return kf()},nf.prototype.uc=function(){return"redirect"},of.prototype.open=function(e,n,i){function r(t){if(a&&(document.body.removeChild(a),a=void 0),f&&(f=clearInterval(f)),ef(window,"message",o),ef(window,"unload",r),c&&!t)try{c.close()}catch(e){s.postMessage("die",h)}c=s=void 0}function o(t){if(t.origin===h)try{var e=ua(t.data);"ready"===e.a?s.postMessage(l,h):"error"===e.a?(r(!1),i&&(i(e.d),i=null)):"response"===e.a&&(r(e.forceKeepWindowOpen),i&&(i(null,e.d),i=null))}catch(n){}}var a,s,u=lf(),h=ff(e);if(h!==ff(this.options.relay_url))i&&setTimeout(function(){i(Error("invalid arguments: origin of url and relay_url must match"))},0);else{u&&(a=document.createElement("iframe"),a.setAttribute("src",this.options.relay_url),a.style.display="none",a.setAttribute("name","__winchan_relay_frame"),document.body.appendChild(a),s=a.contentWindow),e+=(/\?/.test(e)?"":"?")+hf(n);var c=window.open(e,this.options.window_name,this.options.window_features);s||(s=c);var f=setInterval(function(){c&&c.closed&&(r(!1),i&&(i(V("USER_CANCELLED")),i=null))},500),l=t({a:"request",d:n});df(window,"unload",r),df(window,"message",o)}},of.isAvailable=function(){return"postMessage"in window&&!/^file:\//.test(location.href)&&!(kf()||navigator.userAgent.match(/Windows Phone/)||window.Windows&&/^ms-appx:/.test(location.href)||navigator.userAgent.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i)||navigator.userAgent.match(/CriOS/)||navigator.userAgent.match(/Twitter for iPhone/)||navigator.userAgent.match(/FBAN\/FBIOS/)||window.navigator.standalone)&&!navigator.userAgent.match(/PhantomJS/)},of.prototype.uc=function(){return"popup"},pf.prototype.open=function(t,e,n){function i(){n&&(n(V("REQUEST_INTERRUPTED")),n=null)}function r(){setTimeout(function(){window.__firebase_auth_jsonp[o]=void 0,Bd(window.__firebase_auth_jsonp)&&(window.__firebase_auth_jsonp=void 0);try{var t=document.getElementById(o);t&&t.parentNode.removeChild(t)}catch(e){}},1),ef(window,"beforeunload",i)}var o="fn"+(new Date).getTime()+Math.floor(99999*Math.random());e[this.options.callback_parameter]="__firebase_auth_jsonp."+o,t+=(/\?/.test(t)?"":"?")+hf(e),df(window,"beforeunload",i),window.__firebase_auth_jsonp[o]=function(t){n&&(n(null,t),n=null),r()},qf(o,t,n)},pf.isAvailable=function(){return!kf()},pf.prototype.uc=function(){return"json"},rf.prototype.set=function(t,e){if(!e){if(!this.Pd.length)throw Error("fb.login.SessionManager : No storage options available!");e=this.Pd[0]}e.set(this.Ge,t)},rf.prototype.get=function(){var t=La(this.Pd,q(this.Tf,this)),t=Ka(t,function(t){return null!==t});return Ta(t,function(t,e){return ve(e.token)-ve(t.token)}),0<t.length?t.shift():null},rf.prototype.Tf=function(t){try{var e=t.get(this.Ge);if(e&&e.token)return e}catch(n){}return null},rf.prototype.clear=function(){var t=this;Ja(this.Pd,function(e){e.remove(t.Ge)
})},sf.prototype.open=function(t,e){Ba.set("redirect_request_id",this.Uc),e.requestId=this.Uc,e.redirectTo=e.redirectTo||window.location.href,t+=(/\?/.test(t)?"":"?")+hf(e),window.location=t},sf.isAvailable=function(){return!/^file:\//.test(location.href)&&!kf()},sf.prototype.uc=function(){return"redirect"},na(tf,td),h=tf.prototype,h.ne=function(){return this.jb||null},h.je=function(t,e){Cf(this);var n=af(t);n.lc._method="POST",this.Vc("/users",n,function(t,n){t?B(e,t):B(e,t,n)})},h.Ie=function(t,e){var n=this;Cf(this);var i="/users/"+encodeURIComponent(t.email),r=af(t);r.lc._method="DELETE",this.Vc(i,r,function(t,i){!t&&i&&i.uid&&n.jb&&n.jb.uid&&n.jb.uid===i.uid&&Af(n),B(e,t)})},h.ee=function(t,e){Cf(this);var n="/users/"+encodeURIComponent(t.email)+"/password",i=af(t);i.lc._method="PUT",i.lc.password=t.newPassword,this.Vc(n,i,function(t){B(e,t)})},h.Je=function(t,e){Cf(this);var n="/users/"+encodeURIComponent(t.email)+"/password",i=af(t);i.lc._method="POST",this.Vc(n,i,function(t){B(e,t)})},h.Vc=function(t,e,n){Ff(this,[mf,pf],t,e,n)},h.pe=function(t){return x("auth_status"===t,'initial event must be of type "auth_status"'),[this.jb]};var Kf=new Jf;Jf.prototype.kd=function(t,e,n,i){return(t=X(t))&&t.Y(n)?(t=t.B(n),n=t.ja(i)?[]:i.e()?[new W("child_removed",t,n)]:[new W("child_changed",i,n,t)]):n=i.e()?[]:[new W("child_added",i,n)],0<n.length&&e.u&&n.push(new W("value",X(e))),n},na(Of,Jf),Of.prototype.kd=function(t,e,n,i){var r=X(t)||K,o=X(e)||K;if(r.Ua()<this.bb||o.Ua()<this.bb)return Of.oc.kd.call(this,t,e,n,i);x(!r.P()&&!o.P(),"If it's a leaf node, we should have hit the above case."),t=[];var a=r.B(n);return a.e()?o.Y(n)&&(r=this.Ma?ld(r,this.m):md(r,this.m),t.push(new W("child_removed",r.K,r.name)),t.push(new W("child_added",i,n))):o.Y(n)?i.ja(a)||t.push(new W("child_changed",i,n,r.B(n))):(t.push(new W("child_removed",a,n)),r=this.Ma?ld(o,this.m):md(o,this.m),t.push(new W("child_added",r.K,r.name))),0<t.length&&e.u&&t.push(new W("value",o)),t},h=Pf.prototype,h.Xa=function(t,e,n,i){var r;if(e.type===Qf)return e.source.$e?this.Fa(t,e.path,e.Oa,n,i):(x(e.source.Ze,"Unknown source."),r=e.source.wf,this.Sa(t,e.path,e.Oa,n,i,r));if(e.type===Rf)return e.source.$e?this.ae(t,e.path,e.children,n,i):(x(e.source.Ze,"Unknown source."),r=e.source.wf,this.$d(t,e.path,e.children,n,i,r));if(e.type===Sf){if(e.sf)t:{var o=e.path;if(Tf(this,t),e=t.u,r=t.X,t.F){x(t.u,"Must have event snap if we have server snap");var a=n.Ya(o,t.u,t.F);if(a){if(e=t.u.L(o,a),!o.e()){r=G(o),e=e.B(r),t=this.Ra(t,r,e,t.F,t.o,n,i);break t}e=this.G(e)}}else if(t.o)t.u?(i=n.Ob())?e=this.G(i):(n=n.Ya(o,t.u,t.o))&&(e=this.G(e.L(o,n))):(x(t.X,"We must at least have complete children"),x(!o.e(),"If the path were empty, we would have an event snap from the set"),(n=n.Ya(o,t.X,t.o))&&(r=t.X.L(o,n),r=this.G(r)));else if(t.u)(n=n.Ob())&&(e=this.G(n));else if(t.X){if(x(!o.e(),"If the path was empty, we would have an event snap"),a=G(o),t.X.Y(a)){t=(e=n.Ib.Ob(n.Gb.k(a)))?this.Ra(t,a,e,t.F,t.o,n,i):this.Ra(t,a,K,t.F,t.o,n,null);break t}x(1<Q(o),"Must be a deep set being reverted")}t=new Uf(t.F,t.o,e,r)}else t=this.Ea(t,e.path,n,i);return t}if(e.type===Vf)return e=e.path,Tf(this,t),this.Sa(t,e,(t.ab()||K).da(e),n,i,!1);throw ib("Unknown operation type: "+e.type)},h.Fa=function(t,e,n,i,r){if(Tf(this,t),e.e())return e=this.G(n),new Uf(t.F,t.o,e,null);var o=X(t)||K,a=G(e);return 1===Q(e)||t.u||o.Y(a)?(n=o.B(G(e)).L(R(e),n),this.Ra(t,G(e),n,t.F,t.o,i,r)):t},h.ae=function(t,e,n,i,r){Tf(this,t);var o=this,a=t;return Xf(n,function(n,s){var u=e.k(n);Yf(t,G(u))&&(a=o.Fa(a,u,s,i,r))}),Xf(n,function(n,s){var u=e.k(n);Yf(t,G(u))||(a=o.Fa(a,u,s,i,r))}),a},h.Ea=function(t,e,n,i){var r,o=t.u,a=t.X;if(Tf(this,t),t.F){x(o,"If we have a server snap, we must have an event snap");var s=n.Ya(e,t.u,t.F);if(s){if(!e.e())return r=G(e),e=o.L(e,s).B(r),this.Ra(t,r,e,t.F,t.o,n,i);o=this.G(s)}}else if(t.o)if(o){var u=!1;t.o.ca(L,function(t,e){u||o.B(t).ja(e)||(u=!0),u&&(o=o.I(t,e))}),u&&(o=this.G(o))}else if(a&&(x(0<Q(e),"If it were an empty path, we would have an event snap"),r=G(e),1===Q(e)||a.Y(r))&&(s=n.Ya(e,a,t.o)))return e=a.L(e,s).B(r),this.Ra(t,r,e,t.F,t.o,n,i);return new Uf(t.F,t.o,o,a)},h.Sa=function(t,e,n,i,r,o){var a;Tf(this,t);var s=t.F,u=t.o;if(t.F)s=e.e()?this.G(n,o):this.G(t.F.L(e,n),o);else if(e.e())s=this.G(n,o),u=null;else if(1!==Q(e)||!t.o&&n.e()){if(t.o&&(a=G(e),t.o.Y(a)))var h=t.o.B(a).L(R(e),n),u=this.G(t.o.I(a,h),o)}else u=t.o||this.Ia(K),u=this.G(u.L(e,n),o);if(a=!1,o=t.u,h=t.X,s!==t.F||u!==t.o)if(s&&!o)o=this.G(i.xa(s)),h=null;else if(s&&o&&!n.e()&&s.da(e).ja(o.da(e)))a=!0;else if(n=i.Ya(e,o,s||u)){if(!e.e()){a=G(e),e=R(e);t:{if(o=a,t.u)h=t.u.B(o);else if(t.X)t.X.Y(o)?h=t.X.B(o):(x(e.e(),"According to precondition, this must be true"),h=K);else{if(e.e()){h=n;break t}x(t.F||t.o,"If we do not have event data, we must have server data"),h=(t.F||t.o).B(o)}h=h.e()&&t.ab()?t.ab().B(o).L(e,n):h.L(e,n)}return this.Ra(t,a,h,s,u,i,r)}o=this.G(n),h=null}else a=!0;return x(!a||o===t.u&&h===t.X,"We thought we could skip diffing, but we changed the eventCache."),new Uf(s,u,o,h)},h.$d=function(t,e,n,i,r,o){if(!t.F&&!t.o&&e.e())return t;Tf(this,t);var a=this,s=t;return Xf(n,function(n,u){var h=e.k(n);Yf(t,G(h))&&(s=a.Sa(s,h,u,i,r,o))}),Xf(n,function(n,u){var h=e.k(n);Yf(t,G(h))||(s=a.Sa(s,h,u,i,r,o))}),s},h.Ra=function(t,e,n,i,r){var o=t.u;return t=t.X,o?o=this.G(o.I(e,n)):(t||(t=this.Ia(K)),t=this.G(t.I(e,n))),new Uf(i,r,o,t)},h.G=function(t){return this.Ia(t)},na(Zf,Pf),Zf.prototype.Ia=function(t){return t.Wd(this.index)},Zf.prototype.Yb=function(t){return t.Yb(this.index)},Zf.prototype.G=function(t,e){if(!1===e)return Zf.oc.G.call(this,t,!1);if(t.P())return this.Ia(K);for(var n=this.Ia(t),i=this.Fb,r=this.pb,o=H(this.index),a=n.Aa(this.index),s=U(a);s&&0<o(i,s);)n=n.I(s.name,K),s=U(a);for(a=n.rb(r,this.index),(s=U(a))&&0>=o(s,r)&&(s=U(a));s;)n=n.I(s.name,K),s=U(a);return n},Zf.prototype.Fa=function(t,e,n,i,r){if(Tf(this,t),1<Q(e)){var o=G(e);if((null!==X(t)?X(t):K).Y(o))return Zf.oc.Fa.call(this,t,e,n,i,r);var a=null!==r?r:t.ab(),a=null!==a&&a.Y(o)?a.B(o):null,a=i.k(o).xa(a);return null!==a?(e=a.L(R(e),n),this.Ra(t,o,e,t.F,t.o,i,r)):t}return Zf.oc.Fa.call(this,t,e,n,i,r)},na($f,Zf),$f.prototype.G=function(t,e){if(!1===e)return $f.oc.G.call(this,t,!1);if(t.P())return this.Ia(K);var n,i,r,o,a=this.Ia(t);if(2*this.bb<t.Ua())for(n=this.Ia(K.ib(t.O())),a=this.Ma?a.Sb(this.pb,this.index):a.rb(this.Fb,this.index),i=U(a),r=0;i&&r<this.bb&&(o=this.Ma?0>=H(this.index)(this.Fb,i):0>=H(this.index)(i,this.pb));)n=n.I(i.name,i.K),r++,i=U(a);else{n=this.Ia(t);var s,u,h=H(this.index);if(this.Ma){a=a.bf(this.index),s=this.pb,u=this.Fb;var c=h,h=function(t,e){return-1*c(t,e)}}else a=a.Aa(this.index),s=this.Fb,u=this.pb;r=0;var f=!1;for(i=U(a);i;)!f&&0>=h(s,i)&&(f=!0),(o=f&&r<this.bb&&0>=h(i,u))?r++:n=n.I(i.name,K),i=U(a)}return n},$f.prototype.Ra=function(t,e,n,i,r,o,a){var s=X(t);return!s||s.Ua()<this.bb?$f.oc.Ra.call(this,t,e,n,i,r,o,a):(e=ag(this,t,e,n,o,a||i))?t.u?new Uf(i,r,e,null):new Uf(i,r,null,e):new Uf(i,r,t.u,t.X)},na(bg,Pf),bg.prototype.Ia=function(t){return t.Wd(this.m)},bg.prototype.Yb=function(t){return t.Yb(this.m)},cg.prototype.Lf=function(t,e){if(null==t.nb||null==e.nb)throw ib("Should only compare child_ events.");return this.m.compare(new I(t.nb,t.Wa),new I(e.nb,e.Wa))},h=gg.prototype,h.ab=function(){return this.ha.ab()},h.za=function(t){var e=this.ha.za();return e&&(wc(this.U.w)||!t.e()&&!e.B(G(t)).e())?e.da(t):null},h.e=function(){return 0===this.ya.length},h.Jb=function(t){this.ya.push(t)},h.hb=function(t,e){var n=[];if(e){x(null==t,"A cancel should cancel all event registrations.");var i=this.U.path;Ja(this.ya,function(t){(t=t.Te(e,i))&&n.push(t)})}if(t){for(var r=[],o=0;o<this.ya.length;++o){var a=this.ya[o];if(a.matches(t)){if(t.cf()){r=r.concat(this.ya.slice(o+1));break}}else r.push(a)}this.ya=r}else this.ya=[];return n},h.Xa=function(t,e,n){t.type===Rf&&null!==t.source.fc&&(x(this.ha.za(),"We should always have a full cache before handling merges"),x(!!this.ha.u,"Missing event cache, even though we have a server cache"));var i=this.ha;return e=this.ec.Xa(i,t,e,n),Tf(this.ec,e),this.ha=e,X(e)!==X(i)?(t=Lf(this.ld,i,e,t.path),i=X(e),dg(this.le,t,i,this.ya)):e.u&&!i.u?(x(X(e)===X(i),"Caches should be the same."),i=X(e),dg(this.le,[new W("value",i)],i,this.ya)):[]},Uf.prototype.ab=function(){return this.F||this.o},Uf.prototype.za=function(){return this.F};var ig=new Uf(null,null,null,null),kg=new Lc(function(t,e){return t===e?0:e>t?-1:1}),lg=new jg(null);h=jg.prototype,h.e=function(){return null===this.value&&this.children.e()},h.subtree=function(t){if(t.e())return this;var e=this.children.get(G(t));return null!==e?e.subtree(R(t)):lg},h.set=function(t,e){if(t.e())return new jg(e,this.children);var n=G(t),i=(this.children.get(n)||lg).set(R(t),e),n=this.children.Ja(n,i);return new jg(this.value,n)},h.remove=function(t){if(t.e())return this.children.e()?lg:new jg(null,this.children);var e=G(t),n=this.children.get(e);return n?(t=n.remove(R(t)),e=t.e()?this.children.remove(e):this.children.Ja(e,t),null===this.value&&e.e()?lg:new jg(this.value,e)):this},h.get=function(t){if(t.e())return this.value;var e=this.children.get(G(t));return e?e.get(R(t)):null},h=yg.prototype,h.e=function(){return Bd(this.qa)},h.Xa=function(t,e,n){var i=t.source.fc;if(null!==i)return i=v(this.qa,i),x(null!=i,"SyncTree gave us an op for an invalid query."),i.Xa(t,e,n);var r=[];return A(this.qa,function(i){r=r.concat(i.Xa(t,e,n))}),r},h.Jb=function(t,e,n,i,r){var o=t.Da(),a=v(this.qa,o);return a||(n=(a=n.xa(i))?null:n.ce(r),i=new Uf(i,r,a,n),a=new gg(t,i),this.qa[o]=a),a.Jb(e),t=a,(o=X(t.ha))?(i=Lf(t.ld,ig,t.ha,S),e=dg(t.le,i,o,e?[e]:t.ya)):e=[],e},h.hb=function(t,e,n){var i=t.Da(),r=[],o=[],a=null!=zg(this);if("default"===i){var s=this;A(this.qa,function(t,i){o=o.concat(t.hb(e,n)),t.e()&&(delete s.qa[i],wc(t.U.w)||r.push(t.U))})}else{var u=v(this.qa,i);u&&(o=o.concat(u.hb(e,n)),u.e()&&(delete this.qa[i],wc(u.U.w)||r.push(u.U)))}return a&&null==zg(this)&&r.push(new O(t.g,t.path)),{mg:r,Pf:o}},h.za=function(t){var e=null;return A(this.qa,function(n){e=e||n.za(t)}),e},h=Cg.prototype,h.Ob=function(t){var e=og(this.V,t);if(e){var n=e.value;return t=T(e.path,t),n.da(t)}return null},h.xa=function(t,e,n,i){var r,o;return n||i?(r=this.V.subtree(t),!i&&r.e()?e:i||null!==e||null!==r.value?(r=Gg(this.ra,function(e){return!(!e.visible&&!i||n&&0<=Ia(n,e.Xd)||!e.path.contains(t)&&!t.contains(e.path))},t),o=e||K,Xf(r,function(t,e){o=o.L(t,e)}),o):null):(r=og(this.V,t))?(e=T(r.path,t),r.value.da(e)):(r=this.V.subtree(t),r.e()?e:e||r.value?(o=e||K,Xf(r,function(t,e){o=o.L(t,e)}),o):null)},h.ce=function(t,e){var n=!1,i=K,r=this.Ob(t);return r?(r.P()||r.ca(L,function(t,e){i=i.I(t,e)}),i):e?(i=e,xg(this.V.subtree(t),function(t,e){i=i.I(t,e)}),i):(xg(this.V.subtree(t),function(t,e){n=!0,i=i.I(t,e)}),n?i:null)},h.Ya=function(t,e,n,i){if(x(n||i,"Either existingEventSnap or existingServerSnap must exist"),t=t.k(e),og(this.V,t))return null;if(t=this.V.subtree(t),t.e())return i.da(e);var r=i.da(e);return Xf(t,function(t,e){r=r.L(t,e)}),r},h.de=function(t,e,n,i,r,o){var a;if(t=this.V.subtree(t),t.value?a=t.value:e&&(a=e,Xf(t,function(t,e){a=a.L(t,e)})),a){for(e=[],a=a.Wd(o),t=H(o),r=r?a.Sb(n,o):a.rb(n,o),o=U(r);o&&e.length<i;)0!==t(o,n)&&e.push(o),o=U(r);return e}return[]},h=Kg.prototype,h.Ob=function(){return this.Ib.Ob(this.Gb)},h.xa=function(t,e,n){return this.Ib.xa(this.Gb,t,e,n)},h.ce=function(t){return this.Ib.ce(this.Gb,t)},h.Ya=function(t,e,n){return this.Ib.Ya(this.Gb,t,e,n)},h.de=function(t,e,n,i,r){return this.Ib.de(this.Gb,t,e,n,i,r)},h.k=function(t){return new Kg(this.Gb.k(t),this.Ib)},Lg.prototype.Mc=function(t){return this.path.e()?new Lg(this.source,S,this.Oa.B(t)):new Lg(this.source,R(this.path),this.Oa)},Mg.prototype.Mc=function(){return this.path.e()?this:new Mg(R(this.path),this.sf)},Og.prototype.Mc=function(){return this.path.e()?new Og(this.source,S):new Og(this.source,R(this.path))},Pg.prototype.Mc=function(t){return this.path.e()?(t=this.children.subtree(new P(t)),t.e()?null:t.value?new Lg(this.source,S,t.value):new Pg(this.source,S,t)):(x(G(this.path)===t,"Can't get a merge for a child not on the path of the operation"),new Pg(this.source,R(this.path),this.children))};var Qf=0,Rf=1,Sf=2,Vf=3,Ng=new Qg(!0,!1,null,!1),Rg=new Qg(!1,!0,null,!1);h=Sg.prototype,h.Fa=function(t,e,i,r){var o=this.Bb,a=r;return x(i>o.Ec,"Stacking an older write on top of newer ones"),n(a)||(a=!0),o.ra.push({path:t,Oa:e,Xd:i,visible:a}),a&&(o.V=Ig(o.V,t,e)),o.Ec=i,r?Tg(this,new Lg(Ng,t,e)):[]},h.ae=function(t,e,n){var i=this.Bb;return x(n>i.Ec,"Stacking an older merge on top of newer ones"),i.ra.push({path:t,children:e,Xd:n,visible:!0}),i.V=Jg(i.V,t,e),i.Ec=n,e=mg(e),Tg(this,new Pg(Ng,t,e))},h.Ea=function(t,e){e=e||!1;var n=Dg(this.Bb,t);return null==n?[]:Tg(this,new Mg(n,e))},h.Sa=function(t,e){return Tg(this,new Lg(Rg,t,e))},h.$d=function(t,e){var n=mg(e);return Tg(this,new Pg(Rg,t,n))},h.Jb=function(t,e){var n=t.path,i=null,r=!1;ug(this.ma,n,function(t,e){var o=T(t,n);return i=e.za(o),r=r||null!=zg(e),!i});var o=this.ma.get(n);o?(r=r||null!=zg(o),i=i||o.za(S)):(o=new yg,this.ma=this.ma.set(n,o));var a=null;if(!i){var s=!1,a=K;xg(this.ma.subtree(n),function(t,e){var n=e.za(S);n&&(s=!0,a=a.I(t,n))}),s||(a=null)}var u=null!=Bg(o,t);if(!u&&!wc(t.w)){var h=Yg(t);x(!(h in this.gc),"View does not exist, but we have a tag");var c=Zg++;this.gc[h]=c,this.Zc["_"+c]=h}return h=o.Jb(t,e,new Kg(n,this.Bb),i,a),u||r||(o=Bg(o,t),h=h.concat($g(this,t,o))),h},h.hb=function(t,e,n){var i=t.path,r=this.ma.get(i),o=[];if(r&&("default"===t.Da()||null!=Bg(r,t))){o=r.hb(t,e,n),r.e()&&(this.ma=this.ma.remove(i)),r=o.mg,o=o.Pf,e=-1!==Pa(r,function(t){return wc(t.w)});var a=sg(this.ma,i,function(t,e){return null!=zg(e)});if(e&&!a&&(i=this.ma.subtree(i),!i.e()))for(var i=ah(i),s=0;s<i.length;++s){var u=i[s],h=u.U,u=bh(this,u);this.Fc.Le(h,ch(this,h),u.qd,u.H)}if(!a&&0<r.length&&!n)if(e)this.Fc.Od(t,null);else{var c=this;Ja(r,function(t){t.Da();var e=c.gc[Yg(t)];c.Fc.Od(t,e)})}dh(this,r)}return o},h.xa=function(t,e){var n=this.Bb,i=sg(this.ma,t,function(e,n){var i=T(e,t);return(i=n.za(i))?i:void 0});return n.xa(t,i,e,!0)};var Zg=1;h=gh.prototype,h.toString=function(){return(this.Q.Cb?"https://":"http://")+this.Q.host},h.name=function(){return this.Q.yb},h.Cd=function(t,e,n,i){this.jd++;var r=new P(t);e=this.re?this.re(t,e):e,t=[],i?n?(e=fd(e,function(t){return J(t)}),t=Xg(this.M,r,e,i)):(e=J(e),t=Ug(this.M,r,e,i)):n?(i=fd(e,function(t){return J(t)}),t=this.M.$d(r,i)):(i=J(e),t=this.M.Sa(r,i)),i=r,0<t.length&&(i=kh(this,r)),Xe(this.Z,i,t)},h.Ad=function(t){hh(this,"connected",t),!1===t&&lh(this)},h.Ee=function(t){var e=this;Cb(t,function(t,n){hh(e,n,t)})},h.Be=function(t){hh(this,"authenticated",t)},h.Db=function(t,e,n,i){this.f("set",{path:t.toString(),value:e,Cg:n});var r=jh(this);e=J(e,n);var r=If(e,r),o=this.zd++,r=this.M.Fa(t,r,o,!0);Ue(this.Z,r);var a=this;this.S.put(t.toString(),e.N(!0),function(e,n){var r="ok"===e;r||z("set at "+t+" failed: "+e),r=a.M.Ea(o,!r),Xe(a.Z,t,r),mh(i,e,n)}),r=nh(this,t),kh(this,r),Xe(this.Z,r,[])},h.update=function(t,e,n){this.f("update",{path:t.toString(),value:e});var i=!0,r=jh(this),o={};if(A(e,function(t,e){i=!1;var n=J(t);o[e]=If(n,r)}),i)kb("update() called with empty data.  Don't do anything."),mh(n,"ok");else{var a=this.zd++,s=this.M.ae(t,o,a);Ue(this.Z,s);var u=this;Ke(this.S,t.toString(),e,function(e,i){x("ok"===e||"permission_denied"===e,"merge at "+t+" failed.");var r="ok"===e;r||z("update at "+t+" failed: "+e);var r=u.M.Ea(a,!r),o=t;0<r.length&&(o=kh(u,t)),Xe(u.Z,o,r),mh(n,e,i)}),e=nh(this,t),kh(this,e),Xe(this.Z,t,[])}},h.Ce=function(t,e){var n=this;this.S.Ce(t.toString(),function(i,r){"ok"===i&&Qe(n.ea,t),mh(e,i,r)})},h.tb=function(){this.S.tb()},h.kc=function(){this.S.kc()},h.Me=function(t){if("undefined"!=typeof console){t?(this.Nd||(this.Nd=new Hd(this.Qa)),t=this.Nd.get()):t=this.Qa.get();var e,n=Ma(yd(t),function(t,e){return Math.max(e.length,t)},0);for(e in t){for(var i=t[e],r=e.length;n+2>r;r++)e+=" ";console.log(e+i)}}},h.Ne=function(t){Gd(this.Qa,t),this.ug.uf[t]=!0},h.f=function(){kb("r:"+this.S.id+":",arguments)},ca(Ah),Ah.prototype.tb=function(){for(var t in this.jc)this.jc[t].tb()},Ah.prototype.interrupt=Ah.prototype.tb,Ah.prototype.kc=function(){for(var t in this.jc)this.jc[t].kc()},Ah.prototype.resume=Ah.prototype.kc,Bh.prototype.cc=function(t){var e,n=this;try{e=ua(t.data)}catch(i){}e&&"request"===e.a&&(ef(window,"message",this.cc),this.Qd=t.origin,this.tc&&setTimeout(function(){n.tc(n.Qd,e.d,function(t,e){n.If=!e,n.tc=void 0,Ch(n,{a:"response",d:t,forceKeepWindowOpen:e})})},0))},Bh.prototype.eg=function(){try{ef(this.sd,"message",this.hf)}catch(t){}this.tc&&(Ch(this,{a:"error",d:"unknown closed window"}),this.tc=void 0);try{window.close()}catch(e){}},Bh.prototype.hf=function(t){if(this.If&&"die"===t.data)try{window.close()}catch(e){}};var Y={Rf:function(){Yd=Pd=!0}};Y.forceLongPolling=Y.Rf,Y.Sf=function(){Zd=!0},Y.forceWebSockets=Y.Sf,Y.rg=function(t,e){t.g.S.Ke=e},Y.setSecurityDebugCallback=Y.rg,Y.Me=function(t,e){t.g.Me(e)},Y.stats=Y.Me,Y.Ne=function(t,e){t.g.Ne(e)},Y.statsIncrementCounter=Y.Ne,Y.jd=function(t){return t.g.jd},Y.dataUpdateCount=Y.jd,Y.Vf=function(t,e){t.g.re=e},Y.interceptServerData=Y.Vf,Y.bg=function(t){new Bh(t)},Y.onPopupOpen=Y.bg,Y.pg=function(t){Ye=t},Y.setAuthenticationServer=Y.pg,Z.prototype.cancel=function(t){D("Firebase.onDisconnect().cancel",0,1,arguments.length),F("Firebase.onDisconnect().cancel",1,t,!0),this.Sc.Ce(this.Ca,t||null)},Z.prototype.cancel=Z.prototype.cancel,Z.prototype.remove=function(t){D("Firebase.onDisconnect().remove",0,1,arguments.length),$b("Firebase.onDisconnect().remove",this.Ca),F("Firebase.onDisconnect().remove",1,t,!0),oh(this.Sc,this.Ca,null,t)},Z.prototype.remove=Z.prototype.remove,Z.prototype.set=function(t,e){D("Firebase.onDisconnect().set",1,2,arguments.length),$b("Firebase.onDisconnect().set",this.Ca),Sb("Firebase.onDisconnect().set",t,!1),F("Firebase.onDisconnect().set",2,e,!0),oh(this.Sc,this.Ca,t,e)},Z.prototype.set=Z.prototype.set,Z.prototype.Db=function(t,e,n){D("Firebase.onDisconnect().setWithPriority",2,3,arguments.length),$b("Firebase.onDisconnect().setWithPriority",this.Ca),Sb("Firebase.onDisconnect().setWithPriority",t,!1),Wb("Firebase.onDisconnect().setWithPriority",2,e),F("Firebase.onDisconnect().setWithPriority",3,n,!0),ph(this.Sc,this.Ca,t,e,n)},Z.prototype.setWithPriority=Z.prototype.Db,Z.prototype.update=function(t,e){if(D("Firebase.onDisconnect().update",1,2,arguments.length),$b("Firebase.onDisconnect().update",this.Ca),ea(t)){for(var n={},i=0;i<t.length;++i)n[""+i]=t[i];t=n,z("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Vb("Firebase.onDisconnect().update",t),F("Firebase.onDisconnect().update",2,e,!0),qh(this.Sc,this.Ca,t,e)},Z.prototype.update=Z.prototype.update;var $={};$.rc=xe,$.DataConnection=$.rc,xe.prototype.tg=function(t,e){this.wa("q",{p:t},e)},$.rc.prototype.simpleListen=$.rc.prototype.tg,xe.prototype.Nf=function(t,e){this.wa("echo",{d:t},e)},$.rc.prototype.echo=$.rc.prototype.Nf,xe.prototype.interrupt=xe.prototype.tb,$.zf=ie,$.RealTimeConnection=$.zf,ie.prototype.sendRequest=ie.prototype.wa,ie.prototype.close=ie.prototype.close,$.Uf=function(t){var e=xe.prototype.put;return xe.prototype.put=function(i,r,o,a){n(a)&&(a=t()),e.call(this,i,r,o,a)},function(){xe.prototype.put=e}},$.hijackHash=$.Uf,$.yf=Ca,$.ConnectionTarget=$.yf,$.Da=function(t){return t.Da()},$.queryIdentifier=$.Da,$.Wf=function(t){return t.g.S.ua},$.listens=$.Wf;var Dh=function(){var t=0,e=[];return function(n){var i=n===t;t=n;for(var r=Array(8),o=7;o>=0;o--)r[o]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(n%64),n=Math.floor(n/64);if(x(0===n,"Cannot push at time == 0"),n=r.join(""),i){for(o=11;o>=0&&63===e[o];o--)e[o]=0;e[o]++}else for(o=0;12>o;o++)e[o]=Math.floor(64*Math.random());for(o=0;12>o;o++)n+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(e[o]);return x(20===n.length,"NextPushId: Length should be 20."),n}}();na(O,M);var Eh=O,Fh=["Firebase"],Gh=aa;Fh[0]in Gh||!Gh.execScript||Gh.execScript("var "+Fh[0]);for(var Hh;Fh.length&&(Hh=Fh.shift());)!Fh.length&&n(Eh)?Gh[Hh]=Eh:Gh=Gh[Hh]?Gh[Hh]:Gh[Hh]={};O.prototype.name=function(){return z("Firebase.name() being deprecated. Please use Firebase.key() instead."),D("Firebase.name",0,0,arguments.length),this.key()},O.prototype.name=O.prototype.name,O.prototype.key=function(){D("Firebase.key",0,0,arguments.length);var t;return this.path.e()?t=null:(t=this.path,t=t.aa<t.n.length?t.n[t.n.length-1]:null),t},O.prototype.key=O.prototype.key,O.prototype.k=function(t){if(D("Firebase.child",1,1,arguments.length),ga(t))t=String(t);else if(!(t instanceof P))if(null===G(this.path)){var e=t;e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),Zb("Firebase.child",e)}else Zb("Firebase.child",t);return new O(this.g,this.path.k(t))},O.prototype.child=O.prototype.k,O.prototype.parent=function(){D("Firebase.parent",0,0,arguments.length);var t=this.path.parent();return null===t?null:new O(this.g,t)},O.prototype.parent=O.prototype.parent,O.prototype.root=function(){D("Firebase.ref",0,0,arguments.length);for(var t=this;null!==t.parent();)t=t.parent();return t},O.prototype.root=O.prototype.root,O.prototype.toString=function(){D("Firebase.toString",0,0,arguments.length);var t;if(null===this.parent())t=this.g.toString();else{t=this.parent().toString()+"/";var e=this.key();t+=encodeURIComponent(String(e))}return t},O.prototype.toString=O.prototype.toString,O.prototype.set=function(t,e){D("Firebase.set",1,2,arguments.length),$b("Firebase.set",this.path),Sb("Firebase.set",t,!1),F("Firebase.set",2,e,!0),this.g.Db(this.path,t,null,e||null)},O.prototype.set=O.prototype.set,O.prototype.update=function(t,e){if(D("Firebase.update",1,2,arguments.length),$b("Firebase.update",this.path),ea(t)){for(var n={},i=0;i<t.length;++i)n[""+i]=t[i];t=n,z("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}if(Vb("Firebase.update",t),F("Firebase.update",2,e,!0),u(t,".priority"))throw Error("update() does not currently support updating .priority.");this.g.update(this.path,t,e||null)},O.prototype.update=O.prototype.update,O.prototype.Db=function(t,e,n){if(D("Firebase.setWithPriority",2,3,arguments.length),$b("Firebase.setWithPriority",this.path),Sb("Firebase.setWithPriority",t,!1),Wb("Firebase.setWithPriority",2,e),F("Firebase.setWithPriority",3,n,!0),".length"===this.key()||".keys"===this.key())throw"Firebase.setWithPriority failed: "+this.key()+" is a read-only object.";this.g.Db(this.path,t,e,n||null)},O.prototype.setWithPriority=O.prototype.Db,O.prototype.remove=function(t){D("Firebase.remove",0,1,arguments.length),$b("Firebase.remove",this.path),F("Firebase.remove",1,t,!0),this.set(null,t)},O.prototype.remove=O.prototype.remove,O.prototype.transaction=function(t,e,i){if(D("Firebase.transaction",1,3,arguments.length),$b("Firebase.transaction",this.path),F("Firebase.transaction",1,t,!1),F("Firebase.transaction",2,e,!0),n(i)&&"boolean"!=typeof i)throw Error(E("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.key()||".keys"===this.key())throw"Firebase.transaction failed: "+this.key()+" is a read-only object.";"undefined"==typeof i&&(i=!0),rh(this.g,this.path,t,e||null,i)},O.prototype.transaction=O.prototype.transaction,O.prototype.qg=function(t,e){D("Firebase.setPriority",1,2,arguments.length),$b("Firebase.setPriority",this.path),Wb("Firebase.setPriority",1,t),F("Firebase.setPriority",2,e,!0),this.g.Db(this.path.k(".priority"),t,null,e)},O.prototype.setPriority=O.prototype.qg,O.prototype.push=function(t,e){D("Firebase.push",0,2,arguments.length),$b("Firebase.push",this.path),Sb("Firebase.push",t,!0),F("Firebase.push",2,e,!0);var n=ih(this.g),n=Dh(n),n=this.k(n);return"undefined"!=typeof t&&null!==t&&n.set(t,e),n},O.prototype.push=O.prototype.push,O.prototype.fb=function(){return $b("Firebase.onDisconnect",this.path),new Z(this.g,this.path)},O.prototype.onDisconnect=O.prototype.fb,O.prototype.T=function(t,e,n){z("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead."),D("Firebase.auth",1,3,arguments.length),ac("Firebase.auth",t),F("Firebase.auth",2,e,!0),F("Firebase.auth",3,e,!0),zf(this.g.T,t,{},{remember:"none"},e,n)},O.prototype.auth=O.prototype.T,O.prototype.Pe=function(t){D("Firebase.unauth",0,1,arguments.length),F("Firebase.unauth",1,t,!0),Af(this.g.T,t)},O.prototype.unauth=O.prototype.Pe,O.prototype.ne=function(){return D("Firebase.getAuth",0,0,arguments.length),this.g.T.ne()},O.prototype.getAuth=O.prototype.ne,O.prototype.ag=function(t,e){D("Firebase.onAuth",1,2,arguments.length),F("Firebase.onAuth",1,t,!1),Nb("Firebase.onAuth",2,e),this.g.T.zb("auth_status",t,e)},O.prototype.onAuth=O.prototype.ag,O.prototype.Zf=function(t,e){D("Firebase.offAuth",1,2,arguments.length),F("Firebase.offAuth",1,t,!1),Nb("Firebase.offAuth",2,e),this.g.T.bc("auth_status",t,e)},O.prototype.offAuth=O.prototype.Zf,O.prototype.Df=function(t,e,n){D("Firebase.authWithCustomToken",2,3,arguments.length),ac("Firebase.authWithCustomToken",t),F("Firebase.authWithCustomToken",2,e,!1),cc("Firebase.authWithCustomToken",3,n,!0),zf(this.g.T,t,{},n||{},e)},O.prototype.authWithCustomToken=O.prototype.Df,O.prototype.Ef=function(t,e,n){D("Firebase.authWithOAuthPopup",2,3,arguments.length),bc("Firebase.authWithOAuthPopup",1,t),F("Firebase.authWithOAuthPopup",2,e,!1),cc("Firebase.authWithOAuthPopup",3,n,!0),Ef(this.g.T,t,n,e)},O.prototype.authWithOAuthPopup=O.prototype.Ef,O.prototype.Ff=function(t,e,n){D("Firebase.authWithOAuthRedirect",2,3,arguments.length),bc("Firebase.authWithOAuthRedirect",1,t),F("Firebase.authWithOAuthRedirect",2,e,!1),cc("Firebase.authWithOAuthRedirect",3,n,!0);var i=this.g.T;Cf(i);var r=[sf],o=af(n);"anonymous"===t||"firebase"===t?B(e,V("TRANSPORT_UNAVAILABLE")):(Ba.set("redirect_client_options",o.ed),Df(i,r,"/auth/"+t,o,e))},O.prototype.authWithOAuthRedirect=O.prototype.Ff,O.prototype.Gf=function(t,e,n,i){D("Firebase.authWithOAuthToken",3,4,arguments.length),bc("Firebase.authWithOAuthToken",1,t),F("Firebase.authWithOAuthToken",3,n,!1),cc("Firebase.authWithOAuthToken",4,i,!0),p(e)?(bc("Firebase.authWithOAuthToken",2,e),Bf(this.g.T,t+"/token",{access_token:e},i,n)):(cc("Firebase.authWithOAuthToken",2,e,!1),Bf(this.g.T,t+"/token",e,i,n))},O.prototype.authWithOAuthToken=O.prototype.Gf,O.prototype.Cf=function(t,e){D("Firebase.authAnonymously",1,2,arguments.length),F("Firebase.authAnonymously",1,t,!1),cc("Firebase.authAnonymously",2,e,!0),Bf(this.g.T,"anonymous",{},e,t)},O.prototype.authAnonymously=O.prototype.Cf,O.prototype.Hf=function(t,e,n){D("Firebase.authWithPassword",2,3,arguments.length),cc("Firebase.authWithPassword",1,t,!1),dc("Firebase.authWithPassword",t,"email"),dc("Firebase.authWithPassword",t,"password"),F("Firebase.authAnonymously",2,e,!1),cc("Firebase.authAnonymously",3,n,!0),Bf(this.g.T,"password",t,n,e)},O.prototype.authWithPassword=O.prototype.Hf,O.prototype.je=function(t,e){D("Firebase.createUser",2,2,arguments.length),cc("Firebase.createUser",1,t,!1),dc("Firebase.createUser",t,"email"),dc("Firebase.createUser",t,"password"),F("Firebase.createUser",2,e,!1),this.g.T.je(t,e)},O.prototype.createUser=O.prototype.je,O.prototype.Ie=function(t,e){D("Firebase.removeUser",2,2,arguments.length),cc("Firebase.removeUser",1,t,!1),dc("Firebase.removeUser",t,"email"),dc("Firebase.removeUser",t,"password"),F("Firebase.removeUser",2,e,!1),this.g.T.Ie(t,e)},O.prototype.removeUser=O.prototype.Ie,O.prototype.ee=function(t,e){D("Firebase.changePassword",2,2,arguments.length),cc("Firebase.changePassword",1,t,!1),dc("Firebase.changePassword",t,"email"),dc("Firebase.changePassword",t,"oldPassword"),dc("Firebase.changePassword",t,"newPassword"),F("Firebase.changePassword",2,e,!1),this.g.T.ee(t,e)},O.prototype.changePassword=O.prototype.ee,O.prototype.Je=function(t,e){D("Firebase.resetPassword",2,2,arguments.length),cc("Firebase.resetPassword",1,t,!1),dc("Firebase.resetPassword",t,"email"),F("Firebase.resetPassword",2,e,!1),this.g.T.Je(t,e)},O.prototype.resetPassword=O.prototype.Je,O.goOffline=function(){D("Firebase.goOffline",0,0,arguments.length),Ah.Qb().tb()},O.goOnline=function(){D("Firebase.goOnline",0,0,arguments.length),Ah.Qb().kc()},O.enableLogging=qb,O.ServerValue={TIMESTAMP:{".sv":"timestamp"}},O.SDK_VERSION="2.0.6",O.INTERNAL=Y,O.Context=Ah,O.TEST_ACCESS=$}();