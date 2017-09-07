(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(3);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 乐享通用js
 * Created by dongyq on 9/4/15.
 * qq:1013501639
 */
var util = {
  type: function type(obj) {
    return Object.prototype.toString.call(obj);
  },
  isObject: function isObject(obj) {
    return this.type(obj) === '[object Object]';
  },
  isArray: function isArray(obj) {
    return this.type(obj) === '[object Array]';
  },
  isString: function isString(obj) {
    return this.type(obj) === '[object String]';
  },
  isNumber: function isNumber(obj) {
    return this.type(obj) === '[object Number]';
  },
  isDate: function isDate(obj) {
    return this.type(obj) === '[object Date]';
  },
  isFunction: function isFunction(obj) {
    return this.type(obj) === '[object Function]';
  },

  /**
   *
   */
  isEmpty: function isEmpty(obj) {
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        return false;
      }
    }
    return true;
  },

  /**
   * 判断对象是否是null或undefined
   * @param obj
   * @returns {boolean}
   */
  isValid: function isValid(obj) {
    return obj === null || obj === undefined;
  },

  /**
   * 判断两个对象是否相同
   * @param a
   * @param b
   * @returns {boolean}
   */
  isEqual: function isEqual() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return JSON.stringify(a) === JSON.stringify(b);
  },

  /**
   * 合并对象
   * @param defaults
   * @param extend
   * @returns {*}
   */
  mergeObject: function mergeObject() {
    var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var extend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var key in defaults) {
      var defaultsProp = defaults[key];
      var extendProp = extend[key];
      if (this.isObject(defaultsProp)) {
        extend[key] = this.mergeObject(defaultsProp, extendProp);
      } else if (this.isArray(defaultsProp)) {
        if (this.isArray(extendProp)) {
          for (var i = 0; i < defaultsProp.length && i < extendProp.length; i++) {
            extendProp[i] = this.mergeObject(defaultsProp[i], extendProp[i]);
          }
        } else {
          extend[key] = defaultsProp;
        }
      } else {
        extend[key] = this.isValid(extendProp) ? defaultsProp : extendProp;
      }
    }
    return extend;
  },

  /**
   * 字符串占位符替换
   * @param str
   * @param obj
   * @returns {*}
   */
  strReplace: function strReplace(str, obj) {
    var matchList = str.match(/\{\S*?\}/g) || [];
    matchList.forEach(function (item) {
      var key = item.replace(/\{|\}/g, '');
      str = str.replace(item, obj[key] || '');
    });
    return str;
  },

  /**
   * 从中间拆分字符串,长度超出的话，解析为xxx...xxx
   * @param str
   * @param config
   * @returns {*}
   */
  strMiddleSplit: function strMiddleSplit(str) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      maxLength: 20,
      begenLength: 8,
      endLength: 8,
      replaceStr: '...'
    };

    str += '';
    var reg = {
      fullCharReg: /[^\x00-\xff]/,
      fullCharsReg: /[^\x00-\xff]/g,
      anyChars: /[\S\s]{1}/g
    };
    var fullCharLength = (str.match(reg.fullCharsReg) || []).length;
    var fullLength = str.length + fullCharLength;
    var beginArr = [];
    var beginLength = 0;
    var endArr = [];
    var endLength = 0;
    if (fullLength > config.maxLength) {
      var strArr = str.match(reg.anyChars);
      strArr.forEach(function (char) {
        if (beginLength >= config.begenLength) return;
        var len = reg.fullCharReg.test(char) ? 2 : 1;
        beginLength += len;
        beginArr.push(char);
      });
      strArr.reverse().forEach(function (char) {
        if (endLength >= config.endLength) return;
        var len = reg.fullCharReg.test(char) ? 2 : 1;
        endLength += len;
        endArr.push(char);
      });
      return beginArr.join('') + config.replaceStr + endArr.reverse().join('');
    }
    return str;
  },

  /**
   * 为单数前补0
   * @param num
   * @returns {string}
   */
  toDoubleNumber: function toDoubleNumber(num) {
    num += '';
    return num > 9 ? num : '0' + num;
  },

  /**
   * 日期格式化
   * @param date
   * @param formatter
   * @returns {string}
   */
  dateFormat: function dateFormat() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    var formatter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';

    return formatter.replace('yyyy', date.getFullYear()).replace('mm', this.toDoubleNumber(date.getMonth() + 1)).replace('dd', this.toDoubleNumber(date.getDate()));
  },

  /**
   * xss注入处理
   */
  xssEncode: function xssEncode(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },

  /**
   * 字符串转为驼峰格式, eg: a_b ==> aB
   * @param str
   * @returns {string}
   */
  toCamel: function toCamel() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var matchArr = str.match(/_\S/g) || [];
    matchArr.forEach(function (item) {
      str = str.replace(item, item.replace('_', '').toUpperCase());
    });
    return str;
  },

  /**
   * 将驼峰格式字符串转化为下划线格式，eg：aB ===> a_b
   * @param str
   * @returns {string}
   */
  toUnderLine: function toUnderLine() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var matchArr = str.match(/[A-Z]/g) || [];
    matchArr.forEach(function (item) {
      str = str.replace(item, '_' + item.toLowerCase());
    });
    return str;
  },

  /**
   * 转为驼峰命名规范对象
   * @param obj
   * @returns {{}}
   */
  toCamelObj: function toCamelObj() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var result = {};
    for (var key in obj) {
      if (this.isFunction(obj[key])) continue;
      result[this.toCamel(key)] = obj[key];
    }
    return result;
  },

  /**
   * 转为下划线命名规范对象
   * @param obj
   * @returns {{}}
   */
  toUnderLineObj: function toUnderLineObj() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var result = {};
    for (var key in obj) {
      if (this.isFunction(obj[key])) continue;
      result[this.toUnderLine(key)] = obj[key];
    }
    return result;
  },

  /**
   * 根据指定url和参数对象，转成url格式字符串
   * @param url
   * @param param
   * @returns {string}
   */
  toUrl: function toUrl() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var params = [];
    var prefix = /\?/.test(url) ? '&' : '?';
    for (var key in param) {
      params.push(key + '=' + param[key]);
    }
    return '' + url + prefix + params.join('&');
  },

  /**
   * 将数字转为千分位分割格式
   * @param num
   * @returns {string}
   */
  toThousands: function toThousands() {
    var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var source = String(num).split('.'); // 按小数点分成2部分
    source[0] = source[0].match(/\d{1,3}/g).join(','); // 只将整数部分进行都好分割
    return source.join('.'); // 再将小数部分合并进来
  },
  clone: function clone(obj) {
    if (!this.isObject(obj)) return obj;
    return JSON.parse(JSON.stringify(obj));
  },
  isEmptyObj: function isEmptyObj(obj) {
    return JSON.stringify(obj) === '{}';
  }
};
exports.default = util;

