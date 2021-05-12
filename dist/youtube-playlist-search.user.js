// ==UserScript==
// @name        YouTube Playlist Search
// @version     1.1.3
// @description Allows you to quickly search through youtube playlists
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       https://www.youtube.com/*
// @namespace   http://www.fuzetsu.com/YPS
// @require     https://cdn.rawgit.com/fuzetsu/userscripts/477063e939b9658b64d2f91878da20a7f831d98b/wait-for-elements/wait-for-elements.js
// @copyright   2014+, fuzetsu
// @grant       none
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/youtube-playlist-search.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/youtube-playlist-search.meta.js
// ==/UserScript==

/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/youtube-playlist-search/youtube-playlist-search.user.js":
/*!*********************************************************************!*\
  !*** ./src/youtube-playlist-search/youtube-playlist-search.user.js ***!
  \*********************************************************************/
/***/ (() => {

eval("function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]); if (_i == null) return; var _arr = [], _n = true, _d = false, _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n// ==UserScript==\n// @name         YouTube Playlist Search\n// @namespace    http://www.fuzetsu.com/YPS\n// @version      1.1.3\n// @description  Allows you to quickly search through youtube playlists\n// @match        https://www.youtube.com/*\n// @require      https://cdn.rawgit.com/fuzetsu/userscripts/477063e939b9658b64d2f91878da20a7f831d98b/wait-for-elements/wait-for-elements.js\n// @copyright    2014+, fuzetsu\n// @grant        none\n// ==/UserScript==\nvar SCRIPT_NAME = 'YouTube Playlist Search',\n    ITEM_SELECTOR = '#contents > ytd-playlist-video-renderer,ytd-grid-video-renderer',\n    ITEM_PROGRESS_SELECTOR = ITEM_SELECTOR + ' #progress',\n    TEXT_SELECTOR = '#meta',\n    OFFSET_AREA_SELECTOR = '#masthead-container',\n    util = {\n  log: function log() {\n    for (var _console, _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return (_console = console).log.apply(_console, [\"%c\".concat(SCRIPT_NAME), 'font-weight: bold;color: hotpink;'].concat(args));\n  },\n  q: function q(query, context) {\n    return (context || document).querySelector(query);\n  },\n  qq: function qq(query, context) {\n    return Array.from((context || document).querySelectorAll(query));\n  },\n  debounce: function debounce(cb, ms) {\n    var id;\n    return function () {\n      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n\n      clearTimeout(id);\n      id = setTimeout(function () {\n        return cb.apply(void 0, args);\n      }, ms);\n    };\n  },\n  makeElem: function makeElem(tag, attrs) {\n    var elem = document.createElement(tag);\n    Object.entries(attrs).forEach(function (_ref) {\n      var _ref2 = _slicedToArray(_ref, 2),\n          attr = _ref2[0],\n          val = _ref2[1];\n\n      return !['style'].includes(attr) && attr in elem ? elem[attr] = val : elem.setAttribute(attr, val);\n    });\n    return elem;\n  }\n},\n    yps = {\n  _items: [],\n  hideWatched: false,\n  render: function render() {\n    var commonStyles = ['position: fixed', \"top: \".concat(util.q(OFFSET_AREA_SELECTOR).clientHeight, \"px\"), 'z-index: 9000', 'padding: 5px 8px', 'border: 1px solid #999', 'font-size: medium', 'color: var(--yt-primary-text-color)', 'margin: 0', 'box-sizing: border-box', 'background: var(--yt-main-app-background-tmp)'],\n        txtSearch = util.makeElem('input', {\n      type: 'text',\n      placeholder: 'filter - start with ^ for inverse search',\n      style: [].concat(commonStyles, ['right: 0', 'width: 300px']).join(';'),\n      onkeyup: util.debounce(function (e) {\n        var _resultCount;\n\n        return (_resultCount = resultCount).render.apply(_resultCount, _toConsumableArray(yps.search(e.target.value)));\n      }, 200)\n    }),\n        resultCount = util.makeElem('span', {\n      style: [].concat(commonStyles, ['right: 300px']).join(';'),\n      textContent: '-'\n    });\n\n    resultCount.render = function (x, y, invert) {\n      return resultCount.childNodes[0].textContent = \"Showing \".concat(x, \" of \").concat(y, \" \").concat(invert ? '(NOT)' : '', \" | Hide Watched \");\n    };\n\n    var toggleWatched = util.makeElem('input', {\n      type: 'checkbox',\n      value: yps.hideWatched,\n      onchange: function onchange() {\n        var _resultCount2;\n\n        return yps.hideWatched = toggleWatched.checked, (_resultCount2 = resultCount).render.apply(_resultCount2, _toConsumableArray(yps.search(txtSearch.value)));\n      }\n    });\n    resultCount.appendChild(toggleWatched);\n    [txtSearch, resultCount].forEach(function (elem) {\n      return document.body.appendChild(elem);\n    });\n    return {\n      txtSearch: txtSearch,\n      resultCount: resultCount\n    };\n  },\n  search: function search() {\n    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '',\n        invert = query.startsWith('^');\n    if (invert) query = query.slice(1);\n    query = query.toLowerCase().trim().split(' ').map(function (q) {\n      return q.trim();\n    }).filter(function (q) {\n      return !!q;\n    });\n\n    var count = yps._items.map(function (item) {\n      var hideBecauseWatched = yps.hideWatched && item.watched,\n          hide = hideBecauseWatched || !query[invert ? 'some' : 'every'](function (q) {\n        return item.name.includes(q);\n      });\n      if (invert && !hideBecauseWatched) hide = !hide;\n      item.elem.style.display = hide ? 'none' : '';\n      return hide;\n    }).filter(function (hide) {\n      return !hide;\n    }).length;\n\n    return [count, yps._items.length, invert];\n  },\n  start: function start() {\n    util.log('Starting... waiting for playlist');\n    waitForUrl(/^https:\\/\\/www\\.youtube\\.com\\/(playlist\\?list=|(user|channel)\\/[^\\/]+\\/videos|feed\\/subscriptions).*/, function () {\n      util.log('Reached playlist, adding search box');\n\n      var playlistUrl = location.href,\n          _yps$render = yps.render(),\n          txtSearch = _yps$render.txtSearch,\n          resultCount = _yps$render.resultCount,\n          refresh = util.debounce(function () {\n        var _resultCount3;\n\n        return (_resultCount3 = resultCount).render.apply(_resultCount3, _toConsumableArray(yps.search(txtSearch.value)));\n      }, 50),\n          itemWait = waitForElems({\n        sel: ITEM_SELECTOR,\n        onmatch: function onmatch(elem) {\n          yps._items.push({\n            elem: elem,\n            name: util.q(TEXT_SELECTOR, elem).textContent.toLowerCase(),\n            watched: false\n          });\n\n          refresh();\n        }\n      }),\n          progressWait = waitForElems({\n        sel: ITEM_PROGRESS_SELECTOR,\n        onmatch: function onmatch(prog) {\n          var watched = parseInt(prog.style.width) > 50;\n          if (!watched) return;\n\n          var itemElem = prog.closest(ITEM_SELECTOR),\n              found = yps._items.find(function (item) {\n            return item.elem === itemElem;\n          });\n\n          if (!found) return console.log('error, unable to find item parent', prog, itemElem, found);\n          found.watched = watched;\n          if (yps.hideWatched && watched) refresh();\n        }\n      }),\n          urlWaitId = waitForUrl(function (url) {\n        return url !== playlistUrl;\n      }, function () {\n        util.log('leaving playlist, cleaning up');\n        [progressWait, itemWait, urlWaitId].forEach(function (wait) {\n          return wait.stop && wait.stop() || clearInterval(wait);\n        });\n        [txtSearch, resultCount].forEach(function (elem) {\n          return elem.remove();\n        });\n        yps._items = [];\n      }, true);\n    });\n  }\n};\nyps.start();\n\n//# sourceURL=webpack://userscripts/./src/youtube-playlist-search/youtube-playlist-search.user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/youtube-playlist-search/youtube-playlist-search.user.js"]();
/******/ 	
/******/ })()
;