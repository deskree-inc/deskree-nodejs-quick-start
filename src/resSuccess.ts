// resSuccess.ts
/**
 * Class for centralized response success
 *
 * @module ResSuccess
 */

// @ts-ignore
import {Response} from 'express';

export class ResSuccess {
    private readonly fileName;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    /**
     * Function to format and return error response and write appropriate logs
     * @param res: Express Response
     * @param code: Response code
     * @param functionName: Name of the function that throws an error
     * @param line: Code line where the error originates
     * @param data: data to be sent in the response
     */
    public send(res: Response, code: number, data: any, functionName?: string, line?: number) {
        console.info(`[${this.fileName}] ${functionName} ${line} - ${code} - ${JSON.stringify(data)} - ${new Date()}`);
        res.status(code).send(data);
        return
    }
}