/***/ }),
/* 3 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

__webpack_require__(5);

__webpack_require__(7);

var _button = __webpack_require__(9);

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by yqdong on 2017/9/6.
 * qq: 1013501639
 * @author yqdong
 *
 */
function Button(container, option) {
  var options = _util2.default.mergeObject({
    theme: 'normal', // normal,border
    type: 'normal', // normal, primary, danger, secondary, success
    size: 'normal', // normal small large
    disabled: false,

    content: '',

    icon: {
      show: false,
      iconClass: ''
    },

    onClick: null
  }, option);

  for (var prop in options) {
    this['_' + prop] = options[prop];
  }
  this._dom = {
    container: container,
    icon: null,
    content: null
  };

  this._init();
}

Button.prototype = {
  constructor: Button,
  /**
   *
   * @private
   */
  _init: function _init() {
    this._render();
    this._initEventBind();
  },
  /**
   *
   * @private
   */
  _render: function _render() {
    this._resetStyle();
    this._dom.container.append(_util2.default.strReplace(_button2.default, {
      iconClass: this._icon.iconClass,
      displayIcon: this._icon.show ? 'inline-block' : 'none',
      content: this._content
    }));

    this._dom.content = this._dom.container.find('span');
    this._dom.icon = this._dom.container.find('i');
  },
  /**
   *
   * @private
   */
  _resetStyle: function _resetStyle() {
    this._dom.container.attr('class', '');

    var mainClass = this._theme + '-' + this._type;

    this._dom.container.addClass('zg-button').addClass(this._icon.show && !this._content ? 'only-icon' : '').addClass(this._theme === this._type ? 'normal' : mainClass).addClass(this._size === 'normal' ? 'normal-size' : this._size);

    if (this._disabled) {
      this._dom.container.addClass(this._theme === 'normal' ? 'normal-disable' : 'border-disable');
    }
  },
  /**
   *
   * @private
   */
  _initEventBind: function _initEventBind() {
    this._dom.container.bind('click', this, this.__onClick);
  },
  /**
   *
   * @private
   */
  __onClick: function __onClick(event) {
    var context = event.data;
    var callback = context._onClick;
    if (_util2.default.isFunction(callback)) {
      callback.call(context);
    }
  },
  /**
   *
   * @param flag
   * @returns {Button}
   */
  disable: function disable(flag) {
    this._disabled = flag;
    this._resetStyle();
    return this;
  },
  /**
   *
   * @param type
   * @returns {Button}
   */
  setType: function setType(type) {
    this._type = type;
    this._resetStyle();
    return this;
  },
  /**
   *
   * @param content
   * @returns {Button}
   */
  setContent: function setContent(content) {
    this._content = content;
    this._dom.content.text(content);
    this._resetStyle();
    return this;
  },
  /**
   *
   */
  destroy: function destroy() {
    this._dom.container.unbind('click');
    this._dom.container.remove();
  }
};

