module app.core.Services {
    'use strict';

    export interface IIPartSettingsService {
        getSettings(contentKey: string, contentItemKey: string): ng.IHttpPromise<core.models.IMvvmContentItem>;
    }

// ReSharper disable once InconsistentNaming
    export class IPartSettingsService {
        public static id: string = AngularGlobals.appCore + ".IPartSettingsService";
        baseUrl: string;
        authToken: string;

        constructor(
            private $http: ng.IHttpService,
            clientContext: core.IConstants) {

            this.baseUrl = clientContext.baseUrl;
            this.authToken = clientContext.authToken;
        }

        //Get the published iPart settings for the given contentItem (iPart) on the content.
        public getSettings(contentKey: string, contentItemKey: string): ng.IHttpPromiseCallbackArg<core.models.IMvvmContentItem> {
            return this.$http.get(this.baseUrl + "api/ContentTypeSettings",
            {
                params: { contentKey: contentKey, contentItemKey: contentItemKey },
                headers: { 'RequestVerificationToken': this.authToken }
                }).then((response: ng.IHttpPromiseCallbackArg<core.models.IMvvmContentItem>): core.models.IMvvmContentItem => {
                    if (response.data)
                        return response.data;
                    return response.data;
            });
        }

        public static injection(): any[] {
            return [core.AngularGlobals.$HTTP, core.AngularGlobals.appCoreConstants,
                (h, c) => new IPartSettingsService(h, c)];
        }

    }

    // register service with main module
    angular
        .module(AngularGlobals.appCore)
        .factory(IPartSettingsService.id, IPartSettingsService.injection());
} 