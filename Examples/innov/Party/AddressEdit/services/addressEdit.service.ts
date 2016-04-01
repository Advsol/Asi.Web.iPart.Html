module addressEdit.services {
    'use strict';
  
  
    export interface IAddressEditService {
        getIQA(offset: number, limit: number): ng.IPromise<models.IPagedResult>;
        getParty(partyId: string): ng.IPromise<models.IPartyData>;
        saveParty(partyId: string, party: models.IPartyData): ng.IPromise<models.IPartyData>;
    }


    export class AddressEditService implements IAddressEditService {
        public static id: string = AngularGlobals.addressEditServices + ".AddressEditService";
        baseUrl: string;

        constructor(
            private $http: ng.IHttpService,
            clientContext: app.core.IConstants) {
            
            this.baseUrl = clientContext.baseUrl;
        }

        getIQA(offset: number, limit: number): ng.IPromise<models.IPagedResult> {
            // TODO extract this to common API helper
            var parameters = "";
            if (offset != null) {
                parameters += "&offset=" + offset;
            }
            if (limit != null) {
                parameters += "&limit=" + limit;
            }
            
            return this.$http.get(this.baseUrl + "/api/IQA?QueryName=$/Membership/DefaultSystem/Queries/All%20Members" + parameters)
                .then((response: ng.IHttpPromiseCallbackArg<models.IPagedResult>): any => {
                    return response;                    
                });
        }
        
        getParty(partyId: string): ng.IPromise<models.IPartyData> {
            return this.$http.get(this.baseUrl + "/api/party/" + partyId)
                .then((response: ng.IHttpPromiseCallbackArg<models.IPartyData>): any => {
                    return response;
                });
        }

        saveParty(partyId: string, party: models.IPartyData): ng.IPromise<models.IPartyData> {
            return this.$http.put(this.baseUrl + "/api/party/" + partyId, party)
                .then((response: ng.IHttpPromiseCallbackArg<models.IPartyData>): any => {
                    return response;
                });
        }

        public static injection(): any[] {
            return [app.core.AngularGlobals.$HTTP, app.core.AngularGlobals.appCoreConstants,
                (h, c) => new AddressEditService(h,c)];
        }
    }

    angular
        .module(AngularGlobals.addressEdit)
        .factory(AddressEditService.id, AddressEditService.injection());
} 
