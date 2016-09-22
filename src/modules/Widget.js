import {_pixel, _getPercentFn, _gradToRadian, _valueToheight} from './helpers';
import {
    REGION_ITEM_PERCENTAGE,
    REGION_ITEM_RADIUS,
    REGIONS_COLOR,
    REGION_ITEM_VALUE_RADIUS,
    REGIONS_VALUE_COLOR,
    PERCENTAGE_COLOR,
    REGIONS_NAME_RADIUS,
    CENTRAL_RADIUS,
    REGIONS_BORDER_COLOR,
    CENTRAL_PLACE_COLOR,
    PERCENTAGE_SECTOR_COLOR,
    REGION_ITEM_PERCENTAGE_TEXT
} from './const';

/**
 * Widget Main class;
 */
export const Widget = function (viewPort) {
    'use strict';
    'use asm';
    /**
     * Draw chart regions items names
    */
    var _drawRegionsItems = function () {
        viewPort.drawCircle(_pixel(0, 0, null), REGION_ITEM_RADIUS, REGIONS_COLOR);
    }

    /**
     * Draw region items number values
    */
    var _drawRegionItemsValues = function () {
        viewPort.drawCircle(_pixel(0, 0, null), REGION_ITEM_VALUE_RADIUS, REGIONS_VALUE_COLOR);
    }

    /**
     * Draw region items values in the percentage bars
    */
    var _drawPercentagesValues = function () {
        viewPort.drawCircle(_pixel(0, 0, null), REGION_ITEM_PERCENTAGE, PERCENTAGE_COLOR);
    }

    /**
     * Prepare and draw metrics and categories data.
    */
    var _drawRegionsNames = function (regions) {
        viewPort.drawCircle(_pixel(0, 0, null), REGIONS_NAME_RADIUS, REGIONS_COLOR);
        const allItemsCount = regions.reduce(function (result, current) { result += current.metrics.length; return result; }, 0);
        const deltaAngle = 360 / allItemsCount;
        let angle = 0;
        let regionsText = [];
        let percentageValuesText = [];
        let metricsValuesText = [];
        let metricsName = [];
        let itemsVertex = [];
        let percentageArcs = [];
        const maxItem = regions.reduce(function (result, region) {
            var itMax = region.metrics.reduce(function (res, cur) {
                return res > cur.value ? res : cur.value;
            }, 0);
            return result > itMax ? result : itMax;
        }, 0);
        const _getPercent = _getPercentFn(maxItem);
        var regionsVertex = regions.reduce(function (result, item) {
            var angleFrom = angle;
            angle += (deltaAngle * item.metrics.length);
            var toX = Math.round(REGION_ITEM_RADIUS * Math.cos(_gradToRadian(angle)));
            var toY = Math.round(REGION_ITEM_RADIUS * Math.sin(_gradToRadian(angle)));

            regionsText.push({
                text: item.category,
                angle: {
                    from: _gradToRadian(angleFrom),
                    to: _gradToRadian(angle)
                },
                radius: {
                    to: CENTRAL_RADIUS + 9
                }
            });

            itemsVertex = item.metrics.reduce(function (result, el, index) {
                const angleItem = angleFrom + deltaAngle * index;
                const angleTo = angleFrom + deltaAngle * (index + 1);
                const percentValue = _getPercent(el.value);
                var itemsToX = Math.round(REGION_ITEM_RADIUS * Math.cos(_gradToRadian(angleItem)));
                var itemsToY = Math.round(REGION_ITEM_RADIUS * Math.sin(_gradToRadian(angleItem)));
                var fromX = Math.round(REGIONS_NAME_RADIUS * Math.cos(_gradToRadian(angleItem)));
                var fromY = Math.round(REGIONS_NAME_RADIUS * Math.sin(_gradToRadian(angleItem)));
                if (index !== 0) {
                    // first line is full regions border
                    result.push({
                        from: _pixel(fromX, fromY, '#FFFFFF'),
                        to: _pixel(itemsToX, itemsToY, '#FFFFFF'),
                        width: 2
                    })
                }

                el.value > 0 && percentageArcs.push({
                    to: _gradToRadian(angleTo),
                    from: _gradToRadian(angleItem),
                    fromRadius: REGIONS_NAME_RADIUS,
                    height: _valueToheight(percentValue),
                    _debugItem: el
                });

                percentageValuesText.push({
                    text: ((percentValue | 0) == percentValue ? percentValue : percentValue.toFixed(1)) + '%',
                    angle: {
                        to: _gradToRadian(angleTo),
                        from: _gradToRadian(angleItem)
                    },
                    radius: {
                        to: REGION_ITEM_PERCENTAGE_TEXT + 4
                    }
                });

                metricsValuesText.push({
                    text: el.value ? el.value + '' : '0',
                    angle: {
                        to: _gradToRadian(angleTo),
                        from: _gradToRadian(angleItem)
                    },
                    radius: {
                        to: REGION_ITEM_PERCENTAGE + 11
                    }
                });

                metricsName.push({
                    text: el.name,
                    angle: {
                        to: _gradToRadian(angleTo),
                        from: _gradToRadian(angleItem)
                    },
                    radius: {
                        to: REGION_ITEM_VALUE_RADIUS + 15
                    }
                })

                return result;
            }, []);
            result = result.concat(itemsVertex);
            result.push({
                from: _pixel(0, 0, REGIONS_BORDER_COLOR),
                to: _pixel(toX, toY, REGIONS_BORDER_COLOR),
                width: 4
            });
            return result;
        }, []);
        viewPort.drawSectors(percentageArcs, PERCENTAGE_SECTOR_COLOR);
        viewPort.setLineWidth(4);
        viewPort.drawLinesFromVertexMap(regionsVertex);
        viewPort.drawSectorText(regionsText, '16px Arial', '#FFFFFF');
        viewPort.drawSectorText(percentageValuesText, '17px Arial', '#000000');
        viewPort.drawSectorText(metricsValuesText, '24px Arial', '#000000');
        viewPort.drawSectorText(metricsName, '12px Arial', '#000000');
    }

    var _drawWidget = function () {
        _drawRegionsItems();
        _drawRegionItemsValues();
        _drawPercentagesValues();
        _drawRegionsNames([
            {
                "category": "Sector",
                "metrics": [
                    {
                        "name": "Accom.&Food",
                        "value": 147
                    },
                    {
                        "name": "Educ.&HH",
                        "value": 227
                    },
                    {
                        "name": "Manufacturing",
                        "value": 7
                    },
                    {
                        "name": "Other",
                        "value": 73
                    },
                    {
                        "name": "Real Est. & Con.",
                        "value": 402
                    },
                    {
                        "name": "Services",
                        "value": 20
                    },
                    {
                        "name": "Whols. & Retail",
                        "value": 36
                    }
                ]
            },
            {
                "category": "Region",
                "metrics": [
                    {
                        "name": "CENTRAL TEAMS",
                        "value": 225
                    },
                    {
                        "name": "LONDON & SE",
                        "value": 135
                    },
                    {
                        "name": "MIDLANDS & WALES",
                        "value": 111
                    },
                    {
                        "name": "NORTH",
                        "value": 151
                    },
                    {
                        "name": "OTHER",
                        "value": 232
                    },
                    {
                        "name": "SCOTLAND, NI & NE ENGLAND",
                        "value": 28
                    },
                    {
                        "name": "THAMES VALLEY & SW",
                        "value": 31
                    }
                ]
            },
            {
                "category": "Rating",
                "metrics": [
                    {
                        "name": "1 to 3",
                        "value": 600
                    },
                    {
                        "name": "4 to 6",
                        "value": 166
                    },
                    {
                        "name": "7 to 9",
                        "value": 0
                    },
                    {
                        "name": "Unrated",
                        "value": 148
                    }
                ]
            },
            {
                "category": "Performance",
                "metrics": [
                    {
                        "name": "FEVE Monitor",
                        "value": 0
                    },
                    {
                        "name": "FEVE Seriour",
                        "value": 0
                    },
                    {
                        "name": "NPL",
                        "value": 913
                    },
                    {
                        "name": "UTD",
                        "value": 0
                    }
                ]
            }
        ]);
        viewPort.drawCircle(_pixel(0, 0, null), CENTRAL_RADIUS, CENTRAL_PLACE_COLOR);
    }

    /**
     * Loading json data via AJAX.
     * @param {string} uri
    */
    var _loadData = function (uri) {
        if (typeof uri === 'undefined') {
            throw new Error('Method load data need argument!');
        }
        _drawWidget();
        console.log('data load from', uri);
    }

    /**
     * Widget public API
    */
    return {
        loadData: _loadData
    }

};