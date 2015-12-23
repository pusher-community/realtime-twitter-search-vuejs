/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _appComponent = __webpack_require__(3);

	var _appComponent2 = _interopRequireDefault(_appComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	new _vue2.default({
	  el: '#app',
	  components: {
	    'app-component': _appComponent2.default
	  }
	});
	// Vue.config.debug = true;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * Vue.js v1.0.11
	 * (c) 2015 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([a-z\d])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind$1(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a non-enumerable property
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	var isIE9 = inBrowser && navigator.userAgent.toLowerCase().indexOf('msie 9.0') > 0;

	var isAndroid = inBrowser && navigator.userAgent.toLowerCase().indexOf('android') > 0;

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    timerFunc = setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var entry = {
	    key: key,
	    value: value
	  };
	  this._keymap[key] = entry;
	  if (this.tail) {
	    this.tail.newer = entry;
	    entry.older = this.tail;
	  } else {
	    this.head = entry;
	  }
	  this.tail = entry;
	  if (this.size === this.limit) {
	    return this.shift();
	  } else {
	    this.size++;
	  }
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Object}
	 */

	function parseDirective(s) {

	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};

	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }

	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '(.+?)' + unsafeClose + '|' + open + '(.+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  text = text.replace(/\n/g, '');
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @return {String}
	 */

	function tokensToExp(tokens) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Boolean} single
	 * @return {String}
	 */

	function formatToken(token, single) {
	  return token.tag ? inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE$1 = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE$1.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	/**
	 * Replace all interpolation tags in a piece of text.
	 *
	 * @param {String} text
	 * @return {String}
	 */

	function removeTags(text) {
	  return text.replace(tagRE, '');
	}

	var text$1 = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp,
	  removeTags: removeTags
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether or not to handle fully object properties which
	   * are already backed by getters and seters. Depending on
	   * use case and environment, this might introduce non-neglible
	   * performance penalties.
	   */
	  convertAllProperties: false,

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';
	    warn = function (msg, e) {
	      if (hasConsole && (!config.silent || config.debug)) {
	        console.warn('[Vue warn]: ' + msg);
	        /* istanbul ignore if */
	        if (config.debug) {
	          if (e) {
	            throw e;
	          } else {
	            console.warn(new Error('Warning Stack Trace').stack);
	          }
	        }
	      }
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  var doc = document.documentElement;
	  var parent = node && node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */

	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function on$1(el, event, cb) {
	  el.addEventListener(event, cb);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && el.hasOwnProperty('className')) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && el.content instanceof DocumentFragment) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail textNodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  trim(node, node.firstChild);
	  trim(node, node.lastChild);
	}

	function trim(parent, node) {
	  if (node && node.nodeType === 3 && !node.data.trim()) {
	    parent.removeChild(node);
	  }
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__vue_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/;

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && tag !== 'component') {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        if (tag.indexOf('-') > -1 || /HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        !/^(data|time|rtc|rb)$/.test(tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly?');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @return {Object|undefined}
	 */

	function getIsBinding(el) {
	  // dynamic syntax
	  var exp = getAttr(el, 'is');
	  if (exp != null) {
	    return { id: exp };
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  var key = prop.path;
	  vm[key] = vm._data[key] = assertProp(prop, value) ? value : undefined;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 */

	function assertProp(prop, value) {
	  // if a prop is not provided and is not required,
	  // skip the check.
	  if (prop.raw === null && !prop.required) {
	    return true;
	  }
	  var options = prop.options;
	  var type = options.type;
	  var valid = true;
	  var expectedType;
	  if (type) {
	    if (type === String) {
	      expectedType = 'string';
	      valid = typeof value === expectedType;
	    } else if (type === Number) {
	      expectedType = 'number';
	      valid = typeof value === 'number';
	    } else if (type === Boolean) {
	      expectedType = 'boolean';
	      valid = typeof value === 'boolean';
	    } else if (type === Function) {
	      expectedType = 'function';
	      valid = typeof value === 'function';
	    } else if (type === Object) {
	      expectedType = 'object';
	      valid = isPlainObject(value);
	    } else if (type === Array) {
	      expectedType = 'array';
	      valid = isArray(value);
	    } else {
	      valid = value instanceof type;
	    }
	  }
	  if (!valid) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid prop: type check failed for ' + prop.path + '="' + prop.raw + '".' + ' Expected ' + formatType(expectedType) + ', got ' + formatValue(value) + '.');
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator.call(null, value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for ' + prop.path + '="' + prop.raw + '"');
	      return false;
	    }
	  }
	  return true;
	}

	function formatType(val) {
	  return val ? val.charAt(0).toUpperCase() + val.slice(1) : 'custom type';
	}

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * 0.11 deprecation warning
	 */

	strats.paramAttributes = function () {
	  /* istanbul ignore next */
	  process.env.NODE_ENV !== 'production' && warn('"paramAttributes" option has been deprecated in 0.12. ' + 'Use "props" instead.');
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var def;
	    var ids = Object.keys(components);
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  var options = {};
	  var key;
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id) {
	  var assets = options[type];
	  var camelizedId;
	  return assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	}

	/**
	 * Assert asset exists
	 */

	function assertAsset(val, type, id) {
	  if (!val) {
	    process.env.NODE_ENV !== 'production' && warn('Failed to resolve ' + type + ': ' + id);
	  }
	}

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = index + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var uid$3 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$3++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  var i = keys.length;
	  while (i--) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  var i = items.length;
	  while (i--) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function protoAugment(target, src) {
	  target.__proto__ = src;
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  var i = keys.length;
	  var key;
	  while (i--) {
	    key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if ((isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive(obj, key, val) {
	  var dep = new Dep();

	  // cater for pre-defined getter/setters
	  var getter, setter;
	  if (config.convertAllProperties) {
	    var property = Object.getOwnPropertyDescriptor(obj, key);
	    if (property && property.configurable === false) {
	      return;
	    }
	    getter = property && property.get;
	    setter = property && property.set;
	  }

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		isIE9: isIE9,
		isAndroid: isAndroid,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on$1,
		off: off,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		assertAsset: assertAsset,
		checkComponentAttr: checkComponentAttr,
		initProp: initProp,
		assertProp: assertProp,
		commonTagRE: commonTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {

	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {

	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initScope().
	    this._data = {};

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.');
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'proctected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var booleanLiteralRE = /^(?:true|false)$/;

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    return new Function('scope', 'return ' + body + ';');
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat true/false as paths
	  !booleanLiteralRE.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var internalQueueDepleted = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue = [];
	  userQueue = [];
	  has = {};
	  circular = {};
	  waiting = internalQueueDepleted = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  runBatcherQueue(queue);
	  internalQueueDepleted = true;
	  runBatcherQueue(userQueue);
	  // dev tool hook
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush');
	    }
	  }
	  resetBatcherState();
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        queue.splice(has[id], 1);
	        warn('You may have an infinite update loop for watcher ' + 'with expression: ' + watcher.expression);
	      }
	    }
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // if an internal watcher is pushed, but the internal
	    // queue is already depleted, we run it immediately.
	    if (internalQueueDepleted && !watcher.user) {
	      watcher.run();
	      return;
	    }
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = isFn ? expOrFn.toString() : expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = Object.create(null);
	  this.newDeps = null;
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDeps[id]) {
	    this.newDeps[id] = dep;
	    if (!this.deps[id]) {
	      this.deps[id] = dep;
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression "' + this.expression + '". ' + (config.debug ? '' : 'Turn on debug mode to see stack trace.'), e);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter "' + this.expression + '"', e);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.');
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	  this.newDeps = Object.create(null);
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var ids = Object.keys(this.deps);
	  var i = ids.length;
	  while (i--) {
	    var id = ids[i];
	    if (!this.newDeps[id]) {
	      this.deps[id].removeSub(this);
	    }
	  }
	  this.deps = this.newDeps;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and Array watchers should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isArray(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var depIds = Object.keys(this.deps);
	  var i = depIds.length;
	  while (i--) {
	    this.deps[depIds[i]].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // we can skip this if the vm if being destroyed
	    // which can improve teardown performance.
	    if (!this.vm._isBeingDestroyed) {
	      this.vm._watchers.$remove(this);
	    }
	    var depIds = Object.keys(this.deps);
	    var i = depIds.length;
	    while (i--) {
	      this.deps[depIds[i]].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	function traverse(val) {
	  var i, keys;
	  if (isArray(val)) {
	    i = val.length;
	    while (i--) traverse(val[i]);
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) traverse(val[keys[i]]);
	  }
	}

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.');
	  }
	};

	var el = {

	  priority: 1500,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim();
	      }
	      this.el.style.setProperty(prop, value, isImportant);
	    } else {
	      this.el.style.removeProperty(prop);
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  if (camel in testEl.style) {
	    return prop;
	  }
	  var i = prefixes.length;
	  var prefixed;
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixes[i] + prop;
	    }
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// these input element attributes should also set their
	// corresponding properties
	var inputProps = {
	  value: 1,
	  checked: 1,
	  selected: 1
	};

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;

	var bind = {

	  priority: 850,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    if (this.descriptor.interp) {
	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + this.descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.');
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + this.descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.');
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.');
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    if (inputProps[attr] && attr in this.el) {
	      this.el[attr] = attr === 'value' ? value || '' : // IE9 will set input.value to "null" for null...
	      value;
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (modelProp) {
	      this.el[modelProp] = value;
	      // update v-model if present
	      var model = this.el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && this.el.tagName === 'TEXTAREA') {
	      this.el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (value != null && value !== false) {
	      if (xlinkRE.test(attr)) {
	        this.el.setAttributeNS(xlinkNS, attr, value);
	      } else {
	        this.el.setAttribute(attr, value);
	      }
	    } else {
	      this.el.removeAttribute(attr);
	    }
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': 46,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	var on = {

	  acceptStatement: true,
	  priority: 700,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on$1(self.el.contentWindow, self.arg, self.handler);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on$1(this.el, this.arg, this.handler);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var select = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate);
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        self.listener();
	      });
	    }

	    // Now attach the main listener
	    this.listener = function () {
	      if (composing) return;
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      jQuery(el).on('change', this.listener);
	      if (!lazy) {
	        jQuery(el).on('input', this.listener);
	      }
	    } else {
	      this.on('change', this.listener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.value = _toString(value);
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      jQuery(el).off('change', this.listener);
	      jQuery(el).off('input', this.listener);
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: 800,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model. You might want to use a two-way filter ' + 'to ensure correct behavior.');
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    applyTransition(el, value ? 1 : -1, function () {
	      el.style.display = value ? '' : 'none';
	    }, this.vm);
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && node.content instanceof DocumentFragment;
	}

	var tagRE$1 = /<([\w:]+)/;
	var entityRE = /&\w+;|&#\d+;|&#x[\dA-F]+;/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var hit = templateCache.get(templateString);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);

	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {

	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    if (!raw) {
	      templateString = templateString.trim();
	    }
	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }

	  templateCache.put(templateString, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    trimNode(node.content);
	    return node.content;
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (template instanceof DocumentFragment) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__vue_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__vfrag__ = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.unlink();
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  self.callHook(destroyChild);
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  self.callHook(destroyChild);
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call destroy for all contained instances,
	 * with remove:false and defer:true.
	 * Defer is necessary because we need to
	 * keep the children to call detach hooks
	 * on them.
	 *
	 * @param {Vue} child
	 */

	function destroyChild(child) {
	  child.$destroy(false, true);
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el)) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : el.outerHTML);
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var vIf = {

	  priority: 2000,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseFactory = new FragmentFactory(this.vm, next);
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	      this.factory = new FragmentFactory(this.vm, el);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.');
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseFactory && !this.elseFrag) {
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	var uid$1 = 0;

	var vFor = {

	  priority: 2000,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    // support "item in items" syntax
	    var inMatch = this.expression.match(/(.*) in (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Alias is required in v-for.');
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$1;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          frag.scope[alias] = value;
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    defineReactive(scope, alias, value);
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__vfrag__ = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.before(prevEl.nextSibling);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else {
	        def(value, id, frag);
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number') {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__vfrag__;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__vfrag__;
	  }
	  return frag;
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(n);
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.');
	  };
	}

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	var text = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	// must export plain object
	var publicDirectives = {
	  text: text,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on,
	  bind: bind,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 1;
	var TYPE_ANIMATION = 2;
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = id + '-enter';
	  this.leaveClass = id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind$1(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {

	  // Important hack:
	  // in Chrome, if a just-entered element is applied the
	  // leave class while its interpolated property still has
	  // a very small value (within one frame), Chrome will
	  // skip the leave transition entirely and not firing the
	  // transtionend event. Therefore we need to protected
	  // against such cases using a one-frame timeout.
	  this.justEntered = true;
	  var self = this;
	  setTimeout(function () {
	    self.justEntered = false;
	  }, 17);

	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on$1(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	}

	var transition = {

	  priority: 1100,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    // apply on closest vm
	    el.__v_trans = new Transition(el, id, hooks, this.el.__vue__ || this.vm);
	    if (oldId) {
	      removeClass(el, oldId + '-transition');
	    }
	    addClass(el, id + '-transition');
	  }
	};

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {

	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      if (assertProp(prop, val)) {
	        child[childKey] = val;
	      }
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var component = {

	  priority: 1500,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   */

	  resolveComponent: function resolveComponent(id, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || id;
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(id, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHook = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHook && !cached) {
	      this.waitingFor = newComponent;
	      activateHook.call(newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      this.waitingFor.$destroy();
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (process.env.NODE_ENV !== 'production') {
	      if (current) current._inactive = true;
	      target._inactive = false;
	    }
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (value && typeof value === 'string') {
	      this.handleObject(stringToObject(value));
	    } else if (isPlainObject(value)) {
	      this.handleObject(value);
	    } else if (isArray(value)) {
	      this.handleArray(value);
	    } else {
	      this.cleanup();
	    }
	  },

	  handleObject: function handleObject(value) {
	    this.cleanup(value);
	    var keys = this.prevKeys = Object.keys(value);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      if (value[key]) {
	        addClass(this.el, key);
	      } else {
	        removeClass(this.el, key);
	      }
	    }
	  },

	  handleArray: function handleArray(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        addClass(this.el, value[i]);
	      }
	    }
	    this.prevKeys = value.slice();
	  },

	  cleanup: function cleanup(value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length;
	      while (i--) {
	        var key = this.prevKeys[i];
	        if (key && (!value || !contains$1(value, key))) {
	          removeClass(this.el, key);
	        }
	      }
	    }
	  }
	};

	function stringToObject(value) {
	  var res = {};
	  var keys = value.trim().split(/\s+/);
	  var i = keys.length;
	  while (i--) {
	    res[keys[i]] = true;
	  }
	  return res;
	}

	function contains$1(value, key) {
	  return isArray(value) ? value.indexOf(key) > -1 : hasOwn(value, key);
	}

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition
	};

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.');
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.');
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value)) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.');
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (options.required) {
	      // warn missing required
	      process.env.NODE_ENV !== 'production' && warn('Missing required prop: ' + name);
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, getDefault(vm, options));
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (vm._context) {
	          if (prop.mode === propBindingModes.ONE_TIME) {
	            // one time binding
	            value = (scope || vm._context).$get(prop.parentPath);
	            initProp(vm, prop, value);
	          } else {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          }
	        } else {
	            process.env.NODE_ENV !== 'production' && warn('Cannot bind dynamic prop on a root instance' + ' with no parent: ' + prop.name + '="' + raw + '"');
	          }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value
	        value = options.type === Boolean && raw === '' ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} options
	 * @return {*}
	 */

	function getDefault(vm, options) {
	  // no default, return undefined
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Object/Array as default prop values will be shared ' + 'across multiple instances. Use a factory function ' + 'to return the default value instead.');
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// terminal directives
	var terminalDirectives = ['for', 'if'];

	// default directive priority
	var DEFAULT_PRIORITY = 1000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && el.tagName !== 'SCRIPT' && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  return function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  };
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (!destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment_Instance');
	    }
	  }

	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(el.attributes, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: publicDirectives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = value;
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) return;
	  // special case: give named slot a higher priority
	  // than unnamed slots
	  if (tag === 'slot' && hasBindAttr(el, 'name')) {
	    tag = '_namedSlot';
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }
	  var value, dirName;
	  for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	    dirName = terminalDirectives[i];
	    /* eslint-disable no-cond-assign */
	    if (value = el.getAttribute('v-' + dirName)) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options);
	    }
	    /* eslint-enable no-cond-assign */
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} [def]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    // either an element directive, or if/for
	    def: def || publicDirectives[dirName]
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      if (name === 'class') {
	        pushDir('class', internalDirectives['class'], true);
	      } else {
	        arg = name;
	        pushDir('bind', publicDirectives.bind, true);
	      }
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.');
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', publicDirectives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', publicDirectives.bind);
	            }
	          } else

	            // normal directives
	            if (name.indexOf('v-') === 0) {
	              // check arg
	              arg = (arg = name.match(argRE)) && arg[1];
	              if (arg) {
	                name = name.replace(argRE, '');
	              }
	              // extract directive name
	              dirName = name.slice(2);

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName);

	              if (process.env.NODE_ENV !== 'production') {
	                assertAsset(dirDef, 'directive', dirName);
	              }

	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Boolean} [interp]
	   */

	  function pushDir(dirName, def, interp) {
	    var parsed = parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      expression: parsed.expression,
	      filters: parsed.filters,
	      interp: interp
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (el instanceof DocumentFragment) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class') {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude
	});

	function stateMixin (Vue) {

	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.');
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var propsData = this._data;
	    var optionsDataFn = this.$options.data;
	    var optionsData = optionsDataFn && optionsDataFn();
	    if (optionsData) {
	      this._data = optionsData;
	      for (var prop in propsData) {
	        if (process.env.NODE_ENV !== 'production' && hasOwn(optionsData, prop)) {
	          warn('Data field "' + prop + '" is already defined ' + 'as a prop. Use prop default value instead.');
	        }
	        if (this._props[prop].raw !== null || !hasOwn(optionsData, prop)) {
	          set(optionsData, prop, propsData[prop]);
	        }
	      }
	    }
	    var data = this._data;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      this._proxy(key);
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind$1(userDef.get, this) : noop;
	          def.set = userDef.set ? bind$1(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind$1(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {

	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        handler = (vm._scope || vm._context).$eval(attrs[i].value, true);
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".');
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {String} name
	 * @param {Node} el
	 * @param {Vue} vm
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} raw
	 * @param {Object} def - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    if (attr !== 'class') {
	      this.el.removeAttribute(attr);
	    } else {
	      // for class interpolations, only remove the parts that
	      // need to be interpolated.
	      this.el.className = removeTags(this.el.className).trim().replace(/\s+/g, ' ');
	    }
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop;
	    }
	    var preProcess = this._preProcess ? bind$1(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind$1(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	  this._bound = true;
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = params[i];
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 */

	Directive.prototype.on = function (event, handler) {
	  on$1(this.el, event, handler);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {

	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   * @return {Element}
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	    return el;
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (el instanceof DocumentFragment) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {String} name - directive name
	   * @param {Node} node   - target node
	   * @param {Object} desc - parsed directive descriptor
	   * @param {Object} def  - directive definition object
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }

	    var destroyReady;
	    var pendingRemoval;

	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };

	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }

	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }

	    destroyReady = true;
	    cleanupIfPossible();
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {

	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[i];
	      fn = resolveAsset(this.$options, 'filters', filter.name);
	      if (process.env.NODE_ENV !== 'production') {
	        assertAsset(fn, 'filter', filter.name);
	      }
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String} id
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (id, cb) {
	    var factory = resolveAsset(this.$options, 'components', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(factory, 'component', id);
	    }
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory(function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component: ' + id + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	function globalAPI (Vue) {

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text$1,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]+$/.test(name)) {
	        warn('Invalid component name: ' + name);
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && commonTagRE.test(id)) {
	            warn('Do not use built-in HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });
	}

	var filterRE = /[^|]\|[^|]/;

	function dataAPI (Vue) {

	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement && !isSimplePath(exp)) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          res.get.call(self, self);
	          self.$arguments = null;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      for (var key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {

	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {

	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var cbs = this._events[event];
	    var shouldPropagate = !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var res = cbs[i].apply(this, args);
	        if (res === true) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, arguments);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, arguments);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function () {
	    this.$emit.apply(this, arguments);
	    var parent = this.$parent;
	    while (parent) {
	      var shouldPropagate = parent.$emit.apply(parent, arguments);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {

	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.');
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install APIs
	globalAPI(Vue);
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = toArray(arguments, n).reduce(function (prev, cur) {
	    return prev.concat(cur);
	  }, []);
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */

	function orderBy(arr, sortKey, reverse) {
	  arr = convertArray(arr);
	  if (!sortKey) {
	    return arr;
	  }
	  var order = reverse && reverse < 0 ? -1 : 1;
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    if (sortKey !== '$key') {
	      if (isObject(a) && '$value' in a) a = a.$value;
	      if (isObject(b) && '$value' in b) b = b.$value;
	    }
	    a = isObject(a) ? getPath(a, sortKey) : a;
	    b = isObject(b) ? getPath(b, sortKey) : b;
	    return a === b ? 0 : a > b ? order : -order;
	  });
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   */

	  currency: function currency(value, _currency) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    var stringified = Math.abs(value).toFixed(2);
	    var _int = stringified.slice(0, -3);
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = stringified.slice(-3);
	    var sign = value < 0 ? '-' : '';
	    return _currency + sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	var partial = {

	  priority: 1750,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(partial, 'partial', id);
	    }
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	// This is the elementDirective that handles <content>
	// transclusions. It relies on the raw content of an
	// instance being stored as `$options._content` during
	// the transclude phase.

	// We are exporting two versions, one for named and one
	// for unnamed, because the unnamed slots must be compiled
	// AFTER all named slots have selected their content. So
	// we need to give them different priorities in the compilation
	// process. (See #1965)

	var slot = {

	  priority: 1750,

	  bind: function bind() {
	    var host = this.vm;
	    var raw = host.$options._content;
	    if (!raw) {
	      this.fallback();
	      return;
	    }
	    var context = host._context;
	    var slotName = this.params && this.params.name;
	    if (!slotName) {
	      // Default slot
	      this.tryCompile(extractFragment(raw.childNodes, raw, true), context, host);
	    } else {
	      // Named slot
	      var selector = '[slot="' + slotName + '"]';
	      var nodes = raw.querySelectorAll(selector);
	      if (nodes.length) {
	        this.tryCompile(extractFragment(nodes, raw), context, host);
	      } else {
	        this.fallback();
	      }
	    }
	  },

	  tryCompile: function tryCompile(content, context, host) {
	    if (content.hasChildNodes()) {
	      this.compile(content, context, host);
	    } else {
	      this.fallback();
	    }
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	var namedSlot = extend(extend({}, slot), {
	  priority: slot.priority + 1,
	  params: ['name']
	});

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @param {Element} parent
	 * @param {Boolean} main
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent, main) {
	  var frag = document.createDocumentFragment();
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    // if this is the main outlet, we want to skip all
	    // previously selected nodes;
	    // otherwise, we want to mark the node as selected.
	    // clone the node so the original raw content remains
	    // intact. this ensures proper re-compilation in cases
	    // where the outlet is inside a conditional block
	    if (main && !node.__v_selected) {
	      append(node);
	    } else if (!main && node.parentNode === parent) {
	      node.__v_selected = true;
	      append(node);
	    }
	  }
	  return frag;

	  function append(node) {
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      node = parseTemplate(node);
	    }
	    node = cloneNode(node);
	    frag.appendChild(node);
	  }
	}

	var elementDirectives = {
	  slot: slot,
	  _namedSlot: namedSlot, // same as slot but with higher priority
	  partial: partial
	};

	Vue.version = '1.0.11';

	/**
	 * Vue and every constructor that extends Vue has an
	 * associated options object, which can be accessed during
	 * compilation steps as `this.constructor.options`.
	 *
	 * These can be seen as the default options of every
	 * Vue instance.
	 */

	Vue.options = {
	  directives: publicDirectives,
	  elementDirectives: elementDirectives,
	  filters: filters,
	  transitions: {},
	  components: {},
	  partials: {},
	  replace: true
	};

	// devtools global hook
	/* istanbul ignore if */
	if (process.env.NODE_ENV !== 'production' && inBrowser) {
	  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', Vue);
	  } else if (/Chrome\/\d+/.test(navigator.userAgent)) {
	    console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	  }
	}

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _pusherJs = __webpack_require__(4);

	var _pusherJs2 = _interopRequireDefault(_pusherJs);

	var _appComponentTemplate = __webpack_require__(5);

	var _appComponentTemplate2 = _interopRequireDefault(_appComponentTemplate);

	var _subscriptionComponent = __webpack_require__(6);

	var _subscriptionComponent2 = _interopRequireDefault(_subscriptionComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AppComponent = _vue2.default.extend({
	  template: _appComponentTemplate2.default,
	  components: {
	    'subscription-component': _subscriptionComponent2.default
	  },
	  data: function data() {
	    return {
	      newSearchTerm: '',
	      channels: []
	    };
	  },
	  created: function created() {
	    this.pusher = new _pusherJs2.default('9fd1b33fcb36d968145f');
	  },

	  methods: {
	    newSubscription: function newSubscription() {
	      this.channels.push({
	        term: this.newSearchTerm,
	        active: true
	      });
	      this.newSearchTerm = '';
	    },
	    toggleSearch: function toggleSearch(channel) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var ch = _step.value;

	          if (ch.term === channel.term) {
	            ch.active = !ch.active;
	            break;
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    },
	    clearSearch: function clearSearch(channel) {
	      this.channels = this.channels.filter(function (ch) {
	        if (ch.term === channel.term) {
	          ch.active = false;
	        }
	        return ch.term !== channel.term;
	      });
	    }
	  }
	});

	exports.default = AppComponent;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Pusher JavaScript Library v3.0.0
	 * http://pusher.com/
	 *
	 * Copyright 2014, Pusher
	 * Released under the MIT licence.
	 */

	// Uses Node, AMD or browser globals to create a module. This example creates
	// a global even when AMD is used. This is useful if you have some scripts
	// that are loaded by an AMD loader, but they still want access to globals.
	// If you do not need to export a global for the AMD case,
	// see returnExports.js.

	// If you want something that will work in other stricter CommonJS environments,
	// or if you need to create a circular dependency, see commonJsStrictGlobal.js

	// Defines a module "Pusher".

	(function (root, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return (root.Pusher = factory());
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like enviroments that support module.exports,
	    // like Node.
	    module.exports = factory();
	  } else {
	    // Browser globals
	    root.Pusher = factory();
	  }
	}(this, function () {

	;(function() {
	  function Pusher(app_key, options) {
	    checkAppKey(app_key);
	    options = options || {};

	    var self = this;

	    this.key = app_key;
	    this.config = Pusher.Util.extend(
	      Pusher.getGlobalConfig(),
	      options.cluster ? Pusher.getClusterConfig(options.cluster) : {},
	      options
	    );

	    this.channels = new Pusher.Channels();
	    this.global_emitter = new Pusher.EventsDispatcher();
	    this.sessionID = Math.floor(Math.random() * 1000000000);

	    this.timeline = new Pusher.Timeline(this.key, this.sessionID, {
	      cluster: this.config.cluster,
	      features: Pusher.Util.getClientFeatures(),
	      params: this.config.timelineParams || {},
	      limit: 50,
	      level: Pusher.Timeline.INFO,
	      version: Pusher.VERSION
	    });
	    if (!this.config.disableStats) {
	      this.timelineSender = new Pusher.TimelineSender(this.timeline, {
	        host: this.config.statsHost,
	        path: "/timeline/v2/jsonp"
	      });
	    }

	    var getStrategy = function(options) {
	      var config = Pusher.Util.extend({}, self.config, options);
	      return Pusher.StrategyBuilder.build(
	        Pusher.getDefaultStrategy(config), config
	      );
	    };

	    this.connection = new Pusher.ConnectionManager(
	      this.key,
	      Pusher.Util.extend(
	        { getStrategy: getStrategy,
	          timeline: this.timeline,
	          activityTimeout: this.config.activity_timeout,
	          pongTimeout: this.config.pong_timeout,
	          unavailableTimeout: this.config.unavailable_timeout
	        },
	        this.config,
	        { encrypted: this.isEncrypted() }
	      )
	    );

	    this.connection.bind('connected', function() {
	      self.subscribeAll();
	      if (self.timelineSender) {
	        self.timelineSender.send(self.connection.isEncrypted());
	      }
	    });
	    this.connection.bind('message', function(params) {
	      var internal = (params.event.indexOf('pusher_internal:') === 0);
	      if (params.channel) {
	        var channel = self.channel(params.channel);
	        if (channel) {
	          channel.handleEvent(params.event, params.data);
	        }
	      }
	      // Emit globally [deprecated]
	      if (!internal) {
	        self.global_emitter.emit(params.event, params.data);
	      }
	    });
	    this.connection.bind('disconnected', function() {
	      self.channels.disconnect();
	    });
	    this.connection.bind('error', function(err) {
	      Pusher.warn('Error', err);
	    });

	    Pusher.instances.push(this);
	    this.timeline.info({ instances: Pusher.instances.length });

	    if (Pusher.isReady) {
	      self.connect();
	    }
	  }
	  var prototype = Pusher.prototype;

	  Pusher.instances = [];
	  Pusher.isReady = false;

	  // To receive log output provide a Pusher.log function, for example
	  // Pusher.log = function(m){console.log(m)}
	  Pusher.debug = function() {
	    if (!Pusher.log) {
	      return;
	    }
	    Pusher.log(Pusher.Util.stringify.apply(this, arguments));
	  };

	  Pusher.warn = function() {
	    var message = Pusher.Util.stringify.apply(this, arguments);
	    if (window.console) {
	      if (window.console.warn) {
	        window.console.warn(message);
	      } else if (window.console.log) {
	        window.console.log(message);
	      }
	    }
	    if (Pusher.log) {
	      Pusher.log(message);
	    }
	  };

	  Pusher.ready = function() {
	    Pusher.isReady = true;
	    for (var i = 0, l = Pusher.instances.length; i < l; i++) {
	      Pusher.instances[i].connect();
	    }
	  };

	  prototype.channel = function(name) {
	    return this.channels.find(name);
	  };

	  prototype.allChannels = function() {
	    return this.channels.all();
	  };

	  prototype.connect = function() {
	    this.connection.connect();

	    if (this.timelineSender) {
	      if (!this.timelineSenderTimer) {
	        var encrypted = this.connection.isEncrypted();
	        var timelineSender = this.timelineSender;
	        this.timelineSenderTimer = new Pusher.PeriodicTimer(60000, function() {
	          timelineSender.send(encrypted);
	        });
	      }
	    }
	  };

	  prototype.disconnect = function() {
	    this.connection.disconnect();

	    if (this.timelineSenderTimer) {
	      this.timelineSenderTimer.ensureAborted();
	      this.timelineSenderTimer = null;
	    }
	  };

	  prototype.bind = function(event_name, callback) {
	    this.global_emitter.bind(event_name, callback);
	    return this;
	  };

	  prototype.bind_all = function(callback) {
	    this.global_emitter.bind_all(callback);
	    return this;
	  };

	  prototype.subscribeAll = function() {
	    var channelName;
	    for (channelName in this.channels.channels) {
	      if (this.channels.channels.hasOwnProperty(channelName)) {
	        this.subscribe(channelName);
	      }
	    }
	  };

	  prototype.subscribe = function(channel_name) {
	    var channel = this.channels.add(channel_name, this);
	    if (this.connection.state === 'connected') {
	      channel.subscribe();
	    }
	    return channel;
	  };

	  prototype.unsubscribe = function(channel_name) {
	    var channel = this.channels.remove(channel_name);
	    if (channel && this.connection.state === 'connected') {
	      channel.unsubscribe();
	    }
	  };

	  prototype.send_event = function(event_name, data, channel) {
	    return this.connection.send_event(event_name, data, channel);
	  };

	  prototype.isEncrypted = function() {
	    if (Pusher.Util.getDocument().location.protocol === "https:") {
	      return true;
	    } else {
	      return Boolean(this.config.encrypted);
	    }
	  };

	  function checkAppKey(key) {
	    if (key === null || key === undefined) {
	      Pusher.warn(
	        'Warning', 'You must pass your app key when you instantiate Pusher.'
	      );
	    }
	  }

	  Pusher.HTTP = {};

	  this.Pusher = Pusher;
	}).call(this);

	;(function() {
	  // We need to bind clear functions this way to avoid exceptions on IE8
	  function clearTimeout(timer) {
	    window.clearTimeout(timer);
	  }
	  function clearInterval(timer) {
	    window.clearInterval(timer);
	  }

	  function GenericTimer(set, clear, delay, callback) {
	    var self = this;

	    this.clear = clear;
	    this.timer = set(function() {
	      if (self.timer !== null) {
	        self.timer = callback(self.timer);
	      }
	    }, delay);
	  }
	  var prototype = GenericTimer.prototype;

	  /** Returns whether the timer is still running.
	   *
	   * @return {Boolean}
	   */
	  prototype.isRunning = function() {
	    return this.timer !== null;
	  };

	  /** Aborts a timer when it's running. */
	  prototype.ensureAborted = function() {
	    if (this.timer) {
	      // Clear function is already bound
	      this.clear(this.timer);
	      this.timer = null;
	    }
	  };

	  /** Cross-browser compatible one-off timer abstraction.
	   *
	   * @param {Number} delay
	   * @param {Function} callback
	   */
	  Pusher.Timer = function(delay, callback) {
	    return new GenericTimer(setTimeout, clearTimeout, delay, function(timer) {
	      callback();
	      return null;
	    });
	  };
	  /** Cross-browser compatible periodic timer abstraction.
	   *
	   * @param {Number} delay
	   * @param {Function} callback
	   */
	  Pusher.PeriodicTimer = function(delay, callback) {
	    return new GenericTimer(setInterval, clearInterval, delay, function(timer) {
	      callback();
	      return timer;
	    });
	  };
	}).call(this);

	;(function() {
	  Pusher.Util = {
	    now: function() {
	      if (Date.now) {
	        return Date.now();
	      } else {
	        return new Date().valueOf();
	      }
	    },

	    defer: function(callback) {
	      return new Pusher.Timer(0, callback);
	    },

	    /** Merges multiple objects into the target argument.
	     *
	     * For properties that are plain Objects, performs a deep-merge. For the
	     * rest it just copies the value of the property.
	     *
	     * To extend prototypes use it as following:
	     *   Pusher.Util.extend(Target.prototype, Base.prototype)
	     *
	     * You can also use it to merge objects without altering them:
	     *   Pusher.Util.extend({}, object1, object2)
	     *
	     * @param  {Object} target
	     * @return {Object} the target argument
	     */
	    extend: function(target) {
	      for (var i = 1; i < arguments.length; i++) {
	        var extensions = arguments[i];
	        for (var property in extensions) {
	          if (extensions[property] && extensions[property].constructor &&
	              extensions[property].constructor === Object) {
	            target[property] = Pusher.Util.extend(
	              target[property] || {}, extensions[property]
	            );
	          } else {
	            target[property] = extensions[property];
	          }
	        }
	      }
	      return target;
	    },

	    stringify: function() {
	      var m = ["Pusher"];
	      for (var i = 0; i < arguments.length; i++) {
	        if (typeof arguments[i] === "string") {
	          m.push(arguments[i]);
	        } else {
	          if (window.JSON === undefined) {
	            m.push(arguments[i].toString());
	          } else {
	            m.push(JSON.stringify(arguments[i]));
	          }
	        }
	      }
	      return m.join(" : ");
	    },

	    arrayIndexOf: function(array, item) { // MSIE doesn't have array.indexOf
	      var nativeIndexOf = Array.prototype.indexOf;
	      if (array === null) {
	        return -1;
	      }
	      if (nativeIndexOf && array.indexOf === nativeIndexOf) {
	        return array.indexOf(item);
	      }
	      for (var i = 0, l = array.length; i < l; i++) {
	        if (array[i] === item) {
	          return i;
	        }
	      }
	      return -1;
	    },

	    /** Applies a function f to all properties of an object.
	     *
	     * Function f gets 3 arguments passed:
	     * - element from the object
	     * - key of the element
	     * - reference to the object
	     *
	     * @param {Object} object
	     * @param {Function} f
	     */
	    objectApply: function(object, f) {
	      for (var key in object) {
	        if (Object.prototype.hasOwnProperty.call(object, key)) {
	          f(object[key], key, object);
	        }
	      }
	    },

	    /** Return a list of object's own property keys
	     *
	     * @param {Object} object
	     * @returns {Array}
	     */
	    keys: function(object) {
	      var keys = [];
	      Pusher.Util.objectApply(object, function(_, key) {
	        keys.push(key);
	      });
	      return keys;
	    },

	    /** Return a list of object's own property values
	     *
	     * @param {Object} object
	     * @returns {Array}
	     */
	    values: function(object) {
	      var values = [];
	      Pusher.Util.objectApply(object, function(value) {
	        values.push(value);
	      });
	      return values;
	    },

	    /** Applies a function f to all elements of an array.
	     *
	     * Function f gets 3 arguments passed:
	     * - element from the array
	     * - index of the element
	     * - reference to the array
	     *
	     * @param {Array} array
	     * @param {Function} f
	     */
	    apply: function(array, f, context) {
	      for (var i = 0; i < array.length; i++) {
	        f.call(context || window, array[i], i, array);
	      }
	    },

	    /** Maps all elements of the array and returns the result.
	     *
	     * Function f gets 4 arguments passed:
	     * - element from the array
	     * - index of the element
	     * - reference to the source array
	     * - reference to the destination array
	     *
	     * @param {Array} array
	     * @param {Function} f
	     */
	    map: function(array, f) {
	      var result = [];
	      for (var i = 0; i < array.length; i++) {
	        result.push(f(array[i], i, array, result));
	      }
	      return result;
	    },

	    /** Maps all elements of the object and returns the result.
	     *
	     * Function f gets 4 arguments passed:
	     * - element from the object
	     * - key of the element
	     * - reference to the source object
	     * - reference to the destination object
	     *
	     * @param {Object} object
	     * @param {Function} f
	     */
	    mapObject: function(object, f) {
	      var result = {};
	      Pusher.Util.objectApply(object, function(value, key) {
	        result[key] = f(value);
	      });
	      return result;
	    },

	    /** Filters elements of the array using a test function.
	     *
	     * Function test gets 4 arguments passed:
	     * - element from the array
	     * - index of the element
	     * - reference to the source array
	     * - reference to the destination array
	     *
	     * @param {Array} array
	     * @param {Function} f
	     */
	    filter: function(array, test) {
	      test = test || function(value) { return !!value; };

	      var result = [];
	      for (var i = 0; i < array.length; i++) {
	        if (test(array[i], i, array, result)) {
	          result.push(array[i]);
	        }
	      }
	      return result;
	    },

	    /** Filters properties of the object using a test function.
	     *
	     * Function test gets 4 arguments passed:
	     * - element from the object
	     * - key of the element
	     * - reference to the source object
	     * - reference to the destination object
	     *
	     * @param {Object} object
	     * @param {Function} f
	     */
	    filterObject: function(object, test) {
	      var result = {};
	      Pusher.Util.objectApply(object, function(value, key) {
	        if ((test && test(value, key, object, result)) || Boolean(value)) {
	          result[key] = value;
	        }
	      });
	      return result;
	    },

	    /** Flattens an object into a two-dimensional array.
	     *
	     * @param  {Object} object
	     * @return {Array} resulting array of [key, value] pairs
	     */
	    flatten: function(object) {
	      var result = [];
	      Pusher.Util.objectApply(object, function(value, key) {
	        result.push([key, value]);
	      });
	      return result;
	    },

	    /** Checks whether any element of the array passes the test.
	     *
	     * Function test gets 3 arguments passed:
	     * - element from the array
	     * - index of the element
	     * - reference to the source array
	     *
	     * @param {Array} array
	     * @param {Function} f
	     */
	    any: function(array, test) {
	      for (var i = 0; i < array.length; i++) {
	        if (test(array[i], i, array)) {
	          return true;
	        }
	      }
	      return false;
	    },

	    /** Checks whether all elements of the array pass the test.
	     *
	     * Function test gets 3 arguments passed:
	     * - element from the array
	     * - index of the element
	     * - reference to the source array
	     *
	     * @param {Array} array
	     * @param {Function} f
	     */
	    all: function(array, test) {
	      for (var i = 0; i < array.length; i++) {
	        if (!test(array[i], i, array)) {
	          return false;
	        }
	      }
	      return true;
	    },

	    /** Builds a function that will proxy a method call to its first argument.
	     *
	     * Allows partial application of arguments, so additional arguments are
	     * prepended to the argument list.
	     *
	     * @param  {String} name method name
	     * @return {Function} proxy function
	     */
	    method: function(name) {
	      var boundArguments = Array.prototype.slice.call(arguments, 1);
	      return function(object) {
	        return object[name].apply(object, boundArguments.concat(arguments));
	      };
	    },

	    getWindow: function() {
	      return window;
	    },

	    getDocument: function() {
	      return document;
	    },

	    getLocalStorage: function() {
	      try {
	        return window.localStorage;
	      } catch (e) {
	        return undefined;
	      }
	    },

	    getClientFeatures: function() {
	      return Pusher.Util.keys(
	        Pusher.Util.filterObject(
	          { "ws": Pusher.WSTransport },
	          function (t) { return t.isSupported({}); }
	        )
	      );
	    },

	    addWindowListener: function(event, listener) {
	      var _window = Pusher.Util.getWindow();
	      if (_window.addEventListener !== undefined) {
	        _window.addEventListener(event, listener, false);
	      } else {
	        _window.attachEvent("on" + event, listener);
	      }
	    },

	    removeWindowListener: function(event, listener) {
	      var _window = Pusher.Util.getWindow();
	      if (_window.addEventListener !== undefined) {
	        _window.removeEventListener(event, listener, false);
	      } else {
	        _window.detachEvent("on" + event, listener);
	      }
	    },

	    isXHRSupported: function() {
	      var XHR = window.XMLHttpRequest;
	      return Boolean(XHR) && (new XHR()).withCredentials !== undefined;
	    },

	    isXDRSupported: function(encrypted) {
	      var protocol = encrypted ? "https:" : "http:";
	      var documentProtocol = Pusher.Util.getDocument().location.protocol;
	      return Boolean(window.XDomainRequest) && documentProtocol === protocol;
	    }
	  };
	}).call(this);

	;(function() {
	  Pusher.VERSION = '3.0.0';
	  Pusher.PROTOCOL = 7;

	  // DEPRECATED: WS connection parameters
	  Pusher.host = 'ws.pusherapp.com';
	  Pusher.ws_port = 80;
	  Pusher.wss_port = 443;
	  // DEPRECATED: SockJS fallback parameters
	  Pusher.sockjs_host = 'sockjs.pusher.com';
	  Pusher.sockjs_http_port = 80;
	  Pusher.sockjs_https_port = 443;
	  Pusher.sockjs_path = "/pusher";
	  // DEPRECATED: Stats
	  Pusher.stats_host = 'stats.pusher.com';
	  // DEPRECATED: Other settings
	  Pusher.channel_auth_endpoint = '/pusher/auth';
	  Pusher.channel_auth_transport = 'ajax';
	  Pusher.activity_timeout = 120000;
	  Pusher.pong_timeout = 30000;
	  Pusher.unavailable_timeout = 10000;
	  // CDN configuration
	  Pusher.cdn_http = 'http://js.pusher.com/';
	  Pusher.cdn_https = 'https://js.pusher.com/';
	  Pusher.dependency_suffix = '';

	  Pusher.getDefaultStrategy = function(config) {
	    var wsStrategy;
	    if (config.encrypted) {
	      wsStrategy = [
	        ":best_connected_ever",
	        ":ws_loop",
	        [":delayed", 2000, [":http_fallback_loop"]]
	      ];
	    } else {
	      wsStrategy = [
	        ":best_connected_ever",
	        ":ws_loop",
	        [":delayed", 2000, [":wss_loop"]],
	        [":delayed", 5000, [":http_fallback_loop"]]
	      ];
	    }

	    return [
	      [":def", "ws_options", {
	        hostUnencrypted: config.wsHost + ":" + config.wsPort,
	        hostEncrypted: config.wsHost + ":" + config.wssPort
	      }],
	      [":def", "wss_options", [":extend", ":ws_options", {
	        encrypted: true
	      }]],
	      [":def", "sockjs_options", {
	        hostUnencrypted: config.httpHost + ":" + config.httpPort,
	        hostEncrypted: config.httpHost + ":" + config.httpsPort,
	        httpPath: config.httpPath
	      }],
	      [":def", "timeouts", {
	        loop: true,
	        timeout: 15000,
	        timeoutLimit: 60000
	      }],

	      [":def", "ws_manager", [":transport_manager", {
	        lives: 2,
	        minPingDelay: 10000,
	        maxPingDelay: config.activity_timeout
	      }]],
	      [":def", "streaming_manager", [":transport_manager", {
	        lives: 2,
	        minPingDelay: 10000,
	        maxPingDelay: config.activity_timeout
	      }]],

	      [":def_transport", "ws", "ws", 3, ":ws_options", ":ws_manager"],
	      [":def_transport", "wss", "ws", 3, ":wss_options", ":ws_manager"],
	      [":def_transport", "sockjs", "sockjs", 1, ":sockjs_options"],
	      [":def_transport", "xhr_streaming", "xhr_streaming", 1, ":sockjs_options", ":streaming_manager"],
	      [":def_transport", "xdr_streaming", "xdr_streaming", 1, ":sockjs_options", ":streaming_manager"],
	      [":def_transport", "xhr_polling", "xhr_polling", 1, ":sockjs_options"],
	      [":def_transport", "xdr_polling", "xdr_polling", 1, ":sockjs_options"],

	      [":def", "ws_loop", [":sequential", ":timeouts", ":ws"]],
	      [":def", "wss_loop", [":sequential", ":timeouts", ":wss"]],
	      [":def", "sockjs_loop", [":sequential", ":timeouts", ":sockjs"]],

	      [":def", "streaming_loop", [":sequential", ":timeouts",
	        [":if", [":is_supported", ":xhr_streaming"],
	          ":xhr_streaming",
	          ":xdr_streaming"
	        ]
	      ]],
	      [":def", "polling_loop", [":sequential", ":timeouts",
	        [":if", [":is_supported", ":xhr_polling"],
	          ":xhr_polling",
	          ":xdr_polling"
	        ]
	      ]],

	      [":def", "http_loop", [":if", [":is_supported", ":streaming_loop"], [
	        ":best_connected_ever",
	          ":streaming_loop",
	          [":delayed", 4000, [":polling_loop"]]
	      ], [
	        ":polling_loop"
	      ]]],

	      [":def", "http_fallback_loop",
	        [":if", [":is_supported", ":http_loop"], [
	          ":http_loop"
	        ], [
	          ":sockjs_loop"
	        ]]
	      ],

	      [":def", "strategy",
	        [":cached", 1800000,
	          [":first_connected",
	            [":if", [":is_supported", ":ws"],
	              wsStrategy,
	              ":http_fallback_loop"
	            ]
	          ]
	        ]
	      ]
	    ];
	  };
	}).call(this);

	;(function() {
	  Pusher.getGlobalConfig = function() {
	    return {
	      wsHost: Pusher.host,
	      wsPort: Pusher.ws_port,
	      wssPort: Pusher.wss_port,
	      httpHost: Pusher.sockjs_host,
	      httpPort: Pusher.sockjs_http_port,
	      httpsPort: Pusher.sockjs_https_port,
	      httpPath: Pusher.sockjs_path,
	      statsHost: Pusher.stats_host,
	      authEndpoint: Pusher.channel_auth_endpoint,
	      authTransport: Pusher.channel_auth_transport,
	      // TODO make this consistent with other options in next major version
	      activity_timeout: Pusher.activity_timeout,
	      pong_timeout: Pusher.pong_timeout,
	      unavailable_timeout: Pusher.unavailable_timeout
	    };
	  };

	  Pusher.getClusterConfig = function(clusterName) {
	    return {
	      wsHost: "ws-" + clusterName + ".pusher.com",
	      httpHost: "sockjs-" + clusterName + ".pusher.com"
	    };
	  };
	}).call(this);

	;(function() {
	  function buildExceptionClass(name) {
	    var constructor = function(message) {
	      Error.call(this, message);
	      this.name = name;
	    };
	    Pusher.Util.extend(constructor.prototype, Error.prototype);

	    return constructor;
	  }

	  /** Error classes used throughout pusher-js library. */
	  Pusher.Errors = {
	    BadEventName: buildExceptionClass("BadEventName"),
	    RequestTimedOut: buildExceptionClass("RequestTimedOut"),
	    TransportPriorityTooLow: buildExceptionClass("TransportPriorityTooLow"),
	    TransportClosed: buildExceptionClass("TransportClosed"),
	    UnsupportedTransport: buildExceptionClass("UnsupportedTransport"),
	    UnsupportedStrategy: buildExceptionClass("UnsupportedStrategy")
	  };
	}).call(this);

	;(function() {
	  /** Manages callback bindings and event emitting.
	   *
	   * @param Function failThrough called when no listeners are bound to an event
	   */
	  function EventsDispatcher(failThrough) {
	    this.callbacks = new CallbackRegistry();
	    this.global_callbacks = [];
	    this.failThrough = failThrough;
	  }
	  var prototype = EventsDispatcher.prototype;

	  prototype.bind = function(eventName, callback, context) {
	    this.callbacks.add(eventName, callback, context);
	    return this;
	  };

	  prototype.bind_all = function(callback) {
	    this.global_callbacks.push(callback);
	    return this;
	  };

	  prototype.unbind = function(eventName, callback, context) {
	    this.callbacks.remove(eventName, callback, context);
	    return this;
	  };

	  prototype.unbind_all = function(eventName, callback) {
	    this.callbacks.remove(eventName, callback);
	    return this;
	  };

	  prototype.emit = function(eventName, data) {
	    var i;

	    for (i = 0; i < this.global_callbacks.length; i++) {
	      this.global_callbacks[i](eventName, data);
	    }

	    var callbacks = this.callbacks.get(eventName);
	    if (callbacks && callbacks.length > 0) {
	      for (i = 0; i < callbacks.length; i++) {
	        callbacks[i].fn.call(callbacks[i].context || window, data);
	      }
	    } else if (this.failThrough) {
	      this.failThrough(eventName, data);
	    }

	    return this;
	  };

	  /** Callback registry helper. */

	  function CallbackRegistry() {
	    this._callbacks = {};
	  }

	  CallbackRegistry.prototype.get = function(name) {
	    return this._callbacks[prefix(name)];
	  };

	  CallbackRegistry.prototype.add = function(name, callback, context) {
	    var prefixedEventName = prefix(name);
	    this._callbacks[prefixedEventName] = this._callbacks[prefixedEventName] || [];
	    this._callbacks[prefixedEventName].push({
	      fn: callback,
	      context: context
	    });
	  };

	  CallbackRegistry.prototype.remove = function(name, callback, context) {
	    if (!name && !callback && !context) {
	      this._callbacks = {};
	      return;
	    }

	    var names = name ? [prefix(name)] : Pusher.Util.keys(this._callbacks);

	    if (callback || context) {
	      Pusher.Util.apply(names, function(name) {
	        this._callbacks[name] = Pusher.Util.filter(
	          this._callbacks[name] || [],
	          function(binding) {
	            return (callback && callback !== binding.fn) ||
	                   (context && context !== binding.context);
	          }
	        );
	        if (this._callbacks[name].length === 0) {
	          delete this._callbacks[name];
	        }
	      }, this);
	    } else {
	      Pusher.Util.apply(names, function(name) {
	        delete this._callbacks[name];
	      }, this);
	    }
	  };

	  function prefix(name) {
	    return "_" + name;
	  }

	  Pusher.EventsDispatcher = EventsDispatcher;
	}).call(this);

	(function() {
	  /** Builds receivers for JSONP and Script requests.
	   *
	   * Each receiver is an object with following fields:
	   * - number - unique (for the factory instance), numerical id of the receiver
	   * - id - a string ID that can be used in DOM attributes
	   * - name - name of the function triggering the receiver
	   * - callback - callback function
	   *
	   * Receivers are triggered only once, on the first callback call.
	   *
	   * Receivers can be called by their name or by accessing factory object
	   * by the number key.
	   *
	   * @param {String} prefix the prefix used in ids
	   * @param {String} name the name of the object
	   */
	  function ScriptReceiverFactory(prefix, name) {
	    this.lastId = 0;
	    this.prefix = prefix;
	    this.name = name;
	  }
	  var prototype = ScriptReceiverFactory.prototype;

	  /** Creates a script receiver.
	   *
	   * @param {Function} callback
	   * @return {ScriptReceiver}
	   */
	  prototype.create = function(callback) {
	    this.lastId++;

	    var number = this.lastId;
	    var id = this.prefix + number;
	    var name = this.name + "[" + number + "]";

	    var called = false;
	    var callbackWrapper = function() {
	      if (!called) {
	        callback.apply(null, arguments);
	        called = true;
	      }
	    };

	    this[number] = callbackWrapper;
	    return { number: number, id: id, name: name, callback: callbackWrapper };
	  };

	  /** Removes the script receiver from the list.
	   *
	   * @param {ScriptReceiver} receiver
	   */
	  prototype.remove = function(receiver) {
	    delete this[receiver.number];
	  };

	  Pusher.ScriptReceiverFactory = ScriptReceiverFactory;
	  Pusher.ScriptReceivers = new ScriptReceiverFactory(
	    "_pusher_script_", "Pusher.ScriptReceivers"
	  );
	}).call(this);

	(function() {
	  /** Sends a generic HTTP GET request using a script tag.
	   *
	   * By constructing URL in a specific way, it can be used for loading
	   * JavaScript resources or JSONP requests. It can notify about errors, but
	   * only in certain environments. Please take care of monitoring the state of
	   * the request yourself.
	   *
	   * @param {String} src
	   */
	  function ScriptRequest(src) {
	    this.src = src;
	  }
	  var prototype = ScriptRequest.prototype;

	  /** Sends the actual script request.
	   *
	   * @param {ScriptReceiver} receiver
	   */
	  prototype.send = function(receiver) {
	    var self = this;
	    var errorString = "Error loading " + self.src;

	    self.script = document.createElement("script");
	    self.script.id = receiver.id;
	    self.script.src = self.src;
	    self.script.type = "text/javascript";
	    self.script.charset = "UTF-8";

	    if (self.script.addEventListener) {
	      self.script.onerror = function() {
	        receiver.callback(errorString);
	      };
	      self.script.onload = function() {
	        receiver.callback(null);
	      };
	    } else {
	      self.script.onreadystatechange = function() {
	        if (self.script.readyState === 'loaded' ||
	            self.script.readyState === 'complete') {
	          receiver.callback(null);
	        }
	      };
	    }

	    // Opera<11.6 hack for missing onerror callback
	    if (self.script.async === undefined && document.attachEvent &&
	        /opera/i.test(navigator.userAgent)) {
	      self.errorScript = document.createElement("script");
	      self.errorScript.id = receiver.id + "_error";
	      self.errorScript.text = receiver.name + "('" + errorString + "');";
	      self.script.async = self.errorScript.async = false;
	    } else {
	      self.script.async = true;
	    }

	    var head = document.getElementsByTagName('head')[0];
	    head.insertBefore(self.script, head.firstChild);
	    if (self.errorScript) {
	      head.insertBefore(self.errorScript, self.script.nextSibling);
	    }
	  };

	  /** Cleans up the DOM remains of the script request. */
	  prototype.cleanup = function() {
	    if (this.script) {
	      this.script.onload = this.script.onerror = null;
	      this.script.onreadystatechange = null;
	    }
	    if (this.script && this.script.parentNode) {
	      this.script.parentNode.removeChild(this.script);
	    }
	    if (this.errorScript && this.errorScript.parentNode) {
	      this.errorScript.parentNode.removeChild(this.errorScript);
	    }
	    this.script = null;
	    this.errorScript = null;
	  };

	  Pusher.ScriptRequest = ScriptRequest;
	}).call(this);

	;(function() {
	  /** Handles loading dependency files.
	   *
	   * Dependency loaders don't remember whether a resource has been loaded or
	   * not. It is caller's responsibility to make sure the resource is not loaded
	   * twice. This is because it's impossible to detect resource loading status
	   * without knowing its content.
	   *
	   * Options:
	   * - cdn_http - url to HTTP CND
	   * - cdn_https - url to HTTPS CDN
	   * - version - version of pusher-js
	   * - suffix - suffix appended to all names of dependency files
	   *
	   * @param {Object} options
	   */
	  function DependencyLoader(options) {
	    this.options = options;
	    this.receivers = options.receivers || Pusher.ScriptReceivers;
	    this.loading = {};
	  }
	  var prototype = DependencyLoader.prototype;

	  /** Loads the dependency from CDN.
	   *
	   * @param  {String} name
	   * @param  {Function} callback
	   */
	  prototype.load = function(name, options, callback) {
	    var self = this;

	    if (self.loading[name] && self.loading[name].length > 0) {
	      self.loading[name].push(callback);
	    } else {
	      self.loading[name] = [callback];

	      var request = new Pusher.ScriptRequest(self.getPath(name, options));
	      var receiver = self.receivers.create(function(error) {
	        self.receivers.remove(receiver);

	        if (self.loading[name]) {
	          var callbacks = self.loading[name];
	          delete self.loading[name];

	          var successCallback = function(wasSuccessful) {
	            if (!wasSuccessful) {
	              request.cleanup();
	            }
	          };
	          for (var i = 0; i < callbacks.length; i++) {
	            callbacks[i](error, successCallback);
	          }
	        }
	      });
	      request.send(receiver);
	    }
	  };

	  /** Returns a root URL for pusher-js CDN.
	   *
	   * @returns {String}
	   */
	  prototype.getRoot = function(options) {
	    var cdn;
	    var protocol = Pusher.Util.getDocument().location.protocol;
	    if ((options && options.encrypted) || protocol === "https:") {
	      cdn = this.options.cdn_https;
	    } else {
	      cdn = this.options.cdn_http;
	    }
	    // make sure there are no double slashes
	    return cdn.replace(/\/*$/, "") + "/" + this.options.version;
	  };

	  /** Returns a full path to a dependency file.
	   *
	   * @param {String} name
	   * @returns {String}
	   */
	  prototype.getPath = function(name, options) {
	    return this.getRoot(options) + '/' + name + this.options.suffix + '.js';
	  };

	  Pusher.DependencyLoader = DependencyLoader;
	}).call(this);

	;(function() {
	  Pusher.DependenciesReceivers = new Pusher.ScriptReceiverFactory(
	    "_pusher_dependencies", "Pusher.DependenciesReceivers"
	  );
	  Pusher.Dependencies = new Pusher.DependencyLoader({
	    cdn_http: Pusher.cdn_http,
	    cdn_https: Pusher.cdn_https,
	    version: Pusher.VERSION,
	    suffix: Pusher.dependency_suffix,
	    receivers: Pusher.DependenciesReceivers
	  });

	  function initialize() {
	    Pusher.ready();
	  }

	  // Allows calling a function when the document body is available
	   function onDocumentBody(callback) {
	    if (document.body) {
	      callback();
	    } else {
	      setTimeout(function() {
	        onDocumentBody(callback);
	      }, 0);
	    }
	  }

	  function initializeOnDocumentBody() {
	    onDocumentBody(initialize);
	  }

	  if (!window.JSON) {
	    Pusher.Dependencies.load("json2", {}, initializeOnDocumentBody);
	  } else {
	    initializeOnDocumentBody();
	  }
	})();

	(function() {

	  var Base64 = {
	    encode: function (s) {
	      return btoa(utob(s));
	    }
	  };

	  var fromCharCode = String.fromCharCode;

	  var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  var b64tab = {};

	  for (var i = 0, l = b64chars.length; i < l; i++) {
	    b64tab[b64chars.charAt(i)] = i;
	  }

	  var cb_utob = function(c) {
	    var cc = c.charCodeAt(0);
	    return cc < 0x80 ? c
	        : cc < 0x800 ? fromCharCode(0xc0 | (cc >>> 6)) +
	                       fromCharCode(0x80 | (cc & 0x3f))
	        : fromCharCode(0xe0 | ((cc >>> 12) & 0x0f)) +
	          fromCharCode(0x80 | ((cc >>>  6) & 0x3f)) +
	          fromCharCode(0x80 | ( cc         & 0x3f));
	  };

	  var utob = function(u) {
	    return u.replace(/[^\x00-\x7F]/g, cb_utob);
	  };

	  var cb_encode = function(ccc) {
	    var padlen = [0, 2, 1][ccc.length % 3];
	    var ord = ccc.charCodeAt(0) << 16
	      | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
	      | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0));
	    var chars = [
	      b64chars.charAt( ord >>> 18),
	      b64chars.charAt((ord >>> 12) & 63),
	      padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
	      padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
	    ];
	    return chars.join('');
	  };

	  var btoa = window.btoa || function(b) {
	    return b.replace(/[\s\S]{1,3}/g, cb_encode);
	  };

	  Pusher.Base64 = Base64;

	}).call(this);

	(function() {
	  /** Sends data via JSONP.
	   *
	   * Data is a key-value map. Its values are JSON-encoded and then passed
	   * through base64. Finally, keys and encoded values are appended to the query
	   * string.
	   *
	   * The class itself does not guarantee raising errors on failures, as it's not
	   * possible to support such feature on all browsers. Instead, JSONP endpoint
	   * should call back in a way that's easy to distinguish from browser calls,
	   * for example by passing a second argument to the receiver.
	   *
	   * @param {String} url
	   * @param {Object} data key-value map of data to be submitted
	   */
	  function JSONPRequest(url, data) {
	    this.url = url;
	    this.data = data;
	  }
	  var prototype = JSONPRequest.prototype;

	  /** Sends the actual JSONP request.
	   *
	   * @param {ScriptReceiver} receiver
	   */
	  prototype.send = function(receiver) {
	    if (this.request) {
	      return;
	    }

	    var params = Pusher.Util.filterObject(this.data, function(value) {
	      return value !== undefined;
	    });
	    var query = Pusher.Util.map(
	      Pusher.Util.flatten(encodeParamsObject(params)),
	      Pusher.Util.method("join", "=")
	    ).join("&");
	    var url = this.url + "/" + receiver.number + "?" + query;

	    this.request = new Pusher.ScriptRequest(url);
	    this.request.send(receiver);
	  };

	  /** Cleans up the DOM remains of the JSONP request. */
	  prototype.cleanup = function() {
	    if (this.request) {
	      this.request.cleanup();
	    }
	  };

	  function encodeParamsObject(data) {
	    return Pusher.Util.mapObject(data, function(value) {
	      if (typeof value === "object") {
	        value = JSON.stringify(value);
	      }
	      return encodeURIComponent(Pusher.Base64.encode(value.toString()));
	    });
	  }

	  Pusher.JSONPRequest = JSONPRequest;
	}).call(this);

	(function() {
	  function Timeline(key, session, options) {
	    this.key = key;
	    this.session = session;
	    this.events = [];
	    this.options = options || {};
	    this.sent = 0;
	    this.uniqueID = 0;
	  }
	  var prototype = Timeline.prototype;

	  // Log levels
	  Timeline.ERROR = 3;
	  Timeline.INFO = 6;
	  Timeline.DEBUG = 7;

	  prototype.log = function(level, event) {
	    if (level <= this.options.level) {
	      this.events.push(
	        Pusher.Util.extend({}, event, { timestamp: Pusher.Util.now() })
	      );
	      if (this.options.limit && this.events.length > this.options.limit) {
	        this.events.shift();
	      }
	    }
	  };

	  prototype.error = function(event) {
	    this.log(Timeline.ERROR, event);
	  };

	  prototype.info = function(event) {
	    this.log(Timeline.INFO, event);
	  };

	  prototype.debug = function(event) {
	    this.log(Timeline.DEBUG, event);
	  };

	  prototype.isEmpty = function() {
	    return this.events.length === 0;
	  };

	  prototype.send = function(sendJSONP, callback) {
	    var self = this;

	    var data = Pusher.Util.extend({
	      session: self.session,
	      bundle: self.sent + 1,
	      key: self.key,
	      lib: "js",
	      version: self.options.version,
	      cluster: self.options.cluster,
	      features: self.options.features,
	      timeline: self.events
	    }, self.options.params);

	    self.events = [];
	    sendJSONP(data, function(error, result) {
	      if (!error) {
	        self.sent++;
	      }
	      if (callback) {
	        callback(error, result);
	      }
	    });

	    return true;
	  };

	  prototype.generateUniqueID = function() {
	    this.uniqueID++;
	    return this.uniqueID;
	  };

	  Pusher.Timeline = Timeline;
	}).call(this);

	(function() {
	  function TimelineSender(timeline, options) {
	    this.timeline = timeline;
	    this.options = options || {};
	  }
	  var prototype = TimelineSender.prototype;

	  prototype.send = function(encrypted, callback) {
	    var self = this;

	    if (self.timeline.isEmpty()) {
	      return;
	    }

	    var sendJSONP = function(data, callback) {
	      var scheme = "http" + (encrypted ? "s" : "") + "://";
	      var url = scheme + (self.host || self.options.host) + self.options.path;
	      var request = new Pusher.JSONPRequest(url, data);

	      var receiver = Pusher.ScriptReceivers.create(function(error, result) {
	        Pusher.ScriptReceivers.remove(receiver);
	        request.cleanup();

	        if (result && result.host) {
	          self.host = result.host;
	        }
	        if (callback) {
	          callback(error, result);
	        }
	      });
	      request.send(receiver);
	    };
	    self.timeline.send(sendJSONP, callback);
	  };

	  Pusher.TimelineSender = TimelineSender;
	}).call(this);

	;(function() {
	  /** Launches all substrategies and emits prioritized connected transports.
	   *
	   * @param {Array} strategies
	   */
	  function BestConnectedEverStrategy(strategies) {
	    this.strategies = strategies;
	  }
	  var prototype = BestConnectedEverStrategy.prototype;

	  prototype.isSupported = function() {
	    return Pusher.Util.any(this.strategies, Pusher.Util.method("isSupported"));
	  };

	  prototype.connect = function(minPriority, callback) {
	    return connect(this.strategies, minPriority, function(i, runners) {
	      return function(error, handshake) {
	        runners[i].error = error;
	        if (error) {
	          if (allRunnersFailed(runners)) {
	            callback(true);
	          }
	          return;
	        }
	        Pusher.Util.apply(runners, function(runner) {
	          runner.forceMinPriority(handshake.transport.priority);
	        });
	        callback(null, handshake);
	      };
	    });
	  };

	  /** Connects to all strategies in parallel.
	   *
	   * Callback builder should be a function that takes two arguments: index
	   * and a list of runners. It should return another function that will be
	   * passed to the substrategy with given index. Runners can be aborted using
	   * abortRunner(s) functions from this class.
	   *
	   * @param  {Array} strategies
	   * @param  {Function} callbackBuilder
	   * @return {Object} strategy runner
	   */
	  function connect(strategies, minPriority, callbackBuilder) {
	    var runners = Pusher.Util.map(strategies, function(strategy, i, _, rs) {
	      return strategy.connect(minPriority, callbackBuilder(i, rs));
	    });
	    return {
	      abort: function() {
	        Pusher.Util.apply(runners, abortRunner);
	      },
	      forceMinPriority: function(p) {
	        Pusher.Util.apply(runners, function(runner) {
	          runner.forceMinPriority(p);
	        });
	      }
	    };
	  }

	  function allRunnersFailed(runners) {
	    return Pusher.Util.all(runners, function(runner) {
	      return Boolean(runner.error);
	    });
	  }

	  function abortRunner(runner) {
	    if (!runner.error && !runner.aborted) {
	      runner.abort();
	      runner.aborted = true;
	    }
	  }

	  Pusher.BestConnectedEverStrategy = BestConnectedEverStrategy;
	}).call(this);

	;(function() {
	  /** Caches last successful transport and uses it for following attempts.
	   *
	   * @param {Strategy} strategy
	   * @param {Object} transports
	   * @param {Object} options
	   */
	  function CachedStrategy(strategy, transports, options) {
	    this.strategy = strategy;
	    this.transports = transports;
	    this.ttl = options.ttl || 1800*1000;
	    this.encrypted = options.encrypted;
	    this.timeline = options.timeline;
	  }
	  var prototype = CachedStrategy.prototype;

	  prototype.isSupported = function() {
	    return this.strategy.isSupported();
	  };

	  prototype.connect = function(minPriority, callback) {
	    var encrypted = this.encrypted;
	    var info = fetchTransportCache(encrypted);

	    var strategies = [this.strategy];
	    if (info && info.timestamp + this.ttl >= Pusher.Util.now()) {
	      var transport = this.transports[info.transport];
	      if (transport) {
	        this.timeline.info({
	          cached: true,
	          transport: info.transport,
	          latency: info.latency
	        });
	        strategies.push(new Pusher.SequentialStrategy([transport], {
	          timeout: info.latency * 2 + 1000,
	          failFast: true
	        }));
	      }
	    }

	    var startTimestamp = Pusher.Util.now();
	    var runner = strategies.pop().connect(
	      minPriority,
	      function cb(error, handshake) {
	        if (error) {
	          flushTransportCache(encrypted);
	          if (strategies.length > 0) {
	            startTimestamp = Pusher.Util.now();
	            runner = strategies.pop().connect(minPriority, cb);
	          } else {
	            callback(error);
	          }
	        } else {
	          storeTransportCache(
	            encrypted,
	            handshake.transport.name,
	            Pusher.Util.now() - startTimestamp
	          );
	          callback(null, handshake);
	        }
	      }
	    );

	    return {
	      abort: function() {
	        runner.abort();
	      },
	      forceMinPriority: function(p) {
	        minPriority = p;
	        if (runner) {
	          runner.forceMinPriority(p);
	        }
	      }
	    };
	  };

	  function getTransportCacheKey(encrypted) {
	    return "pusherTransport" + (encrypted ? "Encrypted" : "Unencrypted");
	  }

	  function fetchTransportCache(encrypted) {
	    var storage = Pusher.Util.getLocalStorage();
	    if (storage) {
	      try {
	        var serializedCache = storage[getTransportCacheKey(encrypted)];
	        if (serializedCache) {
	          return JSON.parse(serializedCache);
	        }
	      } catch (e) {
	        flushTransportCache(encrypted);
	      }
	    }
	    return null;
	  }

	  function storeTransportCache(encrypted, transport, latency) {
	    var storage = Pusher.Util.getLocalStorage();
	    if (storage) {
	      try {
	        storage[getTransportCacheKey(encrypted)] = JSON.stringify({
	          timestamp: Pusher.Util.now(),
	          transport: transport,
	          latency: latency
	        });
	      } catch (e) {
	        // catch over quota exceptions raised by localStorage
	      }
	    }
	  }

	  function flushTransportCache(encrypted) {
	    var storage = Pusher.Util.getLocalStorage();
	    if (storage) {
	      try {
	        delete storage[getTransportCacheKey(encrypted)];
	      } catch (e) {
	        // catch exceptions raised by localStorage
	      }
	    }
	  }

	  Pusher.CachedStrategy = CachedStrategy;
	}).call(this);

	;(function() {
	  /** Runs substrategy after specified delay.
	   *
	   * Options:
	   * - delay - time in miliseconds to delay the substrategy attempt
	   *
	   * @param {Strategy} strategy
	   * @param {Object} options
	   */
	  function DelayedStrategy(strategy, options) {
	    this.strategy = strategy;
	    this.options = { delay: options.delay };
	  }
	  var prototype = DelayedStrategy.prototype;

	  prototype.isSupported = function() {
	    return this.strategy.isSupported();
	  };

	  prototype.connect = function(minPriority, callback) {
	    var strategy = this.strategy;
	    var runner;
	    var timer = new Pusher.Timer(this.options.delay, function() {
	      runner = strategy.connect(minPriority, callback);
	    });

	    return {
	      abort: function() {
	        timer.ensureAborted();
	        if (runner) {
	          runner.abort();
	        }
	      },
	      forceMinPriority: function(p) {
	        minPriority = p;
	        if (runner) {
	          runner.forceMinPriority(p);
	        }
	      }
	    };
	  };

	  Pusher.DelayedStrategy = DelayedStrategy;
	}).call(this);

	;(function() {
	  /** Launches the substrategy and terminates on the first open connection.
	   *
	   * @param {Strategy} strategy
	   */
	  function FirstConnectedStrategy(strategy) {
	    this.strategy = strategy;
	  }
	  var prototype = FirstConnectedStrategy.prototype;

	  prototype.isSupported = function() {
	    return this.strategy.isSupported();
	  };

	  prototype.connect = function(minPriority, callback) {
	    var runner = this.strategy.connect(
	      minPriority,
	      function(error, handshake) {
	        if (handshake) {
	          runner.abort();
	        }
	        callback(error, handshake);
	      }
	    );
	    return runner;
	  };

	  Pusher.FirstConnectedStrategy = FirstConnectedStrategy;
	}).call(this);

	;(function() {
	  /** Proxies method calls to one of substrategies basing on the test function.
	   *
	   * @param {Function} test
	   * @param {Strategy} trueBranch strategy used when test returns true
	   * @param {Strategy} falseBranch strategy used when test returns false
	   */
	  function IfStrategy(test, trueBranch, falseBranch) {
	    this.test = test;
	    this.trueBranch = trueBranch;
	    this.falseBranch = falseBranch;
	  }
	  var prototype = IfStrategy.prototype;

	  prototype.isSupported = function() {
	    var branch = this.test() ? this.trueBranch : this.falseBranch;
	    return branch.isSupported();
	  };

	  prototype.connect = function(minPriority, callback) {
	    var branch = this.test() ? this.trueBranch : this.falseBranch;
	    return branch.connect(minPriority, callback);
	  };

	  Pusher.IfStrategy = IfStrategy;
	}).call(this);

	;(function() {
	  /** Loops through strategies with optional timeouts.
	   *
	   * Options:
	   * - loop - whether it should loop through the substrategy list
	   * - timeout - initial timeout for a single substrategy
	   * - timeoutLimit - maximum timeout
	   *
	   * @param {Strategy[]} strategies
	   * @param {Object} options
	   */
	  function SequentialStrategy(strategies, options) {
	    this.strategies = strategies;
	    this.loop = Boolean(options.loop);
	    this.failFast = Boolean(options.failFast);
	    this.timeout = options.timeout;
	    this.timeoutLimit = options.timeoutLimit;
	  }
	  var prototype = SequentialStrategy.prototype;

	  prototype.isSupported = function() {
	    return Pusher.Util.any(this.strategies, Pusher.Util.method("isSupported"));
	  };

	  prototype.connect = function(minPriority, callback) {
	    var self = this;

	    var strategies = this.strategies;
	    var current = 0;
	    var timeout = this.timeout;
	    var runner = null;

	    var tryNextStrategy = function(error, handshake) {
	      if (handshake) {
	        callback(null, handshake);
	      } else {
	        current = current + 1;
	        if (self.loop) {
	          current = current % strategies.length;
	        }

	        if (current < strategies.length) {
	          if (timeout) {
	            timeout = timeout * 2;
	            if (self.timeoutLimit) {
	              timeout = Math.min(timeout, self.timeoutLimit);
	            }
	          }
	          runner = self.tryStrategy(
	            strategies[current],
	            minPriority,
	            { timeout: timeout, failFast: self.failFast },
	            tryNextStrategy
	          );
	        } else {
	          callback(true);
	        }
	      }
	    };

	    runner = this.tryStrategy(
	      strategies[current],
	      minPriority,
	      { timeout: timeout, failFast: this.failFast },
	      tryNextStrategy
	    );

	    return {
	      abort: function() {
	        runner.abort();
	      },
	      forceMinPriority: function(p) {
	        minPriority = p;
	        if (runner) {
	          runner.forceMinPriority(p);
	        }
	      }
	    };
	  };

	  /** @private */
	  prototype.tryStrategy = function(strategy, minPriority, options, callback) {
	    var timer = null;
	    var runner = null;

	    if (options.timeout > 0) {
	      timer = new Pusher.Timer(options.timeout, function() {
	        runner.abort();
	        callback(true);
	      });
	    }

	    runner = strategy.connect(minPriority, function(error, handshake) {
	      if (error && timer && timer.isRunning() && !options.failFast) {
	        // advance to the next strategy after the timeout
	        return;
	      }
	      if (timer) {
	        timer.ensureAborted();
	      }
	      callback(error, handshake);
	    });

	    return {
	      abort: function() {
	        if (timer) {
	          timer.ensureAborted();
	        }
	        runner.abort();
	      },
	      forceMinPriority: function(p) {
	        runner.forceMinPriority(p);
	      }
	    };
	  };

	  Pusher.SequentialStrategy = SequentialStrategy;
	}).call(this);

	;(function() {
	  /** Provides a strategy interface for transports.
	   *
	   * @param {String} name
	   * @param {Number} priority
	   * @param {Class} transport
	   * @param {Object} options
	   */
	  function TransportStrategy(name, priority, transport, options) {
	    this.name = name;
	    this.priority = priority;
	    this.transport = transport;
	    this.options = options || {};
	  }
	  var prototype = TransportStrategy.prototype;

	  /** Returns whether the transport is supported in the browser.
	   *
	   * @returns {Boolean}
	   */
	  prototype.isSupported = function() {
	    return this.transport.isSupported({
	      encrypted: this.options.encrypted
	    });
	  };

	  /** Launches a connection attempt and returns a strategy runner.
	   *
	   * @param  {Function} callback
	   * @return {Object} strategy runner
	   */
	  prototype.connect = function(minPriority, callback) {
	    if (!this.isSupported()) {
	      return failAttempt(new Pusher.Errors.UnsupportedStrategy(), callback);
	    } else if (this.priority < minPriority) {
	      return failAttempt(new Pusher.Errors.TransportPriorityTooLow(), callback);
	    }

	    var self = this;
	    var connected = false;

	    var transport = this.transport.createConnection(
	      this.name, this.priority, this.options.key, this.options
	    );
	    var handshake = null;

	    var onInitialized = function() {
	      transport.unbind("initialized", onInitialized);
	      transport.connect();
	    };
	    var onOpen = function() {
	      handshake = new Pusher.Handshake(transport, function(result) {
	        connected = true;
	        unbindListeners();
	        callback(null, result);
	      });
	    };
	    var onError = function(error) {
	      unbindListeners();
	      callback(error);
	    };
	    var onClosed = function() {
	      unbindListeners();
	      callback(new Pusher.Errors.TransportClosed(transport));
	    };

	    var unbindListeners = function() {
	      transport.unbind("initialized", onInitialized);
	      transport.unbind("open", onOpen);
	      transport.unbind("error", onError);
	      transport.unbind("closed", onClosed);
	    };

	    transport.bind("initialized", onInitialized);
	    transport.bind("open", onOpen);
	    transport.bind("error", onError);
	    transport.bind("closed", onClosed);

	    // connect will be called automatically after initialization
	    transport.initialize();

	    return {
	      abort: function() {
	        if (connected) {
	          return;
	        }
	        unbindListeners();
	        if (handshake) {
	          handshake.close();
	        } else {
	          transport.close();
	        }
	      },
	      forceMinPriority: function(p) {
	        if (connected) {
	          return;
	        }
	        if (self.priority < p) {
	          if (handshake) {
	            handshake.close();
	          } else {
	            transport.close();
	          }
	        }
	      }
	    };
	  };

	  function failAttempt(error, callback) {
	    Pusher.Util.defer(function() {
	      callback(error);
	    });
	    return {
	      abort: function() {},
	      forceMinPriority: function() {}
	    };
	  }

	  Pusher.TransportStrategy = TransportStrategy;
	}).call(this);

	(function() {
	  function getGenericURL(baseScheme, params, path) {
	    var scheme = baseScheme + (params.encrypted ? "s" : "");
	    var host = params.encrypted ? params.hostEncrypted : params.hostUnencrypted;
	    return scheme + "://" + host + path;
	  }

	  function getGenericPath(key, queryString) {
	    var path = "/app/" + key;
	    var query =
	      "?protocol=" + Pusher.PROTOCOL +
	      "&client=js" +
	      "&version=" + Pusher.VERSION +
	      (queryString ? ("&" + queryString) : "");
	    return path + query;
	  }

	  /** URL schemes for different transport types. */
	  Pusher.URLSchemes = {
	    /** Standard WebSocket URL scheme. */
	    ws: {
	      getInitial: function(key, params) {
	        return getGenericURL("ws", params, getGenericPath(key, "flash=false"));
	      }
	    },
	    /** SockJS URL scheme. Supplies the path separately from the initial URL. */
	    sockjs: {
	      getInitial: function(key, params) {
	        return getGenericURL("http", params, params.httpPath || "/pusher", "");
	      },
	      getPath: function(key, params) {
	        return getGenericPath(key);
	      }
	    },
	    /** URL scheme for HTTP transports. Basically, WS scheme with a prefix. */
	    http: {
	      getInitial: function(key, params) {
	        var path = (params.httpPath || "/pusher") + getGenericPath(key);
	        return getGenericURL("http", params, path);
	      }
	    }
	  };
	}).call(this);

	(function() {
	  /** Provides universal API for transport connections.
	   *
	   * Transport connection is a low-level object that wraps a connection method
	   * and exposes a simple evented interface for the connection state and
	   * messaging. It does not implement Pusher-specific WebSocket protocol.
	   *
	   * Additionally, it fetches resources needed for transport to work and exposes
	   * an interface for querying transport features.
	   *
	   * States:
	   * - new - initial state after constructing the object
	   * - initializing - during initialization phase, usually fetching resources
	   * - intialized - ready to establish a connection
	   * - connection - when connection is being established
	   * - open - when connection ready to be used
	   * - closed - after connection was closed be either side
	   *
	   * Emits:
	   * - error - after the connection raised an error
	   *
	   * Options:
	   * - encrypted - whether connection should use ssl
	   * - hostEncrypted - host to connect to when connection is encrypted
	   * - hostUnencrypted - host to connect to when connection is not encrypted
	   *
	   * @param {String} key application key
	   * @param {Object} options
	   */
	  function TransportConnection(hooks, name, priority, key, options) {
	    Pusher.EventsDispatcher.call(this);

	    this.hooks = hooks;
	    this.name = name;
	    this.priority = priority;
	    this.key = key;
	    this.options = options;

	    this.state = "new";
	    this.timeline = options.timeline;
	    this.activityTimeout = options.activityTimeout;
	    this.id = this.timeline.generateUniqueID();
	  }
	  var prototype = TransportConnection.prototype;
	  Pusher.Util.extend(prototype, Pusher.EventsDispatcher.prototype);

	  /** Checks whether the transport handles activity checks by itself.
	   *
	   * @return {Boolean}
	   */
	  prototype.handlesActivityChecks = function() {
	    return Boolean(this.hooks.handlesActivityChecks);
	  };

	  /** Checks whether the transport supports the ping/pong API.
	   *
	   * @return {Boolean}
	   */
	  prototype.supportsPing = function() {
	    return Boolean(this.hooks.supportsPing);
	  };

	  /** Initializes the transport.
	   *
	   * Fetches resources if needed and then transitions to initialized.
	   */
	  prototype.initialize = function() {
	    var self = this;

	    self.timeline.info(self.buildTimelineMessage({
	      transport: self.name + (self.options.encrypted ? "s" : "")
	    }));

	    if (self.hooks.isInitialized()) {
	      self.changeState("initialized");
	    } else if (self.hooks.file) {
	      self.changeState("initializing");
	      Pusher.Dependencies.load(
	        self.hooks.file,
	        { encrypted: self.options.encrypted },
	        function(error, callback) {
	          if (self.hooks.isInitialized()) {
	            self.changeState("initialized");
	            callback(true);
	          } else {
	            if (error) {
	              self.onError(error);
	            }
	            self.onClose();
	            callback(false);
	          }
	        }
	      );
	    } else {
	      self.onClose();
	    }
	  };

	  /** Tries to establish a connection.
	   *
	   * @returns {Boolean} false if transport is in invalid state
	   */
	  prototype.connect = function() {
	    var self = this;

	    if (self.socket || self.state !== "initialized") {
	      return false;
	    }

	    var url = self.hooks.urls.getInitial(self.key, self.options);
	    try {
	      self.socket = self.hooks.getSocket(url, self.options);
	    } catch (e) {
	      Pusher.Util.defer(function() {
	        self.onError(e);
	        self.changeState("closed");
	      });
	      return false;
	    }

	    self.bindListeners();

	    Pusher.debug("Connecting", { transport: self.name, url: url });
	    self.changeState("connecting");
	    return true;
	  };

	  /** Closes the connection.
	   *
	   * @return {Boolean} true if there was a connection to close
	   */
	  prototype.close = function() {
	    if (this.socket) {
	      this.socket.close();
	      return true;
	    } else {
	      return false;
	    }
	  };

	  /** Sends data over the open connection.
	   *
	   * @param {String} data
	   * @return {Boolean} true only when in the "open" state
	   */
	  prototype.send = function(data) {
	    var self = this;

	    if (self.state === "open") {
	      // Workaround for MobileSafari bug (see https://gist.github.com/2052006)
	      Pusher.Util.defer(function() {
	        if (self.socket) {
	          self.socket.send(data);
	        }
	      });
	      return true;
	    } else {
	      return false;
	    }
	  };

	  /** Sends a ping if the connection is open and transport supports it. */
	  prototype.ping = function() {
	    if (this.state === "open" && this.supportsPing()) {
	      this.socket.ping();
	    }
	  };

	  /** @private */
	  prototype.onOpen = function() {
	    if (this.hooks.beforeOpen) {
	      this.hooks.beforeOpen(
	        this.socket, this.hooks.urls.getPath(this.key, this.options)
	      );
	    }
	    this.changeState("open");
	    this.socket.onopen = undefined;
	  };

	  /** @private */
	  prototype.onError = function(error) {
	    this.emit("error", { type: 'WebSocketError', error: error });
	    this.timeline.error(this.buildTimelineMessage({ error: error.toString() }));
	  };

	  /** @private */
	  prototype.onClose = function(closeEvent) {
	    if (closeEvent) {
	      this.changeState("closed", {
	        code: closeEvent.code,
	        reason: closeEvent.reason,
	        wasClean: closeEvent.wasClean
	      });
	    } else {
	      this.changeState("closed");
	    }
	    this.unbindListeners();
	    this.socket = undefined;
	  };

	  /** @private */
	  prototype.onMessage = function(message) {
	    this.emit("message", message);
	  };

	  /** @private */
	  prototype.onActivity = function() {
	    this.emit("activity");
	  };

	  /** @private */
	  prototype.bindListeners = function() {
	    var self = this;

	    self.socket.onopen = function() {
	      self.onOpen();
	    };
	    self.socket.onerror = function(error) {
	      self.onError(error);
	    };
	    self.socket.onclose = function(closeEvent) {
	      self.onClose(closeEvent);
	    };
	    self.socket.onmessage = function(message) {
	      self.onMessage(message);
	    };

	    if (self.supportsPing()) {
	      self.socket.onactivity = function() { self.onActivity(); };
	    }
	  };

	  /** @private */
	  prototype.unbindListeners = function() {
	    if (this.socket) {
	      this.socket.onopen = undefined;
	      this.socket.onerror = undefined;
	      this.socket.onclose = undefined;
	      this.socket.onmessage = undefined;
	      if (this.supportsPing()) {
	        this.socket.onactivity = undefined;
	      }
	    }
	  };

	  /** @private */
	  prototype.changeState = function(state, params) {
	    this.state = state;
	    this.timeline.info(this.buildTimelineMessage({
	      state: state,
	      params: params
	    }));
	    this.emit(state, params);
	  };

	  /** @private */
	  prototype.buildTimelineMessage = function(message) {
	    return Pusher.Util.extend({ cid: this.id }, message);
	  };

	  Pusher.TransportConnection = TransportConnection;
	}).call(this);

	(function() {
	  /** Provides interface for transport connection instantiation.
	   *
	   * Takes transport-specific hooks as the only argument, which allow checking
	   * for transport support and creating its connections.
	   *
	   * Supported hooks:
	   * - file - the name of the file to be fetched during initialization
	   * - urls - URL scheme to be used by transport
	   * - handlesActivityCheck - true when the transport handles activity checks
	   * - supportsPing - true when the transport has a ping/activity API
	   * - isSupported - tells whether the transport is supported in the environment
	   * - getSocket - creates a WebSocket-compatible transport socket
	   *
	   * See transports.js for specific implementations.
	   *
	   * @param {Object} hooks object containing all needed transport hooks
	   */
	  function Transport(hooks) {
	    this.hooks = hooks;
	  }
	  var prototype = Transport.prototype;

	  /** Returns whether the transport is supported in the environment.
	   *
	   * @param {Object} environment the environment details (encryption, settings)
	   * @returns {Boolean} true when the transport is supported
	   */
	  prototype.isSupported = function(environment) {
	    return this.hooks.isSupported(environment);
	  };

	  /** Creates a transport connection.
	   *
	   * @param {String} name
	   * @param {Number} priority
	   * @param {String} key the application key
	   * @param {Object} options
	   * @returns {TransportConnection}
	   */
	  prototype.createConnection = function(name, priority, key, options) {
	    return new Pusher.TransportConnection(
	      this.hooks, name, priority, key, options
	    );
	  };

	  Pusher.Transport = Transport;
	}).call(this);

	(function() {
	  /** WebSocket transport.
	   *
	   * Uses native WebSocket implementation, including MozWebSocket supported by
	   * earlier Firefox versions.
	   */
	  Pusher.WSTransport = new Pusher.Transport({
	    urls: Pusher.URLSchemes.ws,
	    handlesActivityChecks: false,
	    supportsPing: false,

	    isInitialized: function() {
	      return Boolean(window.WebSocket || window.MozWebSocket);
	    },
	    isSupported: function() {
	      return Boolean(window.WebSocket || window.MozWebSocket);
	    },
	    getSocket: function(url) {
	      var Constructor = window.WebSocket || window.MozWebSocket;
	      return new Constructor(url);
	    }
	  });

	  /** SockJS transport. */
	  Pusher.SockJSTransport = new Pusher.Transport({
	    file: "sockjs",
	    urls: Pusher.URLSchemes.sockjs,
	    handlesActivityChecks: true,
	    supportsPing: false,

	    isSupported: function() {
	      return true;
	    },
	    isInitialized: function() {
	      return window.SockJS !== undefined;
	    },
	    getSocket: function(url, options) {
	      return new SockJS(url, null, {
	        js_path: Pusher.Dependencies.getPath("sockjs", {
	          encrypted: options.encrypted
	        }),
	        ignore_null_origin: options.ignoreNullOrigin
	      });
	    },
	    beforeOpen: function(socket, path) {
	      socket.send(JSON.stringify({
	        path: path
	      }));
	    }
	  });

	  var httpConfiguration = {
	    urls: Pusher.URLSchemes.http,
	    handlesActivityChecks: false,
	    supportsPing: true,
	    isInitialized: function() {
	      return Boolean(Pusher.HTTP.Socket);
	    }
	  };

	  var streamingConfiguration = Pusher.Util.extend(
	    { getSocket: function(url) {
	        return Pusher.HTTP.getStreamingSocket(url);
	      }
	    },
	    httpConfiguration
	  );
	  var pollingConfiguration = Pusher.Util.extend(
	    { getSocket: function(url) {
	        return Pusher.HTTP.getPollingSocket(url);
	      }
	    },
	    httpConfiguration
	  );

	  var xhrConfiguration = {
	    file: "xhr",
	    isSupported: Pusher.Util.isXHRSupported
	  };
	  var xdrConfiguration = {
	    file: "xdr",
	    isSupported: function(environment) {
	      return Pusher.Util.isXDRSupported(environment.encrypted);
	    }
	  };

	  /** HTTP streaming transport using CORS-enabled XMLHttpRequest. */
	  Pusher.XHRStreamingTransport = new Pusher.Transport(
	    Pusher.Util.extend({}, streamingConfiguration, xhrConfiguration)
	  );
	  /** HTTP streaming transport using XDomainRequest (IE 8,9). */
	  Pusher.XDRStreamingTransport = new Pusher.Transport(
	    Pusher.Util.extend({}, streamingConfiguration, xdrConfiguration)
	  );
	  /** HTTP long-polling transport using CORS-enabled XMLHttpRequest. */
	  Pusher.XHRPollingTransport = new Pusher.Transport(
	    Pusher.Util.extend({}, pollingConfiguration, xhrConfiguration)
	  );
	  /** HTTP long-polling transport using XDomainRequest (IE 8,9). */
	  Pusher.XDRPollingTransport = new Pusher.Transport(
	    Pusher.Util.extend({}, pollingConfiguration, xdrConfiguration)
	  );
	}).call(this);

	;(function() {
	  /** Creates transport connections monitored by a transport manager.
	   *
	   * When a transport is closed, it might mean the environment does not support
	   * it. It's possible that messages get stuck in an intermediate buffer or
	   * proxies terminate inactive connections. To combat these problems,
	   * assistants monitor the connection lifetime, report unclean exits and
	   * adjust ping timeouts to keep the connection active. The decision to disable
	   * a transport is the manager's responsibility.
	   *
	   * @param {TransportManager} manager
	   * @param {TransportConnection} transport
	   * @param {Object} options
	   */
	  function AssistantToTheTransportManager(manager, transport, options) {
	    this.manager = manager;
	    this.transport = transport;
	    this.minPingDelay = options.minPingDelay;
	    this.maxPingDelay = options.maxPingDelay;
	    this.pingDelay = undefined;
	  }
	  var prototype = AssistantToTheTransportManager.prototype;

	  /** Creates a transport connection.
	   *
	   * This function has the same API as Transport#createConnection.
	   *
	   * @param {String} name
	   * @param {Number} priority
	   * @param {String} key the application key
	   * @param {Object} options
	   * @returns {TransportConnection}
	   */
	  prototype.createConnection = function(name, priority, key, options) {
	    var self = this;

	    options = Pusher.Util.extend({}, options, {
	      activityTimeout: self.pingDelay
	    });
	    var connection = self.transport.createConnection(
	      name, priority, key, options
	    );

	    var openTimestamp = null;

	    var onOpen = function() {
	      connection.unbind("open", onOpen);
	      connection.bind("closed", onClosed);
	      openTimestamp = Pusher.Util.now();
	    };
	    var onClosed = function(closeEvent) {
	      connection.unbind("closed", onClosed);

	      if (closeEvent.code === 1002 || closeEvent.code === 1003) {
	        // we don't want to use transports not obeying the protocol
	        self.manager.reportDeath();
	      } else if (!closeEvent.wasClean && openTimestamp) {
	        // report deaths only for short-living transport
	        var lifespan = Pusher.Util.now() - openTimestamp;
	        if (lifespan < 2 * self.maxPingDelay) {
	          self.manager.reportDeath();
	          self.pingDelay = Math.max(lifespan / 2, self.minPingDelay);
	        }
	      }
	    };

	    connection.bind("open", onOpen);
	    return connection;
	  };

	  /** Returns whether the transport is supported in the environment.
	   *
	   * This function has the same API as Transport#isSupported. Might return false
	   * when the manager decides to kill the transport.
	   *
	   * @param {Object} environment the environment details (encryption, settings)
	   * @returns {Boolean} true when the transport is supported
	   */
	  prototype.isSupported = function(environment) {
	    return this.manager.isAlive() && this.transport.isSupported(environment);
	  };

	  Pusher.AssistantToTheTransportManager = AssistantToTheTransportManager;
	}).call(this);

	;(function() {
	  /** Keeps track of the number of lives left for a transport.
	   *
	   * In the beginning of a session, transports may be assigned a number of
	   * lives. When an AssistantToTheTransportManager instance reports a transport
	   * connection closed uncleanly, the transport loses a life. When the number
	   * of lives drops to zero, the transport gets disabled by its manager.
	   *
	   * @param {Object} options
	   */
	  function TransportManager(options) {
	    this.options = options || {};
	    this.livesLeft = this.options.lives || Infinity;
	  }
	  var prototype = TransportManager.prototype;

	  /** Creates a assistant for the transport.
	   *
	   * @param {Transport} transport
	   * @returns {AssistantToTheTransportManager}
	   */
	  prototype.getAssistant = function(transport) {
	    return new Pusher.AssistantToTheTransportManager(this, transport, {
	      minPingDelay: this.options.minPingDelay,
	      maxPingDelay: this.options.maxPingDelay
	    });
	  };

	  /** Returns whether the transport has any lives left.
	   *
	   * @returns {Boolean}
	   */
	  prototype.isAlive = function() {
	    return this.livesLeft > 0;
	  };

	  /** Takes one life from the transport. */
	  prototype.reportDeath = function() {
	    this.livesLeft -= 1;
	  };

	  Pusher.TransportManager = TransportManager;
	}).call(this);

	;(function() {
	  var StrategyBuilder = {
	    /** Transforms a JSON scheme to a strategy tree.
	     *
	     * @param {Array} scheme JSON strategy scheme
	     * @param {Object} options a hash of symbols to be included in the scheme
	     * @returns {Strategy} strategy tree that's represented by the scheme
	     */
	    build: function(scheme, options) {
	      var context = Pusher.Util.extend({}, globalContext, options);
	      return evaluate(scheme, context)[1].strategy;
	    }
	  };

	  var transports = {
	    ws: Pusher.WSTransport,
	    sockjs: Pusher.SockJSTransport,
	    xhr_streaming: Pusher.XHRStreamingTransport,
	    xdr_streaming: Pusher.XDRStreamingTransport,
	    xhr_polling: Pusher.XHRPollingTransport,
	    xdr_polling: Pusher.XDRPollingTransport
	  };

	  var UnsupportedStrategy = {
	    isSupported: function() {
	      return false;
	    },
	    connect: function(_, callback) {
	      var deferred = Pusher.Util.defer(function() {
	        callback(new Pusher.Errors.UnsupportedStrategy());
	      });
	      return {
	        abort: function() {
	          deferred.ensureAborted();
	        },
	        forceMinPriority: function() {}
	      };
	    }
	  };

	  // DSL bindings

	  function returnWithOriginalContext(f) {
	    return function(context) {
	      return [f.apply(this, arguments), context];
	    };
	  }

	  var globalContext = {
	    extend: function(context, first, second) {
	      return [Pusher.Util.extend({}, first, second), context];
	    },

	    def: function(context, name, value) {
	      if (context[name] !== undefined) {
	        throw "Redefining symbol " + name;
	      }
	      context[name] = value;
	      return [undefined, context];
	    },

	    def_transport: function(context, name, type, priority, options, manager) {
	      var transportClass = transports[type];
	      if (!transportClass) {
	        throw new Pusher.Errors.UnsupportedTransport(type);
	      }

	      var enabled =
	        (!context.enabledTransports ||
	          Pusher.Util.arrayIndexOf(context.enabledTransports, name) !== -1) &&
	        (!context.disabledTransports ||
	          Pusher.Util.arrayIndexOf(context.disabledTransports, name) === -1);

	      var transport;
	      if (enabled) {
	        transport = new Pusher.TransportStrategy(
	          name,
	          priority,
	          manager ? manager.getAssistant(transportClass) : transportClass,
	          Pusher.Util.extend({
	            key: context.key,
	            encrypted: context.encrypted,
	            timeline: context.timeline,
	            ignoreNullOrigin: context.ignoreNullOrigin
	          }, options)
	        );
	      } else {
	        transport = UnsupportedStrategy;
	      }

	      var newContext = context.def(context, name, transport)[1];
	      newContext.transports = context.transports || {};
	      newContext.transports[name] = transport;
	      return [undefined, newContext];
	    },

	    transport_manager: returnWithOriginalContext(function(_, options) {
	      return new Pusher.TransportManager(options);
	    }),

	    sequential: returnWithOriginalContext(function(_, options) {
	      var strategies = Array.prototype.slice.call(arguments, 2);
	      return new Pusher.SequentialStrategy(strategies, options);
	    }),

	    cached: returnWithOriginalContext(function(context, ttl, strategy){
	      return new Pusher.CachedStrategy(strategy, context.transports, {
	        ttl: ttl,
	        timeline: context.timeline,
	        encrypted: context.encrypted
	      });
	    }),

	    first_connected: returnWithOriginalContext(function(_, strategy) {
	      return new Pusher.FirstConnectedStrategy(strategy);
	    }),

	    best_connected_ever: returnWithOriginalContext(function() {
	      var strategies = Array.prototype.slice.call(arguments, 1);
	      return new Pusher.BestConnectedEverStrategy(strategies);
	    }),

	    delayed: returnWithOriginalContext(function(_, delay, strategy) {
	      return new Pusher.DelayedStrategy(strategy, { delay: delay });
	    }),

	    "if": returnWithOriginalContext(function(_, test, trueBranch, falseBranch) {
	      return new Pusher.IfStrategy(test, trueBranch, falseBranch);
	    }),

	    is_supported: returnWithOriginalContext(function(_, strategy) {
	      return function() {
	        return strategy.isSupported();
	      };
	    })
	  };

	  // DSL interpreter

	  function isSymbol(expression) {
	    return (typeof expression === "string") && expression.charAt(0) === ":";
	  }

	  function getSymbolValue(expression, context) {
	    return context[expression.slice(1)];
	  }

	  function evaluateListOfExpressions(expressions, context) {
	    if (expressions.length === 0) {
	      return [[], context];
	    }
	    var head = evaluate(expressions[0], context);
	    var tail = evaluateListOfExpressions(expressions.slice(1), head[1]);
	    return [[head[0]].concat(tail[0]), tail[1]];
	  }

	  function evaluateString(expression, context) {
	    if (!isSymbol(expression)) {
	      return [expression, context];
	    }
	    var value = getSymbolValue(expression, context);
	    if (value === undefined) {
	      throw "Undefined symbol " + expression;
	    }
	    return [value, context];
	  }

	  function evaluateArray(expression, context) {
	    if (isSymbol(expression[0])) {
	      var f = getSymbolValue(expression[0], context);
	      if (expression.length > 1) {
	        if (typeof f !== "function") {
	          throw "Calling non-function " + expression[0];
	        }
	        var args = [Pusher.Util.extend({}, context)].concat(
	          Pusher.Util.map(expression.slice(1), function(arg) {
	            return evaluate(arg, Pusher.Util.extend({}, context))[0];
	          })
	        );
	        return f.apply(this, args);
	      } else {
	        return [f, context];
	      }
	    } else {
	      return evaluateListOfExpressions(expression, context);
	    }
	  }

	  function evaluate(expression, context) {
	    var expressionType = typeof expression;
	    if (typeof expression === "string") {
	      return evaluateString(expression, context);
	    } else if (typeof expression === "object") {
	      if (expression instanceof Array && expression.length > 0) {
	        return evaluateArray(expression, context);
	      }
	    }
	    return [expression, context];
	  }

	  Pusher.StrategyBuilder = StrategyBuilder;
	}).call(this);

	;(function() {
	  /**
	   * Provides functions for handling Pusher protocol-specific messages.
	   */
	  var Protocol = {};

	  /**
	   * Decodes a message in a Pusher format.
	   *
	   * Throws errors when messages are not parse'able.
	   *
	   * @param  {Object} message
	   * @return {Object}
	   */
	  Protocol.decodeMessage = function(message) {
	    try {
	      var params = JSON.parse(message.data);
	      if (typeof params.data === 'string') {
	        try {
	          params.data = JSON.parse(params.data);
	        } catch (e) {
	          if (!(e instanceof SyntaxError)) {
	            // TODO looks like unreachable code
	            // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/JSON/parse
	            throw e;
	          }
	        }
	      }
	      return params;
	    } catch (e) {
	      throw { type: 'MessageParseError', error: e, data: message.data};
	    }
	  };

	  /**
	   * Encodes a message to be sent.
	   *
	   * @param  {Object} message
	   * @return {String}
	   */
	  Protocol.encodeMessage = function(message) {
	    return JSON.stringify(message);
	  };

	  /** Processes a handshake message and returns appropriate actions.
	   *
	   * Returns an object with an 'action' and other action-specific properties.
	   *
	   * There are three outcomes when calling this function. First is a successful
	   * connection attempt, when pusher:connection_established is received, which
	   * results in a 'connected' action with an 'id' property. When passed a
	   * pusher:error event, it returns a result with action appropriate to the
	   * close code and an error. Otherwise, it raises an exception.
	   *
	   * @param {String} message
	   * @result Object
	   */
	  Protocol.processHandshake = function(message) {
	    message = this.decodeMessage(message);

	    if (message.event === "pusher:connection_established") {
	      if (!message.data.activity_timeout) {
	        throw "No activity timeout specified in handshake";
	      }
	      return {
	        action: "connected",
	        id: message.data.socket_id,
	        activityTimeout: message.data.activity_timeout * 1000
	      };
	    } else if (message.event === "pusher:error") {
	      // From protocol 6 close codes are sent only once, so this only
	      // happens when connection does not support close codes
	      return {
	        action: this.getCloseAction(message.data),
	        error: this.getCloseError(message.data)
	      };
	    } else {
	      throw "Invalid handshake";
	    }
	  };

	  /**
	   * Dispatches the close event and returns an appropriate action name.
	   *
	   * See:
	   * 1. https://developer.mozilla.org/en-US/docs/WebSockets/WebSockets_reference/CloseEvent
	   * 2. http://pusher.com/docs/pusher_protocol
	   *
	   * @param  {CloseEvent} closeEvent
	   * @return {String} close action name
	   */
	  Protocol.getCloseAction = function(closeEvent) {
	    if (closeEvent.code < 4000) {
	      // ignore 1000 CLOSE_NORMAL, 1001 CLOSE_GOING_AWAY,
	      //        1005 CLOSE_NO_STATUS, 1006 CLOSE_ABNORMAL
	      // ignore 1007...3999
	      // handle 1002 CLOSE_PROTOCOL_ERROR, 1003 CLOSE_UNSUPPORTED,
	      //        1004 CLOSE_TOO_LARGE
	      if (closeEvent.code >= 1002 && closeEvent.code <= 1004) {
	        return "backoff";
	      } else {
	        return null;
	      }
	    } else if (closeEvent.code === 4000) {
	      return "ssl_only";
	    } else if (closeEvent.code < 4100) {
	      return "refused";
	    } else if (closeEvent.code < 4200) {
	      return "backoff";
	    } else if (closeEvent.code < 4300) {
	      return "retry";
	    } else {
	      // unknown error
	      return "refused";
	    }
	  };

	  /**
	   * Returns an error or null basing on the close event.
	   *
	   * Null is returned when connection was closed cleanly. Otherwise, an object
	   * with error details is returned.
	   *
	   * @param  {CloseEvent} closeEvent
	   * @return {Object} error object
	   */
	  Protocol.getCloseError = function(closeEvent) {
	    if (closeEvent.code !== 1000 && closeEvent.code !== 1001) {
	      return {
	        type: 'PusherError',
	        data: {
	          code: closeEvent.code,
	          message: closeEvent.reason || closeEvent.message
	        }
	      };
	    } else {
	      return null;
	    }
	  };

	  Pusher.Protocol = Protocol;
	}).call(this);

	;(function() {
	  /**
	   * Provides Pusher protocol interface for transports.
	   *
	   * Emits following events:
	   * - message - on received messages
	   * - ping - on ping requests
	   * - pong - on pong responses
	   * - error - when the transport emits an error
	   * - closed - after closing the transport
	   *
	   * It also emits more events when connection closes with a code.
	   * See Protocol.getCloseAction to get more details.
	   *
	   * @param {Number} id
	   * @param {AbstractTransport} transport
	   */
	  function Connection(id, transport) {
	    Pusher.EventsDispatcher.call(this);

	    this.id = id;
	    this.transport = transport;
	    this.activityTimeout = transport.activityTimeout;
	    this.bindListeners();
	  }
	  var prototype = Connection.prototype;
	  Pusher.Util.extend(prototype, Pusher.EventsDispatcher.prototype);

	  /** Returns whether used transport handles activity checks by itself
	   *
	   * @returns {Boolean} true if activity checks are handled by the transport
	   */
	  prototype.handlesActivityChecks = function() {
	    return this.transport.handlesActivityChecks();
	  };

	  /** Sends raw data.
	   *
	   * @param {String} data
	   */
	  prototype.send = function(data) {
	    return this.transport.send(data);
	  };

	  /** Sends an event.
	   *
	   * @param {String} name
	   * @param {String} data
	   * @param {String} [channel]
	   * @returns {Boolean} whether message was sent or not
	   */
	  prototype.send_event = function(name, data, channel) {
	    var message = { event: name, data: data };
	    if (channel) {
	      message.channel = channel;
	    }
	    Pusher.debug('Event sent', message);
	    return this.send(Pusher.Protocol.encodeMessage(message));
	  };

	  /** Sends a ping message to the server.
	   *
	   * Basing on the underlying transport, it might send either transport's
	   * protocol-specific ping or pusher:ping event.
	   */
	  prototype.ping = function() {
	    if (this.transport.supportsPing()) {
	      this.transport.ping();
	    } else {
	      this.send_event('pusher:ping', {});
	    }
	  };

	  /** Closes the connection. */
	  prototype.close = function() {
	    this.transport.close();
	  };

	  /** @private */
	  prototype.bindListeners = function() {
	    var self = this;

	    var listeners = {
	      message: function(m) {
	        var message;
	        try {
	          message = Pusher.Protocol.decodeMessage(m);
	        } catch(e) {
	          self.emit('error', {
	            type: 'MessageParseError',
	            error: e,
	            data: m.data
	          });
	        }

	        if (message !== undefined) {
	          Pusher.debug('Event recd', message);

	          switch (message.event) {
	            case 'pusher:error':
	              self.emit('error', { type: 'PusherError', data: message.data });
	              break;
	            case 'pusher:ping':
	              self.emit("ping");
	              break;
	            case 'pusher:pong':
	              self.emit("pong");
	              break;
	          }
	          self.emit('message', message);
	        }
	      },
	      activity: function() {
	        self.emit("activity");
	      },
	      error: function(error) {
	        self.emit("error", { type: "WebSocketError", error: error });
	      },
	      closed: function(closeEvent) {
	        unbindListeners();

	        if (closeEvent && closeEvent.code) {
	          self.handleCloseEvent(closeEvent);
	        }

	        self.transport = null;
	        self.emit("closed");
	      }
	    };

	    var unbindListeners = function() {
	      Pusher.Util.objectApply(listeners, function(listener, event) {
	        self.transport.unbind(event, listener);
	      });
	    };

	    Pusher.Util.objectApply(listeners, function(listener, event) {
	      self.transport.bind(event, listener);
	    });
	  };

	  /** @private */
	  prototype.handleCloseEvent = function(closeEvent) {
	    var action = Pusher.Protocol.getCloseAction(closeEvent);
	    var error = Pusher.Protocol.getCloseError(closeEvent);
	    if (error) {
	      this.emit('error', error);
	    }
	    if (action) {
	      this.emit(action);
	    }
	  };

	  Pusher.Connection = Connection;
	}).call(this);

	;(function() {
	  /**
	   * Handles Pusher protocol handshakes for transports.
	   *
	   * Calls back with a result object after handshake is completed. Results
	   * always have two fields:
	   * - action - string describing action to be taken after the handshake
	   * - transport - the transport object passed to the constructor
	   *
	   * Different actions can set different additional properties on the result.
	   * In the case of 'connected' action, there will be a 'connection' property
	   * containing a Connection object for the transport. Other actions should
	   * carry an 'error' property.
	   *
	   * @param {AbstractTransport} transport
	   * @param {Function} callback
	   */
	  function Handshake(transport, callback) {
	    this.transport = transport;
	    this.callback = callback;
	    this.bindListeners();
	  }
	  var prototype = Handshake.prototype;

	  prototype.close = function() {
	    this.unbindListeners();
	    this.transport.close();
	  };

	  /** @private */
	  prototype.bindListeners = function() {
	    var self = this;

	    self.onMessage = function(m) {
	      self.unbindListeners();

	      try {
	        var result = Pusher.Protocol.processHandshake(m);
	        if (result.action === "connected") {
	          self.finish("connected", {
	            connection: new Pusher.Connection(result.id, self.transport),
	            activityTimeout: result.activityTimeout
	          });
	        } else {
	          self.finish(result.action, { error: result.error });
	          self.transport.close();
	        }
	      } catch (e) {
	        self.finish("error", { error: e });
	        self.transport.close();
	      }
	    };

	    self.onClosed = function(closeEvent) {
	      self.unbindListeners();

	      var action = Pusher.Protocol.getCloseAction(closeEvent) || "backoff";
	      var error = Pusher.Protocol.getCloseError(closeEvent);
	      self.finish(action, { error: error });
	    };

	    self.transport.bind("message", self.onMessage);
	    self.transport.bind("closed", self.onClosed);
	  };

	  /** @private */
	  prototype.unbindListeners = function() {
	    this.transport.unbind("message", this.onMessage);
	    this.transport.unbind("closed", this.onClosed);
	  };

	  /** @private */
	  prototype.finish = function(action, params) {
	    this.callback(
	      Pusher.Util.extend({ transport: this.transport, action: action }, params)
	    );
	  };

	  Pusher.Handshake = Handshake;
	}).call(this);

	;(function() {
	  /** Manages connection to Pusher.
	   *
	   * Uses a strategy (currently only default), timers and network availability
	   * info to establish a connection and export its state. In case of failures,
	   * manages reconnection attempts.
	   *
	   * Exports state changes as following events:
	   * - "state_change", { previous: p, current: state }
	   * - state
	   *
	   * States:
	   * - initialized - initial state, never transitioned to
	   * - connecting - connection is being established
	   * - connected - connection has been fully established
	   * - disconnected - on requested disconnection
	   * - unavailable - after connection timeout or when there's no network
	   * - failed - when the connection strategy is not supported
	   *
	   * Options:
	   * - unavailableTimeout - time to transition to unavailable state
	   * - activityTimeout - time after which ping message should be sent
	   * - pongTimeout - time for Pusher to respond with pong before reconnecting
	   *
	   * @param {String} key application key
	   * @param {Object} options
	   */
	  function ConnectionManager(key, options) {
	    Pusher.EventsDispatcher.call(this);

	    this.key = key;
	    this.options = options || {};
	    this.state = "initialized";
	    this.connection = null;
	    this.encrypted = !!options.encrypted;
	    this.timeline = this.options.timeline;

	    this.connectionCallbacks = this.buildConnectionCallbacks();
	    this.errorCallbacks = this.buildErrorCallbacks();
	    this.handshakeCallbacks = this.buildHandshakeCallbacks(this.errorCallbacks);

	    var self = this;

	    Pusher.Network.bind("online", function() {
	      self.timeline.info({ netinfo: "online" });
	      if (self.state === "connecting" || self.state === "unavailable") {
	        self.retryIn(0);
	      }
	    });
	    Pusher.Network.bind("offline", function() {
	      self.timeline.info({ netinfo: "offline" });
	      if (self.connection) {
	        self.sendActivityCheck();
	      }
	    });

	    this.updateStrategy();
	  }
	  var prototype = ConnectionManager.prototype;

	  Pusher.Util.extend(prototype, Pusher.EventsDispatcher.prototype);

	  /** Establishes a connection to Pusher.
	   *
	   * Does nothing when connection is already established. See top-level doc
	   * to find events emitted on connection attempts.
	   */
	  prototype.connect = function() {
	    if (this.connection || this.runner) {
	      return;
	    }
	    if (!this.strategy.isSupported()) {
	      this.updateState("failed");
	      return;
	    }
	    this.updateState("connecting");
	    this.startConnecting();
	    this.setUnavailableTimer();
	  };

	  /** Sends raw data.
	   *
	   * @param {String} data
	   */
	  prototype.send = function(data) {
	    if (this.connection) {
	      return this.connection.send(data);
	    } else {
	      return false;
	    }
	  };

	  /** Sends an event.
	   *
	   * @param {String} name
	   * @param {String} data
	   * @param {String} [channel]
	   * @returns {Boolean} whether message was sent or not
	   */
	  prototype.send_event = function(name, data, channel) {
	    if (this.connection) {
	      return this.connection.send_event(name, data, channel);
	    } else {
	      return false;
	    }
	  };

	  /** Closes the connection. */
	  prototype.disconnect = function() {
	    this.disconnectInternally();
	    this.updateState("disconnected");
	  };

	  prototype.isEncrypted = function() {
	    return this.encrypted;
	  };

	  /** @private */
	  prototype.startConnecting = function() {
	    var self = this;
	    var callback = function(error, handshake) {
	      if (error) {
	        self.runner = self.strategy.connect(0, callback);
	      } else {
	        if (handshake.action === "error") {
	          self.emit("error", { type: "HandshakeError", error: handshake.error });
	          self.timeline.error({ handshakeError: handshake.error });
	        } else {
	          self.abortConnecting(); // we don't support switching connections yet
	          self.handshakeCallbacks[handshake.action](handshake);
	        }
	      }
	    };
	    self.runner = self.strategy.connect(0, callback);
	  };

	  /** @private */
	  prototype.abortConnecting = function() {
	    if (this.runner) {
	      this.runner.abort();
	      this.runner = null;
	    }
	  };

	  /** @private */
	  prototype.disconnectInternally = function() {
	    this.abortConnecting();
	    this.clearRetryTimer();
	    this.clearUnavailableTimer();
	    if (this.connection) {
	      var connection = this.abandonConnection();
	      connection.close();
	    }
	  };

	  /** @private */
	  prototype.updateStrategy = function() {
	    this.strategy = this.options.getStrategy({
	      key: this.key,
	      timeline: this.timeline,
	      encrypted: this.encrypted
	    });
	  };

	  /** @private */
	  prototype.retryIn = function(delay) {
	    var self = this;
	    self.timeline.info({ action: "retry", delay: delay });
	    if (delay > 0) {
	      self.emit("connecting_in", Math.round(delay / 1000));
	    }
	    self.retryTimer = new Pusher.Timer(delay || 0, function() {
	      self.disconnectInternally();
	      self.connect();
	    });
	  };

	  /** @private */
	  prototype.clearRetryTimer = function() {
	    if (this.retryTimer) {
	      this.retryTimer.ensureAborted();
	      this.retryTimer = null;
	    }
	  };

	  /** @private */
	  prototype.setUnavailableTimer = function() {
	    var self = this;
	    self.unavailableTimer = new Pusher.Timer(
	      self.options.unavailableTimeout,
	      function() {
	        self.updateState("unavailable");
	      }
	    );
	  };

	  /** @private */
	  prototype.clearUnavailableTimer = function() {
	    if (this.unavailableTimer) {
	      this.unavailableTimer.ensureAborted();
	    }
	  };

	  /** @private */
	  prototype.sendActivityCheck = function() {
	    var self = this;
	    self.stopActivityCheck();
	    self.connection.ping();
	    // wait for pong response
	    self.activityTimer = new Pusher.Timer(
	      self.options.pongTimeout,
	      function() {
	        self.timeline.error({ pong_timed_out: self.options.pongTimeout });
	        self.retryIn(0);
	      }
	    );
	  };

	  /** @private */
	  prototype.resetActivityCheck = function() {
	    var self = this;
	    self.stopActivityCheck();
	    // send ping after inactivity
	    if (!self.connection.handlesActivityChecks()) {
	      self.activityTimer = new Pusher.Timer(self.activityTimeout, function() {
	        self.sendActivityCheck();
	      });
	    }
	  };

	  /** @private */
	  prototype.stopActivityCheck = function() {
	    if (this.activityTimer) {
	      this.activityTimer.ensureAborted();
	    }
	  };

	  /** @private */
	  prototype.buildConnectionCallbacks = function() {
	    var self = this;
	    return {
	      message: function(message) {
	        // includes pong messages from server
	        self.resetActivityCheck();
	        self.emit('message', message);
	      },
	      ping: function() {
	        self.send_event('pusher:pong', {});
	      },
	      activity: function() {
	        self.resetActivityCheck();
	      },
	      error: function(error) {
	        // just emit error to user - socket will already be closed by browser
	        self.emit("error", { type: "WebSocketError", error: error });
	      },
	      closed: function() {
	        self.abandonConnection();
	        if (self.shouldRetry()) {
	          self.retryIn(1000);
	        }
	      }
	    };
	  };

	  /** @private */
	  prototype.buildHandshakeCallbacks = function(errorCallbacks) {
	    var self = this;
	    return Pusher.Util.extend({}, errorCallbacks, {
	      connected: function(handshake) {
	        self.activityTimeout = Math.min(
	          self.options.activityTimeout,
	          handshake.activityTimeout,
	          handshake.connection.activityTimeout || Infinity
	        );
	        self.clearUnavailableTimer();
	        self.setConnection(handshake.connection);
	        self.socket_id = self.connection.id;
	        self.updateState("connected", { socket_id: self.socket_id });
	      }
	    });
	  };

	  /** @private */
	  prototype.buildErrorCallbacks = function() {
	    var self = this;

	    function withErrorEmitted(callback) {
	      return function(result) {
	        if (result.error) {
	          self.emit("error", { type: "WebSocketError", error: result.error });
	        }
	        callback(result);
	      };
	    }

	    return {
	      ssl_only: withErrorEmitted(function() {
	        self.encrypted = true;
	        self.updateStrategy();
	        self.retryIn(0);
	      }),
	      refused: withErrorEmitted(function() {
	        self.disconnect();
	      }),
	      backoff: withErrorEmitted(function() {
	        self.retryIn(1000);
	      }),
	      retry: withErrorEmitted(function() {
	        self.retryIn(0);
	      })
	    };
	  };

	  /** @private */
	  prototype.setConnection = function(connection) {
	    this.connection = connection;
	    for (var event in this.connectionCallbacks) {
	      this.connection.bind(event, this.connectionCallbacks[event]);
	    }
	    this.resetActivityCheck();
	  };

	  /** @private */
	  prototype.abandonConnection = function() {
	    if (!this.connection) {
	      return;
	    }
	    this.stopActivityCheck();
	    for (var event in this.connectionCallbacks) {
	      this.connection.unbind(event, this.connectionCallbacks[event]);
	    }
	    var connection = this.connection;
	    this.connection = null;
	    return connection;
	  };

	  /** @private */
	  prototype.updateState = function(newState, data) {
	    var previousState = this.state;
	    this.state = newState;
	    if (previousState !== newState) {
	      Pusher.debug('State changed', previousState + ' -> ' + newState);
	      this.timeline.info({ state: newState, params: data });
	      this.emit('state_change', { previous: previousState, current: newState });
	      this.emit(newState, data);
	    }
	  };

	  /** @private */
	  prototype.shouldRetry = function() {
	    return this.state === "connecting" || this.state === "connected";
	  };

	  Pusher.ConnectionManager = ConnectionManager;
	}).call(this);

	;(function() {
	  /** Really basic interface providing network availability info.
	   *
	   * Emits:
	   * - online - when browser goes online
	   * - offline - when browser goes offline
	   */
	  function NetInfo() {
	    Pusher.EventsDispatcher.call(this);

	    var self = this;
	    // This is okay, as IE doesn't support this stuff anyway.
	    if (window.addEventListener !== undefined) {
	      window.addEventListener("online", function() {
	        self.emit('online');
	      }, false);
	      window.addEventListener("offline", function() {
	        self.emit('offline');
	      }, false);
	    }
	  }
	  Pusher.Util.extend(NetInfo.prototype, Pusher.EventsDispatcher.prototype);

	  var prototype = NetInfo.prototype;

	  /** Returns whether browser is online or not
	   *
	   * Offline means definitely offline (no connection to router).
	   * Inverse does NOT mean definitely online (only currently supported in Safari
	   * and even there only means the device has a connection to the router).
	   *
	   * @return {Boolean}
	   */
	  prototype.isOnline = function() {
	    if (window.navigator.onLine === undefined) {
	      return true;
	    } else {
	      return window.navigator.onLine;
	    }
	  };

	  Pusher.NetInfo = NetInfo;
	  Pusher.Network = new NetInfo();
	}).call(this);

	;(function() {
	  /** Represents a collection of members of a presence channel. */
	  function Members() {
	    this.reset();
	  }
	  var prototype = Members.prototype;

	  /** Returns member's info for given id.
	   *
	   * Resulting object containts two fields - id and info.
	   *
	   * @param {Number} id
	   * @return {Object} member's info or null
	   */
	  prototype.get = function(id) {
	    if (Object.prototype.hasOwnProperty.call(this.members, id)) {
	      return {
	        id: id,
	        info: this.members[id]
	      };
	    } else {
	      return null;
	    }
	  };

	  /** Calls back for each member in unspecified order.
	   *
	   * @param  {Function} callback
	   */
	  prototype.each = function(callback) {
	    var self = this;
	    Pusher.Util.objectApply(self.members, function(member, id) {
	      callback(self.get(id));
	    });
	  };

	  /** Updates the id for connected member. For internal use only. */
	  prototype.setMyID = function(id) {
	    this.myID = id;
	  };

	  /** Handles subscription data. For internal use only. */
	  prototype.onSubscription = function(subscriptionData) {
	    this.members = subscriptionData.presence.hash;
	    this.count = subscriptionData.presence.count;
	    this.me = this.get(this.myID);
	  };

	  /** Adds a new member to the collection. For internal use only. */
	  prototype.addMember = function(memberData) {
	    if (this.get(memberData.user_id) === null) {
	      this.count++;
	    }
	    this.members[memberData.user_id] = memberData.user_info;
	    return this.get(memberData.user_id);
	  };

	  /** Adds a member from the collection. For internal use only. */
	  prototype.removeMember = function(memberData) {
	    var member = this.get(memberData.user_id);
	    if (member) {
	      delete this.members[memberData.user_id];
	      this.count--;
	    }
	    return member;
	  };

	  /** Resets the collection to the initial state. For internal use only. */
	  prototype.reset = function() {
	    this.members = {};
	    this.count = 0;
	    this.myID = null;
	    this.me = null;
	  };

	  Pusher.Members = Members;
	}).call(this);

	;(function() {
	  /** Provides base public channel interface with an event emitter.
	   *
	   * Emits:
	   * - pusher:subscription_succeeded - after subscribing successfully
	   * - other non-internal events
	   *
	   * @param {String} name
	   * @param {Pusher} pusher
	   */
	  function Channel(name, pusher) {
	    Pusher.EventsDispatcher.call(this, function(event, data) {
	      Pusher.debug('No callbacks on ' + name + ' for ' + event);
	    });

	    this.name = name;
	    this.pusher = pusher;
	    this.subscribed = false;
	  }
	  var prototype = Channel.prototype;
	  Pusher.Util.extend(prototype, Pusher.EventsDispatcher.prototype);

	  /** Skips authorization, since public channels don't require it.
	   *
	   * @param {Function} callback
	   */
	  prototype.authorize = function(socketId, callback) {
	    return callback(false, {});
	  };

	  /** Triggers an event */
	  prototype.trigger = function(event, data) {
	    if (event.indexOf("client-") !== 0) {
	      throw new Pusher.Errors.BadEventName(
	        "Event '" + event + "' does not start with 'client-'"
	      );
	    }
	    return this.pusher.send_event(event, data, this.name);
	  };

	  /** Signals disconnection to the channel. For internal use only. */
	  prototype.disconnect = function() {
	    this.subscribed = false;
	  };

	  /** Handles an event. For internal use only.
	   *
	   * @param {String} event
	   * @param {*} data
	   */
	  prototype.handleEvent = function(event, data) {
	    if (event.indexOf("pusher_internal:") === 0) {
	      if (event === "pusher_internal:subscription_succeeded") {
	        this.subscribed = true;
	        this.emit("pusher:subscription_succeeded", data);
	      }
	    } else {
	      this.emit(event, data);
	    }
	  };

	  /** Sends a subscription request. For internal use only. */
	  prototype.subscribe = function() {
	    var self = this;

	    self.authorize(self.pusher.connection.socket_id, function(error, data) {
	      if (error) {
	        self.handleEvent('pusher:subscription_error', data);
	      } else {
	        self.pusher.send_event('pusher:subscribe', {
	          auth: data.auth,
	          channel_data: data.channel_data,
	          channel: self.name
	        });
	      }
	    });
	  };

	  /** Sends an unsubscription request. For internal use only. */
	  prototype.unsubscribe = function() {
	    this.pusher.send_event('pusher:unsubscribe', {
	      channel: this.name
	    });
	  };

	  Pusher.Channel = Channel;
	}).call(this);

	;(function() {
	  /** Extends public channels to provide private channel interface.
	   *
	   * @param {String} name
	   * @param {Pusher} pusher
	   */
	  function PrivateChannel(name, pusher) {
	    Pusher.Channel.call(this, name, pusher);
	  }
	  var prototype = PrivateChannel.prototype;
	  Pusher.Util.extend(prototype, Pusher.Channel.prototype);

	  /** Authorizes the connection to use the channel.
	   *
	   * @param  {String} socketId
	   * @param  {Function} callback
	   */
	  prototype.authorize = function(socketId, callback) {
	    var authorizer = new Pusher.Channel.Authorizer(this, this.pusher.config);
	    return authorizer.authorize(socketId, callback);
	  };

	  Pusher.PrivateChannel = PrivateChannel;
	}).call(this);

	;(function() {
	  /** Adds presence channel functionality to private channels.
	   *
	   * @param {String} name
	   * @param {Pusher} pusher
	   */
	  function PresenceChannel(name, pusher) {
	    Pusher.PrivateChannel.call(this, name, pusher);
	    this.members = new Pusher.Members();
	  }
	  var prototype = PresenceChannel.prototype;
	  Pusher.Util.extend(prototype, Pusher.PrivateChannel.prototype);

	  /** Authenticates the connection as a member of the channel.
	   *
	   * @param  {String} socketId
	   * @param  {Function} callback
	   */
	  prototype.authorize = function(socketId, callback) {
	    var _super = Pusher.PrivateChannel.prototype.authorize;
	    var self = this;
	    _super.call(self, socketId, function(error, authData) {
	      if (!error) {
	        if (authData.channel_data === undefined) {
	          Pusher.warn(
	            "Invalid auth response for channel '" +
	            self.name +
	            "', expected 'channel_data' field"
	          );
	          callback("Invalid auth response");
	          return;
	        }
	        var channelData = JSON.parse(authData.channel_data);
	        self.members.setMyID(channelData.user_id);
	      }
	      callback(error, authData);
	    });
	  };

	  /** Handles presence and subscription events. For internal use only.
	   *
	   * @param {String} event
	   * @param {*} data
	   */
	  prototype.handleEvent = function(event, data) {
	    switch (event) {
	      case "pusher_internal:subscription_succeeded":
	        this.members.onSubscription(data);
	        this.subscribed = true;
	        this.emit("pusher:subscription_succeeded", this.members);
	        break;
	      case "pusher_internal:member_added":
	        var addedMember = this.members.addMember(data);
	        this.emit('pusher:member_added', addedMember);
	        break;
	      case "pusher_internal:member_removed":
	        var removedMember = this.members.removeMember(data);
	        if (removedMember) {
	          this.emit('pusher:member_removed', removedMember);
	        }
	        break;
	      default:
	        Pusher.PrivateChannel.prototype.handleEvent.call(this, event, data);
	    }
	  };

	  /** Resets the channel state, including members map. For internal use only. */
	  prototype.disconnect = function() {
	    this.members.reset();
	    Pusher.PrivateChannel.prototype.disconnect.call(this);
	  };

	  Pusher.PresenceChannel = PresenceChannel;
	}).call(this);

	;(function() {
	  /** Handles a channel map. */
	  function Channels() {
	    this.channels = {};
	  }
	  var prototype = Channels.prototype;

	  /** Creates or retrieves an existing channel by its name.
	   *
	   * @param {String} name
	   * @param {Pusher} pusher
	   * @return {Channel}
	   */
	  prototype.add = function(name, pusher) {
	    if (!this.channels[name]) {
	      this.channels[name] = createChannel(name, pusher);
	    }
	    return this.channels[name];
	  };

	  /** Returns a list of all channels
	   *
	   * @return {Array}
	   */
	  prototype.all = function(name) {
	    return Pusher.Util.values(this.channels);
	  };

	  /** Finds a channel by its name.
	   *
	   * @param {String} name
	   * @return {Channel} channel or null if it doesn't exist
	   */
	  prototype.find = function(name) {
	    return this.channels[name];
	  };

	  /** Removes a channel from the map.
	   *
	   * @param {String} name
	   */
	  prototype.remove = function(name) {
	    var channel = this.channels[name];
	    delete this.channels[name];
	    return channel;
	  };

	  /** Proxies disconnection signal to all channels. */
	  prototype.disconnect = function() {
	    Pusher.Util.objectApply(this.channels, function(channel) {
	      channel.disconnect();
	    });
	  };

	  function createChannel(name, pusher) {
	    if (name.indexOf('private-') === 0) {
	      return new Pusher.PrivateChannel(name, pusher);
	    } else if (name.indexOf('presence-') === 0) {
	      return new Pusher.PresenceChannel(name, pusher);
	    } else {
	      return new Pusher.Channel(name, pusher);
	    }
	  }

	  Pusher.Channels = Channels;
	}).call(this);

	;(function() {
	  Pusher.Channel.Authorizer = function(channel, options) {
	    this.channel = channel;
	    this.type = options.authTransport;

	    this.options = options;
	    this.authOptions = (options || {}).auth || {};
	  };

	  Pusher.Channel.Authorizer.prototype = {
	    composeQuery: function(socketId) {
	      var query = 'socket_id=' + encodeURIComponent(socketId) +
	        '&channel_name=' + encodeURIComponent(this.channel.name);

	      for(var i in this.authOptions.params) {
	        query += "&" + encodeURIComponent(i) + "=" + encodeURIComponent(this.authOptions.params[i]);
	      }

	      return query;
	    },

	    authorize: function(socketId, callback) {
	      return Pusher.authorizers[this.type].call(this, socketId, callback);
	    }
	  };

	  var nextAuthCallbackID = 1;

	  Pusher.auth_callbacks = {};
	  Pusher.authorizers = {
	    ajax: function(socketId, callback){
	      var self = this, xhr;

	      if (Pusher.XHR) {
	        xhr = new Pusher.XHR();
	      } else {
	        xhr = (window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
	      }

	      xhr.open("POST", self.options.authEndpoint, true);

	      // add request headers
	      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	      for(var headerName in this.authOptions.headers) {
	        xhr.setRequestHeader(headerName, this.authOptions.headers[headerName]);
	      }

	      xhr.onreadystatechange = function() {
	        if (xhr.readyState === 4) {
	          if (xhr.status === 200) {
	            var data, parsed = false;

	            try {
	              data = JSON.parse(xhr.responseText);
	              parsed = true;
	            } catch (e) {
	              callback(true, 'JSON returned from webapp was invalid, yet status code was 200. Data was: ' + xhr.responseText);
	            }

	            if (parsed) { // prevents double execution.
	              callback(false, data);
	            }
	          } else {
	            Pusher.warn("Couldn't get auth info from your webapp", xhr.status);
	            callback(true, xhr.status);
	          }
	        }
	      };

	      xhr.send(this.composeQuery(socketId));
	      return xhr;
	    },

	    jsonp: function(socketId, callback){
	      if(this.authOptions.headers !== undefined) {
	        Pusher.warn("Warn", "To send headers with the auth request, you must use AJAX, rather than JSONP.");
	      }

	      var callbackName = nextAuthCallbackID.toString();
	      nextAuthCallbackID++;

	      var document = Pusher.Util.getDocument();
	      var script = document.createElement("script");
	      // Hacked wrapper.
	      Pusher.auth_callbacks[callbackName] = function(data) {
	        callback(false, data);
	      };

	      var callback_name = "Pusher.auth_callbacks['" + callbackName + "']";
	      script.src = this.options.authEndpoint +
	        '?callback=' +
	        encodeURIComponent(callback_name) +
	        '&' +
	        this.composeQuery(socketId);

	      var head = document.getElementsByTagName("head")[0] || document.documentElement;
	      head.insertBefore( script, head.firstChild );
	    }
	  };
	}).call(this);

	return Pusher;
	}));



/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<div>\n  <section class=\"blue-gradient-background intro-splash splash\">\n    <div class=\"container center-all-container\">\n      <h1 class=\"white light splash-title\">\n        Pusher Vue.js Realtime Demo\n      </h1>\n\n      <p class=\"white light splash-subtitle\">\n        Displaying live tweets using Pusher and VueJS.\n      </p>\n\n      <div id=\"search-form\">\n        <form v-on:submit.prevent=\"newSubscription\">\n          <input class=\"swish-input\" v-model=\"newSearchTerm\" placeholder=\"JavaScript\" />\n          <button class=\"bright-blue-hover btn-white\">Search</button>\n        </form>\n      </div>\n    </div>\n  </section>\n\n  <section>\n    <div class=\"container tweets-container\">\n      <div id=\"channels-list\">\n        <div class=\"channel\" v-for=\"channel in channels\">\n          <h3 class=\"white light\">\n            <img class=\"twitter-icon\" src=\"img/twitter.png\" width=\"30\" />\n            Tweets for {{ channel.term }}\n          </h3>\n          <div id=\"subscription-controls\">\n            <button class=\"btn-white secondary\" v-on:click.prevent=\"toggleSearch(channel)\">\n              {{channel.active ? 'Stop' : 'Restart'}} Stream\n            </button>\n            <button class=\"btn-white secondary\" v-on:click.prevent=\"clearSearch(channel)\">\n              Remove Results\n            </button>\n          </div>\n          <subscription-component\n            :channel=\"channel\"\n            :pusher=\"pusher\"></subscription-component>\n        </div>\n      </div>\n    </div>\n  </section>\n\n\n</div>\n"

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _subscriptionComponentTemplate = __webpack_require__(7);

	var _subscriptionComponentTemplate2 = _interopRequireDefault(_subscriptionComponentTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SubscriptionComponent = _vue2.default.extend({
	  template: _subscriptionComponentTemplate2.default,
	  props: ['pusher', 'channel'],
	  created: function created() {
	    this.subscribeToChannel();
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.unsubscribe();
	  },

	  watch: {
	    'channel.active': function channelActive() {
	      if (!this.channel.active && this.subscribed) {
	        this.unsubscribe();
	      } else if (this.channel.active && !this.subscribed) {
	        this.subscribeToChannel();
	      }
	    }
	  },
	  data: function data() {
	    return {
	      tweets: []
	    };
	  },

	  methods: {
	    unsubscribe: function unsubscribe() {
	      this.pusherChannel.unsubscribe(btoa(this.channel.term));
	      this.pusherChannel && this.pusherChannel.unbind();
	      this.subscribed = false;
	    },
	    subscribeToChannel: function subscribeToChannel() {
	      var _this = this;

	      this.pusherChannel = this.pusher.subscribe(btoa(this.channel.term));
	      this.pusherChannel.bind('new_tweet', function (data) {
	        _this.newTweet(data);
	      });
	      this.subscribed = true;
	    },
	    newTweet: function newTweet(data) {
	      this.tweets.push(data);
	      this.$nextTick(function () {
	        var listItem = document.querySelector('.channel-' + this.channel.term);
	        if (listItem) {
	          listItem.scrollTop = listItem.scrollHeight;
	        }
	      });
	    }
	  }
	});

	exports.default = SubscriptionComponent;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div>\n  <ul class=\"channel-results channel-{{channel.term}}\">\n    <li v-for=\"result in tweets\">\n      <p class=\"white\">{{ result.tweet.text }}</p>\n    </li>\n  </ul>\n</div>\n"

/***/ }
/******/ ]);