module donationEntry.services {
    'use strict';
  
  
    export interface IDonationEntryService {
        getOpenBatches(): ng.IPromise<IBatch>;
        addNewBatch(batch: IBatch): ng.IPromise<string>; // TODO currently only returns the batch id, but should return more data
        editDonations(id: string): any;
}

    export class DonationEntryService implements IDonationEntryService {
        public static id: string = AngularGlobals.donationEntryServices + ".DonationEntryService";
        baseUrl: string;

        constructor(
            private $http: ng.IHttpService,
            clientContext: app.core.IConstants) {
            
            this.baseUrl = clientContext.baseUrl;
        }

        getOpenBatches(): ng.IPromise<IBatch> {
            // TODO make the api end point dynamic by injecting it into the factory from a well known place (client context probably)
            return this.$http.get(this.baseUrl + "ng/batch/EditBatchNg")
                .then((response: ng.IHttpPromiseCallbackArg<IBatch>): IBatch => {
                    if (response.data)
                        return response.data;
                    return null;
                });
        }

        //TODO - for review day i got this to jsut return a string, but we need to figure out a return result data pattern
        // i.e. a default way to include our infor/error/validation messages as per SOA
        // and create a typescript model to map it to so we do all our error hanndling/mapping etc here and just return standard info
        //which can then use boiler plate code to determine what we do in the consumer
        addNewBatch(batch: IBatch): ng.IPromise<string> {
            return this.$http.post(this.baseUrl + "ng/batch/AddBatchNg", batch).
                success((data, status, headers, config) => {
                    return data;
                }).error((data, status, headers, config) => {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    //alert(data.validateResults.validationResults.errors[0].message);
                    return "";
                });
        }
 

        editDonations(id: string): ng.IPromise<IDonationData> {
            return this.$http.get(this.baseUrl + "ng/Donations/EditDonationsNg",
                { params: { batchId: id } })
                .then((response: ng.IHttpPromiseCallbackArg<IDonationData>): IDonationData => {
                    if (response.data)
                        return response.data;
                    return null;
            });
        }

        public static injection(): any[] {
            return [app.core.AngularGlobals.$HTTP, app.core.AngularGlobals.appCoreConstants,
                (h,c) => new DonationEntryService(h,c)];
        }
    }

    angular
        .module(AngularGlobals.donationEntryServices)
        .factory(DonationEntryService.id, DonationEntryService.injection());
} 
