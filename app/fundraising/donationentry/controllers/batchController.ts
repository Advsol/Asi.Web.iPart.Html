///<reference path="../services/donationEntry.service.ts" />
///<reference path="../services/donationEntry.state.service.ts" />

module donationEntry {
    "use strict";

    export interface IBatchScope {
        openBatches: IBatch;
        addNewBatch(): void;

        // method just be used to set up our child state,  donation editing
        // according to the currently selected batch  (vm.openBatches.selectedBatch)
        selectBatch() :void; 

    }

    export class BatchController implements IBatchScope {
        public static id: string = AngularGlobals.donationEntry + ".BatchController";  
        stateService: services.IDonationEntryStateService;
        openBatches: IBatch;
        // inject donation
        static $inject = [
            AngularGlobals.batches, services.DonationEntryService.id, services.DonationEntryStateService.id
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

        //Start a new batch
        addNewBatch(): void {
            this.service.addNewBatch(this.openBatches)
                .then((response: ng.IHttpPromiseCallbackArg<string>): void => {
                    //Select the batch and switch state
                    this.openBatches.selectedBatch = response.data;
                    this.stateService.selectBatch(response.data);
            });


        }
    }
    
    // register the controller with app
    angular.module(AngularGlobals.donationEntry)
        .controller(BatchController.id, BatchController);

}