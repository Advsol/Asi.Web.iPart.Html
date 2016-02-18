///<reference path="../services/donationEntry.service.ts" />

module donationEntry {
    "use strict";

    export interface IDonationEntryScope {
        donations: IDonationData;
        addDonation(donation: IDonation): void;
    }

    export class DonationEntryController implements IDonationEntryScope {
        public static id: string = AngularGlobals.donationEntry + ".DonationEntryController";        
        // members
        donations: IDonationData;

        // inject donation
        static $inject = ["donations", services.DonationEntryService.id];
        constructor(donations: IDonationData, private service: services.IDonationEntryService) {            
            var vm = this; 
            vm.donations = donations;
        }

        addDonation(donation: IDonation): void {
            var newDonation = angular.copy(donation);
            newDonation.isNew = false;
            this.donations.donations.push(newDonation);
        }
    }
     
    // register the controller with app
    angular.module(AngularGlobals.donationEntry)
        .controller(DonationEntryController.id, DonationEntryController);

}