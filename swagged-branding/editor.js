/*global module, require*/
var fs = require('fs');
var state = require('./state');
var events = require('./events');

var $timeout;
var $rootScope;

//dirty handling
function isClean() {
    return window.e.session.getUndoManager().isClean();
}
function markClean() {
    window.e.session.getUndoManager().markClean();
}

//ExternalHooks must be injected so that window.SwaggerEditor.on works
window.SwaggerEditor.run(['ExternalHooks', '$timeout', '$rootScope', function(ExternalHooks, _$timeout_, _$rootScope_) {
	$timeout = _$timeout_;
	$rootScope = _$rootScope_;
}]);

module.exports = {
    initFromFile: function(filePath) {
        window.localStorage.setItem('ngStorage-SwaggerEditorCache', '{"yaml": ""}');

        if (!filePath) {
            return false;
        }

        if (!fs.existsSync(filePath)) {
            window.alert('Could not find ' + filePath);
            return false;
        } else {
            var content = fs.readFileSync(filePath).toString();
            window.localStorage.setItem('ngStorage-SwaggerEditorCache', JSON.stringify({yaml: content }));
        }
            
        return true;
    },

	loadFromFile: function(filePath) {
		if (!filePath) {
            return false;
        }

        if (!isClean()) {
            if (!window.confirm('You have not saved your document. Are you sure?')) {
                return false;
            }
        }

        if (!filePath.match(/\.yaml$/i)) {
            window.alert('Can only open yaml files');
            return false;
        }

        try {
            var content = fs.readFileSync(filePath).toString();
            $rootScope.$apply(function() {
                $rootScope.editorValue = content || '';
                markClean();
            });
        } catch (e) {
            window.alert('Cannot open file: ' + e);
            return false;
        }

        return true;
	},

	saveToFile: function (filePath) {		
        var scrollTop, pos,
            aceEditor = window.e
        ;

        if (!filePath) {
            return false;
        }

        try {
            scrollTop = aceEditor.session.getScrollTop();
            pos = aceEditor.getCursorPosition();
            $rootScope.$apply(function () {
                $rootScope.editorValue = $rootScope.editorValue.replace(/[ \t]+$/gm, '').replace(/\t/g, '  ');
                markClean();
            });
            aceEditor.session.setScrollTop(scrollTop);
            aceEditor.selection.moveTo(pos.row, pos.column);

            events.emit('watch.suspend');
            fs.writeFileSync(filePath, $rootScope.editorValue || '');
            events.emit('watch.resume');
        } catch (ex) {
            window.alert('Cannot save file: ' + ex);
            return false;
        }

        return true;
	},

	clear: function () {
        if (!isClean()) {
            if (!window.confirm('You have not saved your document. Are you sure?')) {
                return false;
            }
        }

        $rootScope.$apply(function() {
            $rootScope.editorValue = 'swagger: "2.0"';
            markClean(); //dirty handling
        });
	},

	refresh: function () {
        $rootScope.$apply(function () {
            $rootScope.$broadcast('update-preview');
        });
	},

	canClose: function () {
        if (!isClean()) {
            if (!window.confirm('You have not saved your document. Are you sure?')) {
                return false;
            }
        }

        return true;
	}
};
