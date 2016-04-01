
module JsonDemo {
    "use strict";

    export class MyController {
        public static id: string = "MyController";
        private settings: IJsonDemoSettings;
        public contentKey: string;
        public contentItemKey: string;

        static $inject = [ExampleService.id, "$attrs"];
        constructor(private exampleService: IExampleService, $attrs) {
            //Grab our ContentKey and ContentItemKey from the custom attributes
            this.contentKey = $attrs.asiContentkey;
            this.contentItemKey = $attrs.asiContentitemkey;
            //Get settings for this iPart
            this.getSettings();
        }



        // Get settings via promise and update our scope with the data
        getSettings(): void {
            this.exampleService.getSettings(this.contentKey, this.contentItemKey).then(
                (response: IMvvmContentItem2) => {
                    this.settings = (<IJsonDemoSettings>response.Settings);
                });

        }
    }
    
    // register the controller with app
    angular.module("jsonDemo")
        .controller(MyController.id, MyController);
}
