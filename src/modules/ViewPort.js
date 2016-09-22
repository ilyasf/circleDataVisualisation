import {_document, _windowInnerHeight, _windowInnerWIdth, _diff, _getSectorWidth, _fixDigit} from './helpers';
import {CHARS_BETWEEN_DELTA, MAX_BOORDER_WIDTH, MAX_SCALE, MIN_SCALE, SCALE_STEP, ROTATION_STEP} from './const';
/**
 * Viewport class
*/
export const viewPort = function () {
    const _canvas = _document.querySelector('#widgetPane');
    const _pane = _canvas.getContext('2d');
    let _lockAnimation = false;
    let _paneCenterX;
    let _paneCenterY;
    const _paneWidth = (_windowInnerWIdth / 2 | 0) * 2;
    const _paneHeight = (_windowInnerHeight / 2 | 0) * 2;
    let _scaleLevel = 1;
    let _animStartFns = [() => {_lockAnimation = true; console.log('start')}];
    let _animEndFns = [() => {_lockAnimation = false;console.log('animation end')}];
    let _rotateAngle = 0;

    const _setLineColor = (color) => {
        _pane.strokeStyle = color;
    };

    const _paneToNormalizeDecart = () => (_pane.transform(1, 0, 0, 1, _paneCenterX, _paneCenterY), _pane.save());

    const _drawCoordinatSystem = () => {
        _pane.beginPath();
        _setColor('#cdcdcd');
        _setLineWidth(2);
        _pane.moveTo(-_paneWidth, 0);
        _pane.lineTo(_paneWidth, 0);
        _pane.moveTo(0, -_paneHeight);
        _pane.lineTo(0, _paneHeight);
        _pane.stroke();
    }

    const _setViewportTransform = () => {
        if (_lockAnimation) {
            return;
        }
        const transform = `rotate(${_rotateAngle}deg) scale(${_scaleLevel})`;
        _animationStartHandler();
        _canvas.style.webkitTransform = transform;
        _canvas.style.MozTransform = transform;
        _canvas.style.msTransform = transform;
        _canvas.style.OTransform = transform;
        _canvas.style.transform = transform;
    }

    const _setEasyInAnimation = () => _animationMode('ease-in');

    const _setEasyInOutAnimation = () => _animationMode('ease-in-out');

    const _setRotateAnimation = () => _animationMode('cubic-bezier(0.3, 0.27, 0.07, 1.64)');

    const _animationMode = (mode) => {
        const transition = `all 0.7s ${mode}`;
        _canvas.style.webkitTransition = transition;
        _canvas.style.MozTransition = transition;
        _canvas.style.msTransition = transition;
        _canvas.style.OTransition = transition;
        _canvas.style.transition = transition;
    };

    const _zoomIn = () => {
        if (_lockAnimation || (_scaleLevel >= MAX_SCALE)) {
            return;
        }
        _scaleLevel += SCALE_STEP;
        _scaleLevel = _fixDigit(_scaleLevel);
        _setEasyInAnimation();
        _setViewportTransform();
    };

    const _zoomOut = () => {
        if (_lockAnimation || (_scaleLevel <= MIN_SCALE)) {
            return;
        }
        _scaleLevel -= SCALE_STEP;
        _scaleLevel = _fixDigit(_scaleLevel);
        _setEasyInOutAnimation();
        _setViewportTransform();
    };

    const _rotate = () => (_setRotateAnimation(), _setViewportTransform());

    const _rotateLeft = () => {
        if (_lockAnimation) {
            return;
        }
        _rotateAngle -= ROTATION_STEP;
        _rotateAngle = _fixDigit(_rotateAngle);
        _rotate();
    }

    const _rotateRight = () => {
        if (_lockAnimation) {
            return;
        }
        _rotateAngle += ROTATION_STEP;
        _rotateAngle = _fixDigit(_rotateAngle);
        _rotate();
    }

    const _addAnimStart = (fn) => _animStartFns.push(fn);

    const _addAnimEnd = (fn) => _animEndFns.push(fn);

    const _animationStartHandler = (e) => _animStartFns.map((fn) => fn(e));

    const _animationEndHandler = (e) => _animEndFns.map((fn) => fn(e));

    const _clear = () => _pane.clearRect(0, 0, _paneWidth, _paneHeight);

    const _setLineWidth = (width) => _pane.lineWidth = width;

    const _setColor = (color) => _pane.fillStyle = color;

    const _getPaneFontSize = () => (_pane.font).replace(/^([\d]+).*$/, '$1');

    const _drawCircle = (centerPixel, radius, color) => {
        _pane.beginPath();
        _pane.arc(centerPixel.x, centerPixel.y, radius, 0, 2 * Math.PI, false);
        _pane.fillStyle = color;
        _pane.fill();
    };

    const _drawLinesFromLV = (_vertexMap) => {
        _vertexMap.map((item) => {
            const {to, from, width} = item;
            const {color} = to;
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

    const _getSectorWidth = (radius, angle) => radius * angle;

    const _cutText = (availbleWIdth, text) => {
        const check = (textWIdth) => availbleWIdth - textWIdth - MAX_BOORDER_WIDTH > 0;
        while (!check(_pane.measureText(text).width)) {
            text = text.substring(0, text.length - 4) + '...';
            if (text.length <= 4) {
                return text;
            }
        }
        return text;
    }

    const _drawTextOnSector = function (sectorsTextData, font, color) {
        if (font) {
            _pane.font = font;
        }
        if (color) {
            _setColor(color);
        }
        const fontSize = _getPaneFontSize();
        sectorsTextData.map(function (currentData) {
            const {angle, radius, text} = currentData;
            const angleDiff = _diff(angle.from, angle.to);
            const rotateAngle = Math.PI / 2 + angle.from + angleDiff / 2;
            const sectorWidth = _getSectorWidth(radius.to, _diff(angle.from, angle.to));
            const _text = _cutText(sectorWidth, text);
            const textWidth = _pane.measureText(_text).width;
            const textLength = _text.length;
            const letterAngle = (textWidth / _text.length) / radius.to + CHARS_BETWEEN_DELTA;
            const startAngle = rotateAngle - (letterAngle * textLength / 2);
            let allAngle = startAngle + letterAngle / 2;
            _pane.rotate(startAngle + letterAngle / 2);
            (_text.split('')).map(function (letter, index) {
                _pane.fillText(letter, 0, -radius.to);
                _pane.rotate(letterAngle);
                allAngle += letterAngle;
            });
            _pane.rotate(-allAngle);
        });
    }

    const _drawSectors = (arcs, color) => {
        if (color) {
            _setLineColor(color);
        }
        arcs.map((arc, index) => {
            _pane.beginPath();
            _setLineWidth(arc.height);
            _pane.arc(0, 0, arc.fromRadius + (arc.height / 2), arc.from, arc.to);
            _pane.fill();
            _pane.stroke();
        });
    }

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
    }
};
