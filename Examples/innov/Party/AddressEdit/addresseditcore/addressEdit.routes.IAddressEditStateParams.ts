//this interface expresses the URL parameters this app's routes can expect.
declare module addressEdit.Routes {
    interface IAddressEditStateParams extends ng.ui.IStateParamsService {
        partyId: string;
    }
}