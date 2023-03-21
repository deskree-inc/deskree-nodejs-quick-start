// postmanModel.ts
/**
 * This is the business logic for getting Postman collection
 *
 * @module PostmanModel
 */

import * as fs from 'fs'
import {BaseModel} from "./baseModel";

export class PostmanModel extends BaseModel {

    constructor() {
        super()
    }

    /**
     * Get Postman Collection
     * @return array of blogs
     */
    public async getPostmanCollection() {
        const collection = fs.readFileSync('./collection.json');
        return JSON.parse(collection.toString());
    }
}
