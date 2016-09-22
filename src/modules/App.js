import {_document} from './helpers';
import {viewPort} from './ViewPort';
import {Widget} from './Widget';
import {MAX_SCALE, MIN_SCALE, ROTATE_LEFT_KEY, ROTATE_RIGHT_KEY} from './const';

/**
 * General Application class.
 * - generate viewport
 * - generate widget and set render viewport
 *
 * publick void method start Main point of Application
*/
function Application () {
    let widget;
    let pane;

    const _stopEvent = (e) => (e.stopPropagation(), e.preventDefault());

    const _zoomInHandler = (e) => (_stopEvent(e), pane.zoomIn(), 0);

    const _zoomOutHandler = (e) => (_stopEvent(e), pane.zoomOut(), 0);

    const _rotateLeftHandler = (e) => (_stopEvent(e), pane.rotateLeft(), 0);

    const _rotateRightHandler = (e) => (_stopEvent(e), pane.rotateRight(), 0);


    const _addZoomHandler = () => {
        _document.querySelector('.zoom-in').addEventListener('click', _zoomInHandler);
        _document.querySelector('.zoom-out').addEventListener('click', _zoomOutHandler);
    };

    const _addRotateHandler = () => {
        _document.querySelector('.rotate-left').addEventListener('click', _rotateLeftHandler);
        _document.querySelector('.rotate-right').addEventListener('click', _rotateRightHandler);
    };

    /**
     * Application main.
     * @void
    */
    var _start = function () {
        if (!typeof _widget === 'undefined') {
            throw new Error('You can use only one instance of Application!');
        }
        if (_document == null) {
            throw new Error('Cannot get document of window!');
        }
        pane = new viewPort();
        widget = new Widget(pane);
        _addZoomHandler();
        _addRotateHandler();
        widget.loadData('resourses/testData.json');
    }

    return {
        start: _start
    }
}

export default Application;