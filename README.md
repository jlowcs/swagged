# Swagged
swagged is a swagger-editor embedded in a nw (node-webkit) application to allow quick and easier edition of local openApi yaml files.

## key bindings
 - Ctrl + o: open a local file
 - Ctrl + s: save to opened local file

## modification to swagger-editor sources
- remove index.html from the pathname in scripts/script.js file

## Project state
This is for now a quick and dirty hack to demonstrate the possibility to make a local swagger editor for api developpers to work on their versioned api inside their working repository. It's far from perfect and will perhaps become more than a proof of concept if we decide to use such tool at work. So use it at your own risks and as always don't hesitate to contribute.
