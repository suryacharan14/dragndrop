export interface AppElement {
    type: string,
    id: string,
    name: string,
    source: string,
    func?: any,
}

export interface AppFunction{
    type: string,
    name: string,
    noOfArguments?: number,
    fields?: any[],
}

export interface CloudForm{
    id: string,
    type: string,
    label: string,
    value?: string,
    validators?: CloudValidators
    options?: string[]
}

export interface CloudValidators{
    required?: boolean,
    minlength?: number,
    maxlength?: number,
    readonly?: boolean
}
