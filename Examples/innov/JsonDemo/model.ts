module JsonDemo {
    export interface IMvvmContentItem2 {
        contentKey: string;
        contentTypeKey: string;
        contentItemKey: string;
        Settings: IJsonDemoSettings;
        //showTitleFlag: boolean;
        //sortOrder: number;
        //layoutZone: number;
        //contentItemName: string;
        //iconUrl: string;
        //settings: string; // JSON data, the custom settings
        //partTitle: string;
        //doNotRenderInDesignMode: boolean;
        //cssClass: string;
        //showBorder: boolean;
        //collapsible: boolean;
        //collapsed: boolean;
        //displayOnExtraSmallScreens: boolean;
        //displayOnSmallScreens: boolean;
        //displayOnMediumScreens: boolean;
        //displayOnLargeScreens: boolean;
        //moduleSpecificSetting: string[];
    }

    export interface IJsonDemoSettings {
        color: string;
        iPartHeader: string;

    }
} 