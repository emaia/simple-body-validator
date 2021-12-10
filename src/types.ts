'use strict';

export interface Rules {
    [key: string]: string|string[]
};

export interface CustomMesages {
    [key: string]: string
};

export interface ErrorMessage {
    error_type: string,
    message: string,
};

export interface Messages {
    [key: string]: ErrorMessage[]
};

export interface ErrorConfig {
    allMessages: boolean,
    withErrorTypes: boolean,
};

export interface ValidationRuleParserInterface {
    explodeRules: (rules: Rules) => Rules;
    explodeExplicitRules(rule: string|string[]): string[];
    parseStringRule(rule: string): [string, string[]];
    parseParameters(rule: string, parameter: string): string[];
    getRule(attribute: string, searchRules: string|string[], availableRules: Rules): Partial<[string, string[]]>;
    hasRule(attrtibute: string, searchRules: string|string[], availableRules: Rules): boolean; 
};

export interface ReplaceAttribueInterface {
    replaceBetween: (message: string, parameters: string[]) => string;
    replaceDigits: (message: string, paramaters: string[]) => string;
    replaceDigitsBetween: (message: string, paramters: string[]) => string;
    replaceMin: (message: string, parameters: string[]) => string;
    replaceMax: (message: string, parameters: string[]) => string;
    replaceRequiredWith: (message: string, parameters: string[]) => string;
    replaceRequiredWithAll: (message: string, parameters: string[]) => string;
    replaceRequiredWithout: (message: string, parameters: string[]) => string;
    replaceRequiredWithoutAll: (message: string, parameters: string[]) => string;
    replaceGt: (message: string, parameters: string[], data: object) => string;
    replaceLt: (message: string, parameters: string[], data: object) => string;
    replaceGte: (message: string, parameters: string[], data: object) => string;
    replaceLte: (message: string, parameters: string[], data: object) => string;
    replaceRequiredIf: (message: string, parameters: any) => string;
};