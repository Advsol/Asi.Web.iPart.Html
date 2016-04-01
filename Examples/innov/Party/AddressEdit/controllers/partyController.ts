module addressEdit {
    "use strict";

    export interface IPartyControllerScope {
        pagedResult: models.IPagedResult;
        gridApiOptions: uiGrid.IGridOptionsOf<uiGrid.pagination.IGridPaginationApi>;
        gridApi: uiGrid.IGridApiOf<uiGrid.pagination.IGridPaginationApi>;
        getPage(newPage: number, newSize: number): void;
        registerApi(gridApi: uiGrid.IGridApiOf<uiGrid.pagination.IGridPaginationApi>): void;
        onPaginationChanged(newPage: number, newSize: number): void;
    }


    export class PartyController implements IPartyControllerScope {
        public static id: string = AngularGlobals.addressEdit + ".PartyController";
        stateService: services.IAddressEditStateService;
        pagedResult: models.IPagedResult;
        gridApiOptions: uiGrid.IGridOptionsOf<uiGrid.pagination.IGridPaginationApi>;
        gridApi: uiGrid.IGridApiOf<uiGrid.pagination.IGridPaginationApi>;
        currentPage: number;

        // inject 
        static $inject = [
            AngularGlobals.parties, services.AddressEditService.id, services.AddressEditStateService.id
        ];

        constructor(
            parties: models.IPagedResult,
            private service: services.IAddressEditService,
            stateService: services.IAddressEditStateService
        ) {

            this.stateService = stateService;
            var vm = this;
            vm.pagedResult = parties;
            this.setupGrids(parties);
            this.currentPage = 0;
        }


        setupGrids(data: any): void {
            //Determine which columns in our grid to show and our page size + options
            var options = <uiGrid.IGridOptionsOf<uiGrid.pagination.IGridPaginationApi>>{};
            options.useExternalPagination = true;
            options.paginationPageSizes = [25, 50, 75];
            options.paginationPageSize = 25;
            options.onRegisterApi = (apiGrid) => { this.registerApi(apiGrid); }
            options.userExternalSorting = true;
            options.enablePagination = true;
            options.columnDefs = [{ name: "FullName" }, { name: "GroupRoleName" }];//, { name: "PartyId", enableSorting: false }];
            options.enableRowSelection = true;
            options.multiSelect = false;
            this.gridApiOptions = options;
        }  // setup grids

        // registers the api when grid is first created
        registerApi(gridApi: uiGrid.IGridApiOf<uiGrid.pagination.IGridPaginationApi>): void {
            this.gridApi = gridApi;
            // this handler calls for scope, but null works. 
            gridApi.pagination.on.paginationChanged(null, (newPage, newSize) => { this.onPaginationChanged(newPage, newSize); });
            
            gridApi.selection.on.rowSelectionChanged(null, (row) => { this.onRowSelectionChanged(row) });

            // set the initial call with the current pagesize.             
            this.getPage(this.currentPage, this.gridApiOptions.paginationPageSize);
        }
                
        onRowSelectionChanged(row: uiGrid.IGridRow) {
            this.stateService.editParty(row.entity.PartyId);          
        }

        onPaginationChanged(newPage: number, newSize: number): void {
            this.getPage(newPage, newSize);
        }

        getPage(newPage: number, newSize: number): void {
            // calculate current page
            this.currentPage = this.pagedResult.NextOffset / this.pagedResult.Count;
            var offset = this.currentPage * this.pagedResult.NextOffset;
            var limit = newSize;
            var result = this.service.getIQA(offset, limit);

            result.then((response: ng.IHttpPromiseCallbackArg<models.IPagedResult>): void => {
                this.pagedResult = response.data;
                // format our data so we can easily bind it to our ui-grid
                var partyQuery = this.formatData(response.data);
                // we have issues with strong typing here, <any> to the rescue.
                var anyParties = <any>{};
                anyParties = partyQuery.parties;
                this.gridApiOptions.data = anyParties;
            });
        }


        // This should not live in the controller, but we need a paged result from the service.
        // ideally this would be part of our custom model.
        // We are also looking into putting this mapping on the server side, in our REST service
        formatData(response: models.IPagedResult): models.CustomPartyQueryData {     
            // TODO: People have written typescript collection libraries, should we use them? 
            var data = new Array<models.ICustomPartyQueryData>();
            var pagedResult = response;    
            // Note TypeScript uses of instead of in
            for (var item of pagedResult.Items) {
                var genericEntity = <models.IGenericEntityData>item;
                // there is probably a much more intelligent way of transforming this data
                // We need IQA to return friendlier data for the client                    
                var party = <models.ICustomPartyQueryData>{};
                party.PartyId = genericEntity.Properties[1].Value;
                party.FullName = genericEntity.Properties[2].Value;
                party.GroupRoleName = genericEntity.Properties[3].Value;
                
                data.push(party);
            }
            var partyQuery = <models.CustomPartyQueryData>{};
            partyQuery.parties = data;
            return partyQuery;
        }


    } // controller
   

    // register the controller with app
    angular.module(AngularGlobals.addressEdit)
        .controller(PartyController.id, PartyController);

}


