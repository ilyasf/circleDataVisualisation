/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _App = __webpack_require__(1);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _main = __webpack_require__(6);
	
	var _main2 = _interopRequireDefault(_main);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = new _App2.default();
	app.start();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _helpers = __webpack_require__(2);
	
	var _ViewPort = __webpack_require__(4);
	
	var _Widget = __webpack_require__(5);
	
	var _const = __webpack_require__(3);
	
	/**
	 * General Application class.
	 * - generate viewport
	 * - generate widget and set render viewport
	 *
	 * publick void method start Main point of Application
	*/
	function Application() {
	    var widget = void 0;
	    var pane = void 0;
	
	    var _stopEvent = function _stopEvent(e) {
	        return e.stopPropagation(), e.preventDefault();
	    };
	
	    var _zoomInHandler = function _zoomInHandler(e) {
	        return _stopEvent(e), pane.zoomIn(), 0;
	    };
	
	    var _zoomOutHandler = function _zoomOutHandler(e) {
	        return _stopEvent(e), pane.zoomOut(), 0;
	    };
	
	    var _rotateLeftHandler = function _rotateLeftHandler(e) {
	        return _stopEvent(e), pane.rotateLeft(), 0;
	    };
	
	    var _rotateRightHandler = function _rotateRightHandler(e) {
	        return _stopEvent(e), pane.rotateRight(), 0;
	    };
	
	    var _addZoomHandler = function _addZoomHandler() {
	        _helpers._document.querySelector('.zoom-in').addEventListener('click', _zoomInHandler);
	        _helpers._document.querySelector('.zoom-out').addEventListener('click', _zoomOutHandler);
	    };
	
	    var _addRotateHandler = function _addRotateHandler() {
	        _helpers._document.querySelector('.rotate-left').addEventListener('click', _rotateLeftHandler);
	        _helpers._document.querySelector('.rotate-right').addEventListener('click', _rotateRightHandler);
	    };
	
	    /**
	     * Application main.
	     * @void
	    */
	    var _start = function _start() {
	        if (!(typeof _widget === 'undefined' ? 'undefined' : _typeof(_widget)) === 'undefined') {
	            throw new Error('You can use only one instance of Application!');
	        }
	        if (_helpers._document == null) {
	            throw new Error('Cannot get document of window!');
	        }
	        pane = new _ViewPort.viewPort();
	        widget = new _Widget.Widget(pane);
	        _addZoomHandler();
	        _addRotateHandler();
	        widget.loadData('resourses/testData.json');
	    };
	
	    return {
	        start: _start
	    };
	}
	
	exports.default = Application;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports._fixDigit = exports._getPercentFn = exports._valueToheight = exports._gradToRadian = exports._getSectorWidth = exports._diff = exports._pixel = exports._color = exports._windowInnerHeight = exports._windowInnerWIdth = exports._document = exports._window = undefined;
	
	var _const = __webpack_require__(3);
	
	//helpers
	var _window = exports._window = new Function('return this;')();
	var _document = exports._document = _window.document;
	var _windowInnerWIdth = exports._windowInnerWIdth = _window.innerWidth;
	var _windowInnerHeight = exports._windowInnerHeight = _window.innerHeight;
	
	var _color = exports._color = function _color(r, g, b) {
	    return {
	        red: r,
	        green: g,
	        blue: b
	    };
	};
	
	var _pixel = exports._pixel = function _pixel(x, y, color) {
	    return {
	        x: x,
	        y: y,
	        color: color
	    };
	};
	
	var _diff = exports._diff = function _diff(a, b) {
	    return a > b ? a - b : b - a;
	};
	
	var _getSectorWidth = exports._getSectorWidth = function _getSectorWidth(r, angle) {
	    return Math.PI * r * angle / 180;
	};
	
	var _gradToRadian = exports._gradToRadian = function _gradToRadian(angle) {
	    return angle * Math.PI / 180;
	};
	
	var _valueToheight = exports._valueToheight = function () {
	    var fullPercentage = _diff(_const.REGIONS_NAME_RADIUS, _const.REGION_ITEM_PERCENTAGE_TEXT);
	    return function (percentValue) {
	        return fullPercentage * percentValue / 100;
	    };
	}();
	
	var _getPercentFn = exports._getPercentFn = function _getPercentFn(maxValue) {
	    return function (value) {
	        return value * 100 / maxValue;
	    };
	};
	
	var _fixDigit = exports._fixDigit = function _fixDigit(value) {
	    return (value * 10 | 0) / 10;
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// constants
	var MAX_SCALE = exports.MAX_SCALE = 1.3;
	var MIN_SCALE = exports.MIN_SCALE = 0.6;
	var SCALE_STEP = exports.SCALE_STEP = 0.30;
	var ROTATION_STEP = exports.ROTATION_STEP = 25;
	
	// widget settings constants
	var CENTRAL_PLACE_COLOR = exports.CENTRAL_PLACE_COLOR = '#2E3643';
	var REGIONS_COLOR = exports.REGIONS_COLOR = '#585E69';
	var REGIONS_TEXT_COLOR = exports.REGIONS_TEXT_COLOR = '#FAFAFA';
	var REGIONS_VALUE_COLOR = exports.REGIONS_VALUE_COLOR = '#FFFFFF';
	var PERCENTAGE_COLOR = exports.PERCENTAGE_COLOR = '#CFD7DA';
	var REGIONS_BORDER_COLOR = exports.REGIONS_BORDER_COLOR = '#000000';
	var PERCENTAGE_SECTOR_COLOR = exports.PERCENTAGE_SECTOR_COLOR = '#662B5B';
	var CENTRAL_RADIUS = exports.CENTRAL_RADIUS = 80;
	var REGIONS_NAME_RADIUS = exports.REGIONS_NAME_RADIUS = 110;
	var REGION_ITEM_PERCENTAGE = exports.REGION_ITEM_PERCENTAGE = 250;
	var REGION_ITEM_PERCENTAGE_TEXT = exports.REGION_ITEM_PERCENTAGE_TEXT = 230;
	var REGION_ITEM_VALUE_RADIUS = exports.REGION_ITEM_VALUE_RADIUS = 290;
	var REGION_ITEM_RADIUS = exports.REGION_ITEM_RADIUS = 330;
	var CHARS_BETWEEN_DELTA = exports.CHARS_BETWEEN_DELTA = 0.002;
	var MAX_BOORDER_WIDTH = exports.MAX_BOORDER_WIDTH = 6;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.viewPort = undefined;
	
	var _helpers = __webpack_require__(2);
	
	var _const = __webpack_require__(3);
	
	/**
	 * Viewport class
	*/
	var viewPort = exports.viewPort = function viewPort() {
	    var _canvas = _helpers._document.querySelector('#widgetPane');
	    var _pane = _canvas.getContext('2d');
	    var _lockAnimation = false;
	    var _paneCenterX = void 0;
	    var _paneCenterY = void 0;
	    var _paneWidth = (_helpers._windowInnerWIdth / 2 | 0) * 2;
	    var _paneHeight = (_helpers._windowInnerHeight / 2 | 0) * 2;
	    var _scaleLevel = 1;
	    var _animStartFns = [function () {
	        _lockAnimation = true;console.log('start');
	    }];
	    var _animEndFns = [function () {
	        _lockAnimation = false;console.log('animation end');
	    }];
	    var _rotateAngle = 0;
	
	    var _setLineColor = function _setLineColor(color) {
	        _pane.strokeStyle = color;
	    };
	
	    var _paneToNormalizeDecart = function _paneToNormalizeDecart() {
	        return _pane.transform(1, 0, 0, 1, _paneCenterX, _paneCenterY), _pane.save();
	    };
	
	    var _drawCoordinatSystem = function _drawCoordinatSystem() {
	        _pane.beginPath();
	        _setColor('#cdcdcd');
	        _setLineWidth(2);
	        _pane.moveTo(-_paneWidth, 0);
	        _pane.lineTo(_paneWidth, 0);
	        _pane.moveTo(0, -_paneHeight);
	        _pane.lineTo(0, _paneHeight);
	        _pane.stroke();
	    };
	
	    var _setViewportTransform = function _setViewportTransform() {
	        if (_lockAnimation) {
	            return;
	        }
	        var transform = 'rotate(' + _rotateAngle + 'deg) scale(' + _scaleLevel + ')';
	        _animationStartHandler();
	        _canvas.style.webkitTransform = transform;
	        _canvas.style.MozTransform = transform;
	        _canvas.style.msTransform = transform;
	        _canvas.style.OTransform = transform;
	        _canvas.style.transform = transform;
	    };
	
	    var _setEasyInAnimation = function _setEasyInAnimation() {
	        return _animationMode('ease-in');
	    };
	
	    var _setEasyInOutAnimation = function _setEasyInOutAnimation() {
	        return _animationMode('ease-in-out');
	    };
	
	    var _setRotateAnimation = function _setRotateAnimation() {
	        return _animationMode('cubic-bezier(0.3, 0.27, 0.07, 1.64)');
	    };
	
	    var _animationMode = function _animationMode(mode) {
	        var transition = 'all 0.7s ' + mode;
	        _canvas.style.webkitTransition = transition;
	        _canvas.style.MozTransition = transition;
	        _canvas.style.msTransition = transition;
	        _canvas.style.OTransition = transition;
	        _canvas.style.transition = transition;
	    };
	
	    var _zoomIn = function _zoomIn() {
	        if (_lockAnimation || _scaleLevel >= _const.MAX_SCALE) {
	            return;
	        }
	        _scaleLevel += _const.SCALE_STEP;
	        _scaleLevel = (0, _helpers._fixDigit)(_scaleLevel);
	        _setEasyInAnimation();
	        _setViewportTransform();
	    };
	
	    var _zoomOut = function _zoomOut() {
	        if (_lockAnimation || _scaleLevel <= _const.MIN_SCALE) {
	            return;
	        }
	        _scaleLevel -= _const.SCALE_STEP;
	        _scaleLevel = (0, _helpers._fixDigit)(_scaleLevel);
	        _setEasyInOutAnimation();
	        _setViewportTransform();
	    };
	
	    var _rotate = function _rotate() {
	        return _setRotateAnimation(), _setViewportTransform();
	    };
	
	    var _rotateLeft = function _rotateLeft() {
	        if (_lockAnimation) {
	            return;
	        }
	        _rotateAngle -= _const.ROTATION_STEP;
	        _rotateAngle = (0, _helpers._fixDigit)(_rotateAngle);
	        _rotate();
	    };
	
	    var _rotateRight = function _rotateRight() {
	        if (_lockAnimation) {
	            return;
	        }
	        _rotateAngle += _const.ROTATION_STEP;
	        _rotateAngle = (0, _helpers._fixDigit)(_rotateAngle);
	        _rotate();
	    };
	
	    var _addAnimStart = function _addAnimStart(fn) {
	        return _animStartFns.push(fn);
	    };
	
	    var _addAnimEnd = function _addAnimEnd(fn) {
	        return _animEndFns.push(fn);
	    };
	
	    var _animationStartHandler = function _animationStartHandler(e) {
	        return _animStartFns.map(function (fn) {
	            return fn(e);
	        });
	    };
	
	    var _animationEndHandler = function _animationEndHandler(e) {
	        return _animEndFns.map(function (fn) {
	            return fn(e);
	        });
	    };
	
	    var _clear = function _clear() {
	        return _pane.clearRect(0, 0, _paneWidth, _paneHeight);
	    };
	
	    var _setLineWidth = function _setLineWidth(width) {
	        return _pane.lineWidth = width;
	    };
	
	    var _setColor = function _setColor(color) {
	        return _pane.fillStyle = color;
	    };
	
	    var _getPaneFontSize = function _getPaneFontSize() {
	        return _pane.font.replace(/^([\d]+).*$/, '$1');
	    };
	
	    var _drawCircle = function _drawCircle(centerPixel, radius, color) {
	        _pane.beginPath();
	        _pane.arc(centerPixel.x, centerPixel.y, radius, 0, 2 * Math.PI, false);
	        _pane.fillStyle = color;
	        _pane.fill();
	    };
	
	    var _drawLinesFromLV = function _drawLinesFromLV(_vertexMap) {
	        _vertexMap.map(function (item) {
	            var to = item.to,
	                from = item.from,
	                width = item.width;
	            var color = to.color;
	
	            if (color) {
	                _setLineColor(color);
	            }
	            if (width) {
	                _setLineWidth(width);
	            }
	            _pane.beginPath();
	            _pane.moveTo(from.x, from.y);
	            _pane.lineTo(to.x, to.y);
	            _pane.stroke();
	        });
	    };
	
	    var _getSectorWidth = function _getSectorWidth(radius, angle) {
	        return radius * angle;
	    };
	
	    var _cutText = function _cutText(availbleWIdth, text) {
	        var check = function check(textWIdth) {
	            return availbleWIdth - textWIdth - _const.MAX_BOORDER_WIDTH > 0;
	        };
	        while (!check(_pane.measureText(text).width)) {
	            text = text.substring(0, text.length - 4) + '...';
	            if (text.length <= 4) {
	                return text;
	            }
	        }
	        return text;
	    };
	
	    var _drawTextOnSector = function _drawTextOnSector(sectorsTextData, font, color) {
	        if (font) {
	            _pane.font = font;
	        }
	        if (color) {
	            _setColor(color);
	        }
	        var fontSize = _getPaneFontSize();
	        sectorsTextData.map(function (currentData) {
	            var angle = currentData.angle,
	                radius = currentData.radius,
	                text = currentData.text;
	
	            var angleDiff = (0, _helpers._diff)(angle.from, angle.to);
	            var rotateAngle = Math.PI / 2 + angle.from + angleDiff / 2;
	            var sectorWidth = _getSectorWidth(radius.to, (0, _helpers._diff)(angle.from, angle.to));
	            var _text = _cutText(sectorWidth, text);
	            var textWidth = _pane.measureText(_text).width;
	            var textLength = _text.length;
	            var letterAngle = textWidth / _text.length / radius.to + _const.CHARS_BETWEEN_DELTA;
	            var startAngle = rotateAngle - letterAngle * textLength / 2;
	            var allAngle = startAngle + letterAngle / 2;
	            _pane.rotate(startAngle + letterAngle / 2);
	            _text.split('').map(function (letter, index) {
	                _pane.fillText(letter, 0, -radius.to);
	                _pane.rotate(letterAngle);
	                allAngle += letterAngle;
	            });
	            _pane.rotate(-allAngle);
	        });
	    };
	
	    var _drawSectors = function _drawSectors(arcs, color) {
	        if (color) {
	            _setLineColor(color);
	        }
	        arcs.map(function (arc, index) {
	            _pane.beginPath();
	            _setLineWidth(arc.height);
	            _pane.arc(0, 0, arc.fromRadius + arc.height / 2, arc.from, arc.to);
	            _pane.fill();
	            _pane.stroke();
	        });
	    };
	
	    _canvas.addEventListener('transitionstart', _animationStartHandler, false);
	    _canvas.addEventListener('transitionend', _animationEndHandler, false);
	
	    _canvas.width = _paneWidth;
	    _canvas.height = _paneHeight;
	    _paneCenterX = _paneWidth / 2;
	    _paneCenterY = _paneHeight / 2;
	    _pane.textAlign = "center";
	    _paneToNormalizeDecart();
	    _clear();
	    //_drawCoordinatSystem();
	    return {
	        clear: _clear,
	        drawCircle: _drawCircle,
	        rotateLeft: _rotateLeft,
	        rotateRight: _rotateRight,
	        zoomIn: _zoomIn,
	        zoomOut: _zoomOut,
	        addAnimationStartHandler: _addAnimStart,
	        addAnimationEndHandler: _addAnimEnd,
	        drawLinesFromVertexMap: _drawLinesFromLV,
	        setLineWidth: _setLineWidth,
	        setColor: _setColor,
	        drawSectorText: _drawTextOnSector,
	        drawSectors: _drawSectors
	    };
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Widget = undefined;
	
	var _helpers = __webpack_require__(2);
	
	var _const = __webpack_require__(3);
	
	/**
	 * Widget Main class;
	 */
	var Widget = exports.Widget = function Widget(viewPort) {
	    'use strict';
	    'use asm';
	    /**
	     * Draw chart regions items names
	    */
	
	    var _drawRegionsItems = function _drawRegionsItems() {
	        viewPort.drawCircle((0, _helpers._pixel)(0, 0, null), _const.REGION_ITEM_RADIUS, _const.REGIONS_COLOR);
	    };
	
	    /**
	     * Draw region items number values
	    */
	    var _drawRegionItemsValues = function _drawRegionItemsValues() {
	        viewPort.drawCircle((0, _helpers._pixel)(0, 0, null), _const.REGION_ITEM_VALUE_RADIUS, _const.REGIONS_VALUE_COLOR);
	    };
	
	    /**
	     * Draw region items values in the percentage bars
	    */
	    var _drawPercentagesValues = function _drawPercentagesValues() {
	        viewPort.drawCircle((0, _helpers._pixel)(0, 0, null), _const.REGION_ITEM_PERCENTAGE, _const.PERCENTAGE_COLOR);
	    };
	
	    /**
	     * Prepare and draw metrics and categories data.
	    */
	    var _drawRegionsNames = function _drawRegionsNames(regions) {
	        viewPort.drawCircle((0, _helpers._pixel)(0, 0, null), _const.REGIONS_NAME_RADIUS, _const.REGIONS_COLOR);
	        var allItemsCount = regions.reduce(function (result, current) {
	            result += current.metrics.length;return result;
	        }, 0);
	        var deltaAngle = 360 / allItemsCount;
	        var angle = 0;
	        var regionsText = [];
	        var percentageValuesText = [];
	        var metricsValuesText = [];
	        var metricsName = [];
	        var itemsVertex = [];
	        var percentageArcs = [];
	        var maxItem = regions.reduce(function (result, region) {
	            var itMax = region.metrics.reduce(function (res, cur) {
	                return res > cur.value ? res : cur.value;
	            }, 0);
	            return result > itMax ? result : itMax;
	        }, 0);
	        var _getPercent = (0, _helpers._getPercentFn)(maxItem);
	        var regionsVertex = regions.reduce(function (result, item) {
	            var angleFrom = angle;
	            angle += deltaAngle * item.metrics.length;
	            var toX = Math.round(_const.REGION_ITEM_RADIUS * Math.cos((0, _helpers._gradToRadian)(angle)));
	            var toY = Math.round(_const.REGION_ITEM_RADIUS * Math.sin((0, _helpers._gradToRadian)(angle)));
	
	            regionsText.push({
	                text: item.category,
	                angle: {
	                    from: (0, _helpers._gradToRadian)(angleFrom),
	                    to: (0, _helpers._gradToRadian)(angle)
	                },
	                radius: {
	                    to: _const.CENTRAL_RADIUS + 9
	                }
	            });
	
	            itemsVertex = item.metrics.reduce(function (result, el, index) {
	                var angleItem = angleFrom + deltaAngle * index;
	                var angleTo = angleFrom + deltaAngle * (index + 1);
	                var percentValue = _getPercent(el.value);
	                var itemsToX = Math.round(_const.REGION_ITEM_RADIUS * Math.cos((0, _helpers._gradToRadian)(angleItem)));
	                var itemsToY = Math.round(_const.REGION_ITEM_RADIUS * Math.sin((0, _helpers._gradToRadian)(angleItem)));
	                var fromX = Math.round(_const.REGIONS_NAME_RADIUS * Math.cos((0, _helpers._gradToRadian)(angleItem)));
	                var fromY = Math.round(_const.REGIONS_NAME_RADIUS * Math.sin((0, _helpers._gradToRadian)(angleItem)));
	                if (index !== 0) {
	                    // first line is full regions border
	                    result.push({
	                        from: (0, _helpers._pixel)(fromX, fromY, '#FFFFFF'),
	                        to: (0, _helpers._pixel)(itemsToX, itemsToY, '#FFFFFF'),
	                        width: 2
	                    });
	                }
	
	                el.value > 0 && percentageArcs.push({
	                    to: (0, _helpers._gradToRadian)(angleTo),
	                    from: (0, _helpers._gradToRadian)(angleItem),
	                    fromRadius: _const.REGIONS_NAME_RADIUS,
	                    height: (0, _helpers._valueToheight)(percentValue),
	                    _debugItem: el
	                });
	
	                percentageValuesText.push({
	                    text: ((percentValue | 0) == percentValue ? percentValue : percentValue.toFixed(1)) + '%',
	                    angle: {
	                        to: (0, _helpers._gradToRadian)(angleTo),
	                        from: (0, _helpers._gradToRadian)(angleItem)
	                    },
	                    radius: {
	                        to: _const.REGION_ITEM_PERCENTAGE_TEXT + 4
	                    }
	                });
	
	                metricsValuesText.push({
	                    text: el.value ? el.value + '' : '0',
	                    angle: {
	                        to: (0, _helpers._gradToRadian)(angleTo),
	                        from: (0, _helpers._gradToRadian)(angleItem)
	                    },
	                    radius: {
	                        to: _const.REGION_ITEM_PERCENTAGE + 11
	                    }
	                });
	
	                metricsName.push({
	                    text: el.name,
	                    angle: {
	                        to: (0, _helpers._gradToRadian)(angleTo),
	                        from: (0, _helpers._gradToRadian)(angleItem)
	                    },
	                    radius: {
	                        to: _const.REGION_ITEM_VALUE_RADIUS + 15
	                    }
	                });
	
	                return result;
	            }, []);
	            result = result.concat(itemsVertex);
	            result.push({
	                from: (0, _helpers._pixel)(0, 0, _const.REGIONS_BORDER_COLOR),
	                to: (0, _helpers._pixel)(toX, toY, _const.REGIONS_BORDER_COLOR),
	                width: 4
	            });
	            return result;
	        }, []);
	        viewPort.drawSectors(percentageArcs, _const.PERCENTAGE_SECTOR_COLOR);
	        viewPort.setLineWidth(4);
	        viewPort.drawLinesFromVertexMap(regionsVertex);
	        viewPort.drawSectorText(regionsText, '16px Arial', '#FFFFFF');
	        viewPort.drawSectorText(percentageValuesText, '17px Arial', '#000000');
	        viewPort.drawSectorText(metricsValuesText, '24px Arial', '#000000');
	        viewPort.drawSectorText(metricsName, '12px Arial', '#000000');
	    };
	
	    var _drawWidget = function _drawWidget() {
	        _drawRegionsItems();
	        _drawRegionItemsValues();
	        _drawPercentagesValues();
	        _drawRegionsNames([{
	            "category": "Sector",
	            "metrics": [{
	                "name": "Accom.&Food",
	                "value": 147
	            }, {
	                "name": "Educ.&HH",
	                "value": 227
	            }, {
	                "name": "Manufacturing",
	                "value": 7
	            }, {
	                "name": "Other",
	                "value": 73
	            }, {
	                "name": "Real Est. & Con.",
	                "value": 402
	            }, {
	                "name": "Services",
	                "value": 20
	            }, {
	                "name": "Whols. & Retail",
	                "value": 36
	            }]
	        }, {
	            "category": "Region",
	            "metrics": [{
	                "name": "CENTRAL TEAMS",
	                "value": 225
	            }, {
	                "name": "LONDON & SE",
	                "value": 135
	            }, {
	                "name": "MIDLANDS & WALES",
	                "value": 111
	            }, {
	                "name": "NORTH",
	                "value": 151
	            }, {
	                "name": "OTHER",
	                "value": 232
	            }, {
	                "name": "SCOTLAND, NI & NE ENGLAND",
	                "value": 28
	            }, {
	                "name": "THAMES VALLEY & SW",
	                "value": 31
	            }]
	        }, {
	            "category": "Rating",
	            "metrics": [{
	                "name": "1 to 3",
	                "value": 600
	            }, {
	                "name": "4 to 6",
	                "value": 166
	            }, {
	                "name": "7 to 9",
	                "value": 0
	            }, {
	                "name": "Unrated",
	                "value": 148
	            }]
	        }, {
	            "category": "Performance",
	            "metrics": [{
	                "name": "FEVE Monitor",
	                "value": 0
	            }, {
	                "name": "FEVE Seriour",
	                "value": 0
	            }, {
	                "name": "NPL",
	                "value": 913
	            }, {
	                "name": "UTD",
	                "value": 0
	            }]
	        }]);
	        viewPort.drawCircle((0, _helpers._pixel)(0, 0, null), _const.CENTRAL_RADIUS, _const.CENTRAL_PLACE_COLOR);
	    };
	
	    /**
	     * Loading json data via AJAX.
	     * @param {string} uri
	    */
	    var _loadData = function _loadData(uri) {
	        if (typeof uri === 'undefined') {
	            throw new Error('Method load data need argument!');
	        }
	        _drawWidget();
	        console.log('data load from', uri);
	    };
	
	    /**
	     * Widget public API
	    */
	    return {
	        loadData: _loadData
	    };
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// Prepare cssTransformation
	var transform;
	
	var options = {"hmr":true}
	options.transform = transform
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, options);
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!./main.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "/* reset css */\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n/* end reset css */\n\n/* app styles */\n.main-app {\n    transform: rotate3d(0, 0, 0, 0);\n    box-sizing: border-box;\n    overflow: hidden;\n    width: 100vw;\n    height: 100vh;\n    min-width: 640px;\n    min-height: 420px;\n}\n\n#widgetPane {\n    box-sizing: border-box;\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n}\n\n.controls {\n\tposition: fixed;\n\tleft: 10px;\n\ttop: 10px;\n}\n\n.controls button {\n\twidth: 40px;\n\theight: 40px;\n\tcursor: pointer;\n}\n\n.zoom-in {\n\tbackground: url(" + __webpack_require__(9) + ") no-repeat center transparent;\n}\n\n.zoom-out {\n\tbackground: url(" + __webpack_require__(10) + ") no-repeat center transparent;\n}\n\n.rotate-left {\n\tbackground: url(" + __webpack_require__(11) + ") no-repeat center transparent;\n}\n\n.rotate-right {\n\tbackground: url(" + __webpack_require__(12) + ") no-repeat center transparent;\n}\n/* end app styles */", ""]);
	
	// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "/assets/zoom-in.png";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "/assets/zoom-out.png";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "/assets/rotate-left.png";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "/assets/rotate-right.png";

/***/ }),
/* 13 */
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
				var styleTarget = fn.call(this, selector);
				// Special case to return head of iframe instead of iframe itself
				if (styleTarget instanceof window.HTMLIFrameElement) {
					try {
						// This will throw an exception if access to iframe is blocked
						// due to cross-origin restrictions
						styleTarget = styleTarget.contentDocument.head;
					} catch(e) {
						styleTarget = null;
					}
				}
				memo[selector] = styleTarget;
			}
			return memo[selector]
		};
	})(function (target) {
		return document.querySelector(target)
	});
	
	var singleton = null;
	var	singletonCounter = 0;
	var	stylesInsertedAtTop = [];
	
	var	fixUrls = __webpack_require__(14);
	
	module.exports = function(list, options) {
		if (true) {
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
		} else if (typeof options.insertAt === "object" && options.insertAt.before) {
			var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
			target.insertBefore(style, nextSibling);
		} else {
			throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
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
/* 14 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map