
"use strict";
angular.module("iPartConfiguration", ["app.core"]);
//Register our new module with the already bootstrapped page
angular.module("app").requires.push("iPartConfiguration");

angular.module("iPartConfiguration")
    .controller("ConfigController", ["$scope", function($scope) {
        // Grab our JSON serialized settings from a hidden field
        var settingsField = angular.element(document.querySelector("#JsonSettings"));
        //De-serialize our JSON string of settings into serializedSettings
        if (settingsField.val() !== "") {
            $scope.serializedSettings = JSON.parse(settingsField.val());
        }
        //Add a watch to keep track of changes to the serializedSettings variable.
        // make sure we serialized updates to JSON and update our hidden field with the new JSON.
        $scope.$watch('serializedSettings', function () {
            settingsField.val(JSON.stringify($scope.serializedSettings));
        }, true);
    }]);