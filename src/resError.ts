// resError.ts
/**
 * Class for centralized error response handling
 *
 * @module ResError
 */

// @ts-ignore
import {Response} from 'express';
import {ZodError} from "zod";

export class ResError {
    private readonly fileName;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    private getStatusMessage(status: number): string {
        switch (status) {
            // 200 codes
            case 200: {
                return 'OK'
            }
            case 201: {
                return 'Create'
            }
            case 202: {
                return 'Accepted'
            }
            case 203: {
                return 'Non-Authoritative Information'
            }
            case 204: {
                return 'No content'
            }
            case 205: {
                return 'Reset content'
            }
            case 206: {
                return 'Partial Content'
            }
            // 300 codes
            case 300: {
                return 'Multiple choice'
            }
            case 301: {
                return 'Moved Permanently'
            }
            case 302: {
                return 'Found'
            }
            case 303: {
                return 'See Other'
            }
            case 304: {
                return 'Not Modified'
            }
            case 307: {
                return 'Temporary Redirect'
            }
            case 308: {
                return 'Permanent Redirect'
            }
            // 400 codes
            case 400: {
                return 'Bad Request'
            }
            case 401: {
                return 'Unauthorized'
            }
            case 402: {
                return 'Payment Required'
            }
            case 403: {
                return 'Forbidden'
            }
            case 404: {
                return 'Not found'
            }
            case 405: {
                return 'Method Not Allowed'
            }
            case 406: {
                return 'Not Acceptable'
            }
            case 407: {
                return 'Proxy Authentication Required'
            }
            case 408: {
                return 'Request Timeout'
            }
            case 409: {
                return 'Conflict'
            }
            case 410: {
                return 'Gone'
            }
            case 411: {
                return 'Length Required'
            }
            case 412: {
                return 'Precondition Failed'
            }
            case 413: {
                return 'Payload Too Large'
            }
            case 414: {
                return 'URI Too Long'
            }
            case 415: {
                return 'Unsupported Media Type'
            }
            case 416: {
                return 'Range Not Satisfiable'
            }
            case 417: {
                return 'Expectation Failed'
            }
            case 418: {
                return "I'm a teapot"
            }
            case 422: {
                return 'Unprocessable Entity'
            }
            case 426: {
                return 'Upgrade Required'
            }
            case 428: {
                return 'Precondition Required'
            }
            case 429: {
                return 'Too Many Requests'
            }
            case 431: {
                return 'Request Header Fields Too Large'
            }
            case 451: {
                return 'Unavailable For Legal Reasons'
            }
            // 500 codes
            case 500: {
                return 'Internal Server Error'
            }
            case 501: {
                return 'Not Implemented'
            }
            case 502: {
                return 'Bad Gateway'
            }
            case 503: {
                return 'Service Unavailable'
            }
            case 504: {
                return 'Gateway Timeout'
            }
            case 505: {
                return 'HTTP Version Not Supported'
            }
            case 506: {
                return 'Variant Also Negotiates'
            }
            case 507: {
                return 'Insufficient Storage'
            }
            case 508: {
                return 'Loop Detected'
            }
            case 510: {
                return 'Not Extended'
            }
            case 511: {
                return 'Network Authentication Required'
            }
            default: {
                return 'Unknown status code'
            }
        }
    }
    /**
     * @param e Error details
     * @returns string
     */
    private validateError(e: any): string {
        if (e instanceof ZodError) {
            return e.message
        } else if (e instanceof Error) {
            return e.message
        } else if (typeof e === 'string') {
            return e
        } else {
            return 'Internal Server Error'
        }
    }

    /**
     * @param res Express Response
     * @param code Response code
     * @param e Error details
     * @param functionName function name
     * @param lineNumber line number
     * @returns void
     */
    public send(res: Response, code: number, e?: any, functionName?: string,
                             lineNumber?: number): void {
        const message = this.validateError(e);
        console.error(`[${this.fileName}] ${functionName} ${lineNumber} - ${code} - ${message} - ${new Date()}`);
        res.setHeader('content-type', 'application/json; charset=utf-8');
        res.status(code).send({
            data: {},
            errors: [{
                code: code.toString(),
                title: this.getStatusMessage(code),
                detail: message ? message : ""
            }]
        });
        return
    }
}
