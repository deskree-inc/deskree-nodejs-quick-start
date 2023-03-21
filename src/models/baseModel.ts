// baseModel.ts
/**
 * This is the base model class
 *
 * @module BaseModel
 */

import createClient from "@deskree/deskree-js";
import axios from "axios";

export class BaseModel {

    protected deskree;

    constructor() {
        this.deskree = createClient({
            projectId: process.env.DESKREE_ID as string,
            axios: axios
        });
    }

}
