"use strict";
window.SwaggerEditor = angular.module("SwaggerEditor", ["ngSanitize", "ui.router", "ui.ace", "ui.bootstrap", "ngStorage", "ngSanitize", "hc.marked", "ui.layout", "ngFileUpload", "mohsen1.schema-form", "jsonFormatter"]);
"use strict";
$(function() {
    var embeddedDefaults = window.$$embeddedDefaults;
    var pathname = window.location.pathname.replace(/index\.html$/, '');
    if (!_.endsWith(pathname, "/")) {
        pathname += "/"
    }
    var url = pathname + "config/defaults.json";
    if (embeddedDefaults) {
        bootstrap(embeddedDefaults)
    } else {
        $.getJSON(url).done(bootstrap).fail(function(error) {
            console.error("Failed to load defaults.json from", url);
            console.error(error)
        })
    }

    function bootstrap(defaults) {
        var isProduction = !/localhost/.test(window.location.host);
        window.SwaggerEditor.$defaults = defaults;
        angular.bootstrap(window.document, ["SwaggerEditor"], {
            strictDi: isProduction
        })
    }
});
ace.define("ace/theme/atom_dark", ["require", "exports", "module", "ace/lib/dom"], function(e, t, n) {
    t.isDark = !0, t.cssClass = "ace-atom-dark", t.cssText = ".ace-atom-dark .ace_gutter {background: #1a1a1a;color: #868989}.ace-atom-dark .ace_print-margin {width: 1px;background: #1a1a1a}.ace-atom-dark {background-color: #1d1f21;color: #A8FF60}.ace-atom-dark .ace_cursor {color: white}.ace-atom-dark .ace_marker-layer .ace_selection {background: #444444}.ace-atom-dark.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px #000000;border-radius: 2px}.ace-atom-dark .ace_marker-layer .ace_step {background: rgb(102, 82, 0)}.ace-atom-dark .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid #888888}.ace-atom-dark .ace_marker-layer .ace_highlight {border: 1px solid rgb(110, 119, 0);border-bottom: 0;box-shadow: inset 0 -1px rgb(110, 119, 0);margin: -1px 0 0 -1px;background: rgba(255, 235, 0, 0.1);}.ace-atom-dark .ace_marker-layer .ace_active-line {background: #2A2A2A}.ace-atom-dark .ace_gutter-active-line {background-color: #2A2A2A}.ace-atom-dark .ace_stack {background-color: rgb(66, 90, 44)}.ace-atom-dark .ace_marker-layer .ace_selected-word {border: 1px solid #888888}.ace-atom-dark .ace_invisible {color: #343434}.ace-atom-dark .ace_keyword,.ace-atom-dark .ace_meta,.ace-atom-dark .ace_storage,.ace-atom-dark .ace_storage.ace_type,.ace-atom-dark .ace_support.ace_type {color: #96CBFE}.ace-atom-dark .ace_keyword.ace_operator {color: #70C0B1}.ace-atom-dark .ace_constant.ace_character,.ace-atom-dark .ace_constant.ace_language,.ace-atom-dark .ace_constant.ace_numeric,.ace-atom-dark .ace_keyword.ace_other.ace_unit,.ace-atom-dark .ace_support.ace_constant,.ace-atom-dark .ace_variable.ace_parameter {color: #fe73fd}.ace-atom-dark .ace_constant.ace_other {color: #EEEEEE}.ace-atom-dark .ace_invalid {color: #CED2CF;background-color: #DF5F5F}.ace-atom-dark .ace_invalid.ace_deprecated {color: #CED2CF;background-color: #B798BF}.ace-atom-dark .ace_fold {background-color: #7AA6DA;border-color: #DEDEDE}.ace-atom-dark .ace_entity.ace_name.ace_function,.ace-atom-dark .ace_support.ace_function,.ace-atom-dark .ace_variable {color: #7AA6DA}.ace-atom-dark .ace_support.ace_class,.ace-atom-dark .ace_support.ace_type {color: #E7C547}.ace-atom-dark .ace_heading,.ace-atom-dark .ace_markup.ace_heading,.ace-atom-dark .ace_string {color: #B9CA4A}.ace-atom-dark .ace_entity.ace_name.ace_tag,.ace-atom-dark .ace_entity.ace_other.ace_attribute-name,.ace-atom-dark .ace_meta.ace_tag,.ace-atom-dark .ace_string.ace_regexp,.ace-atom-dark .ace_variable {color: #96CBFE}.ace-atom-dark .ace_comment {color: #7a7a7a}.ace-atom-dark .ace_c9searchresults.ace_keyword {color: #C2C280;}.ace-atom-dark .ace_indent-guide {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYFBXV/8PAAJoAXX4kT2EAAAAAElFTkSuQmCC) right repeat-y}";
    var r = e("../lib/dom");
    r.importCssString(t.cssText, t.cssClass)
});
"use strict";
SwaggerEditor.config(["$provide", function($provide) {
    var operationRegex = "get|put|post|delete|options|head|patch";

    function makeOperationSnippet(operationName) {
        return ["${1:" + operationName + "}:", "  summary: ${2}", "  description: ${2}", "  responses:", "    ${3:200:}", "      description: ${4:OK}", "${6}"].join("\n")
    }

    function makeResponseCodeSnippet(code) {
        return ["${1:" + code + "}:", "  description: ${2}", "${3}"].join("\n")
    }
    $provide.constant("snippets", [{
        name: "swagger",
        trigger: "sw",
        path: [],
        content: ['swagger: "2.0"', "${1}"].join("\n")
    }, {
        name: "info",
        trigger: "info",
        path: [],
        content: ["info:", "  version: ${1:0.0.0}", "  title: ${2:title}", "  description: ${3:description}", "  termsOfService: ${4:terms}", "  contact:", "    name: ${5}", "    url: ${6}", "    email: ${7}", "  license:", "    name: ${8:MIT}", "    url: ${9:http://opensource.org/licenses/MIT}", "${10}"].join("\n")
    }, {
        name: "paths",
        trigger: "pa",
        path: [],
        content: ["paths:", "  ${1}"].join("\n")
    }, {
        name: "definitions",
        trigger: "def",
        path: [],
        content: ["definitions:", "  ${1}"].join("\n")
    }, {
        name: "path",
        trigger: "path",
        path: ["paths"],
        content: ["/${1}:", "  ${2}"].join("\n")
    }, {
        name: "get",
        trigger: "get",
        path: ["paths", "."],
        content: makeOperationSnippet("get")
    }, {
        name: "post",
        trigger: "post",
        path: ["paths", "."],
        content: makeOperationSnippet("post")
    }, {
        name: "put",
        trigger: "put",
        path: ["paths", "."],
        content: makeOperationSnippet("put")
    }, {
        name: "delete",
        trigger: "delete",
        path: ["paths", "."],
        content: makeOperationSnippet("delete")
    }, {
        name: "patch",
        trigger: "patch",
        path: ["paths", "."],
        content: makeOperationSnippet("patch")
    }, {
        name: "options",
        trigger: "options",
        path: ["paths", "."],
        content: makeOperationSnippet("options")
    }, {
        name: "parameter",
        trigger: "param",
        path: ["paths", ".", ".", "parameters"],
        content: ["- name: ${1:parameter_name}", "  in: ${2:query}", "  description: ${3:description}", "  type: ${4:string}", "${5}"].join("\n")
    }, {
        name: "parameter",
        trigger: "param",
        path: ["paths", ".", "parameters"],
        content: ["- name: ${1:parameter_name}", "  in: ${2:path}", "  required: true", "  description: ${3:description}", "  type: ${4:string}", "${5}"].join("\n")
    }, {
        name: "response",
        trigger: "resp",
        path: ["paths", ".", ".", "responses"],
        content: ["${1:code}:", "  description: ${2}", "  schema: ${3}", "${4}"].join("\n")
    }, {
        name: "200",
        trigger: "200",
        path: ["paths", ".", operationRegex, "responses"],
        content: makeResponseCodeSnippet("200")
    }, {
        name: "300",
        trigger: "300",
        path: ["paths", ".", operationRegex, "responses"],
        content: makeResponseCodeSnippet("300")
    }, {
        name: "400",
        trigger: "400",
        path: ["paths", ".", operationRegex, "responses"],
        content: makeResponseCodeSnippet("400")
    }, {
        name: "500",
        trigger: "500",
        path: ["paths", ".", operationRegex, "responses"],
        content: makeResponseCodeSnippet("500")
    }, {
        name: "model",
        trigger: "mod|def",
        regex: "mod|def",
        path: ["definitions"],
        content: ["${1:ModelName}:", "  properties:", "    ${2}"]
    }])
}]);
"use strict";
(function(i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date;
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
_.templateSettings = {
    interpolate: /\{(.+?)\}/g
};
"use strict";
SwaggerEditor.controller("MainCtrl", ["$scope", "$rootScope", "$stateParams", "$location", "Editor", "Storage", "FileLoader", "Analytics", "defaults", function MainCtrl($scope, $rootScope, $stateParams, $location, Editor, Storage, FileLoader, Analytics, defaults) {
    Analytics.initialize();
    $rootScope.$on("$stateChangeStart", Editor.initializeEditor);
    $rootScope.$on("$stateChangeStart", loadYaml);
    $("body").addClass(defaults.brandingCssClass);
    loadYaml();

    function loadYaml() {
        Storage.load("yaml").then(function(yaml) {
            var url;
            var disableProxy = false;
            if ($stateParams.import) {
                url = $stateParams.import;
                disableProxy = Boolean($stateParams["no-proxy"]);
                $location.search("import", null);
                $location.search("no-proxy", null)
            } else if (!yaml) {
                url = defaults.examplesFolder + defaults.exampleFiles[0]
            }
            if (url) {
                FileLoader.loadFromUrl(url, disableProxy).then(assign)
            }
        })
    }

    function assign(yaml) {
        if (yaml) {
            Storage.save("yaml", yaml);
            $rootScope.editorValue = yaml
        }
    }
    var fileReader = new FileReader;
    $scope.draggedFiles = [];
    $scope.$watch("draggedFiles", function() {
        var file = _.isArray($scope.draggedFiles) && $scope.draggedFiles[0];
        if (file) {
            fileReader.readAsText(file, "utf-8")
        }
    });
    fileReader.onloadend = function() {
        if (fileReader.result) {
            FileLoader.load(fileReader.result).then(assign)
        }
    }
}]);
"use strict";
SwaggerEditor.controller("HeaderCtrl", ["$scope", "$modal", "$stateParams", "$state", "$rootScope", "Storage", "Builder", "FileLoader", "Editor", "Codegen", "Preferences", "YAML", "defaults", "strings", "$localStorage", function HeaderCtrl($scope, $modal, $stateParams, $state, $rootScope, Storage, Builder, FileLoader, Editor, Codegen, Preferences, YAML, defaults, strings, $localStorage) {
    if ($stateParams.path) {
        $scope.breadcrumbs = [{
            active: true,
            name: $stateParams.path
        }]
    } else {
        $scope.breadcrumbs = []
    }
    $rootScope.$watch("progressStatus", function(progressStatus) {
        var status = strings.stausMessages[progressStatus];
        var statusClass = null;
        if (/success/.test(progressStatus)) {
            statusClass = "success"
        }
        if (/error/.test(progressStatus)) {
            statusClass = "error"
        }
        if (/working/.test(progressStatus)) {
            statusClass = "working"
        }
        $scope.status = status;
        $scope.statusClass = statusClass
    });
    $localStorage.$default({
        showIntro: !defaults.disableNewUserIntro
    });
    $rootScope.showAbout = $localStorage.showIntro;
    $scope.disableCodeGen = defaults.disableCodeGen;
    if (!defaults.disableCodeGen) {
        Codegen.getServers().then(function(servers) {
            $scope.servers = servers
        }, function() {
            $scope.serversNotAvailable = true
        });
        Codegen.getClients().then(function(clients) {
            $scope.clients = clients
        }, function() {
            $scope.clientsNotAvailable = true
        })
    }
    $scope.getSDK = function(type, language) {
        Codegen.getSDK(type, language).then(noop, showCodegenError)
    };

    function showCodegenError(resp) {
        $modal.open({
            templateUrl: "templates/code-gen-error-modal.html",
            controller: "GeneralModal",
            size: "large",
            resolve: {
                data: function() {
                    return resp.data
                }
            }
        })
    }
    $scope.showFileMenu = function() {
        return !defaults.disableFileMenu
    };
    $scope.showHeaderBranding = function() {
        return defaults.headerBranding
    };
    $scope.newProject = function() {
        FileLoader.loadFromUrl("spec-files/guide.yaml").then(function(value) {
            $rootScope.editorValue = value;
            Storage.save("yaml", value);
            $state.go("home", {
                tags: null
            })
        })
    };
    $scope.onFileMenuOpen = function() {
        assignDownloadHrefs();
        $rootScope.$broadcast("toggleWatchers", false)
    };
    $scope.openImportFile = function() {
        $modal.open({
            templateUrl: "templates/file-import.html",
            controller: "FileImportCtrl",
            size: "large"
        })
    };
    $scope.openImportUrl = function() {
        $modal.open({
            templateUrl: "templates/url-import.html",
            controller: "UrlImportCtrl",
            size: "large"
        })
    };
    $scope.openPasteJSON = function() {
        $modal.open({
            templateUrl: "templates/paste-json.html",
            controller: "PasteJSONCtrl",
            size: "large"
        })
    };
    $scope.openAbout = function() {
        $modal.open({
            templateUrl: "templates/about.html",
            size: "large",
            controller: "ModalCtrl"
        })
    };
    $rootScope.toggleAboutEditor = function(value) {
        $rootScope.showAbout = value;
        $localStorage.showIntro = value
    };
    $scope.openEditorPreferences = Editor.showSettings;
    $scope.resetSettings = Editor.resetSettings;
    $scope.adjustFontSize = Editor.adjustFontSize;
    $scope.openExamples = function() {
        $modal.open({
            templateUrl: "templates/open-examples.html",
            controller: "OpenExamplesCtrl",
            size: "large"
        })
    };
    $scope.openPreferences = function() {
        $modal.open({
            templateUrl: "templates/preferences.html",
            controller: "PreferencesCtrl",
            size: "large"
        })
    };
    $scope.isLiveRenderEnabled = function() {
        return !!Preferences.get("liveRender")
    };

    function assignDownloadHrefs() {
        var MIME_TYPE = "text/plain";
        var yaml = $rootScope.editorValue;
        YAML.load(yaml, function(error, json) {
            var jsonParseError = null;
            try {
                JSON.parse(yaml)
            } catch (error) {
                jsonParseError = error
            }
            if (!jsonParseError) {
                YAML.dump(json, function(error, yamlStr) {
                    assign(yamlStr, json)
                })
            } else {
                assign(yaml, json)
            }

            function assign(yaml, json) {
                if (json.info.version) {
                    json.info.version = String(json.info.version)
                }
                if (json.swagger) {
                    if (json.swagger === 2) {
                        json.swagger = "2.0"
                    } else {
                        json.swagger = String(json.swagger)
                    }
                }
                json = JSON.stringify(json, null, 4);
                var jsonBlob = new Blob([json], {
                    type: MIME_TYPE
                });
                $scope.jsonDownloadHref = window.URL.createObjectURL(jsonBlob);
                $scope.jsonDownloadUrl = [MIME_TYPE, "swagger.json", $scope.jsonDownloadHref].join(":");
                var yamlBlob = new Blob([yaml], {
                    type: MIME_TYPE
                });
                $scope.yamlDownloadHref = window.URL.createObjectURL(yamlBlob);
                $scope.yamlDownloadUrl = [MIME_TYPE, "swagger.yaml", $scope.yamlDownloadHref].join(":")
            }
        })
    }
    $scope.capitalizeGeneratorName = function(name) {
        var names = {
            jaxrs: "JAX-RS",
            nodejs: "Node.js",
            scalatra: "Scalatra",
            "spring-mvc": "Spring MVC",
            android: "Android",
            "async-scala": "Async Scala",
            csharp: "C#",
            CsharpDotNet2: "C# .NET 2.0",
            qt5cpp: "Qt 5 C++",
            java: "Java",
            objc: "Objective-C",
            php: "PHP",
            python: "Python",
            ruby: "Ruby",
            scala: "Scala",
            "dynamic-html": "Dynamic HTML",
            html: "HTML",
            swagger: "Swagger JSON",
            "swagger-yaml": "Swagger YAML",
            tizen: "Tizen"
        };
        if (names[name]) {
            return names[name]
        }
        return name.split(/\s+|\-/).map(function(word) {
            return word[0].toUpperCase() + word.substr(1)
        }).join(" ")
    };

    function noop() {}
}]);
"use strict";
SwaggerEditor.controller("FileImportCtrl", ["$scope", "$modalInstance", "$rootScope", "$localStorage", "$state", "FileLoader", "Storage", function FileImportCtrl($scope, $modalInstance, $rootScope, $localStorage, $state, FileLoader, Storage) {
    var results;
    $scope.fileChanged = function($fileContent) {
        FileLoader.load($fileContent).then(function(res) {
            $scope.$apply(function() {
                results = res
            })
        })
    };
    $scope.ok = function() {
        if (angular.isString(results)) {
            $rootScope.editorValue = results;
            Storage.save("yaml", results);
            $state.go("home", {
                tags: null
            })
        }
        $modalInstance.close()
    };
    $scope.isInvalidFile = function() {
        return results === null
    };
    $scope.isFileSelected = function() {
        return !!results
    };
    $scope.cancel = $modalInstance.close
}]);
"use strict";
SwaggerEditor.controller("EditorCtrl", ["$scope", "$rootScope", "Editor", "Builder", "Storage", "ExternalHooks", "Preferences", function EditorCtrl($scope, $rootScope, Editor, Builder, Storage, ExternalHooks, Preferences) {
    var debouncedOnAceChange = getDebouncedOnAceChange();
    Preferences.onChange(function(key) {
        if (key === "keyPressDebounceTime") {
            debouncedOnAceChange = getDebouncedOnAceChange()
        }
    });

    function getDebouncedOnAceChange() {
        return _.debounce(onAceChange, Preferences.get("keyPressDebounceTime"))
    }
    $scope.aceLoaded = Editor.aceLoaded;
    $scope.aceChanged = function() {
        $rootScope.progressStatus = "progress-working";
        debouncedOnAceChange()
    };
    Editor.ready(function() {
        Storage.load("yaml").then(function(yaml) {
            $rootScope.editorValue = yaml;
            onAceChange(true)
        })
    });

    function onAceChange() {
        var value = $rootScope.editorValue;
        Storage.save("yaml", value);
        ExternalHooks.trigger("code-change", [])
    }
}]);
"use strict";
SwaggerEditor.controller("PreviewCtrl", ["Storage", "Builder", "ASTManager", "Editor", "FocusedPath", "TagManager", "Preferences", "FoldStateManager", "$scope", "$rootScope", "$stateParams", "$sessionStorage", function PreviewCtrl(Storage, Builder, ASTManager, Editor, FocusedPath, TagManager, Preferences, FoldStateManager, $scope, $rootScope, $stateParams, $sessionStorage) {
    $scope.loadLatest = loadLatest;
    $scope.tagIndexFor = TagManager.tagIndexFor;
    $scope.getAllTags = TagManager.getAllTags;
    $scope.tagsHaveDescription = TagManager.tagsHaveDescription;
    $scope.getCurrentTags = TagManager.getCurrentTags;
    $scope.stateParams = $stateParams;
    $scope.isVendorExtension = isVendorExtension;
    $scope.showOperation = showOperation;
    $scope.showDefinitions = showDefinitions;
    $scope.responseCodeClassFor = responseCodeClassFor;
    $scope.focusEdit = focusEdit;
    $scope.showPath = showPath;
    $scope.foldEditor = FoldStateManager.foldEditor;
    $scope.listAllOperation = listAllOperation;
    $scope.listAllDefnitions = listAllDefnitions;
    Storage.addChangeListener("yaml", update);

    function update(latest, force) {
        if (!Preferences.get("liveRender") && !force && $scope.specs) {
            $rootScope.isDirty = true;
            $rootScope.progressStatus = "progress-unsaved";
            return
        }
        Builder.buildDocs(latest).then(onBuildSuccess, onBuildFailure)
    }

    function onBuild(result) {
        $scope.$broadcast("toggleWatchers", true);
        if (result.specs && result.specs.securityDefinitions) {
            var securityKeys = {};
            _.forEach(result.specs.securityDefinitions, function(security, key) {
                securityKeys[key] = SparkMD5.hash(JSON.stringify(security))
            });
            $sessionStorage.securityKeys = securityKeys
        }
        $rootScope.$apply(function() {
            if (result.specs) {
                TagManager.registerTagsFromSpec(result.specs);
                $rootScope.specs = result.specs
            }
            $rootScope.errors = result.errors || [];
            $rootScope.warnings = result.warnings || []
        })
    }

    function onBuildSuccess(result) {
        onBuild(result);
        $rootScope.$apply(function() {
            $rootScope.progressStatus = "success-process"
        });
        Editor.clearAnnotation();
        _.each(result.warnings, function(warning) {
            Editor.annotateSwaggerError(warning, "warning")
        })
    }

    function onBuildFailure(result) {
        onBuild(result);
        $rootScope.$apply(function() {
            if (angular.isArray(result.errors)) {
                if (result.errors[0].yamlError) {
                    Editor.annotateYAMLErrors(result.errors[0].yamlError);
                    $rootScope.progressStatus = "error-yaml"
                } else if (result.errors.length) {
                    $rootScope.progressStatus = "error-swagger";
                    result.errors.forEach(Editor.annotateSwaggerError)
                } else {
                    $rootScope.progressStatus = "progress"
                }
            } else {
                $rootScope.progressStatus = "error-general"
            }
        })
    }

    function loadLatest() {
        update($rootScope.editorValue, true);
        $rootScope.isDirty = false
    }

    function focusEdit($event, path) {
        $event.stopPropagation();
        ASTManager.positionRangeForPath($rootScope.editorValue, path).then(function(range) {
            Editor.gotoLine(range.start.line);
            Editor.focus()
        })
    }

    function responseCodeClassFor(code) {
        var colors = {
            2: "green",
            3: "blue",
            4: "yellow",
            5: "red"
        };
        return colors[Math.floor(+code / 100)] || "default"
    }

    function isVendorExtension(key) {
        return _.startsWith(key, "x-")
    }

    function showDefinitions(definitions) {
        return angular.isObject(definitions)
    }

    function showOperation(operation, operationName) {
        var currentTagsLength = TagManager.getCurrentTags() && TagManager.getCurrentTags().length;
        if (isVendorExtension(operationName)) {
            return false
        }
        if (operationName === "parameters") {
            return false
        }
        if (!currentTagsLength) {
            return true
        }
        return operation.tags && operation.tags.length && _.intersection(TagManager.getCurrentTags(), operation.tags).length
    }

    function showPath(path, pathName) {
        if (isVendorExtension(pathName)) {
            return false
        }
        return _.some(path, showOperation)
    }

    function listAllOperation() {
        _.each($scope.specs.paths, function(path, pathName) {
            if (_.isObject(path) && path.$folded === true) {
                path.$folded = false;
                FoldStateManager.foldEditor(["paths", pathName], false)
            }
        });
        _.each($scope.specs.paths, function(path, pathName) {
            _.each(path, function(operation, operationName) {
                if (_.isObject(operation)) {
                    operation.$folded = true;
                    FoldStateManager.foldEditor(["paths", pathName, operationName], true)
                }
            })
        })
    }

    function listAllDefnitions() {
        _.each($scope.specs.definitions, function(definition, definitionName) {
            if (_.isObject(definition)) {
                definition.$folded = true;
                FoldStateManager.foldEditor(["definitions", definitionName], true)
            }
        })
    }
}]);
"use strict";
SwaggerEditor.controller("GeneralModal", ["$scope", "$modalInstance", "data", function GeneralModal($scope, $modalInstance, data) {
    $scope.ok = $modalInstance.close;
    $scope.cancel = $modalInstance.close;
    $scope.data = data
}]);
"use strict";
SwaggerEditor.controller("UrlImportCtrl", ["$scope", "$modalInstance", "$localStorage", "$rootScope", "$state", "FileLoader", "Storage", function FileImportCtrl($scope, $modalInstance, $localStorage, $rootScope, $state, FileLoader, Storage) {
    var results;
    $scope.url = null;
    $scope.error = null;
    $scope.opts = {
        useProxy: true
    };

    function fetch(url) {
        $scope.error = null;
        $scope.canImport = false;
        if (_.startsWith(url, "http")) {
            $scope.fetching = true;
            FileLoader.loadFromUrl(url, !$scope.opts.useProxy).then(function(data) {
                $scope.$apply(function() {
                    results = data;
                    $scope.canImport = true;
                    $scope.fetching = false
                })
            }).catch(function(error) {
                $scope.$apply(function() {
                    $scope.error = error;
                    $scope.canImport = false;
                    $scope.fetching = false
                })
            })
        } else {
            $scope.error = "Invalid URL"
        }
    }
    $scope.fetch = _.throttle(fetch, 200);
    $scope.ok = function() {
        if (angular.isString(results)) {
            Storage.save("yaml", results);
            $rootScope.editorValue = results;
            $state.go("home", {
                tags: null
            })
        }
        $modalInstance.close()
    };
    $scope.cancel = $modalInstance.close
}]);
"use strict";
SwaggerEditor.controller("PasteJSONCtrl", ["$scope", "$modalInstance", "$rootScope", "$state", "Storage", "YAML", "SwayWorker", function PasteJSONCtrl($scope, $modalInstance, $rootScope, $state, Storage, YAML, SwayWorker) {
    var json;
    $scope.checkJSON = function(newJson) {
        $scope.canImport = false;
        try {
            json = JSON.parse(newJson)
        } catch (error) {
            $scope.error = error.message;
            $scope.canImport = false;
            return
        }
        SwayWorker.run(json, function(data) {
            $scope.canImport = true;
            $scope.error = null;
            if (data.errors.length) {
                $scope.error = data.errors[0]
            }
            $scope.$digest()
        })
    };
    $scope.ok = function() {
        YAML.dump(json, function(error, result) {
            Storage.save("yaml", result);
            $rootScope.editorValue = result;
            $state.go("home", {
                tags: null
            });
            $modalInstance.close()
        })
    };
    $scope.cancel = $modalInstance.close
}]);
"use strict";
SwaggerEditor.controller("ErrorPresenterCtrl", ["$scope", "$rootScope", "Editor", "ASTManager", function ErrorPresenterCtrl($scope, $rootScope, Editor, ASTManager) {
    var ERROR_LEVEL = 900;
    var WARNING_LEVEL = 500;
    $scope.isCollapsed = false;
    $scope.getErrorsAndWarnings = getErrorsAndWarnings;
    $scope.errorsAndWarnings = [];
    $rootScope.$watch("errors", assignErrorsAndWarnings);
    $rootScope.$watch("warnings", assignErrorsAndWarnings);
    assignErrorsAndWarnings();

    function assignErrorsAndWarnings() {
        getErrorsAndWarnings().then(function(errorsAndWarnings) {
            $scope.$apply(function() {
                $scope.errorsAndWarnings = errorsAndWarnings
            })
        })
    }

    function getErrorsAndWarnings() {
        var errorsAndWarnings = $rootScope.errors.map(function(error) {
            error.level = ERROR_LEVEL;
            return error
        }).concat($rootScope.warnings.map(function(warning) {
            warning.level = WARNING_LEVEL;
            return warning
        })).map(function(error) {
            error.type = getType(error);
            error.description = getDescription(error);
            return error
        });
        return Promise.all(errorsAndWarnings.map(assignLineNumber))
    }

    function getType(error) {
        if (error.code && error.message && error.path) {
            if (error.level > 500) {
                return "Swagger Error"
            }
            return "Swagger Warning"
        }
        if (error.yamlError) {
            return "YAML Syntax Error"
        }
        if (error.emptyDocsError) {
            return "Empty Document Error"
        }
        return "Unknown Error"
    }

    function getDescription(error) {
        if (_.isString(error.description)) {
            return error.description
        }
        if (_.isString(error.message)) {
            if (_.isString(error.description)) {
                return error.message + "<br>" + error.description
            }
            return error.message
        }
        if (error.emptyDocsError) {
            return error.emptyDocsError
        }
        if (error.yamlError) {
            return error.yamlError.message.replace("JS-YAML: ", "").replace(/./, function(a) {
                return a.toUpperCase()
            })
        }
        if (error.resolveError) {
            return error.resolveError
        }
        return error
    }
    $scope.isOnlyWarnings = function(errors) {
        return !errors.some(function(error) {
            return !error || error.level > WARNING_LEVEL
        })
    };

    function assignLineNumber(error) {
        if (error.yamlError) {
            return new Promise(function(resolve) {
                error.lineNumber = error.yamlError.mark.line;
                resolve(error)
            })
        }
        if (_.isArray(error.path)) {
            var value = $rootScope.editorValue;
            var path = _.clone(error.path);
            return ASTManager.positionRangeForPath(value, path).then(function(range) {
                error.lineNumber = range.start.line;
                return error
            })
        }
        return error
    }
    $scope.goToLineOfError = function(error) {
        if (error) {
            Editor.gotoLine(error.lineNumber);
            Editor.focus()
        }
    };
    $scope.isWarning = function(error) {
        return error && error.level < ERROR_LEVEL
    };
    $scope.toggleCollapse = function() {
        $scope.isCollapsed = !$scope.isCollapsed
    }
}]);
"use strict";
SwaggerEditor.controller("OpenExamplesCtrl", ["$scope", "$modalInstance", "$rootScope", "$state", "FileLoader", "Builder", "Storage", "Analytics", "defaults", function OpenExamplesCtrl($scope, $modalInstance, $rootScope, $state, FileLoader, Builder, Storage, Analytics, defaults) {
    $scope.files = defaults.exampleFiles;
    $scope.selectedFile = defaults.exampleFiles[0];
    $scope.open = function(file) {
        var pathname = _.endsWith(location.pathname, "/") ? location.pathname.substring(1) : location.pathname;
        var url = "/" + pathname + defaults.examplesFolder + file;
        FileLoader.loadFromUrl(url).then(function(value) {
            Storage.save("yaml", value);
            $rootScope.editorValue = value;
            $state.go("home", {
                tags: null
            });
            $modalInstance.close()
        }, $modalInstance.close);
        Analytics.sendEvent("open-example", "open-example:" + file)
    };
    $scope.cancel = $modalInstance.close
}]);
"use strict";
SwaggerEditor.controller("PreferencesCtrl", ["$scope", "$modalInstance", "Preferences", function PreferencesCtrl($scope, $modalInstance, Preferences) {
    $scope.keyPressDebounceTime = Preferences.get("keyPressDebounceTime");
    $scope.liveRender = Preferences.get("liveRender");
    $scope.autoComplete = Preferences.get("autoComplete");
    $scope.save = function() {
        var value = parseInt($scope.keyPressDebounceTime, 10);
        if (value > 0) {
            Preferences.set("keyPressDebounceTime", value)
        } else {
            throw new Error("$scope.keyPressDebounceTime was not set correctly")
        }
        Preferences.set("liveRender", $scope.liveRender);
        Preferences.set("autoComplete", $scope.autoComplete);
        $modalInstance.close()
    };
    $scope.close = $modalInstance.close
}]);
"use strict";
SwaggerEditor.controller("ModalCtrl", ["$scope", "$modalInstance", function ModalCtrl($scope, $modalInstance) {
    $scope.cancel = $modalInstance.close;
    $scope.close = $modalInstance.close
}]);
"use strict";
SwaggerEditor.controller("SecurityCtrl", ["$scope", "$modal", "AuthManager", function SecurityCtrl($scope, $modal, AuthManager) {
    $scope.getHumanSecurityType = function(type) {
        var types = {
            basic: "HTTP Basic Authentication",
            oauth2: "OAuth 2.0",
            apiKey: "API Key"
        };
        return types[type]
    };
    $scope.isAuthenticated = AuthManager.securityIsAuthenticated;
    $scope.authenticate = function(securityName, security) {
        if (security.type === "basic") {
            $modal.open({
                templateUrl: "templates/auth/basic.html",
                controller: ["$scope", "$modalInstance", function BasicAuthAuthenticateCtrl($scope, $modalInstance) {
                    $scope.cancel = $modalInstance.close;
                    $scope.authenticate = function(username, password) {
                        AuthManager.basicAuth(securityName, security, {
                            username: username,
                            password: password
                        });
                        $modalInstance.close()
                    }
                }],
                size: "large"
            })
        } else if (security.type === "oauth2") {
            $modal.open({
                templateUrl: "templates/auth/oauth2.html",
                controller: ["$scope", "$modalInstance", function OAuth2AuthenticateCtrl($scope, $modalInstance) {
                    $scope.cancel = $modalInstance.close;
                    $scope.authenticate = function(accessToken) {
                        if (!accessToken) {
                            return
                        }
                        AuthManager.oAuth2(securityName, security, {
                            accessToken: accessToken
                        });
                        $modalInstance.close()
                    }
                }],
                size: "large"
            })
        } else if (security.type === "apiKey") {
            $modal.open({
                templateUrl: "templates/auth/api-key.html",
                controller: ["$scope", "$modalInstance", function APIKeyAuthenticateCtrl($scope, $modalInstance) {
                    $scope.cancel = $modalInstance.close;
                    $scope.authenticate = function(apiKey) {
                        if (!apiKey) {
                            return
                        }
                        AuthManager.apiKey(securityName, security, {
                            apiKey: apiKey
                        });
                        $modalInstance.close()
                    }
                }],
                size: "large"
            })
        } else {
            window.alert("Not yet supported")
        }
    }
}]);
"use strict";
SwaggerEditor.directive("onReadFile", ["$parse", function($parse) {
    return {
        restrict: "A",
        scope: false,
        link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            element.on("change", function(onChangeEvent) {
                var reader = new FileReader;
                reader.onload = function(onLoadEvent) {
                    scope.$apply(function() {
                        fn(scope, {
                            $fileContent: onLoadEvent.target.result
                        })
                    })
                };
                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0])
            })
        }
    }
}]);
"use strict";
SwaggerEditor.directive("swaggerOperation", ["defaults", function(defaults) {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "templates/operation.html",
        scope: false,
        link: function($scope) {
            $scope.isTryOpen = false;
            $scope.enableTryIt = defaults.enableTryIt;
            $scope.toggleTry = function toggleTry() {
                $scope.isTryOpen = !$scope.isTryOpen
            };
            $scope.getParameters = function() {
                var hasPathParameter = Array.isArray($scope.path.parameters);
                var hasOperationParameter = Array.isArray($scope.operation.parameters);
                if (!hasOperationParameter && !hasPathParameter) {
                    return []
                }
                if (!hasOperationParameter) {
                    return $scope.path.parameters || []
                }
                if (!hasPathParameter) {
                    return $scope.operation.parameters || []
                }
                return $scope.operation.parameters.concat($scope.path.parameters).map(setParameterSchema)
            };

            function setParameterSchema(parameter) {
                if (parameter.schema) {
                    return parameter
                } else if (parameter.type === "array") {
                    parameter.schema = _.pick(parameter, "type", "items")
                } else {
                    var schema = {
                        type: parameter.type
                    };
                    if (parameter.format) {
                        schema.format = parameter.format
                    }
                    parameter.schema = schema
                }
                return parameter
            }
            $scope.hasAResponseWithSchema = function(responses) {
                return _.keys(responses).some(function(responseCode) {
                    return responses[responseCode] && responses[responseCode].schema
                })
            };
            $scope.hasAResponseWithHeaders = function(responses) {
                return _.keys(responses).some(function(responseCode) {
                    return responses[responseCode] && responses[responseCode].headers
                })
            }
        }
    }
}]);
"use strict";
SwaggerEditor.directive("schemaModel", function() {
    return {
        templateUrl: "templates/schema-model.html",
        restrict: "E",
        replace: true,
        scope: {
            schema: "="
        },
        link: function postLink($scope, $element) {
            $scope.mode = "schema";
            $scope.switchMode = function() {
                $scope.mode = $scope.mode === "json" ? "schema" : "json"
            };
            $scope.$watch("schema", render);
            render();

            function render() {
                var formatter = new JSONFormatter($scope.schema, 1);
                $element.find("td.view.json").html(formatter.render());
                var schemaView = new JSONSchemaView($scope.schema, 1);
                $element.find("td.view.schema").html(schemaView.render())
            }
        }
    }
});
"use strict";
SwaggerEditor.directive("stopEvent", function() {
    return {
        restrict: "A",
        link: function(scope, element) {
            element.bind("click", function(e) {
                e.stopPropagation()
            })
        }
    }
});
"use strict";
SwaggerEditor.directive("autoFocus", ["$timeout", function($timeout) {
    return {
        restrict: "A",
        link: function($scope, $element, $attributes) {
            $timeout(function() {
                $element[0].focus()
            }, $attributes.autoFocus || 1)
        }
    }
}]);
"use strict";
SwaggerEditor.directive("scrollIntoViewWhen", function() {
    return {
        restrict: "A",
        link: function postLink($scope, $element, $attrs) {
            $scope.$watch($attrs.scrollIntoViewWhen, function(val) {
                if (val) {
                    $element.scrollIntoView(100)
                }
            })
        }
    }
});
"use strict";
SwaggerEditor.directive("collapseWhen", function() {
    var TRANSITION_DURATION = 200;
    return {
        restrict: "A",
        link: function postLink(scope, element, attrs) {
            var buffer = null;

            function cleanUp() {
                setTimeout(function() {
                    element.removeAttr("style")
                }, TRANSITION_DURATION)
            }
            if (attrs.collapseWhen) {
                var clone = element.clone();
                clone.removeAttr("style");
                clone.appendTo("body");
                buffer = clone.height();
                clone.remove()
            }
            scope.$watch(attrs.collapseWhen, function(val) {
                if (val) {
                    buffer = element.height();
                    element.height(buffer);
                    element.height(0);
                    element.addClass("c-w-collapsed");
                    cleanUp()
                } else {
                    element.height(buffer);
                    element.removeClass("c-w-collapsed");
                    cleanUp()
                }
            })
        }
    }
});
"use strict";
SwaggerEditor.directive("trackEvent", ["Analytics", function(Analytics) {
    return {
        restrict: "A",
        link: function($scope, $element, $attributes) {
            $element.bind("click", function() {
                var eventName = $attributes.trackEvent;
                if (angular.isString(eventName)) {
                    var eventCategory = "click-item";
                    var eventAction = eventName.split(" ").join("->");
                    var eventLabel = window.location.origin;
                    Analytics.sendEvent(eventCategory, eventAction, eventLabel)
                }
            })
        }
    }
}]);
"use strict";
SwaggerEditor.config(["$provide", function($provide) {
    $provide.constant("defaults", window.SwaggerEditor.$defaults)
}]);
"use strict";
SwaggerEditor.config(["$provide", function($provide) {
    $provide.constant("strings", {
        stausMessages: {
            "error-connection": "Server connection error",
            "error-general": "Error!",
            "progress-working": "Working...",
            "progress-unsaved": "Unsaved changes",
            "success-process": "Processed with no error",
            "progress-saving": "Saving...",
            "success-saved": "All changes saved",
            "error-yaml": "YAML Syntax Error",
            "error-swagger": "Swagger Error"
        }
    })
}]);
"use strict";
SwaggerEditor.filter("formdata", function() {
    return function formdata(object) {
        var result = [];
        if (angular.isObject(object)) {
            Object.keys(object).forEach(function(key) {
                if (angular.isDefined(object[key])) {
                    result.push(key + ": " + object[key])
                }
            })
        }
        return result.join("\n")
    }
});
"use strict";
SwaggerEditor.controller("TryOperation", ["$scope", "formdataFilter", "AuthManager", "SchemaForm", function($scope, formdataFilter, AuthManager, SchemaForm) {
    var parameters = $scope.getParameters();
    var securityOptions = getSecurityOptions();
    var FILE_TYPE = " F I L E ";
    $scope.generateUrl = generateUrl;
    $scope.makeCall = makeCall;
    $scope.xhrInProgress = false;
    $scope.parameters = parameters;
    $scope.getRequestBody = getRequestBody;
    $scope.hasRequestBody = hasRequestBody;
    $scope.getHeaders = getHeaders;
    $scope.requestModel = makeRequestModel();
    $scope.requestSchema = makeRequestSchema();
    $scope.hasFileParam = hasFileParam();
    $scope.httpProtocol = "HTTP/1.1";
    $scope.locationHost = window.location.host;
    configureSchemaForm();
    $scope.$watch("specs", function() {
        $scope.requestModel = makeRequestModel();
        $scope.requestSchema = makeRequestSchema()
    }, true);
    var defaultOptions = {
        theme: "bootstrap3",
        remove_empty_properties: true,
        show_errors: "change"
    };
    var looseOptions = {
        no_additional_properties: false,
        disable_properties: false,
        disable_edit_json: false
    };
    SchemaForm.options = defaultOptions;

    function configureSchemaForm() {
        var loose = false;
        if (!hasRequestBody()) {
            loose = false
        } else {
            try {
                for (var p in $scope.requestSchema.properties.parameters.properties) {
                    var param = $scope.requestSchema.properties.parameters.properties[p];
                    if (param.in === "body" && isLooseJSONSchema(param)) {
                        loose = true
                    }
                }
            } catch (e) {}
        }
        SchemaForm.options = _.extend(defaultOptions, loose ? looseOptions : {})
    }

    function isLooseJSONSchema(schema) {
        if (schema.additionalProperties || _.isEmpty(schema.properties)) {
            return true
        }
        if (schema.type === "array" && (schema.items.additionalProperties || _.isEmpty(schema.items.properties))) {
            return true
        }
        return false
    }

    function appendJSONEditorOptions(schema) {
        var looseOptions = {
            no_additional_properties: false,
            disable_properties: false,
            disable_edit_json: false
        };
        if (isLooseJSONSchema(schema)) {
            schema.options = looseOptions
        }
        _.each(schema.properties, appendJSONEditorOptions);
        return schema
    }

    function makeRequestSchema() {
        var schema = {
            type: "object",
            title: "Request",
            required: ["scheme", "accept"],
            properties: {
                scheme: {
                    type: "string",
                    title: "Scheme",
                    enum: walkToProperty("schemes")
                },
                accept: {
                    type: "string",
                    title: "Accept",
                    enum: walkToProperty("produces")
                }
            }
        };
        if (securityOptions.length) {
            schema.properties.security = {
                title: "Security",
                description: "Only authenticated security options are shown.",
                type: "array",
                uniqueItems: true,
                items: {
                    type: "string",
                    enum: securityOptions
                }
            }
        }
        if (hasRequestBody()) {
            var defaultConsumes = ["multipart/form-data", "x-www-form-urlencoded", "application/json"];
            schema.properties.contentType = {
                type: "string",
                title: "Content-Type",
                enum: walkToProperty("consumes") || defaultConsumes
            }
        }
        if (parameters.length) {
            schema.properties.parameters = {
                type: "object",
                title: "Parameters",
                properties: {}
            };
            parameters.map(pickSchemaFromParameter).map(normalizeJSONSchema).forEach(function(paramSchema) {
                schema.properties.parameters.properties[paramSchema.name] = paramSchema
            })
        }
        return schema
    }

    function makeRequestModel() {
        var model = {
            scheme: walkToProperty("schemes")[0],
            accept: walkToProperty("produces")[0]
        };
        if (securityOptions.length) {
            model.security = securityOptions
        }
        if (hasRequestBody()) {
            model.contentType = "application/json"
        }
        if (parameters.length) {
            model.parameters = {};
            parameters.map(pickSchemaFromParameter).map(normalizeJSONSchema).forEach(function(paramSchema) {
                var defaults = {
                    object: {},
                    array: [],
                    integer: 0,
                    string: ""
                };
                if (angular.isDefined(paramSchema.default)) {
                    model.parameters[paramSchema.name] = paramSchema.default
                } else if (angular.isDefined(paramSchema.minimum)) {
                    model.parameters[paramSchema.name] = paramSchema.minimum
                } else if (angular.isDefined(paramSchema.maximum)) {
                    model.parameters[paramSchema.name] = paramSchema.maximum
                } else if (angular.isDefined(defaults[paramSchema.type])) {
                    var title = paramSchema.name || paramSchema.name;
                    if (paramSchema.type === "object") {
                        model.parameters[title] = createEmptyObject(paramSchema)
                    } else {
                        model.parameters[title] = defaults[paramSchema.type]
                    }
                } else {
                    model.parameters[paramSchema.name] = ""
                }
            })
        }
        return model
    }

    function normalizeJSONSchema(schema) {
        if (!schema.title && angular.isString(schema.name)) {
            schema.title = schema.name
        }
        if (!schema.type) {
            if (schema.properties) {
                schema.type = "object"
            }
            if (schema.items) {
                schema.type = "array"
            }
        }
        if (schema.type === "file") {
            schema.type = "string";
            schema.format = "file"
        }
        return appendJSONEditorOptions(schema)
    }

    function walkToProperty(propertyName) {
        var defaultProperties = {
            produces: ["*/*"],
            schemes: ["http"]
        };
        if (Array.isArray($scope.operation[propertyName])) {
            return $scope.operation[propertyName]
        } else if (Array.isArray($scope.specs[propertyName])) {
            return $scope.specs[propertyName]
        }
        if (defaultProperties[propertyName]) {
            return defaultProperties[propertyName]
        }
        return undefined
    }

    function getSecurityOptions() {
        var securityOptions = [];
        if (_.isArray($scope.operation.security)) {
            $scope.operation.security.map(function(security) {
                _.keys(security).forEach(function(key) {
                    securityOptions = securityOptions.concat(key)
                })
            })
        } else if (_.isArray($scope.specs.security)) {
            $scope.specs.security.map(function(security) {
                _.keys(security).forEach(function(key) {
                    securityOptions = securityOptions.concat(key)
                })
            })
        }
        return _.unique(securityOptions).filter(function(security) {
            return AuthManager.securityIsAuthenticated(security)
        })
    }

    function pickSchemaFromParameter(parameter) {
        if (parameter.schema) {
            return _.omit(_.extend(parameter, parameter.schema), "schema")
        } else {
            return parameter
        }
    }

    function createEmptyObject(schema) {
        if (schema.type !== "object") {
            throw new TypeError("schema should be an object schema.")
        }
        var defaultValues = {
            string: "",
            integer: 0
        };
        var result = {};
        if (!schema.properties) {
            return result
        }
        Object.keys(schema.properties).forEach(function(propertyName) {
            if (schema.properties[propertyName].type === "object") {
                result[propertyName] = createEmptyObject(schema.properties[propertyName])
            } else {
                result[propertyName] = defaultValues[schema.properties[propertyName].type] || null
            }
        });
        return result
    }

    function parameterTypeFilter(type) {
        return function filterParams(parameter) {
            return parameter.in === type
        }
    }

    function hashifyParams(hash, param) {
        if (!hash) {
            hash = {}
        }
        var paramValue = $scope.requestModel.parameters[param.name];
        var required = $scope.requestSchema.properties.parameters.properties[param.name].required === true;
        if (param.type === "string" && paramValue === "" && !required) {
            return hash
        }
        hash[param.name] = $scope.requestModel.parameters[param.name];
        return hash
    }

    function generateUrl() {
        var requestModel = $scope.requestModel;
        var scheme = requestModel.scheme;
        var host = $scope.specs.host || window.location.host;
        var basePath = $scope.specs.basePath || "";
        var pathParams = parameters.filter(parameterTypeFilter("path")).reduce(hashifyParams, {});
        var queryParams = parameters.filter(parameterTypeFilter("query")).reduce(hashifyParams, {});
        var queryParamsStr;
        var pathStr;
        var isCollectionQueryParam = parameters.filter(parameterTypeFilter("query")).some(function(parameter) {
            return parameter.items && parameter.items.collectionFormat
        });
        var pathParamRegex = /{([^{}]+)}/g;
        if (basePath === "/") {
            basePath = ""
        }
        if (angular.isArray(requestModel.security)) {
            requestModel.security.forEach(function(securityOption) {
                var auth = AuthManager.getAuth(securityOption);
                if (auth && auth.type === "apiKey" && auth.security.in === "query") {
                    var authQueryParam = {};
                    authQueryParam[auth.security.name] = auth.options.apiKey;
                    _.extend(queryParams, authQueryParam)
                }
            })
        }
        queryParamsStr = window.decodeURIComponent($.param(queryParams, isCollectionQueryParam));
        pathStr = $scope.pathName.replace(pathParamRegex, function(match) {
            var matchKey = match.substring(1, match.length - 1);
            if (angular.isDefined(pathParams[matchKey])) {
                return pathParams[matchKey]
            }
            return match
        });
        queryParamsStr = queryParamsStr ? "?" + queryParamsStr : "";
        return scheme + "://" + host + basePath + pathStr + queryParamsStr
    }

    function getHeaderParams() {
        var params = parameters.filter(parameterTypeFilter("header")).reduce(hashifyParams, {});
        if (angular.isArray($scope.requestModel.security)) {
            $scope.requestModel.security.forEach(function(secuirtyOption) {
                var auth = AuthManager.getAuth(secuirtyOption);
                if (auth) {
                    var authHeader = {};
                    if (auth.type === "basic") {
                        authHeader = {
                            Authorization: "Basic " + auth.options.base64
                        }
                    } else if (auth.type === "apiKey" && auth.security.in === "header") {
                        authHeader[auth.security.name] = auth.options.apiKey
                    } else if (auth.type === "oAuth2") {
                        authHeader = {
                            Authorization: "Bearer " + auth.options.accessToken
                        }
                    }
                    params = _.extend(params, authHeader)
                }
            })
        }
        return params
    }

    function getHeaders() {
        var headerParams = getHeaderParams();
        var content = $scope.getRequestBody();
        var host = ($scope.specs.host || window.location.host).replace(/\:.+/, "");
        var defaultHeaders = {
            Host: host,
            Accept: $scope.requestModel.accept || "*/*",
            "Accept-Encoding": "gzip,deflate,sdch",
            "Accept-Language": "en-US,en;q=0.8,fa;q=0.6,sv;q=0.4",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            Origin: window.location.origin,
            Referer: window.location.origin + window.location.pathname,
            "User-Agent": window.navigator.userAgent
        };
        headerParams = _.extend(defaultHeaders, headerParams);
        if (content !== null) {
            headerParams["Content-Length"] = content.length;
            headerParams["Content-Type"] = $scope.requestModel.contentType
        }
        return headerParams
    }

    function hasRequestBody() {
        var bodyParam = parameters.filter(parameterTypeFilter("body"));
        var formDataParams = parameters.filter(parameterTypeFilter("formData"));
        return bodyParam.length || formDataParams.length
    }

    function getBodyModel() {
        if (!hasRequestBody()) {
            return null
        }
        var bodyParam = parameters.filter(parameterTypeFilter("body"))[0];
        var formDataParams = parameters.filter(parameterTypeFilter("formData"));
        if (bodyParam) {
            var bodyParamName = bodyParam.name;
            var bodyParamValue = $scope.requestModel.parameters[bodyParamName];
            if (bodyParam.format === "file") {
                var result = {};
                result[FILE_TYPE] = bodyParamValue;
                return result
            }
            return bodyParamValue
        } else {
            return formDataParams.reduce(hashifyParams, {})
        }
    }

    function getRequestBody() {
        var bodyParam = parameters.filter(parameterTypeFilter("body"))[0];
        var bodyModel = getBodyModel();
        var contentType = $scope.requestModel.contentType;
        if (bodyModel === undefined || bodyModel === null) {
            return null
        }
        if (bodyModel[FILE_TYPE]) {
            var bodyParamName = bodyParam.name;
            var form = new FormData;
            var inputEl = $('input[type="file"][name*="' + bodyParamName + '"]')[0];
            if (!inputEl) {
                return "No file is selected"
            }
            var file = inputEl.files[0];
            if (!file) {
                return "No file is selected"
            }
            form.append(bodyParamName, file, file.name);
            return form
        }
        if (!contentType) {
            return bodyModel
        } else if (/form\-data/.test(contentType)) {
            return formdataFilter(bodyModel)
        } else if (/json/.test(contentType)) {
            return JSON.stringify(bodyModel, null, 2)
        } else if (/urlencode/.test(contentType)) {
            return $.param(bodyModel)
        }
        return null
    }

    function hasFileParam() {
        return getRequestBody() && getRequestBody().indexOf(FILE_TYPE) > -1
    }

    function parseHeaders(headers) {
        var result = {};
        headers.split("\n").forEach(function(line) {
            var key = line.split(":")[0];
            var value = line.split(":")[1];
            if (key && angular.isString(key) && angular.isString(value)) {
                result[key.trim()] = value.trim()
            }
        });
        return result
    }

    function makeCall() {
        $scope.xhrInProgress = true;
        $scope.error = null;
        var omitHeaders = ["Host", "Accept-Encoding", "Connection", "Origin", "Referer", "User-Agent", "Cache-Control", "Content-Length"];
        $.ajax({
            url: $scope.generateUrl(),
            type: $scope.operationName,
            headers: _.omit($scope.getHeaders(), omitHeaders),
            data: $scope.getRequestBody(),
            contentType: $scope.contentType
        }).fail(function(jqXHR, textStatus, errorThrown) {
            $scope.xhrInProgress = false;
            $scope.textStatus = textStatus;
            $scope.error = errorThrown;
            $scope.xhr = jqXHR;
            $scope.$digest()
        }).done(function(data, textStatus, jqXHR) {
            $scope.textStatus = textStatus;
            $scope.xhrInProgress = false;
            $scope.responseData = data;
            $scope.xhr = jqXHR;
            $scope.responseHeaders = parseHeaders(jqXHR.getAllResponseHeaders());
            $scope.$digest()
        })
    }
    $scope.prettyPrint = function(input) {
        try {
            return JSON.stringify(JSON.parse(input), null, 2)
        } catch (jsonError) {}
        return input
    };
    $scope.isJson = function(value) {
        if (angular.isObject(value) || angular.isArray(value)) {
            return true
        }
        var err;
        try {
            JSON.parse(value)
        } catch (error) {
            err = error
        }
        return !err
    };
    $scope.isType = function(headers, type) {
        var regex = new RegExp(type);
        headers = headers || {};
        return headers["Content-Type"] && regex.test(headers["Content-Type"])
    };
    $scope.isCrossOrigin = function() {
        return $scope.specs.host && $scope.specs.host !== $scope.locationHost
    }
}]);
"use strict";
SwaggerEditor.service("TagManager", ["$stateParams", function TagManager($stateParams) {
    var tags = [];

    function Tag(name, description) {
        this.name = name;
        this.description = description
    }
    this.resetTags = function resetTags() {
        tags = []
    };
    this.tagIndexFor = function(tagName) {
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].name === tagName) {
                return i
            }
        }
    };
    this.getAllTags = function() {
        return tags
    };
    this.tagsHaveDescription = function() {
        return tags.some(function(tag) {
            return tag.description
        })
    };
    this.registerTagsFromSpec = function(spec) {
        if (!angular.isObject(spec)) {
            return
        }
        tags = [];
        if (Array.isArray(spec.tags)) {
            spec.tags.forEach(function(tag) {
                if (tag && angular.isString(tag.name)) {
                    registerTag(tag.name, tag.description)
                }
            })
        }
        _.each(spec.paths, function(path) {
            _.each(path, function(operation) {
                if (_.isObject(operation)) {
                    _.each(operation.tags, registerTag)
                }
            })
        })
    };
    this.getCurrentTags = function() {
        if ($stateParams.tags) {
            return $stateParams.tags.split(",")
        }
        return []
    };

    function registerTag(tagName, tagDescription) {
        if (!tagName) {
            return
        }
        var tagNames = tags.map(function(tag) {
            return tag.name
        });
        if (!_.include(tagNames, tagName)) {
            tags.push(new Tag(tagName, tagDescription))
        }
    }
    this.registerTag = registerTag
}]);
"use strict";
SwaggerEditor.service("Autocomplete", ["$rootScope", "snippets", "KeywordMap", "Preferences", "ASTManager", "YAML", function($rootScope, snippets, KeywordMap, Preferences, ASTManager, YAML) {
    var KeywordCompleter = {
        getCompletions: function(editor, session, pos, prefix, callback) {
            var startTime = Date.now();
            if (!Preferences.get("autoComplete")) {
                return callback(null, [])
            }
            editor.completer.autoSelect = true;
            getPathForPosition(pos, prefix).then(function(path) {
                var keywordsForPos = getKeywordsForPosition(_.clone(path));
                var snippetsForPos = getSnippetsForPosition(_.clone(path));
                if (_.last(path) === "$ref") {
                    return get$refs().then(function($refs) {
                        callback(null, $refs)
                    })
                }
                var totalTime = Date.now() - startTime;
                if (totalTime > 200) {
                    console.info("autocomplete took " + totalTime + "ms. Turning it off");
                    Preferences.set("autoComplete", false);
                    Preferences.set("keyPressDebounceTime", totalTime * 3)
                }
                callback(null, keywordsForPos.concat(snippetsForPos))
            })
        }
    };
    this.init = function(editor) {
        editor.completers = [KeywordCompleter]
    };

    function constructAceSnippet(snippet) {
        return {
            caption: snippet.name,
            snippet: snippet.content,
            meta: "snippet"
        }
    }

    function getPathForPosition(pos, prefix) {
        var value = $rootScope.editorValue;
        var prefixWithoutInsertedChar = prefix.substr(0, prefix.length - 1);
        var lines = value.split("\n");
        var currentLine = lines[pos.row];
        if (pos.column === 1) {
            return new Promise(function(resolve) {
                resolve([])
            })
        }
        if (currentLine.replace(prefixWithoutInsertedChar, "").trim() === "") {
            currentLine += "a: b";
            pos.column += 1
        }
        currentLine += prefix;
        lines[pos.row] = currentLine;
        value = lines.join("\n");
        return ASTManager.pathForPosition(value, {
            line: pos.row,
            column: pos.column
        })
    }

    function isMatchPath(path, matcher) {
        if (!_.isArray(path) || !_.isArray(matcher)) {
            return false
        }
        if (path.length !== matcher.length) {
            return false
        }
        for (var i = 0, l = path.length; i < l; i++) {
            var matches = new RegExp(matcher[i]).test(path[i]);
            if (!matches) {
                return false
            } else if (i === l - 1) {
                return true
            }
        }
        return true
    }

    function filterForSnippets(path) {
        return function filter(snippet) {
            return isMatchPath(path, snippet.path)
        }
    }

    function getChild(object, key) {
        var keys = Object.keys(object);
        var regex;
        for (var i = 0; i < keys.length; i++) {
            regex = new RegExp(keys[i]);
            if (regex.test(key) && object[keys[i]]) {
                return object[keys[i]]
            }
        }
    }

    function getKeywordsForPosition(path) {
        var keywordsMap = KeywordMap.get();
        var key = path.shift();
        if (!_.isArray(path)) {
            return []
        }
        while (key && _.isObject(keywordsMap)) {
            keywordsMap = getChild(keywordsMap, key);
            key = path.shift()
        }
        if (!_.isObject(keywordsMap)) {
            return []
        }
        if (_.isArray(keywordsMap) && keywordsMap.every(_.isString)) {
            return keywordsMap.map(constructAceCompletion)
        }
        if (_.isArray(keywordsMap)) {
            keywordsMap = keywordsMap[0]
        }
        if (!_.isObject(keywordsMap)) {
            return []
        }
        return _.keys(keywordsMap).map(constructAceCompletion)
    }

    function constructAceCompletion(keyword) {
        return {
            name: keyword,
            value: keyword,
            score: 300,
            meta: "keyword"
        }
    }

    function getSnippetsForPosition(path) {
        return snippets.filter(filterForSnippets(path)).map(constructAceSnippet).map(snippetSorterForPos(path))
    }

    function snippetSorterForPos(path) {
        return function sortSnippets(snippet) {
            var score = 1e3;
            path.forEach(function(keyword) {
                if (snippet.snippet.indexOf(keyword)) {
                    score = 500
                }
            });
            snippet.score = score;
            return snippet
        }
    }

    function get$refs() {
        return new Promise(function(resolve) {
            YAML.load($rootScope.editorValue, function(err, json) {
                if (err) {
                    return resolve([])
                }
                var definitions = _.keys(json.definitions).map(function(def) {
                    return '"#/definitions/' + def + '"'
                });
                var parameters = _.keys(json.parameters).map(function(param) {
                    return '"#/parameters/' + param + '"'
                });
                var responses = _.keys(json.responses).map(function(resp) {
                    return '"#/responses/' + resp + '"'
                });
                var allRefs = definitions.concat(parameters).concat(responses);
                resolve(allRefs.map(function(ref) {
                    return {
                        name: ref,
                        value: ref,
                        score: 500,
                        meta: "$ref"
                    }
                }))
            })
        })
    }
}]);
"use strict";
SwaggerEditor.service("FileLoader", ["$http", "defaults", "YAML", function FileLoader($http, defaults, YAML) {
    function loadFromUrl(url, disableProxy) {
        return new Promise(function(resolve, reject) {
            if (disableProxy === undefined) {
                disableProxy = false
            }
            if (_.startsWith(url, "http") && !disableProxy) {
                url = defaults.importProxyUrl + url
            }
            $http({
                method: "GET",
                url: url,
                headers: {
                    accept: "application/x-yaml,text/yaml,application/json,*/*"
                }
            }).then(function(resp) {
                if (angular.isObject(resp.data)) {
                    YAML.dump(resp.data, function(error, yamlString) {
                        if (error) {
                            return reject(error)
                        }
                        resolve(yamlString)
                    })
                } else {
                    load(resp.data).then(resolve, reject)
                }
            }, reject)
        })
    }

    function load(string) {
        return new Promise(function(resolve, reject) {
            if (!_.isString(string)) {
                throw new TypeError("load function only accepts a string")
            }
            YAML.load(string, function(error, json) {
                if (error) {
                    return reject(error)
                }
                YAML.dump(json, function(error, yamlString) {
                    if (error) {
                        return reject(error)
                    }
                    resolve(yamlString)
                })
            })
        })
    }
    this.load = load;
    this.loadFromUrl = loadFromUrl
}]);
"use strict";
SwaggerEditor.service("Editor", ["Autocomplete", "ASTManager", "LocalStorage", "defaults", "$interval", function Editor(Autocomplete, ASTManager, LocalStorage, defaults, $interval) {
    var editor = null;
    var onReadyFns = new Set;
    var changeFoldFns = new Set;
    var that = this;
    var editorOptions = defaults.editorOptions || {};
    var defaultTheme = editorOptions.theme || "ace/theme/atom_dark";

    function annotateYAMLErrors(error) {
        if (editor && error && error.mark && error.reason) {
            editor.getSession().setAnnotations([{
                row: error.mark.line,
                column: error.mark.column,
                text: error.reason,
                type: "error"
            }])
        }
    }

    function annotateSwaggerError(error, type) {
        var row = 0;
        var column = 0;
        if (false && editor && error.path) {
            if (error.path.length) {
                row = ASTManager.lineForPath(_.cloneDeep(error.path))
            }
            editor.getSession().setAnnotations([{
                row: row,
                column: column,
                text: error.message,
                type: type || "error"
            }])
        }
    }

    function clearAnnotation() {
        editor.getSession().clearAnnotations()
    }

    function aceLoaded(e) {
        window.e = editor = e;
        ace.config.set("basePath", "bower_components/ace-builds/src-noconflict");
        Autocomplete.init(e);
        editor.setOptions({
            fontFamily: "Source Code Pro",
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true
        });
        loadEditorSettings();
        onReadyFns.forEach(function(fn) {
            fn(that)
        });
        onReadyFns = new Set;
        var session = editor.getSession();
        session.on("changeFold", onChangeFold);
        configureSession(session)
    }

    function saveEditorSettings() {
        if (editor) {
            LocalStorage.save("editor-settings", editor.getOptions())
        }
    }

    function loadEditorSettings() {
        if (editor) {
            LocalStorage.load("editor-settings").then(function(options) {
                options = options || {
                    theme: defaultTheme
                };
                editor.setOptions(options)
            })
        }
    }

    function onChangeFold(event) {
        changeFoldFns.forEach(function(fn) {
            fn.call(null, event)
        })
    }

    function configureSession(session) {
        session.setTabSize(2)
    }

    function ready(fn) {
        if (angular.isFunction(fn)) {
            onReadyFns.add(fn)
        }
    }

    function getAllFolds() {
        var session = editor.getSession();
        var folds = null;
        session.foldAll();
        folds = session.unfold();
        return Array.isArray(folds) ? folds : []
    }

    function getLine(l) {
        return editor.session.getLine(l)
    }

    function onFoldChanged(fn) {
        if (_.isFunction(fn)) {
            changeFoldFns.add(fn)
        }
    }

    function addFold(start, end) {
        if (editor) {
            editor.getSession().foldAll(start, end)
        }
    }

    function removeFold(start, end) {
        if (editor) {
            editor.getSession().unfold(editor.getSession().getFoldAt(start, end))
        }
    }

    function gotoLine(line) {
        editor.gotoLine(line)
    }

    function lineInFocus() {
        if (!editor) {
            return null
        }
        return editor.getCursorPosition().row
    }

    function showSettings() {
        ace.config.loadModule("ace/ext/settings_menu", function(module) {
            module.init(editor);
            editor.showSettingsMenu();
            var checkInterval = $interval(function() {
                if ($("#ace_settingsmenu").length === 0) {
                    saveEditorSettings();
                    $interval.cancel(checkInterval);
                    checkInterval = undefined
                }
            }, 300)
        })
    }

    function resetSettings() {
        if (window.confirm("Are you sure?") && editor) {
            editor.setOptions(editorOptions);
            saveEditorSettings()
        }
    }

    function adjustFontSize(by) {
        if (editor) {
            var fontSize = parseInt(editor.getOption("fontSize"), 10);
            editor.setOption("fontSize", fontSize + by);
            saveEditorSettings()
        }
    }

    function focus() {
        if (editor) {
            editor.focus()
        }
    }
    this.aceLoaded = aceLoaded;
    this.ready = ready;
    this.annotateYAMLErrors = annotateYAMLErrors;
    this.annotateSwaggerError = annotateSwaggerError;
    this.clearAnnotation = clearAnnotation;
    this.getAllFolds = getAllFolds;
    this.getLine = getLine;
    this.onFoldChanged = onFoldChanged;
    this.addFold = addFold;
    this.removeFold = removeFold;
    this.gotoLine = gotoLine;
    this.lineInFocus = lineInFocus;
    this.showSettings = showSettings;
    this.saveEditorSettings = saveEditorSettings;
    this.adjustFontSize = adjustFontSize;
    this.resetSettings = resetSettings;
    this.focus = focus
}]);
"use strict";
SwaggerEditor.service("Builder", ["SwayWorker", function Builder(SwayWorker) {
    var load = _.memoize(jsyaml.load);

    function buildDocs(stringValue) {
        var json;
        return new Promise(function(resolve, reject) {
            if (!stringValue) {
                reject({
                    specs: null,
                    errors: [{
                        emptyDocsError: "Empty Document Error"
                    }]
                })
            }
            try {
                json = load(stringValue)
            } catch (yamlError) {
                reject({
                    errors: [{
                        yamlError: yamlError
                    }],
                    specs: null
                })
            }
            if (json && _.isObject(json.definitions)) {
                for (var definition in json.definitions) {
                    if (_.isObject(json.definitions[definition]) && !_.startsWith(definition, "x-") && _.isEmpty(json.definitions[definition].title)) {
                        json.definitions[definition].title = definition
                    }
                }
            }
            SwayWorker.run({
                definition: json,
                jsonRefs: {
                    location: window.location.href.replace(/#.+/, "").replace(/\/$/, "")
                }
            }, function(data) {
                if (data.errors.length) {
                    reject(data)
                } else {
                    resolve(data)
                }
            })
        })
    }
    this.buildDocs = buildDocs
}]);
"use strict";
SwaggerEditor.service("ASTManager", ["YAML", "$log", function ASTManager(YAML, $log) {
    var MAP_TAG = "tag:yaml.org,2002:map";
    var SEQ_TAG = "tag:yaml.org,2002:seq";

    function positionRangeForPath(yaml, path, cb) {
        if (typeof yaml !== "string") {
            throw new TypeError("yaml should be a string")
        }
        if (!_.isArray(path)) {
            throw new TypeError("path should be an array of strings")
        }
        if (typeof cb !== "function") {
            throw new TypeError("cb should be a function.")
        }
        var invalidRange = {
            start: {
                line: -1,
                column: -1
            },
            end: {
                line: -1,
                column: -1
            }
        };
        var i = 0;
        YAML.compose(yaml, function(error, ast) {
            find(ast);

            function find(current) {
                if (current.tag === MAP_TAG) {
                    for (i = 0; i < current.value.length; i++) {
                        var pair = current.value[i];
                        var key = pair[0];
                        var value = pair[1];
                        if (key.value === path[0]) {
                            path.shift();
                            return find(value)
                        }
                    }
                }
                if (current.tag === SEQ_TAG) {
                    var item = current.value[path[0]];
                    if (item && item.tag) {
                        path.shift();
                        find(item)
                    }
                }
                if (path.length) {
                    return cb(invalidRange)
                }
                return cb({
                    start: {
                        line: current.start_mark.line,
                        column: current.start_mark.column
                    },
                    end: {
                        line: current.end_mark.line,
                        column: current.end_mark.column
                    }
                })
            }
        })
    }

    function pathForPosition(yaml, position, cb) {
        if (typeof yaml !== "string") {
            throw new TypeError("yaml should be a string")
        }
        if (typeof position !== "object" || typeof position.line !== "number" || typeof position.column !== "number") {
            throw new TypeError("position should be an object with line and column" + " properties")
        }
        if (typeof cb !== "function") {
            throw new TypeError("cb should be a function.")
        }
        YAML.compose(yaml, function(error, ast) {
            if (error) {
                $log.log("Error composing AST", error);
                return cb([])
            }
            var path = [];
            find(ast);

            function find(current) {
                var i = 0;
                if (!current || [MAP_TAG, SEQ_TAG].indexOf(current.tag) === -1) {
                    return cb(path)
                }
                if (current.tag === MAP_TAG) {
                    for (i = 0; i < current.value.length; i++) {
                        var pair = current.value[i];
                        var key = pair[0];
                        var value = pair[1];
                        if (isInRange(key)) {
                            return cb(path)
                        } else if (isInRange(value)) {
                            path.push(key.value);
                            return find(value)
                        }
                    }
                }
                if (current.tag === SEQ_TAG) {
                    for (i = 0; i < current.value.length; i++) {
                        var item = current.value[i];
                        if (isInRange(item)) {
                            path.push(i.toString());
                            return find(item)
                        }
                    }
                }
                return cb(path);

                function isInRange(node) {
                    if (node.start_mark.line === node.end_mark.line) {
                        return position.line === node.start_mark.line && node.start_mark.column <= position.column && node.end_mark.column >= position.column
                    }
                    if (position.line === node.start_mark.line) {
                        return position.column >= node.start_mark.column
                    }
                    if (position.line === node.end_mark.line) {
                        return position.column <= node.end_mark.column
                    }
                    return node.start_mark.line < position.line && node.end_mark.line > position.line
                }
            }
        })
    }
    this.positionRangeForPath = function positionRangeForPathPromise(yaml, path) {
        return new Promise(function(resolve) {
            positionRangeForPath(yaml, path, resolve)
        }).catch(function(error) {
            $log.error("positionRangeForPath error:", error)
        })
    };
    this.pathForPosition = function pathForPositionPromise(yaml, position) {
        return new Promise(function(resolve) {
            pathForPosition(yaml, position, resolve)
        }).catch(function(error) {
            $log.error("pathForPosition error:", error)
        })
    }
}]);
"use strict";
SwaggerEditor.service("Codegen", ["$http", "defaults", "Storage", "YAML", function Codegen($http, defaults, Storage, YAML) {
    this.getServers = function() {
        if (!defaults.codegen.servers) {
            return new Promise(function(resolve) {
                resolve([])
            })
        }
        return $http.get(defaults.codegen.servers).then(function(resp) {
            return resp.data
        })
    };
    this.getClients = function() {
        if (!defaults.codegen.clients) {
            return new Promise(function(resolve) {
                resolve([])
            })
        }
        return $http.get(defaults.codegen.clients).then(function(resp) {
            return resp.data
        })
    };
    this.getSDK = function(type, language) {
        var url = defaults.codegen[type].replace("{language}", language);
        return Storage.load("yaml").then(function(yaml) {
            YAML.load(yaml, function(error, spec) {
                $http.post(url, {
                    spec: spec
                }).then(redirect)
            })
        })
    };

    function redirect(resp) {
        if (angular.isObject(resp.data) && resp.data.link) {
            window.location = resp.data.link
        }
    }
}]);
"use strict";
SwaggerEditor.service("FocusedPath", ["ASTManager", "Editor", function FocusedPath(ASTManager, Editor) {
    this.isInFocus = function(path) {
        var focusedLine = Editor.lineInFocus();
        var focusedPath = ASTManager.pathForPosition(focusedLine);
        return Array.isArray(focusedPath) && _.isEqual(path, focusedPath.slice(0, path.length))
    }
}]);
"use strict";
SwaggerEditor.service("Storage", ["LocalStorage", "Backend", "defaults", function Storage(LocalStorage, Backend, defaults) {
    if (defaults.useBackendForStorage) {
        return Backend
    }
    return LocalStorage
}]);
"use strict";
SwaggerEditor.service("LocalStorage", ["$localStorage", "$rootScope", function LocalStorage($localStorage, $rootScope) {
    var storageKey = "SwaggerEditorCache";
    var changeListeners = {};
    $localStorage[storageKey] = $localStorage[storageKey] || {};

    function save(key, value) {
        if (value === null) {
            return
        }
        if (Array.isArray(changeListeners[key])) {
            changeListeners[key].forEach(function(fn) {
                fn(value)
            })
        }
        _.debounce(function() {
            window.requestAnimationFrame(function() {
                $localStorage[storageKey][key] = value
            });
            if (key === "yaml") {
                $rootScope.progressStatus = "success-saved"
            }
        }, 100)()
    }

    function load(key) {
        return new Promise(function(resolve) {
            if (!key) {
                resolve($localStorage[storageKey])
            } else {
                resolve($localStorage[storageKey][key])
            }
        })
    }

    function addChangeListener(key, fn) {
        if (angular.isFunction(fn)) {
            if (!changeListeners[key]) {
                changeListeners[key] = []
            }
            changeListeners[key].push(fn)
        }
    }
    this.save = save;
    this.reset = $localStorage.$reset;
    this.load = load;
    this.addChangeListener = addChangeListener
}]);
"use strict";
SwaggerEditor.service("Backend", ["$http", "$q", "defaults", "$rootScope", "Builder", "ExternalHooks", "YAML", function Backend($http, $q, defaults, $rootScope, Builder, ExternalHooks, YAML) {
    var changeListeners = {};
    var absoluteRegex = /^(\/|http(s)?\:\/\/)/;
    var buffer = {};
    var throttleTimeout = defaults.backendThrottle || 200;
    var commit = _.throttle(commitNow, throttleTimeout, {
        leading: false,
        trailing: true
    });
    var backendEndpoint = defaults.backendEndpoint;
    if (!absoluteRegex.test(backendEndpoint)) {
        var pathname = _.endsWith(location.pathname, "/") ? location.pathname : location.pathname + "/";
        backendEndpoint = pathname + defaults.backendEndpoint;
        backendEndpoint = backendEndpoint.replace("//", "/")
    }

    function commitNow(data) {
        var result = Builder.buildDocs(data, {
            resolve: true
        });
        save("progress", "progress-saving");
        var httpConfig = {
            headers: {
                "content-type": defaults.useYamlBackend ? "application/yaml; charset=utf-8" : "application/json; charset=utf-8"
            }
        };
        if (!result.error) {
            $http.put(backendEndpoint, data, httpConfig).then(function success() {
                ExternalHooks.trigger("put-success", [].slice.call(arguments));
                $rootScope.progressStatus = "success-saved"
            }, function failure() {
                ExternalHooks.trigger("put-failure", [].slice.call(arguments));
                $rootScope.progressStatus = "error-connection"
            })
        }
    }

    function save(key, value) {
        buffer[key] = value;
        if (Array.isArray(changeListeners[key])) {
            changeListeners[key].forEach(function(fn) {
                fn(value)
            })
        }
        if (key === "yaml" && value) {
            if (defaults.useYamlBackend) {
                commit(value)
            } else {
                YAML.load(value, function(err, json) {
                    if (!err) {
                        commit(json)
                    }
                })
            }
        }
    }

    function load(key) {
        if (key !== "yaml") {
            return new Promise(function(resolve, reject) {
                if (!key) {
                    reject()
                } else {
                    resolve(buffer[key])
                }
            })
        }
        var httpConfig = {
            headers: {
                accept: defaults.useYamlBackend ? "application/yaml; charset=utf-8" : "application/json; charset=utf-8"
            }
        };
        return $http.get(backendEndpoint, httpConfig).then(function(res) {
            if (defaults.useYamlBackend) {
                buffer.yaml = res.data;
                return buffer.yaml
            }
            return res.data
        })
    }

    function addChangeListener(key, fn) {
        if (angular.isFunction(fn)) {
            if (!changeListeners[key]) {
                changeListeners[key] = []
            }
            changeListeners[key].push(fn)
        }
    }

    function noop() {}
    this.save = save;
    this.reset = noop;
    this.load = load;
    this.addChangeListener = addChangeListener
}]);
"use strict";
SwaggerEditor.service("KeywordMap", ["defaults", function KeywordMap(defaults) {
    function JSONSchema() {
        _.extend(this, {
            title: String,
            type: String,
            format: String,
            default: this,
            description: String,
            enum: [String],
            minimum: String,
            maximum: String,
            exclusiveMinimum: String,
            exclusiveMaximum: String,
            multipleOf: String,
            maxLength: String,
            minLength: String,
            pattern: String,
            not: String,
            $ref: String,
            definitions: {
                ".": this
            },
            items: [this],
            minItems: String,
            maxItems: String,
            uniqueItems: String,
            additionalItems: [this],
            maxProperties: String,
            minProperties: String,
            required: String,
            additionalProperties: String,
            allOf: [this],
            properties: {
                ".": this
            }
        })
    }
    var jsonSchema = new JSONSchema;
    var schemes = ["http", "https", "ws", "wss"];
    var externalDocs = {
        description: String,
        url: String
    };
    var mimeTypes = ["text/plain", "text/html", "text/xml", "text/csv", "application/json", "application/octet-stream", "application/xml", "application/vnd.", "application/pdf", "audio/", "image/jpeg", "image/gif", "image/png", "multipart/form-data", "video/avi", "video/mpeg", "video/ogg", "video/mp4"];
    var header = {
        name: String,
        description: String
    };
    var parameter = {
        name: String,
        in : ["body", "formData", "header", "path", "query"],
        description: String,
        required: ["true", "false"],
        type: ["string", "number", "boolean", "integer", "array"],
        format: String,
        schema: jsonSchema
    };
    var security = {
        ".": String
    };
    var response = {
        description: String,
        schema: jsonSchema,
        headers: {
            ".": header
        },
        examples: mimeTypes
    };
    var operation = {
        summary: String,
        description: String,
        schemes: {
            ".": schemes
        },
        externalDocs: externalDocs,
        operationId: String,
        produces: {
            ".": mimeTypes
        },
        consumes: {
            ".": mimeTypes
        },
        deprecated: Boolean,
        security: security,
        parameters: [parameter],
        responses: {
            ".": response
        },
        tags: [String]
    };
    var securityDefinition = {
        type: ["oauth2", "apiKey", "basic"],
        name: String,
        flow: ["application", "implicit", "accessCode"],
        scopes: String,
        tokenUrl: String,
        authorizationUrl: String,
        description: String
    };
    var map = {
        swagger: ['"2.0"'],
        info: {
            version: ["1.0.0", "0.0.0", "0.0.1", "something-we-all-get"],
            title: String,
            description: String,
            termsOfService: String,
            contact: {
                name: String,
                url: String,
                email: String
            },
            license: {
                name: String,
                url: String
            }
        },
        host: String,
        basePath: String,
        schemes: [schemes],
        produces: [mimeTypes],
        consumes: [mimeTypes],
        paths: {
            "^/.?": {
                parameters: [parameter],
                "get|put|post|delete|options|head|patch": operation
            }
        },
        definitions: {
            ".": jsonSchema
        },
        parameters: [parameter],
        responses: {
            "[2-6][0-9][0-9]": response
        },
        security: {
            ".": {
                ".": String
            }
        },
        securityDefinitions: {
            ".": securityDefinition
        },
        tags: [{
            name: String,
            description: String
        }],
        externalDocs: {
            ".": externalDocs
        }
    };
    this.get = function() {
        var extension = angular.isObject(defaults.autocompleteExtension) ? defaults.autocompleteExtension : {};
        return _.extend(map, extension)
    }
}]);
"use strict";
SwaggerEditor.service("Preferences", ["$localStorage", "defaults", function Preferences($localStorage, defaults) {
    var changeListeners = [];
    var defaultPreferences = {
        liveRender: true,
        autoComplete: true,
        keyPressDebounceTime: defaults.keyPressDebounceTime
    };
    var preferences = _.extend(defaultPreferences, $localStorage.preferences);

    function save() {
        $localStorage.preferences = preferences
    }
    this.get = function(key) {
        return preferences[key]
    };
    this.set = function(key, value) {
        if (value === undefined) {
            throw new Error("value was undefined")
        }
        preferences[key] = value;
        save();
        changeListeners.forEach(function(fn) {
            fn(key, value)
        })
    };
    this.reset = function() {
        preferences = defaultPreferences;
        save()
    };
    this.getAll = function() {
        return preferences
    };
    this.onChange = function(fn) {
        if (angular.isFunction(fn)) {
            changeListeners.push(fn)
        }
    }
}]);
"use strict";
SwaggerEditor.service("AuthManager", ["$sessionStorage", function AuthManager($sessionStorage) {
    $sessionStorage.$default({
        securities: {}
    });
    this.basicAuth = function(securityName, security, options) {
        if (securityName === "$$hashKey") {
            return
        }
        if (!_.isObject(options)) {
            throw new TypeError("Can not authenticate with options")
        }
        options.username = options.username || "";
        options.password = options.password || "";
        options.isAuthenticated = true;
        options.base64 = window.btoa(options.username + ":" + options.password);
        options.securityName = securityName;
        $sessionStorage.securities[securityName] = {
            type: "basic",
            security: security,
            options: options
        }
    };
    this.oAuth2 = function(securityName, security, options) {
        if (securityName === "$$hashKey") {
            return
        }
        options.isAuthenticated = true;
        $sessionStorage.securities[securityName] = {
            type: "oAuth2",
            security: security,
            options: options
        }
    };
    this.apiKey = function(securityName, security, options) {
        if (securityName === "$$hashKey") {
            return
        }
        options.isAuthenticated = true;
        $sessionStorage.securities[securityName] = {
            type: "apiKey",
            security: security,
            options: options
        }
    };
    this.getAuth = function(securityName) {
        return $sessionStorage.securities[securityName]
    };
    this.securityIsAuthenticated = function(securityName) {
        var auth = $sessionStorage.securities[securityName];
        return auth && auth.options && auth.options.isAuthenticated
    }
}]);
"use strict";
SwaggerEditor.service("Analytics", ["defaults", function Analytics(defaults) {
    var isDisabled = false;
    var initialized = false;
    var id = _.defaults(defaults, {
        analytics: {
            google: {
                id: null
            }
        }
    }).analytics.google.id;
    this.initialize = function() {
        var ga = window.ga;
        if (!window.ga || !id) {
            isDisabled = true;
            return
        }
        if (initialized) {
            return
        }
        ga("require", "linker");
        ga("linker:autoLink", ["swagger.io"]);
        ga("create", id, "auto", {
            allowLinker: true
        });
        ga("send", "pageview");
        initialized = true
    };
    this.sendEvent = function() {
        if (isDisabled) {
            return
        }
        if (!arguments.length) {
            throw new Error("sendEvent was called with no arguments")
        }
        Array.prototype.unshift.call(arguments, "event");
        Array.prototype.unshift.call(arguments, "send");
        window.ga.apply(window.ga, arguments)
    }
}]);
"use strict";
SwaggerEditor.service("ExternalHooks", function ExternalHooks() {
    var hooks = {
        "code-change": [],
        "put-success": [],
        "put-failure": []
    };
    SwaggerEditor.on = function(eventName, callback) {
        if (!angular.isString(eventName)) {
            throw new TypeError("eventName must be string")
        }
        if (!angular.isFunction(callback)) {
            throw new TypeError("callback must be a function")
        }
        if (!hooks[eventName]) {
            throw new Error(eventName + " is not a valid event name")
        }
        var isRegisteredCallback = hooks[eventName].some(function(cb) {
            return cb === callback
        });
        if (!isRegisteredCallback) {
            hooks[eventName].push(callback)
        }
    };
    this.trigger = function(eventName, args) {
        if (!angular.isString(eventName)) {
            throw new TypeError("eventName must be string")
        }
        if (!angular.isArray(args)) {
            throw new TypeError("args must be an array")
        }
        if (!hooks[eventName]) {
            throw new Error(eventName + " is not a valid event name")
        }
        hooks[eventName].forEach(function(callback) {
            callback.apply(null, args)
        })
    }
});
"use strict";
SwaggerEditor.service("SwayWorker", function SwayWorker() {
    var worker = new Worker("bower_components/sway-worker/index.js");
    var queue = [];
    var currentTask = null;
    worker.onmessage = onMessage;
    worker.onerror = onError;

    function schedule(arg, cb) {
        queue.push({
            arg: arg,
            cb: cb
        });
        enqueue()
    }

    function enqueue() {
        if (!queue.length) {
            return
        }
        if (currentTask) {
            return
        }
        currentTask = queue.shift();
        worker.postMessage(currentTask.arg)
    }

    function onMessage(message) {
        if (currentTask) {
            currentTask.cb(message.data)
        }
        currentTask = null;
        enqueue()
    }

    function onError(message) {
        if (currentTask) {
            currentTask.cb(message.data)
        }
        currentTask = null;
        enqueue()
    }
    this.run = schedule
});
"use strict";
var compose = _.memoize(yaml.compose);
SwaggerEditor.service("YAML", function YAML() {
    var worker = new YAMLWorker;
    this.load = worker.load.bind(worker);
    this.dump = worker.dump.bind(worker);
    this.compose = function(string, cb) {
        try {
            cb(null, compose(string))
        } catch (error) {
            cb(error)
        }
    }
});
"use strict";
SwaggerEditor.service("FoldStateManager", ["ASTManager", "Editor", "$rootScope", function FoldStateManager(ASTManager, Editor, $rootScope) {
    Editor.onFoldChanged(foldChangedInEditor);
    this.foldEditor = foldEditor;

    function foldEditor(path, fold) {
        ASTManager.positionRangeForPath($rootScope.editorValue, path).then(function(range) {
            if (fold) {
                Editor.addFold(range.start.line - 1, range.end.line - 1)
            } else {
                Editor.removeFold(range.start.line - 1, range.end.line - 1)
            }
        })
    }

    function foldChangedInEditor(event) {
        var position = {
            line: event.data.start.row + 1,
            column: event.data.start.column + 1
        };
        ASTManager.pathForPosition($rootScope.editorValue, position).then(function(path) {
            var $folded = event.action === "add";
            var current = $rootScope.specs;
            while (path.length && _.isObject(current)) {
                current = current[path.shift()]
            }
            if (_.isObject(current)) {
                current.$folded = !!$folded;
                $rootScope.$apply()
            }
        })
    }
}]);
"use strict";
SwaggerEditor.config(["$compileProvider", "$stateProvider", "$urlRouterProvider", "$logProvider", function Router($compileProvider, $stateProvider, $urlRouterProvider, $logProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider.state("home", {
        url: "/?import&tags&no-proxy",
        views: {
            "": {
                templateUrl: "views/main.html",
                controller: "MainCtrl"
            },
            "header@home": {
                templateUrl: "views/header/header.html",
                controller: "HeaderCtrl"
            },
            "editor@home": {
                templateUrl: "views/editor/editor.html",
                controller: "EditorCtrl"
            },
            "preview@home": {
                templateUrl: "views/preview/preview.html",
                controller: "PreviewCtrl"
            }
        }
    });
    $compileProvider.aHrefSanitizationWhitelist(".");
    var isProduction = !/localhost/.test(window.location.host);
    $compileProvider.debugInfoEnabled(!isProduction);
    $logProvider.debugEnabled(!isProduction)
}]);
(function($) {
    $.fn.scrollIntoView = function(duration, easing, complete) {
        var opts = $.extend({}, $.fn.scrollIntoView.defaults);
        if ($.type(duration) == "object") {
            $.extend(opts, duration)
        } else if ($.type(duration) == "number") {
            $.extend(opts, {
                duration: duration,
                easing: easing,
                complete: complete
            })
        } else if (duration == false) {
            opts.smooth = false
        }
        var elY = Infinity,
            elH = 0;
        if (this.size() == 1)(elY = this.get(0).offsetTop) == null || (elH = elY + this.get(0).offsetHeight);
        else this.each(function(i, el) {
            el.offsetTop < elY ? elY = el.offsetTop : el.offsetTop + el.offsetHeight > elH ? elH = el.offsetTop + el.offsetHeight : null
        });
        elH -= elY;
        var pEl = this.commonAncestor().get(0);
        var wH = $(window).height();
        while (pEl) {
            var pY = pEl.scrollTop,
                pH = pEl.clientHeight;
            if (pH > wH) pH = wH;
            if (pH == 0 && pEl.tagName == "BODY") pH = wH;
            if (pEl.scrollTop != ((pEl.scrollTop += 1) == null || pEl.scrollTop) && (pEl.scrollTop -= 1) != null || pEl.scrollTop != ((pEl.scrollTop -= 1) == null || pEl.scrollTop) && (pEl.scrollTop += 1) != null) {
                if (elY <= pY) scrollTo(pEl, elY);
                else if (elY + elH > pY + pH) scrollTo(pEl, elY + elH - pH);
                else scrollTo(pEl, undefined);
                return
            }
            pEl = pEl.parentNode
        }

        function scrollTo(el, scrollTo) {
            if (scrollTo === undefined) {
                if ($.isFunction(opts.complete)) opts.complete.call(el)
            } else if (opts.smooth) {
                $(el).stop().animate({
                    scrollTop: scrollTo
                }, opts)
            } else {
                el.scrollTop = scrollTo;
                if ($.isFunction(opts.complete)) opts.complete.call(el)
            }
        }
        return this
    };
    $.fn.scrollIntoView.defaults = {
        smooth: true,
        duration: null,
        easing: $.easing && $.easing.easeOutExpo ? "easeOutExpo" : null,
        complete: $.noop(),
        step: null,
        specialEasing: {}
    };
    $.fn.isOutOfView = function(completely) {
        var outOfView = true;
        this.each(function() {
            var pEl = this.parentNode,
                pY = pEl.scrollTop,
                pH = pEl.clientHeight,
                elY = this.offsetTop,
                elH = this.offsetHeight;
            if (completely ? elY > pY + pH : elY + elH > pY + pH) {} else if (completely ? elY + elH < pY : elY < pY) {} else outOfView = false
        });
        return outOfView
    };
    $.fn.commonAncestor = function() {
        var parents = [];
        var minlen = Infinity;
        $(this).each(function() {
            var curparents = $(this).parents();
            parents.push(curparents);
            minlen = Math.min(minlen, curparents.length)
        });
        for (var i = 0; i < parents.length; i++) {
            parents[i] = parents[i].slice(parents[i].length - minlen)
        }
        for (var i = 0; i < parents[0].length; i++) {
            var equal = true;
            for (var j in parents) {
                if (parents[j][i] != parents[0][i]) {
                    equal = false;
                    break
                }
            }
            if (equal) return $(parents[0][i])
        }
        return $([])
    }
})(jQuery);