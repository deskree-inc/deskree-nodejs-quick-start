// resError.ts
/**
 * Class for centralized error response handling
 *
 * @module ResError
 */

// @ts-ignore
import {Logger} from "@deskree-inc/logger";
import {Request} from 'express';

export class ResError {
    private readonly fileName;
    private logger;

    constructor(fileName: string) {
        this.fileName = fileName;
        this.logger = new Logger('auth', process.env.PROJECT_ID);
    }

    private getErrorLevel(code: number): string {
        if (code >= 500) {
            return this.logger.message.error
        } else if (code >= 400) {
            return this.logger.message.warning
        } else {
            return this.logger.message.notice
        }
    }

    /**
     * Function to format and return error response and write appropriate logs
     * @param req: Express Request
     * @param res: Express Response
     * @param code: Response code
     * @param functionName: Name of the function that throws an error
     * @param line: Code line where the error originates
     * @param zod: Whether the error is produces by Zod or not
     * @param message: Error details
     */
    public sendErrorResponse(req: Request, res: any, code: number, functionName: string, line: string, zod: boolean, message?: any) {
        res['processed'] = this.logger.getDuration(req);
        res.status(code).send(zod ? {errors: JSON.parse(message)} : {
            errors: [{
                code: code.toString(),
                title: this.logger.getStatusMessage(code).details,
                detail: message ? message : ""
            }]
        });
        this.logger.log(this.getErrorLevel(code), {
            code: code,
            details: message ? message : this.logger.getStatusMessage(code).details
        }, {
            file: this.fileName,
            line: line,
            function: functionName
        }, req, res, []);
        return
    }
}