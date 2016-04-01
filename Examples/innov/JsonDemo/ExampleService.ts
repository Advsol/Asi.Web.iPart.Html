'use strict';
module JsonDemo {
    import Core = app.core;
    import AngularGlobals = app.core.AngularGlobals;

    export interface IExampleService {
        getSettings(contentKey: string, contentItemKey: string): ng.IHttpPromise<IMvvmContentItem2>;
    }

    // ReSharper disable once InconsistentNaming
    export class ExampleService {
        public static id: string = AngularGlobals.appCore + ".ExampleService";
        baseUrl: string;
        authToken: string;

        constructor(
            private $http: ng.IHttpService,
            clientContext: Core.IConstants) {

            this.baseUrl = clientContext.baseUrl;
            this.authToken = clientContext.authToken;
        }

        //Get the published iPart settings for the given contentItem (iPart) on the content.
        public getSettings(contentKey: string, contentItemKey: string): ng.IHttpPromiseCallbackArg<IMvvmContentItem2> {
            return this.$http.get(this.baseUrl + "api/ContentTypeSettings",
                {
                    params: { contentKey: contentKey, contentItemKey: contentItemKey },
                    headers: { 'RequestVerificationToken': this.authToken }
                }).then((response: ng.IHttpPromiseCallbackArg<IMvvmContentItem2>): IMvvmContentItem2 => {
                    if (response.data)
                        return response.data;
                    return response.data;
                });
        }

        public static injection(): any[] {
            return [Core.AngularGlobals.$HTTP, Core.AngularGlobals.appCoreConstants,
                (h, c) => new ExampleService(h, c)];
        }

    }

    // register service with main module
    angular
        .module("jsonDemo")
        .factory(ExampleService.id, ExampleService.injection());
} 