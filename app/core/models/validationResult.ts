interface IValidationResult {
    viewModel: any;
    validationResult: IValidateResults;
    messageSummary: string;
}

interface IValidateResults {
    isValid: boolean;
    errors: any[];
    warnings: any[];
}