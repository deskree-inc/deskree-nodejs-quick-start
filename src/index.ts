// index.ts
/**
 * Index component responsible for Express setup including controllers and middleware.
 *
 * @module Index
 */

import * as express from "express";
import {App} from "./app";
import * as cors from "cors";
import {PostmanController} from "./controllers/postmanController";

const api = new App({
    port: 8000,
    controllers: [
        new PostmanController()
    ],
    middleWares: [
        cors(),
        express.json()
    ]
});

api.listen();
