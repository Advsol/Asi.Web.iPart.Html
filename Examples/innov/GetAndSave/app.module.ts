((): void=> {
    "use strict";
    // declare helloworld module and pass in  angular dependencies
    angular
        .module("SaveParty", [app.core.AngularGlobals.appCore,"ui.bootstrap.alert"]);

    angular.module("app").requires.push("SaveParty");
})(); 