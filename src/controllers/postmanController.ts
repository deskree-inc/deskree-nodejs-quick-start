// postman.ts
/**
 * This is the controller that returns Postman collection
 *
 * @module PostmanController
 */

import {ExpressController} from "./expressController";
import {Request, Response} from 'express';
import {PostmanModel} from "../models/postmanModel";
import {ZodError} from "zod";
import {ResError} from "../resError";
import {ResSuccess} from "../resSuccess";

export class PostmanController extends ExpressController {

    public path = '/postman';
    private postman;
    private resError;
    private resSuccess;
    public name = 'Postman';
    public description = 'Get postman collection';
    public routes = [
        {
            name: 'Postman Collection',
            url: '/postman',
            method: 'GET',
            description: 'Get postman collection for the micro service'
        }
    ]

    constructor() {
        super();
        this.initRoutes();
        this.postman = new PostmanModel();
        this.resError = new ResError("accountsController.ts");
        this.resSuccess = new ResSuccess("accountsController.ts");
    }

    initRoutes(): any {
        this.router.get(`${this.path}`, this.getPostmanCollection.bind(this));
    }


    /**
     * Function to process error requests
     * @param e: Http Error object
     * @param req: Express Request
     * @param res: Express Response
     * @param functionName: Name of the function that throws an error
     * @param line: Code line where the error originates
     */
    private catchError(e: Record<string, any>, req: Request, res: Response, functionName: string, line: string) {
        if (e instanceof ZodError) {
            res.setHeader('content-type', 'application/json; charset=utf-8');
            this.resError.sendErrorResponse(req, res, 422, functionName, line, true, e.message);
        } else if (Object.prototype.hasOwnProperty.call(e, "code") && Object.prototype.hasOwnProperty.call(e,
            "message")) {
            this.resError.sendErrorResponse(req, res, e.code, functionName, line, false, e.message);
        } else if (Object.prototype.hasOwnProperty.call(e, 'response') && e.responsObject.prototype.hasOwnProperty.call(
            e, 'data') && Object.prototype.hasOwnProperty.call(e.response.data,
            'message') && Object.prototype.hasOwnProperty.call(e, 'code')) {
            this.resError.sendErrorResponse(req, res, e.code, functionName, line, false, e.response.data.message);
        } else if (Object.prototype.hasOwnProperty.call(e, 'errorInfo') && Object.prototype.hasOwnProperty.call(
            e.errorInfo, 'message')) {
            this.resError.sendErrorResponse(req, res, 422, functionName, line, false, e.errorInfo.message);
        } else {
            this.resError.sendErrorResponse(req, res, 500, functionName, line, false, e.message);
        }
    }

    /**
     * Get list postman collection for the existing endpoints
     * @param req: Express Request
     * @param res: Express Response
     * @return array of blogs or individual blog object
     */
    public getPostmanCollection(req: Request, res: Response) {
        try {
            const result = this.postman.getPostmanCollection();
            this.resSuccess.sendSuccessResponse(req, res, 200, "createActivity", "99", {data: result});
        } catch (e) {
            this.catchError(e, req, res, "createActivity", "88");
        }
    }
}
