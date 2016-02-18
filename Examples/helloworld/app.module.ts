((): void=> {
    "use strict";
    // declare core module and pass in core angular dependencies
    angular
        .module("helloWorld", []);

    angular.module("app").requires.push("helloWorld");
})(); 