/
module addressEdit {
    "use strict";

    export interface IBatchScope {
        parties: any;

        // method just be used to set up our child state,  donation editing
        // according to the currently selected batch  (vm.openBatches.selectedBatch)
        selectBatch() :void; 

    }

    export class PartyController implements IBatchScope {
        public static id: string = AngularGlobals.addressEdit + ".BatchController";  
        stateService: services.IAddressEditStateService;
        parties: any;
        // inject donation
        static $inject = [
            AngularGlobals.parties, services.DonationEntryService.id, services.AddressEditStateService.id
        ];

        constructor(
            batches: IBatch,
            private service: services.IDonationEntryService,
            stateService: services.IDonationEntryStateService
            ) {

                this.stateService = stateService;
                var vm = this; 
                vm.openBatches = batches;
        }

        //Start editing the currently selected batch
        selectBatch(): void  {
            this.stateService.selectBatch(this.openBatches.selectedBatch);
        }

    }
    
    // register the controller with app
    angular.module(AngularGlobals.addressEdit)
        .controller(PartyController.id, PartyController);

}