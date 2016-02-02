/*global require, window, global*/
var path = require('path');
var state = require('./state');
var editor = require('./editor');
require('./watch');
require('./interface');
require('./menu');
require('./keys');
require('./window');
require('./overrides');

var gui = global.gui || require('nw.gui');

var argFilePath = gui.App.argv[0];
argFilePath = argFilePath && path.resolve(argFilePath);

var filePath = argFilePath || state.currentFile;
state.currentFile = undefined;
if (editor.initFromFile(filePath)) {
    state.currentFile = filePath;
} else {
    !argFilePath && (state.currentFile = filePath);
}

window.SwaggerEditor.run(['$rootScope', '$timeout', 'Builder', function($rootScope, $timeout, Builder) {
    // var removeListener = $rootScope.$on('previewUpdate', function () {
    //     //console.log(window.$('.preview ').html());
    //     removeListener();
    // });
}]);
