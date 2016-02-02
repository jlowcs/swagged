/*global require, global*/

var events = require('./events');
var state = require('./state');

var gui = global.gui || require('nw.gui');
var win = gui.Window.get();

window.SwaggerEditor.run(function () {
    window.$('body').on('keydown', function(e) {
        switch(true) {
            case e.which === 112: //F1
                //window.alert('dirty ? ' + dirty);
                break ;
            case e.which === 123: //F12
                win.showDevTools();
                break ;
            case !e.ctrlKey && e.which === 116: // F5
            case e.ctrlKey && e.which === 82: // CTRL + R
                events.emit('view.refresh');        
                break ;
            case e.ctrlKey && e.which === 116: // CTRL + F5
                events.emit('file.reload');                 
                break;
            case e.ctrlKey && e.which === 79: // CTRL + O
                events.emit('file.open');
                break;
            case e.ctrlKey && e.shiftKey && e.which === 83: // CTRL + SHIFT + S
                events.emit('file.save');
                break;
            case e.ctrlKey && e.which === 83: // CTRL + S
                events.emit('file.save', state.currentFile);
                break;
            case e.ctrlKey && e.which === 87: // CTRL + W
            case e.ctrlKey && e.which === 78: // CTRL + N
                events.emit('file.close');
                break ;
        }
    });
});
