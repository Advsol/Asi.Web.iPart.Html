//This class wraps our generic state service and allows us to keep state switching
// logic / code out fo the controller
module addressEdit.services {
    import StateService = app.core.routing.StateService;
    'use strict';
  
    export interface IAddressEditStateService {
        selectParty(partyId: string):void;
}

    export class AddressEditStateService implements IAddressEditStateService {
        public static id: string = AngularGlobals.addressEditServices + ".DonationEntryStateService";

        constructor(private state: app.core.routing.IStateService) {
        }

        selectParty(partyId: string): void {
            // if there is no party id, return to our default state.
            if (partyId !== "") {
                this.state.go("addressEdit.edit", { partyId: partyId });
            }
            else
                this.state.go("addressEdit");
        }

        public static injection(): any[] {
            return [StateService.id,
                (rss) => new AddressEditStateService(rss)];
        }
    }


    // register service with main module
    angular
        .module(AngularGlobals.addressEdit)
        .factory(AddressEditStateService.id, AddressEditStateService.injection());
} 