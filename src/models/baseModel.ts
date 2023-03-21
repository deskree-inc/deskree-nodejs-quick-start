// baseModel.ts
/**
 * This is the base model class
 *
 * @module BaseModel
 */

// @ts-ignore
import {Logger} from "@deskree-inc/logger";

export class BaseModel {
    protected logger;

    constructor() {
        this.logger = new Logger(process.env.INTEGRATION_NAME, process.env.PROJECT_ID);
    }
}
