///<reference path="core.angularGlobals.ts" />

module app.core {
    "use strict";

    export interface IConstants {
        baseUrl: string;
        authToken: string;
    }

    var data = angular.element(document.querySelector("#__ClientContext")).val();
    var context: IConstants = angular.fromJson(data);

    //Auth token is stored in the page in another field
    context.authToken = angular.element(document.querySelector("#__RequestVerificationToken")).val();

    angular.module(AngularGlobals.appCore)
        .constant(AngularGlobals.appCoreConstants, context);

}

