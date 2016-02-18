//TODO - i temp had to change the name of this so i could have an array of donations inside
interface IDonationData {
    donationId: string;
    validationResult: any;
    batchId: string;
    donations: IDonation[];
}

interface IDonation {
    imisId: string;
    itemCode: string;
    amount: number;
    isNew: boolean;
}


((): void=> {
    "use strict";

    var donation: IDonationData = {
        donationId: "",
        validationResult: [],
        batchId: "",
        donations: []
};

    // Register dependency classes and services

    angular.module("donationEntry")
        .value("donation", donation);
})();