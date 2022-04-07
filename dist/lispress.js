/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 527:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var config_1 = __webpack_require__(541);
function getArticles() {
    return fetch((0, config_1.default)().articles, {
        headers: {
            authorization: 'Basic ' + btoa((0, config_1.default)().clientID + ':' + (0, config_1.default)().clientSecret),
        },
    })
        .then(function (resp) { return resp.json(); })
        .then(function (json) {
        return json
            .map(function (obj) { return obj.name; })
            .filter(function (obj) {
            return obj != 'index.html' && obj != 'assets';
        });
    });
}
function getDateMap() {
    var dateMap = {};
    return fetch("https://api.github.com/search/code?q=date%20user:".concat((0, config_1.default)().username, "%20path:articles/%20language:markdown"), {
        headers: {
            Accept: 'application/vnd.github.v3.text-match+json',
            authorization: 'Basic ' + btoa((0, config_1.default)().clientID + ':' + (0, config_1.default)().clientSecret),
        },
    })
        .then(function (resp) { return resp.json(); })
        .then(function (result) {
        result = result.items.filter(function (element) {
            return !/articles\/.*\//.test(element.path);
        });
        result.forEach(function (element) {
            try {
                dateMap[element.name] = Number(element.text_matches[0].fragment
                    .match(/\d{4}(-\d{2}){2} \d{2}(:\d{2}){2}/)[0]
                    .replace(/-| |:/g, ''));
            }
            catch (_a) {
                dateMap[element.name] = 0;
            }
        });
        return dateMap;
    });
}
exports["default"] = {
    getArticles: getArticles,
    getDateMap: getDateMap,
};


/***/ }),

/***/ 541:
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
function default_1(obj) {
    if (obj === void 0) { obj = {}; }
    if (Reflect.has(obj, 'username')) {
        config.username = obj.username;
    }
    else if (config.username == null) {
        config.username = getUsername();
    }
    config = __assign(__assign(__assign({}, init(config.username)), config), obj);
    return config;
}
exports["default"] = default_1;
// data container
var config = {};
// init data
function init(username) {
    return {
        articles: "https://api.github.com/repos/".concat(username, "/").concat(username, ".github.io/contents/articles"),
        article: "https://".concat(username, ".github.io/articles/{title}"),
        background: "https://".concat(username, ".github.io/articles/assets/{title}/background.jpg"),
        avatar: "https://avatars.githubusercontent.com/".concat(username),
    };
}
// get username from host
function getUsername() {
    var username;
    var index = location.host.indexOf('.github.io');
    if (index == -1) {
        console.error('Failed to obtain username,have you set the github.username in config.js?');
        return 'lisnote';
    }
    username = location.host.substring(0, index);
    return username;
}


/***/ }),

/***/ 347:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var config_1 = __webpack_require__(541);
function default_1(title) {
    return fetch((0, config_1.default)().article.replace(/\{title\}/g, title))
        .then(function (resp) { return resp.text(); });
}
exports["default"] = default_1;


/***/ }),

/***/ 802:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var common_1 = __webpack_require__(527);
function default_1() {
    var titles;
    var dateMap;
    var getarticles = common_1.default
        .getArticles()
        .then(function (thatTitles) { return (titles = thatTitles); });
    var getDateMap = common_1.default
        .getDateMap()
        .then(function (thatDateMap) { return (dateMap = thatDateMap); });
    return Promise.all([getarticles, getDateMap]).then(function () {
        titles.sort(function (x, y) {
            return dateMap[y] - dateMap[x];
        });
        return titles;
    });
}
exports["default"] = default_1;


/***/ }),

/***/ 592:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var config_1 = __webpack_require__(541);
function default_1(title) {
    return (0, config_1.default)().background.replace(/\{title\}/g, title);
}
exports["default"] = default_1;


/***/ }),

/***/ 806:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var common_1 = __webpack_require__(527);
var getArticleContent_1 = __webpack_require__(347);
function default_1(keywords) {
    var titles;
    var dateMap;
    var getarticles = common_1.default
        .getArticles()
        .then(function (thatTitles) { return (titles = thatTitles); });
    var getDateMap = common_1.default
        .getDateMap()
        .then(function (thatDateMap) { return (dateMap = thatDateMap); });
    return Promise.all([getarticles, getDateMap]).then(function () {
        var promises = [];
        var filter = [];
        var _loop_1 = function (title) {
            var promise = (0, getArticleContent_1.default)(title)
                .then(function (article) {
                if (hasKeywords(keywords, title, article)) {
                    filter.push(title);
                }
            });
            promises.push(promise);
        };
        for (var _i = 0, titles_1 = titles; _i < titles_1.length; _i++) {
            var title = titles_1[_i];
            _loop_1(title);
        }
        return Promise.all(promises).then(function () {
            filter.sort(function (x, y) {
                return dateMap[y] - dateMap[x];
            });
            return filter;
        });
    });
    function hasKeywords(keywords, title, article) {
        for (var _i = 0, keywords_1 = keywords; _i < keywords_1.length; _i++) {
            var keyword = keywords_1[_i];
            if (title.indexOf(keyword) < 0 && article.indexOf(keyword) < 0) {
                return false;
            }
        }
        return true;
    }
}
exports["default"] = default_1;


/***/ }),

/***/ 355:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var config_1 = __webpack_require__(541);
function default_1(selector) {
    document.querySelectorAll(selector).forEach(function (obj) {
        obj.setAttribute('src', (0, config_1.default)().avatar);
    });
}
exports["default"] = default_1;


/***/ }),

/***/ 119:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var config_1 = __webpack_require__(541);
function default_1(selector) {
    document.querySelectorAll(selector).forEach(function (obj) {
        obj.setAttribute('href', "https://github.com/".concat((0, config_1.default)().username));
    });
}
exports["default"] = default_1;


/***/ }),

/***/ 713:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var config_1 = __webpack_require__(541);
function default_1(selector) {
    document.querySelectorAll(selector).forEach(function (obj) {
        obj.innerText = (0, config_1.default)().username;
    });
}
exports["default"] = default_1;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var config_1 = __webpack_require__(541);
var getArticleContent_1 = __webpack_require__(347);
var getArticlesTitle_1 = __webpack_require__(802);
var getBackgroundUrl_1 = __webpack_require__(592);
var getSearchArticlesTitle_1 = __webpack_require__(806);
var setAvatar_1 = __webpack_require__(355);
var setGithubUrl_1 = __webpack_require__(119);
var setUsername_1 = __webpack_require__(713);
window.lispress = {
    config: config_1.default,
    getArticleContent: getArticleContent_1.default,
    getArticlesTitle: getArticlesTitle_1.default,
    getBackgroundUrl: getBackgroundUrl_1.default,
    getSearchArticlesTitle: getSearchArticlesTitle_1.default,
    setAvatar: setAvatar_1.default,
    setGithubUrl: setGithubUrl_1.default,
    setUsername: setUsername_1.default,
};

})();

/******/ })()
;