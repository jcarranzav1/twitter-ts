import morgan from 'morgan'
import winston from 'winston'

const logger = winston.createLogger({
  format: winston.format.simple(),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'log/request.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'log/error.log',
      level: 'error',
    }),
    new winston.transports.Console(),
  ],
})

const morganMiddleware = morgan(
  ':remote-addr [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
  {
    stream: {
      write: (message: string) =>
        logger.info(message.substring(0, message.lastIndexOf('\n'))),
    },
  },
)

export default morganMiddleware
export { logger }
