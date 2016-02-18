module iPartSettings {
    import MvvmContentItem = app.core.models.IMvvmContentItem;
    "use strict";

    export class MyController  {
        public static id: string = "MyController";
        private settings: MvvmContentItem;
        public contentKey: string;
        public contentItemKey: string;

        static $inject = [app.core.Services.IPartSettingsService.id, "$attrs"];
        constructor(private settingsService: app.core.Services.IIPartSettingsService, $attrs) {
            //Grab our ContentKey and ContentItemKey from the custom attributes
            this.contentKey = $attrs.asiContentkey;
            this.contentItemKey = $attrs.asiContentitemkey;
            //Get settings for this iPart
            this.getSettings();
        }

        // Get settings via promise and update our scope with the data
        getSettings(): void {
            this.settingsService.getSettings(this.contentKey, this.contentItemKey).then(
                (response: MvvmContentItem) => {
                    this.settings = response;
            });
        }
    }
    
    // register the controller with app
    angular.module("iPartConfiguration")
        .controller(MyController.id, MyController);
}
