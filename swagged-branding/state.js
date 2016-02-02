/*global module, require*/
var events = require('./events');

var _currentFile = window.localStorage.getItem('SwaggerInputFile');

module.exports = {
	get currentFile() {
		return _currentFile;
	},

	set currentFile(currentFile) {
		if (currentFile === _currentFile) {
			return ;
		}
		_currentFile = currentFile;
		window.localStorage.setItem('SwaggerInputFile', _currentFile || '');
		events.emit('editor.filechanged');
	}
};
