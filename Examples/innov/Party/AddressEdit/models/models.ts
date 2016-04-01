module addressEdit.models {
    'use strict';
    // putting these here out of  convenience
    export interface IGenericEntityData {
        EntityTypeName: string,
        PrimaryParentEntityTypeName: string,
        PrimaryParentIdentity: any,
        Properties: any
    }

    export interface ICustomPartyQueryData {
        GroupRoleName: string;
        PartyId: string;
        FullName : string;
    }

    export interface IPagedResult {
        Count: number,
        HasNext: boolean,
        Items: any,
        Limit: number,
        NextOffset: number,
        Offset: number,
        TotalCount: number,
    }

    export interface IPartyData {
        BirthDate: Date;
    }

    export class CustomPartyQueryData {
       parties: Array<ICustomPartyQueryData>
    }
}