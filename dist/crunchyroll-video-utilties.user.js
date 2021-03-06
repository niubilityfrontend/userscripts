// ==UserScript==
// @name        Crunchyroll Video Utilities
// @version     2021.7.516143257
// @description seek video with hotkeys and set default quality
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       https://static.crunchyroll.com/*/player.html
// @match       https://www.crunchyroll.com/*
// @namespace   fuzetsu/csdvqn
// @grant       GM_registerMenuCommand
// @grant       GM_getValue
// @grant       GM_setValue
// @require     https://gitcdn.xyz/cdn/fuzetsu/userscripts/b38eabf72c20fa3cf7da84ecd2cefe0d4a2116be/wait-for-elements/wait-for-elements.js
// @require     https://gitcdn.xyz/cdn/kufii/My-UserScripts/fa4555701cf5a22eae44f06d9848df6966788fa8/libs/gm_config.js
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/crunchyroll-video-utilties.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/crunchyroll-video-utilties.meta.js
// ==/UserScript==

(() => {
    var __webpack_exports__ = {};
    var sep = "~~@~~", domain = "https://www.crunchyroll.com", CSS = {
        quality: ".qualityMenuItemSelector",
        settings: ".settingsMenuButton,#settingsControl",
        playerBox: "#showmedia_video_player"
    }, vilosPlayer = function vilosPlayer() {
        return unsafeWindow.VILOS_PLAYERJS;
    }, qq = function qq(q, c) {
        return Array.from((c || document).querySelectorAll(q));
    }, q = function q(_q, c) {
        return (c || document).querySelector(_q);
    }, config = GM_config([ {
        key: "quality",
        label: "Quality",
        type: "dropdown",
        values: [ "auto", 360, 480, 720, 1080 ],
        default: "auto"
    } ]), cfg = config.load();
    config.onsave = function(newCfg) {
        cfg = newCfg;
        player.setQuality(cfg.quality);
    };
    var p = function p() {
        var _console;
        return (_console = console).log.apply(_console, arguments), arguments.length <= 0 ? undefined : arguments[0];
    }, isFullscreen = false, player = {
        setQuality: function setQuality(quality) {
            var btn = quality !== "auto" ? qq(CSS.quality).slice(2).find((function(item) {
                return quality >= parseInt(item.textContent);
            })) : qq(CSS.quality)[2];
            if (btn) {
                btn.click();
                setTimeout(player.toggleSettings, 200, false);
            }
        },
        fillTab: function fillTab() {
            var playerBox = q(CSS.playerBox);
            if (!playerBox) return p("playerbox not found");
            isFullscreen = !isFullscreen;
            if (!isFullscreen) return playerBox.removeAttribute("style");
            Object.assign(playerBox.style, {
                position: "fixed",
                zIndex: 1e3,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "100%"
            });
        },
        nextEp: function nextEp() {
            var back = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            return q(".collection-carousel-media-link-current").parentElement[back ? "previousElementSibling" : "nextElementSibling"].querySelector("a").click();
        },
        prevEp: function prevEp() {
            return player.nextEp(true);
        },
        skip: function skip(sec) {
            return vilosPlayer().getCurrentTime((function(curTime) {
                return vilosPlayer().setCurrentTime(curTime + sec);
            }));
        },
        volumeUp: function volumeUp() {
            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
            return vilosPlayer().getVolume((function(curVol) {
                return vilosPlayer().setVolume(curVol + val);
            }));
        },
        volumeDown: function volumeDown() {
            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -10;
            return player.volumeUp(val);
        },
        toggleSettings: function toggleSettings(makeVisible) {
            var btn = q(CSS.settings);
            if (typeof makeVisible === "boolean") {
                var isVisible = p(!!btn.offSetParent, "=== isVisible");
                if (makeVisible === isVisible) return;
            }
            btn.click();
        }
    }, seekKeys = {
        l: 85,
        b: -85,
        "}": 30,
        "{": -30,
        "]": 15,
        "[": -15
    }, handleKey = function handleKey(key) {
        return key === "n" ? player.nextEp() : key === "p" ? player.prevEp() : key === "j" ? player.volumeDown() : key === "k" ? player.volumeUp() : key === "w" ? player.fillTab() : key in seekKeys ? player.skip(seekKeys[key]) : null;
    }, isPlayerFrame = location.href.includes("static.crunchyroll.com"), pass = [ "INPUT", "TEXTAREA", "SELECT" ];
    window.addEventListener("keydown", isPlayerFrame ? function(e) {
        return window.parent.postMessage(sep + e.key, domain);
    } : function(e) {
        return pass.includes(document.activeElement.nodeName) || handleKey(e.key);
    });
    if (isPlayerFrame) {
        waitForElems({
            stop: true,
            sel: CSS.quality + ".selected",
            onmatch: function onmatch(elem) {
                if (elem.textContent.toLowerCase().includes(cfg.quality)) return p("configured default already selected");
                player.setQuality(cfg.quality);
            }
        });
    } else {
        window.addEventListener("message", (function(_ref) {
            var data = _ref.data;
            return data.startsWith(sep) && handleKey(data.slice(sep.length));
        }));
    }
    GM_registerMenuCommand("Crunchyroll Video Utilities - Config", config.setup);
})();