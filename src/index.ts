import "reflect-metadata";
import express from 'express'
import morganMiddleware from "./config/logger";
import {DBConnect} from "./internal/infra/resources/connection.db";
import {InversifyExpressServer} from "inversify-express-utils";
import {container} from "./containers/inversify.container";
import config from "./config/config";
import {errorHandler} from "./internal/infra/middlewares/handlerError";

const server = new InversifyExpressServer(container,null, { rootPath: "/api/twitter" });
server.setConfig((app) => {
    app.use(morganMiddleware)
    app.use(express.json())
});
let app = server.build();

app.use(errorHandler)

DBConnect(config().databaseURI)
app.listen(config().port, () => {
    console.log(`Server running at http://127.0.0.1:4500`)
})


