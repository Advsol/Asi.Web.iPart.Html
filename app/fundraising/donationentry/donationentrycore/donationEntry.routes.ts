///<reference path="../controllers/batchController.ts" />
///<reference path="../controllers/donationEntryController.ts" />

((): void=> {
    "use strict";

    angular
        .module(donationEntry.AngularGlobals.donationEntry)
        .config(config);

    config.$inject = [app.core.AngularGlobals.$STATEPROVIDER, app.core.AngularGlobals.appCoreConstants];

    function config($stateProvider: ng.ui.IStateProvider, constants: app.core.IConstants): void {

        //our base URL is injected via a custom provider.
        var baseUrl = constants.baseUrl;

        //TODO - how would we handle multiple versions of the same iPart on the page?
        //should we inject the default/parent route (in this case "donationEntry") from
        // something the webpart ClientID? so it's always unique.
        $stateProvider
            .state("donationEntry", {  
                url:  "?batchId",           
                templateUrl: baseUrl + "Areas/ng/app/fundraising/donationEntry/templates/edit-batch.html",                
                controller: donationEntry.BatchController.id,
                controllerAs: "vm",
                resolve: { 
                     batchId: ['$stateParams', ($stateParams: donationEntry.Routes.IDonationEntryStateParams) => $stateParams.batchId],
                     batches: resolveBatch
                } 
            })
            .state('donationEntry.edit',{ 
            url: "/edit",  
                // loaded into ui-view of parent's template
                templateUrl: baseUrl + "Areas/ng/app/fundraising/donationEntry/templates/edit-batch.editDonations.html",
                controller: donationEntry.DonationEntryController.id,
                controllerAs: "vm",
                resolve: {
                    donations: resolveDonations
                } 
            })
        ;
    }

    //TODO - where should these routing functions which get the data really live?
    //They are kinda like some onload or page stuartup functions.
    //Onload data to pass into the controller CTOR
    function resolveBatch(
        $stateParams: donationEntry.Routes.IDonationEntryStateParams,
        service: donationEntry.services.IDonationEntryService) {

        //Get our data and when the data is return, if it's not null set the selected
        //batch using the url param (if there is one) and return the promise result data
        return service.getOpenBatches()
            .then((response: IBatch): IBatch => {
                if (response) {
                    response.selectedBatch = $stateParams.batchId;
                    return response;
                }
                return null;
            });
    }
    resolveBatch.$inject = [app.core.AngularGlobals.$STATEPARAMS,"donationEntry.services.DonationEntryService"];

    //ONload data to pass into the controller CTOR
    function resolveDonations(
        $stateParams: donationEntry.Routes.IDonationEntryStateParams,
        service: donationEntry.services.IDonationEntryService) {
        return service.editDonations($stateParams.batchId);
    }
    resolveDonations.$inject = [app.core.AngularGlobals.$STATEPARAMS, "donationEntry.services.DonationEntryService"];
    

})();
