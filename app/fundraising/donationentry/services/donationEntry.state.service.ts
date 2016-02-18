//This class wraps our generic state service and allows us to keep state switching
// logic / code out fo the controller
module donationEntry.services {
    import StateService = app.core.routing.StateService;
    'use strict';
  
    export interface IDonationEntryStateService {
        selectBatch(batchId: string):void;
}

    export class DonationEntryStateService implements IDonationEntryStateService {
        public static id: string = AngularGlobals.donationEntryServices + ".DonationEntryStateService";

        constructor(private state: app.core.routing.IStateService) {
        }

        selectBatch(batchId: string): void {
            // if there is no batch id, return to our default state.
            if (batchId !== "") {
                this.state.go("donationEntry.edit", { batchId: batchId });
            }
            else
                this.state.go("donationEntry");
        }

        public static injection(): any[] {
            return [StateService.id,
                (rss) => new DonationEntryStateService(rss)];
        }
    }


    // register service with main module
    angular
        .module(AngularGlobals.donationEntry)
        .factory(DonationEntryStateService.id, DonationEntryStateService.injection());
} 