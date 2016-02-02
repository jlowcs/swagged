# Swagged
swagged is a swagger-editor embedded in a nw..js (node-webkit) application to allow easier edition of local openApi yaml files.

## Usage
Install nw.js (http://nwjs.io/)

```
git clone https://github.com/jlowcs/swagged
cd swagged
nw .
nw . myfile.yaml
```

## key bindings
 - Ctrl + o: open a local file
 - Ctrl + s: save to opened local file
 - Ctrl + Shift + s: save to new file
 - Ctrl + r | F5: Refresh preview
 - Ctrl + F5: reload from disk
 - Ctrl + w: close file
 - Ctrl + n: new file (closes current file)
 - F12: open devtools

## modification to swagger-editor sources
- remove index.html from the pathname in scripts/script.js file
- various new features in scripts/script.js (see history)
- various bugs corrections/new features in sway-worker/index.js (see history)

## Project state
swagger-editor was uncompressed in the repository. There is no clean retrieval of the swagger-editor sources as they are not published on npm.

Multiple fixes were done directly in the swagger-editor files, so these files had to bea beautified (using js-beautify).

Those fixes and would probably need to be submitted as contributions to the appropriate projects:
- swagger-editor
- json-refs
- path-loader
- sway-worker

## TODO
- tabs ?
- HTML export ?
- command line HTML export ?
