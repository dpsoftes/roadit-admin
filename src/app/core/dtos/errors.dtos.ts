export class ErrorBase{
    code: string | number | null  = 0;
    message: any = "";
    [property: string]: any;
    constructor(message: any, code: string | number | null  = 500){
        this.message = message;
        this.code = code;
    }

}