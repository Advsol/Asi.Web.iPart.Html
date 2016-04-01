"use strict";
module SaveParty {
    import Core = app.core;
    import AngularGlobals = app.core.AngularGlobals;

    export class MyController  {
        public static id: string = "MyController";
        baseUrl: string;
        authToken: string;
        partyId: string = "d8a0d670-4958-4efe-a856-03bf034b2832";
        party: any;
        successAlert: string;

        static $inject = [Core.AngularGlobals.$HTTP, Core.AngularGlobals.appCoreConstants];
        constructor(
            private $http: ng.IHttpService,
            clientContext: Core.IConstants) {

            this.baseUrl = clientContext.baseUrl;
            this.authToken = clientContext.authToken;
            this.getParty();
        }
        
        // Get Party via promise and update our scope with the data
        getParty(): void {
            this.$http.get(this.baseUrl + "api/Party/" + this.partyId,
                {
                    headers: { 'RequestVerificationToken': this.authToken }
                }).then((response: any): any => {
                    this.party =  response.data;
                });
        }

        // grab our party data from our form scope and update imis via REST
        saveParty(): void {
            this.successAlert = "";
            this.$http.put(this.baseUrl + "api/Party/" + this.partyId,
                this.party,
                {
                    headers: { 'RequestVerificationToken': this.authToken }
                }).then((response: any): any => {
                    this.successAlert = "Saved";
                    this.party = response.data;
                });
        }

        partyDataChanged(): void {
            this.successAlert = "";
        }
    }
    
    // register the controller with app
    angular.module("SaveParty")
        .controller(MyController.id, MyController);
}
