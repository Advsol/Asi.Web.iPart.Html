module addressEdit {
    "use strict";

    export interface IEditControllerScope {
        cancel(): void;
        getParty(): void;
    }

    export class EditController implements IEditControllerScope {
        public static id: string = AngularGlobals.addressEdit + ".EditController";
        stateService: services.IAddressEditStateService;
        partyid: string;
        party: models.IPartyData;
        successAlert: string;

        // inject 
        static $inject = ["partyId", services.AddressEditService.id, services.AddressEditStateService.id];

        constructor(
            partyid: string,
            private service: services.IAddressEditService,
            stateService: services.IAddressEditStateService) {

            this.stateService = stateService;
            var vm = this;
            vm.partyid = partyid;
            this.getParty();
        }



        cancel(): void {
            this.stateService.home();
        }

        //Grab our selected party and bind.
        getParty(): void {
            var result = this.service.getParty(this.partyid);
            result.then((response: ng.IHttpPromiseCallbackArg<models.IPartyData>): void => {
                this.party = response.data;
            });
        }

        // Save/PUT our changes into the database
        saveParty(): void {
            var result = this.service.saveParty(this.partyid, this.party);
            result.then((response: ng.IHttpPromiseCallbackArg<models.IPartyData>): void => {
                this.party = response.data;
                this.successAlert = "Saved";
                this.stateService.home();
            });
        }
        partyDataChanged(): void {
            this.successAlert = "";
        }

    } // controller
   
    // register the controller with app
    angular.module(AngularGlobals.addressEdit)
        .controller(EditController.id, EditController);
}


