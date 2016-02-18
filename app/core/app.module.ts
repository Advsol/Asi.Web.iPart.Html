((): void=> {
    "use strict";
    // declare core module and pass in core angular dependencies
    angular
        .module("app", [
        "app.core"
        ])
        .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.defaults.transformResponse.push(function (responseData) {
            convertDateStringsToDates(responseData);
            return responseData;
        });
    }]);

    // Bootstrap our application to the entire document, we manually boostrap so
    // our other child .module.ts files can add themselves as required modules to "app"
    // as and when they load.
    angular.element(document).ready(() => {
        angular.bootstrap(document, ['app']);
    });

    //TODO - PMB - Find a better place for this function to live, ti just makes this file really messy
    //http://aboutcode.net/2013/07/27/json-date-parsing-angularjs.html
    var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

    function convertDateStringsToDates(input) {
        // Ignore things that aren't objects.
        if (typeof input !== "object") return input;

        for (var key in input) {
            if (!input.hasOwnProperty(key)) continue;

            var value = input[key];
            var match;
            // Check for string properties which look like dates.
            if (typeof value === "string" && (match = value.match(regexIso8601))) {
                var milliseconds = Date.parse(match[0]);
                if (!isNaN(milliseconds)) {
                    input[key] = new Date(milliseconds);
                }
            } else if (typeof value === "object") {
                // Recurse into object
                convertDateStringsToDates(value);
            }
        }
    }

})(); 