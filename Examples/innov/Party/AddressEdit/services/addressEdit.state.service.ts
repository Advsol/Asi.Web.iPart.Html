//This class wraps our generic state service and allows us to keep state switching
// logic / code out of the controller
'use strict';
module addressEdit.services {
    import StateService = app.core.routing.StateService;
    
  
    export interface IAddressEditStateService {
        editParty(partyId: string): void;
        home(): void;
}

    export class AddressEditStateService implements IAddressEditStateService {
        public static id: string = AngularGlobals.addressEditServices + ".AddressEditStateService";

        constructor(private state: app.core.routing.IStateService) {
        } 

        editParty(partyId: string): void {
            //console.log("change state");
            //this.state.go("listParties.edit", { partyId: partyId });
            this.state.go("editParties", { partyId: partyId });
            console.log("changed");
        }

        home(): void {
            this.state.go("listParties");
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