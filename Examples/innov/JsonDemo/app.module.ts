((): void=> {
    "use strict";
    // declare helloworld module and pass in  angular dependencies
    angular
        .module("jsonDemo", [app.core.AngularGlobals.appCore]);

    angular.module("app").requires.push("jsonDemo");
})(); 