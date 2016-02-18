//this interface expresses the URL parameters this app's routes can expect.
declare module donationEntry.Routes {
    interface IDonationEntryStateParams extends ng.ui.IStateParamsService {
        batchId: string;
    }
}