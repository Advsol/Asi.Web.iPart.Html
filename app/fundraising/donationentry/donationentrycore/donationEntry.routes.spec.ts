describe("routes",() => {
    var injector: ng.auto.IInjectorService;
    var controller: donationEntry.BatchController;
    var service: donationEntry.services.IDonationEntryService;
    var backEnd: ng.IHttpBackendService;
    var state: ng.ui.IStateService;
    var rootScope: ng.IRootScopeService;

    beforeEach(() => {
        // todo: use bard js to make this easier: 
        // https://github.com/wardbell/bardjs 
        // one gotcha with bard might be that the objects 
        // are added to the window.  Typescripe won't be able to see
        // those objects so they won't compile.  Coud possibly
        // create locals and hope runtime wil use the right ones
        // or abandon writing tests in typescript 
        // or go with the below method which is bad but not super terrible


        // stubs       
        angular.mock.module("ui.router");
        angular.mock.module("donationEntry");
        angular.mock.module("donationEntry.core");
        angular.mock.module("donationEntry.services");       
    });

    beforeEach(inject((
        $injector: ng.auto.IInjectorService,
        $httpBackend: ng.IHttpBackendService,
        $state: ng.ui.IStateService,
        $rootScope: ng.IRootScopeService, 
        $q: ng.IQService,
        $templateCache: ng.ITemplateCacheService
        ) => {

        injector = $injector;
        service = $injector.get("donationEntry.services.DonationEntryService");
        backEnd = $httpBackend;
        state = $state;
        rootScope = $rootScope;

        $templateCache.put("app/templates/edit-batch.html", "");

        $httpBackend.whenGET("/iMISMain100App/Areas/DonationEntry/app/templates/edit-batch.html").respond(200);

        var batchResultData: IBatch = {
            selectedBatch: "",
            openBatches: [],
            batchDate: new Date()
        };

        service.getOpenBatches =
            jasmine.createSpy("getOpenBatches").and.callFake(()=> {
                console.log("getOpenBatches");
                var deferred = $q.defer();
                deferred.resolve(batchResultData);
                return deferred.promise;
            });

    }));

    it("selectBatch should resolve batches",() => {
        spyOn(state, "go");
        state.go("donationEntry.edit");
        // resolve promises
        rootScope.$digest();
        expect(state.go).toHaveBeenCalled();
       
        // the injector should now have batches
        //  expect(injector.invoke(state.current.resolve)).toBe('item-found');

    });
});
