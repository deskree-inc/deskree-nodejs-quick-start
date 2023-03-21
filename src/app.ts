// app.ts
/**
 * This is base Express App class component
 *
 * @module App
 */

import * as express from 'express';

export class App {
    public app: express.Application
    public port: number

    constructor(appInit: { port: number; middleWares: Array<any>; controllers: Array<any>; }) {
        this.app = express();
        this.port = appInit.port;
        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use(process.env.APP_BASE_PATH as string, controller.router)
        })
    }

    public listen() {
        this.app.listen(this.port);
        console.info(`Express App has started. API listening at port ${this.port}`)
    }
}
