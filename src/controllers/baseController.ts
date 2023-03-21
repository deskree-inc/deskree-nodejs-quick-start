// postman.ts
/**
 * This is the controller that returns Postman collection
 *
 * @module PostmanController
 */


import {ResError} from "../resError";
import {ResSuccess} from "../resSuccess";
import * as express from "express";

export class BaseController {

    protected router;
    protected resError;
    protected resSuccess;

    constructor(controllerName: string) {
        this.router = express.Router();
        this.resError = new ResError(`${controllerName}.ts`);
        this.resSuccess = new ResSuccess(`${controllerName}.ts`);
    }
}
