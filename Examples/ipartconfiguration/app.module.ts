((): void=> {
    "use strict";
    // declare helloworld module and pass in  angular dependencies
    angular
        .module("iPartConfiguration", [app.core.AngularGlobals.appCore]);

    angular.module("app").requires.push("iPartConfiguration");
})(); 