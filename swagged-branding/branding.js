/*
 * branding.js can be used for overloading Swagger Editor behaviors
 * You can add new controllers to Swagger Editor with following syntax:
 *
 * SwaggerEditor.controller('BrandingController', function ($scope) { ... });
 *
 * You can use the controller you created in branding HTML pieces.
*/
fs = require('fs');
SwaggerEditor.run(['$timeout', '$rootScope', function($timeout, $rootScope) {
    "use strict";
    $timeout(function() {$rootScope.editorValue = '';}, 100);
    $('body')
        .append('<style>.branding-3rdparty{position:absolute; top: -100%;}</style>')
        .on('keydown', function(e) {
            var $input = $('#swaggedInputFile');
            if (! e.ctrlKey) {
                return;
            }
            switch(e.which) {
                case 79: // o
                    $input.click();
                    break;
                case 83: // s
                    fs.writeFileSync($input.val(), $rootScope.editorValue);
                    break;
            }
        })
        .on('change', '#swaggedInputFile', function() {
            var inputFile = this.value;
            if (inputFile) {
                $timeout(function() {
                    $rootScope.editorValue = fs.readFileSync(inputFile).toString();
                });
            }
        })
    ;
}])
