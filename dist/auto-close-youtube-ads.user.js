// ==UserScript==
// @name        Auto Close YouTube Ads
// @version     2021.5.12035638
// @author      fuzetsu
// @description Close and/or Mute YouTube ads automatically!
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://*.youtube.com/*
// @namespace   http://fuzetsu.acypa.com
// @exclude     *://*.youtube.com/subscribe_embed?*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_registerMenuCommand
// @require     https://gitcdn.xyz/repo/fuzetsu/userscripts/b38eabf72c20fa3cf7da84ecd2cefe0d4a2116be/wait-for-elements/wait-for-elements.js
// @require     https://gitcdn.xyz/repo/kufii/My-UserScripts/fa4555701cf5a22eae44f06d9848df6966788fa8/libs/gm_config.js
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/auto-close-youtube-ads.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/auto-close-youtube-ads.meta.js
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

/***/ "./src/auto-close-youtube-ads/auto-close-youtube-ads.user.js":
/*!*******************************************************************!*\
  !*** ./src/auto-close-youtube-ads/auto-close-youtube-ads.user.js ***!
  \*******************************************************************/
/***/ (() => {

eval("function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]); if (_i == null) return; var _arr = [], _n = true, _d = false, _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n// ==UserScript==\n// @name         Auto Close YouTube Ads\n// @namespace    http://fuzetsu.acypa.com\n// @version      1.4.1\n// @description  Close and/or Mute YouTube ads automatically!\n// @author       fuzetsu\n// @match        *://*.youtube.com/*\n// @exclude      *://*.youtube.com/subscribe_embed?*\n// @grant        GM_getValue\n// @grant        GM_setValue\n// @grant        GM_deleteValue\n// @grant        GM_registerMenuCommand\n// @require      https://gitcdn.xyz/repo/fuzetsu/userscripts/b38eabf72c20fa3cf7da84ecd2cefe0d4a2116be/wait-for-elements/wait-for-elements.js\n// @require      https://gitcdn.xyz/repo/kufii/My-UserScripts/fa4555701cf5a22eae44f06d9848df6966788fa8/libs/gm_config.js\n// ==/UserScript==\n\n/* globals GM_getValue GM_setValue GM_deleteValue GM_registerMenuCommand GM_config waitForElems waitForUrl */\n\n/**\r\n * This section of the code holds the css selectors that point different parts of YouTube's\r\n * user interface. If the script ever breaks and you don't want to wait for me to fix it\r\n * chances are that it can be fixed by just updating these selectors here.\r\n */\nvar CSS = {\n  // the button used to skip an ad\n  skipButton: '.videoAdUiSkipButton,.ytp-ad-skip-button',\n  // the area showing the countdown to the skip button showing\n  preSkipButton: '.videoAdUiPreSkipButton,.ytp-ad-preview-container',\n  // little x that closes banner ads\n  closeBannerAd: '.close-padding.contains-svg,a.close-button,.ytp-ad-overlay-close-button',\n  // button that toggle mute on the video\n  muteButton: '.ytp-mute-button',\n  // the slider bar handle that represents the current volume\n  muteIndicator: '.ytp-volume-slider-handle',\n  // container for ad on video\n  adArea: '.videoAdUi,.ytp-ad-player-overlay',\n  // container that shows ad length eg 3:23\n  adLength: '.videoAdUiAttribution,.ytp-ad-duration-remaining',\n  // container for header ad on the home page\n  homeAdContainer: '#masthead-ad'\n},\n    util = {\n  log: function log() {\n    for (var _console, _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return (_console = console).log.apply(_console, [\"%c\".concat(SCRIPT_NAME, \":\"), 'font-weight: bold;color: purple;'].concat(args));\n  },\n  clearTicks: function clearTicks(ticks) {\n    ticks.forEach(function (tick) {\n      return !tick ? null : typeof tick === 'number' ? clearInterval(tick) : tick.stop();\n    });\n    ticks.length = 0;\n  },\n  keepTrying: function keepTrying(wait, action) {\n    var tick = setInterval(function () {\n      return action() && clearInterval(tick);\n    }, wait);\n    return tick;\n  },\n  storeGet: function storeGet(key) {\n    if (typeof GM_getValue === 'undefined') {\n      var value = localStorage.getItem(key);\n      return value === 'true' ? true : value === 'false' ? false : value;\n    }\n\n    return GM_getValue(key);\n  },\n  storeSet: function storeSet(key, value) {\n    return typeof GM_setValue === 'undefined' ? localStorage.setItem(key, value) : GM_setValue(key, value);\n  },\n  storeDel: function storeDel(key) {\n    return typeof GM_deleteValue === 'undefined' ? localStorage.removeItem(key) : GM_deleteValue(key);\n  },\n  q: function q(query, context) {\n    return (context || document).querySelector(query);\n  },\n  qq: function qq(query, context) {\n    return Array.from((context || document).querySelectorAll(query));\n  },\n  get: function get(obj, str) {\n    return util.getPath(obj, str.split('.').reverse());\n  },\n  getPath: function getPath(obj, path) {\n    return obj == null ? null : path.length > 0 ? util.getPath(obj[path.pop()], path) : obj;\n  }\n},\n    SCRIPT_NAME = 'Auto Close YouTube Ads',\n    SHORT_AD_MSG_LENGTH = 12e3,\n    TICKS = [],\n    DONT_SKIP = false,\n    config = GM_config([{\n  key: 'muteAd',\n  label: 'Mute ads?',\n  type: 'bool',\n  \"default\": true\n}, {\n  key: 'hideAd',\n  label: 'Hide video ads?',\n  type: 'bool',\n  \"default\": false\n}, {\n  key: 'secWaitBanner',\n  label: 'Banner ad close delay (seconds)',\n  type: 'number',\n  \"default\": 3,\n  min: 0\n}, {\n  key: 'secWaitVideo',\n  label: 'Video ad skip delay (seconds)',\n  type: 'number',\n  \"default\": 3,\n  min: 0\n}, {\n  key: 'minAdLengthForSkip',\n  label: 'Dont skip video shorter than this (seconds)',\n  type: 'number',\n  \"default\": 0,\n  min: 0\n}, {\n  key: 'muteEvenIfNotSkipping',\n  label: 'Mute video even if not skipping',\n  type: 'bool',\n  \"default\": true\n}, {\n  key: 'debug',\n  label: 'Show extra debug information.',\n  type: 'bool',\n  \"default\": false\n}, {\n  key: 'version',\n  type: 'hidden',\n  \"default\": 1\n}]),\n    configVersion = 2,\n    conf = config.load();\n\nconfig.onsave = function (cfg) {\n  return conf = cfg;\n}; // config upgrade procedure\n\n\nfunction upgradeConfig() {\n  var lastVersion;\n\n  while (conf.version < configVersion && lastVersion !== conf.version) {\n    util.log('upgrading config version, current = ', conf.version, ', target = ', configVersion);\n    lastVersion = conf.version;\n\n    switch (conf.version) {\n      case 1:\n        {\n          var oldConf = {\n            muteAd: util.storeGet('MUTE_AD'),\n            hideAd: util.storeGet('HIDE_AD'),\n            secWait: util.storeGet('SEC_WAIT')\n          };\n          if (oldConf.muteAd != null) conf.muteAd = !!oldConf.muteAd;\n          if (oldConf.hideAd != null) conf.hideAd = !!oldConf.hideAd;\n          if (oldConf.secWait != null && !isNaN(oldConf.secWait)) conf.secWaitBanner = conf.secWaitVideo = parseInt(oldConf.secWait);\n          conf.version = 2;\n          config.save(conf);\n          ['SEC_WAIT', 'HIDE_AD', 'MUTE_AD'].forEach(util.storeDel);\n          break;\n        }\n    }\n  }\n}\n\nupgradeConfig();\n\nfunction createMessageElement() {\n  var elem = document.createElement('div');\n  elem.setAttribute('style', 'border: 1px solid white;border-right: none;background: rgb(0,0,0,0.75);color:white;position: absolute;right: 0;z-index: 1000;top: 10px;padding: 10px;padding-right: 20px;cursor: pointer;pointer-events: all;');\n  return elem;\n}\n\nfunction showMessage(container, text, ms) {\n  var message = createMessageElement();\n  message.textContent = text;\n  container.appendChild(message);\n  util.log(\"showing message [\".concat(ms, \"ms]: \").concat(text));\n  setTimeout(function () {\n    return message.remove();\n  }, ms);\n}\n\nfunction setupCancelDiv(ad) {\n  var skipArea = util.q(CSS.preSkipButton, ad),\n      skipText = skipArea && skipArea.textContent.trim().replace(/\\s+/g, ' ');\n\n  if (skipText && !['will begin', 'will play'].some(function (snip) {\n    return skipText.includes(snip);\n  })) {\n    var cancelClass = 'acya-cancel-skip',\n        cancelDiv = util.q('.' + cancelClass);\n    if (cancelDiv) cancelDiv.remove();\n    cancelDiv = createMessageElement();\n    cancelDiv.className = cancelClass;\n    cancelDiv.textContent = (conf.muteAd ? 'Un-mute & ' : '') + 'Cancel Auto Skip';\n\n    cancelDiv.onclick = function () {\n      util.log('cancel clicked');\n      DONT_SKIP = true;\n      cancelDiv.remove();\n      var muteButton = getMuteButton(),\n          muteIndicator = getMuteIndicator();\n      if (conf.muteAd && muteButton && muteIndicator && isMuted(muteIndicator)) muteButton.click();\n    };\n\n    ad.appendChild(cancelDiv);\n  } else {\n    util.log(\"skip button area wasn't there for some reason.. couldn't place cancel button.\");\n  }\n}\n\nfunction parseTime(str) {\n  var _str$split$pop$split$ = str.split(' ').pop().split(':').map(function (num) {\n    return parseInt(num);\n  }),\n      _str$split$pop$split$2 = _slicedToArray(_str$split$pop$split$, 2),\n      minutes = _str$split$pop$split$2[0],\n      seconds = _str$split$pop$split$2[1];\n\n  util.log(str, minutes, seconds);\n  return minutes * 60 + seconds || 0;\n}\n\nvar getMuteButton = function getMuteButton() {\n  return util.q(CSS.muteButton);\n},\n    getMuteIndicator = function getMuteIndicator() {\n  return util.q(CSS.muteIndicator);\n},\n    isMuted = function isMuted(m) {\n  return m.style.left === '0px';\n};\n\nfunction getAdLength(ad) {\n  if (!ad) return 0;\n  var time = ad.querySelector(CSS.adLength);\n  return time ? parseTime(time.textContent) : 0;\n}\n\nfunction waitForAds() {\n  DONT_SKIP = false;\n  TICKS.push(waitForElems({\n    sel: CSS.skipButton,\n    onmatch: function onmatch(btn) {\n      util.log('found skip button');\n      util.keepTrying(500, function () {\n        if (!btn) return true; // if not visible\n\n        if (btn.offsetParent === null) return;\n        setTimeout(function () {\n          if (DONT_SKIP) {\n            util.log('not skipping...');\n            DONT_SKIP = false;\n            return;\n          }\n\n          util.log('clicking skip button');\n          btn.click();\n        }, conf.secWaitVideo * 1e3);\n        return true;\n      });\n    }\n  }), waitAndClick(CSS.closeBannerAd, conf.secWaitBanner * 1e3), waitForElems({\n    sel: CSS.adArea,\n    onmatch: function onmatch(ad) {\n      // reset don't skip\n      DONT_SKIP = false;\n\n      var adLength = getAdLength(ad),\n          isShort = adLength < conf.minAdLengthForSkip,\n          debug = function debug() {\n        return conf.debug ? \"[DEBUG adLength = \".concat(adLength, \", minAdLengthForSkip = \").concat(conf.minAdLengthForSkip, \"]\") : '';\n      };\n\n      if (isShort && !conf.muteEvenIfNotSkipping) {\n        DONT_SKIP = true;\n        return showMessage(ad, \"Shot AD detected, will not skip or mute. \".concat(debug()), SHORT_AD_MSG_LENGTH);\n      }\n\n      if (conf.hideAd) {\n        ad.style.zIndex = 10;\n        ad.style.background = 'black';\n      } // show option to cancel automatic skip\n\n\n      if (!isShort) setupCancelDiv(ad);\n      if (!conf.muteAd) return;\n      var muteButton = getMuteButton(),\n          muteIndicator = getMuteIndicator();\n      if (!muteIndicator) return util.log('unable to determine mute state, skipping mute');\n      muteButton.click();\n      util.log('Video ad detected, muting audio'); // wait for the ad to disappear before unmuting\n\n      util.keepTrying(250, function () {\n        if (!util.q(CSS.adArea)) {\n          if (isMuted(muteIndicator)) {\n            muteButton.click();\n            util.log('Video ad ended, unmuting audio');\n          } else {\n            util.log('Video ad ended, audio already unmuted');\n          }\n\n          return true;\n        }\n      });\n\n      if (isShort) {\n        DONT_SKIP = true;\n        return showMessage(ad, \"Short AD detected, will not skip but will mute. \".concat(debug()), SHORT_AD_MSG_LENGTH);\n      }\n    }\n  }));\n}\n\nvar waitAndClick = function waitAndClick(sel, ms, cb) {\n  return waitForElems({\n    sel: sel,\n    onmatch: function onmatch(btn) {\n      util.log('Found ad, closing in', ms, 'ms');\n      setTimeout(function () {\n        btn.click();\n        if (cb) cb(btn);\n      }, ms);\n    }\n  });\n};\n\nutil.log('Started');\n\nif (window.self === window.top) {\n  var videoUrl; // close home ad whenever encountered\n\n  waitForElems({\n    sel: CSS.homeAdContainer,\n    onmatch: function onmatch(ad) {\n      return ad.remove();\n    }\n  }); // wait for video page\n\n  waitForUrl(/^https:\\/\\/www\\.youtube\\.com\\/watch\\?.*v=.+/, function () {\n    if (videoUrl && location.href !== videoUrl) {\n      util.log('Changed video, removing old wait');\n      util.clearTicks(TICKS);\n    }\n\n    videoUrl = location.href;\n    util.log('Entered video, waiting for ads');\n    waitForAds();\n    TICKS.push(waitForUrl(function (url) {\n      return url !== videoUrl;\n    }, function () {\n      videoUrl = null;\n      util.clearTicks(TICKS);\n      util.log('Left video, stopped waiting for ads');\n    }, true));\n  });\n} else {\n  if (/^https:\\/\\/www\\.youtube\\.com\\/embed\\//.test(location.href)) {\n    util.log('Found embedded video, waiting for ads');\n    waitForAds();\n  }\n}\n\nGM_registerMenuCommand('Auto Close Youtube Ads - Manage Settings', config.setup);\n\n//# sourceURL=webpack://userscripts/./src/auto-close-youtube-ads/auto-close-youtube-ads.user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/auto-close-youtube-ads/auto-close-youtube-ads.user.js"]();
/******/ 	
/******/ })()
;