interface IBatch {
    selectedBatch: string;
    openBatches: string[]; //change to correct type
    batchDate: Date;
} 


((): void=> {
    "use strict";

    var batch: IBatch = {
        selectedBatch: "",
        openBatches: [],
        batchDate: new Date()
    };

    // Register dependency classes and services

    angular.module("donationEntry")
        .value("donation", batch);
})();