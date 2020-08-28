import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService{

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor () {};

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    valueHasData(value: any): boolean {
        return ( (value != undefined) && (value != null));
    }
}
