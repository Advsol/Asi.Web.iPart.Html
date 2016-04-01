((): void=> {
    "use strict";
    // declare main application: donationEntry and pass in dependencies  
                  
    angular.module(addressEdit.AngularGlobals.addressEdit, [
        //Add non-ASI modules
        "ui.bootstrap",
        "ui.grid",
        "ui.grid.pagination",
        "ui.grid.selection"
    ]);

    angular.module("app").requires.push(addressEdit.AngularGlobals.addressEdit);

})();