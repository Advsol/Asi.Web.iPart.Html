module iPartSettings {
    "use strict";

    //This is just an example of how to do this, we shouldnt be using a watch inside a controller.
    // ASI plans to write a directive to handle this, i.e. we createa "settingsWatch" directive, you put
    // all of your controls within that directive and they will be automatically sync'd with  the JsonSettings control
    export class ConfigController {
        public static id: string = "ConfigController";
        //scope: any;
        serializedSettings: any;

        static $inject = ["$scope"];
        constructor(private $scope) {
            // Grab our JSON serialized settings
            var settingsField = angular.element(document.querySelector("#JsonSettings"));
            //De-serialize our settings
            if (settingsField.val() !== "") {
                this.$scope.serializedSettings = JSON.parse(settingsField.val());
            }

            this.$scope.$watch('serializedSettings',() => {
                settingsField.val(JSON.stringify(this.$scope.serializedSettings));
            },true);
        }


    }

// register the controller with app
angular.module("iPartConfiguration")
    .controller(ConfigController.id, ConfigController);
}
