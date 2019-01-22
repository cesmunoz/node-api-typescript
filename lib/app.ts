import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/contactRoute";

class App {
    public app: express.Application;
    public route: Routes = new Routes();
    
    public mongoUrl: string = 'mongodb://localhost/ContactsDB';

    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
    }
}

export default new App().app;
