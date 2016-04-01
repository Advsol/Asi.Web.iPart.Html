((): void=> {
    "use strict";

    angular
        .module(addressEdit.AngularGlobals.addressEdit)
        .config(config);

    config.$inject = [app.core.AngularGlobals.$STATEPROVIDER, app.core.AngularGlobals.appCoreConstants];

    function config($stateProvider: ng.ui.IStateProvider, constants: app.core.IConstants): void {

        //our base URL is injected via a custom provider.
        var baseUrl = constants.baseUrl;

        // TODO - Should we inject the default/parent route (in this case "addressEdit") so it is always unique.
        // This would allow multiple versions of this iPart on the page at the same time.
        $stateProvider
            .state("listParties", {  
                url:  "*path",           
                templateUrl: baseUrl + "Areas/innov/party/addressEdit/templates/IQAResults.html",                
                controller: addressEdit.PartyController.id,
                controllerAs: "vm",
                resolve: { 
                    partyid: ['$stateParams', ($stateParams: addressEdit.Routes.IAddressEditStateParams) => $stateParams.partyId],
                    parties: resolveBatch
                } 
            })
            //.state("listParties.edit", {
            .state("editParties", {
                url: ":partyId",
                // loaded into ui-view of parent's template
                templateUrl: baseUrl + "Areas/innov/party/addressEdit/templates/EditParty.html",
                controller: addressEdit.EditController.id,
                controllerAs: "vm",
                resolve: {
                    partyId: ['$stateParams', ($stateParams: addressEdit.Routes.IAddressEditStateParams) => $stateParams.partyId]
                } 
                
            })
        ;
    }

    //Onload data to pass into the controller CTOR
    function resolveBatch(
        $stateParams: addressEdit.Routes.IAddressEditStateParams,
        service: addressEdit.services.IAddressEditService) {

        //Get our data and when the data is returned, if it's not null set the selected
        //batch using the url param (if there is one) and return the promise result data
        return service.getIQA(null, null)
            .then((response: any): any => {
                if (response) {
                    //response.selectedBatch = $stateParams.batchId;
                    return response;
                }
                return null;
            });
    }
    resolveBatch.$inject = [app.core.AngularGlobals.$STATEPARAMS, "addressEdit.services.AddressEditService"];


})();
