/*global require, gui*/
var path = require('path');
var events = require('./events');
var state = require('./state');

var win = gui.Window.get();

var TITLE = win.title;

win.title = TITLE + ' - new file';

events.on('editor.filechanged', function() {
    win.title = TITLE + ' - ' + (state.currentFile ? path.basename(state.currentFile) : 'new file');
});

// prevent default behavior from changing page on dropped file
window.ondragover = function(e) { e.preventDefault(); return false; };
window.ondrop = function(e) { e.preventDefault(); return false; };

// handle drop
window.document.body.addEventListener('drop', function (e) {
    var l = e.dataTransfer.files.length;
    if (!l) {
        return ;
    }

    e.preventDefault();

    if (l !== 1) {
        window.alert('Cannot drop multiple files');
        return ;
    }

    events.emit('file.open', e.dataTransfer.files[0].path);

    return ;
}, true);

// file inputs
window.$('head').append('<style>.branding-3rdparty{position:absolute; top: -10000px;}</style>');

window.$('body').append('<input type="file" id="swaggedOutputFile" nwsaveas/>');

window.$('body')
    .on('change', '#swaggedInputFile', function() {
        events.emit('file.open', this.value);
    })
    .on('change', '#swaggedOutputFile', function() {
        events.emit('file.save', this.value);
    })
;

/********************************
 *  Restore window's state  *
 *******************************/

var winState;
var currWinMode;
var resizeTimeout;
var isMaximizationEvent = false;
// extra height added in linux x64 gnome-shell env, use it as workaround
var deltaHeight = gui.App.manifest.window.frame ? 0 : 'disabled';

function initWindowState() {
    winState = JSON.parse(window.localStorage.windowState || 'null');

    if (winState) {
        currWinMode = winState.mode;
        restoreWindowState();
        if (currWinMode === 'maximized') {
            win.maximize();
        }
    } else {
        currWinMode = 'normal';
        dumpWindowState();
    }

    win.show();
}

function dumpWindowState() {
    if (!winState) {
        winState = {};
    }

    // we don't want to save minimized state, only maximized or normal
    if (currWinMode === 'maximized') {
        winState.mode = 'maximized';
    } else {
        winState.mode = 'normal';
    }

    // when window is maximized you want to preserve normal
    // window dimensions to restore them later (even between sessions)
    if (currWinMode === 'normal') {
        winState.x = win.x;
        winState.y = win.y;
        winState.width = win.width;
        winState.height = win.height;

        // save delta only of it is not zero
        if (deltaHeight !== 'disabled' && deltaHeight !== 0 && currWinMode !== 'maximized') {
            winState.deltaHeight = deltaHeight;
        }
    }
}

function restoreWindowState() {
    // deltaHeight already saved, so just restore it and adjust window height
    if (deltaHeight !== 'disabled' && typeof winState.deltaHeight !== 'undefined') {
        deltaHeight = winState.deltaHeight;
        winState.height = winState.height - deltaHeight;
    }

    win.resizeTo(winState.width, winState.height);
    win.moveTo(winState.x, winState.y);
}

function saveWindowState() {
    dumpWindowState();
    window.localStorage['windowState'] = JSON.stringify(winState);
}

initWindowState();

win.on('maximize', function () {
    isMaximizationEvent = true;
    currWinMode = 'maximized';
});

win.on('unmaximize', function () {
    currWinMode = 'normal';
    restoreWindowState();
});

win.on('minimize', function () {
    currWinMode = 'minimized';
});

win.on('restore', function () {
    currWinMode = 'normal';
});

win.window.addEventListener('resize', function () {
    // resize event is fired many times on one resize action,
    // this hack with setTiemout forces it to fire only once
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        // there is no deltaHeight yet, calculate it and adjust window size
        if (deltaHeight !== 'disabled' && deltaHeight === false) {
            deltaHeight = win.height - winState.height;

            // set correct size
            if (deltaHeight !== 0) {
                win.resizeTo(winState.width, win.height - deltaHeight);
            }
        }

        dumpWindowState();

    }, 500);
}, false);

win.on('close', function () {
    try {
        saveWindowState();
    } catch(err) {
        window.console.log("winstateError: " + err);
    }
    events.emit('application.close');
});
