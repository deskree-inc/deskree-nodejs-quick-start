// expressController.ts
/**
 * This is the base controller class
 *
 * @module ExpressController
 */

import * as express from "express";
// @ts-ignore
import {PostmanController} from "@deskree/postman-collection-generator";
// @ts-ignore
import {Logger} from "@deskree-inc/logger";

export class ExpressController implements PostmanController {
    protected router;
    protected logger;

    constructor() {
        this.router = express.Router();
        this.logger = new Logger(process.env.INTEGRATION_NAME, process.env.PROJECT_ID);
    }
}
