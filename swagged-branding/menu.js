/*global global, require*/
var events = require('./events');
var state = require('./state');
var gui = global.gui || require('nw.gui');

//-- internal subMenu methods implementations
function _subMenuAppend(item){
    if( ! (item  instanceof gui.MenuItem) ){
        item = menuItem.apply(null,arguments);
    }
    this.submenu.append.call(this.submenu, item);
    return this;
}

function _subMenuAppendSeparator(){
    this.append.call(this, new gui.MenuItem({type:'separator'}));
    return this;
}

// return a new menuItem args can be a single function
function menuItem(label, args, options){
    (args instanceof Function) && (args = {click:args});

    options = options || {};

    label && (args.label = label);

    var item = new gui.MenuItem(args);
    var key;
    item.label = args.label && args.label.replace(/_(.)/,function(m,k){
        key= ' (Ctrl+' + k + ')';
        return k;
    });
    item.label += key || '';

    if (options.enabled) {
        events.on('editor.filechanged', function() {
            item.enabled = !!options.enabled();
        });
        item.enabled = !!options.enabled();
    }

    return item;

}
function subMenuItem(label){
    var submenu = new gui.Menu(),
        item = menuItem(label.replace(/_/,''), {submenu: submenu})
    ;
    item.append = _subMenuAppend;
    item.appendSeparator = _subMenuAppendSeparator;

    return item;
}

var appMenu;

appMenu = new gui.Menu({type:'menubar'});

//-- FILE MENU
appMenu.append(subMenuItem('File')
    .append('New (Ctrl+N)', function(){ events.emit('file.close'); })
    .append('Open (Ctrl+O)', function(){ events.emit('file.open'); })
    .append('Reload from disk (Ctrl+F5)', function(){ events.emit('file.reload'); }, {enabled: function () { return !!state.currentFile; }})
    .appendSeparator()
    .append('Save (Ctrl+S)', function(){ events.emit('file.save', state.currentFile); })
    .append('Save as (Ctrl+Shift+S)', function(){ events.emit('file.save'); })
    .appendSeparator()
    .append('Close (Ctrl+W)', function(){ events.emit('file.close'); })
    .append('Quit', function(){ events.emit('application.close'); })
);
appMenu.append(subMenuItem('View')
    .append('Refresh (Ctrl+R | F5)', function(){ events.emit('view.refresh'); })
);

gui.Window.get().menu = appMenu;