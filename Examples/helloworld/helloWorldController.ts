module helloWorld {
    "use strict";

    export interface IHelloWorld {
        hello(): string;
    }

    export class HelloWorldController  {
        public static id: string = "helloWorldController";

        static $inject = [];
        constructor() {
        }

        hello(): string {
            return "Is it me you're looking for?";
        }
    }
    
    // register the controller with app
    angular.module("helloWorld")
        .controller(HelloWorldController.id, HelloWorldController);

}