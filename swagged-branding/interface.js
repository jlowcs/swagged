/*global require, global*/
var events = require('./events');
var state = require('./state');
var editor = require('./editor');

var gui = global.gui || require('nw.gui');

var win = gui.Window.get();

function loadFile(filePath) {
    var bak = state.currentFile;
    state.currentFile = filePath;
    if (!editor.loadFromFile(filePath)) {
        state.currentFile = bak;
    }
}
function saveFile(filePath) {
    var bak = state.currentFile;
    state.currentFile = filePath;
    if (!editor.saveToFile(filePath)) {
        state.currentFile = bak;
    }
}
function closeFile() {
    var bak = state.currentFile;
    state.currentFile = undefined;
    if (editor.clear()) {
        state.currentFile = bak;
    }
}

events.on('file.save', function (filePath) {
    if (filePath) {
        saveFile(filePath);
    } else {
        var $outputInput = window.$('#swaggedOutputFile');
        if (state.currentFile) {
            $outputInput.attr('nwsaveas', state.currentFile);
        }
        $outputInput.click();
    }
});
events.on('file.open', function (filePath) {
    if (filePath) {
        loadFile(filePath);
    } else {
        window.$('#swaggedInputFile').click();
    }
});
events.on('file.reload', function () { //reload from disk
    loadFile(state.currentFile);
});
events.on('file.close', function () { //close current file
    closeFile();
});
events.on('view.refresh', function () { //refresh preview
    editor.refresh();
});
events.on('application.close', function () {
    editor.canClose() && win.close(true);
});
