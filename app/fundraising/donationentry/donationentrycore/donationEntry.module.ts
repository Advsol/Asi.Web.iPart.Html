((): void=> {
    "use strict";
    // declare main application: donationEntry and pass in dependencies  

    angular.module(donationEntry.AngularGlobals.donationEntry, [
        donationEntry.AngularGlobals.donationEntryServices,
        //Add non-ASI modules
        "ui.bootstrap"
    ]);

    angular.module("app").requires.push(donationEntry.AngularGlobals.donationEntry);

})();