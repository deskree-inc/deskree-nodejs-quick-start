// postmanController.ts
/**
 * This is the controller that returns Postman collection
 *
 * @module PostmanController
 */

import {BaseController} from "./baseController";
import {Request, Response} from 'express';
import {PostmanModel} from "../models/postmanModel";
import {ResError} from "../resError";
import {ResSuccess} from "../resSuccess";

export class PostmanController extends BaseController {

    public path = '/postman';
    private postman;
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
        super('postmanController');
        this.initRoutes();
        this.postman = new PostmanModel();
        this.resError = new ResError("accountsController.ts");
        this.resSuccess = new ResSuccess("accountsController.ts");
    }

    initRoutes(): any {
        this.router.get(`${this.path}`, this.getPostmanCollection.bind(this));
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
            this.resSuccess.send(res, 200, {data: result}, "getPostmanCollection", 69);
        } catch (e) {
            this.resError.send(res, 500, e, "getPostmanCollection", 69);
        }
    }
}
