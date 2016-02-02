/*global require*/
var fs = require('fs');
var events = require('./events');
var state = require('./state');

var watcher;

function onInputFileChange(fileName){
    if (state.currentFile !== fileName) {
        return ;
    }

    // check file always exists
    if (! fs.existsSync(fileName)) {
        state.currentFile = undefined;
        fileWatchStop();
        if (window.confirm(fileName + ' doesn\'t exists anymore\nDo you want to close related buffer ?')) {
            events.emit('file.close');
        }
        return false;
    }
    if (window.confirm(fileName + ' has changed\nDo you want to reload from disk ?')) {
         events.emit('file.open', fileName);
    }
    fileWatchStart();
}

function fileWatchStop(){
    if (watcher && watcher.close){
        watcher.close();
        watcher = undefined;
    }
}
function fileWatchStart(){
    fileWatchStop();
    if (!state.currentFile) {
        return;
    }
    if (! fs.existsSync(state.currentFile)) {
        return ;
    }
    watcher = fs.watch(state.currentFile, function(/*event, fileName*/){
        var fileName = state.currentFile;
        // fire event in 50ms to avoid multiple call and stop watching in the while
        fileWatchStop();
        setTimeout(function(){ onInputFileChange(fileName);}, 50);
    });
}

events.on('watch.suspend', function () {
    fileWatchStop();
});
events.on('watch.resume', function () {
    fileWatchStart();
});

events.on('editor.filechanged', function() {
    if (state.currentFile) {
        fileWatchStart();
    } else {
        fileWatchStop();
    }
});