// index.ts
/**
 * Index component responsible for Express setup including controllers and middleware.
 *
 * @module Index
 */

import * as express from "express";
import {App} from "./app";
// @ts-ignore
import * as cors from "cors";
// @ts-ignore
import {LatencyMeasure} from "@deskree-inc/logger";

const latencyMeasure = new LatencyMeasure();

const api = new App({
    port: 5000,
    controllers: [],
    middleWares: [
        cors(),
        latencyMeasure.addProcessedTime,
        express.json()
    ]
});

api.listen();
