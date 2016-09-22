import {REGION_ITEM_PERCENTAGE, REGIONS_NAME_RADIUS, REGION_ITEM_PERCENTAGE_TEXT} from './const';

//helpers
export const _window = (new Function('return this;'))();
export const _document = _window.document;
export const _windowInnerWIdth = _window.innerWidth;
export const _windowInnerHeight = _window.innerHeight;

export const _color = function (r, g, b) {
    return {
        red: r,
        green: g,
        blue: b
    };
};

export const _pixel = function (x, y, color) {
    return {
        x: x,
        y: y,
        color: color
    };
};

export const _diff = function (a, b) {
    return a > b ? a - b : b - a;
};

export const _getSectorWidth = function (r, angle) {
    return Math.PI * r * angle / 180;
};

export const _gradToRadian = function (angle) {
    return (angle * Math.PI) / 180;
};

export const _valueToheight = (function () {
    const fullPercentage = _diff(REGIONS_NAME_RADIUS, REGION_ITEM_PERCENTAGE_TEXT);
    return function (percentValue) {
        return fullPercentage * percentValue / 100;
    }
} ());

export const _getPercentFn = function (maxValue) {
    return function (value) {
        return value * 100 / maxValue;
    }
};

export const _fixDigit = (value) => {
    return ((value * 10) | 0) / 10;
}