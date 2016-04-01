"use strict";
/*
 First we will register our angular new angular module and we will inject a dependency to our core
 API using our static globals file, this is to enable us to use a helper service which will
 handle authentication for us.
 */
angular.module("iPartConfiguration", ["app.core"]);

//Register our new module with the already bootstrapped page
angular.module("app").requires.push("iPartConfiguration");

//Register a controller and inject our settings service plus $attrs
angular.module("iPartConfiguration")
    .controller('CfgController', [app.core.Services.IPartSettingsService.id, "$attrs", function(settingsService, $attrs) {
        var vm = this;
        vm.settings = [];
        //Grab the values from our custom attributes
        vm.contentKey = $attrs.asiContentkey;
        vm.contentItemKey = $attrs.asiContentitemkey;
        
        // call our injected service with our contentkey and contentitemkey,
        // we then return the response so we can bind it to the page
        this.getSettings = function(){
            settingsService.getSettings(this.contentKey, this.contentItemKey).then(
                function(response) {
                    vm.settings = response;
            });
        };
}]);