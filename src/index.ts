import express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import 'reflect-metadata'
import config from './config/config'
import morganMiddleware from './config/logger'
import { container } from './containers/inversify.container'
import { errorHandler } from './internal/infra/middlewares/handlerError'
import { DBConnect } from './internal/infra/resources/connection.db'

const server = new InversifyExpressServer(container, null, {
  rootPath: '/api/twitter'
})
server.setConfig((app) => {
  app.use(morganMiddleware)
  app.use(express.json())
})
const app = server.build()

app.use(errorHandler)

DBConnect(config().databaseURI)
app.listen(config().port, () => {
  console.log('Server running at http://127.0.0.1:4500')
})
