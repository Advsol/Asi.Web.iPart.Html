describe("batchController", ()=> {
    //  immutable data bootstrap can go here
    var controller: donationEntry.BatchController;
    var service: donationEntry.services.IDonationEntryService;

    beforeEach(()=> {
        // preparation for each test. Will be wiped clean per test.
        // todo: use bard js to make this easier: 
        // https://github.com/wardbell/bardjs 

        // stubs       
        angular.mock.module("donationEntry");
        angular.mock.module("donationEntry.core");
        angular.mock.module("donationEntry.services");
    });

    beforeEach(inject((
        $injector: ng.auto.IInjectorService,
        $httpBackend: ng.IHttpBackendService
        ) => {        
        service = $injector.get("donationEntry.services.DonationEntryService");                
    }));

    it("should create controller",() => {
        expect(controller).not.toBeNull();        
    });


    it("SelectBatch should call service With the selected batch ID.",() => {
        //Act
        // PMB - I've really no idea how we build this type of test yet, i.e. how we create our mocks.
        // I think i need to learn a little more about jasmine and angular mocking.  Bard seemed to solve much of this.
        //controller.selectBatch();

    });
});