exports.default = Button;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./reset.sass", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./reset.sass");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "[class^='zg-'], [class*=' zg-'] {\n  box-sizing: border-box;\n  font-family: \"PingFang SC\", Arial, \"Microsoft YaHei\", sans-serif;\n  padding: 0;\n  margin: 0;\n  outline: none;\n  vertical-align: baseline;\n  list-style: none; }\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./button.sass", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./button.sass");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".zg-button {\n  display: inline-block;\n  cursor: pointer;\n  border-radius: 3px; }\n  .zg-button i {\n    margin-right: 0.5em;\n    position: relative;\n    top: 2px; }\n\n.zg-button.only-icon {\n  padding: .5em .5em; }\n  .zg-button.only-icon i {\n    margin-right: 0; }\n\n.zg-button.small {\n  font-size: 12px;\n  padding: .85em 1em; }\n\n.zg-button.normal-size {\n  font-size: 14px;\n  padding: .85em 1.5em; }\n\n.zg-button.large {\n  font-size: 16px;\n  padding: .85em 3em; }\n\n.zg-button.normal {\n  background: #fafafa;\n  color: #354052;\n  border: 1px solid #dadada; }\n  .zg-button.normal:hover {\n    background: white; }\n\n.zg-button.normal-primary {\n  background: #09aef5;\n  color: white; }\n  .zg-button.normal-primary:hover {\n    background: #1eb4ff; }\n\n.zg-button.normal-danger {\n  background: #f55858;\n  color: white; }\n  .zg-button.normal-danger:hover {\n    background: #ff7575; }\n\n.zg-button.normal-secondary {\n  background: white;\n  border: 1px solid #dadada; }\n  .zg-button.normal-secondary:hover {\n    background: #e9f7fd;\n    color: #09aef5; }\n\n.zg-button.normal-success {\n  background: #29bd76;\n  color: white; }\n  .zg-button.normal-success:hover {\n    background: #31cc81; }\n\n.zg-button.normal-disable {\n  background: #e1e3e6 !important;\n  color: white !important;\n  cursor: not-allowed !important; }\n\n.zg-button.border-normal {\n  background: white;\n  border: 1px solid #dadada;\n  color: #354052; }\n  .zg-button.border-normal:hover {\n    border-color: #09aef5;\n    color: #09aef5; }\n\n.zg-button.border-normal.checked {\n  background: #e9f7fd;\n  border: 1px solid #09aef5;\n  color: #09aef5; }\n\n.zg-button.border-primary {\n  border: 1px solid #09aef5;\n  color: #09aef5;\n  background: white; }\n  .zg-button.border-primary:hover {\n    background: #e9f7fd; }\n\n.zg-button.border-danger {\n  background: white;\n  border: 1px solid #f55858;\n  color: #f55858; }\n  .zg-button.border-danger:hover {\n    background: #ffd7d7; }\n\n.zg-button.border-success {\n  background: white;\n  border: 1px solid #29bd76;\n  color: #29bd76; }\n  .zg-button.border-success:hover {\n    background: #d1ffe8; }\n\n.zg-button.border-secondary {\n  background: white;\n  border: 1px solid #dadada;\n  color: #354052; }\n  .zg-button.border-secondary:hover {\n    background: #e9f7fd;\n    color: #09aef5; }\n\n.zg-button.border-disable {\n  border: 1px solid #e1e3e6 !important;\n  color: #e1e3e6 !important;\n  background: white !important;\n  cursor: not-allowed !important; }\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<i class=\"{iconClass}\" style=\"display: {displayIcon}\"></i><span>{content}</span>";

/***/ })
/******/ ]);
});