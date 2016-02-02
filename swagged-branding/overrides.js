/*global require*/
var path = require('path');
var state = require('./state');
var events = require('./events');
var defaults;

(function () {
  var defaults = require('../swagger-editor/config/defaults.json');
  var overrides = {
      "disableCodeGen": true,
      "examplesFolder": "",
      "exampleFiles": [
      ],
      "useBackendForStorage": false,
      "disableFileMenu": true,
      "headerBranding": true,
      "disableNewUserIntro": true,
      "enableTryIt": true,

      "jsonRefsBase": "",
      "jsonRefsCache": false,
      "dropEnabled": false
  };
  /*jshint forin:false*/
  for (var key in overrides) {
      defaults[key] = overrides[key];
  }
  window.$$embeddedDefaults = defaults;
})();

window.localStorage.setItem('ngStorage-SwaggerEditorCache', '{"yaml": ""}');

window.SwaggerEditor.run(['defaults', function(_defaults_) {
    defaults = _defaults_;
}]);

events.on('editor.filechanged', function() {
    (defaults || window.$$embeddedDefaults).jsonRefsBase = state.currentFile ? 'file:///' + path.dirname(state.currentFile).replace(/\\/g, '/') : '';
});
