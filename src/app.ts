// app.ts
/**
 * This is base Express App class component
 *
 * @module App
 */

import * as express from 'express';
// @ts-ignore
import {Logger} from "@deskree-inc/logger";

export class App {
    private logger;
    public app: express.Application
    public port: number

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
        this.app = express();
        this.port = appInit.port;
        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
        this.logger = new Logger();
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            // @ts-ignore
            this.app.use(process.env.APP_BASE_PATH, controller.router)
        })
    }

    public listen() {
        this.app.listen(this.port);
        this.logger.log(this.logger.notice, {
            code: 200, details: `Express App has started. API listening at port ${this.port}`
        }, {
            file: 'app.ts',
            line: '37',
            function: 'listen'
        });
    }
}
