import mongoose from 'mongoose'
import { logger } from '../../../config/logger'

export const DBConnect = (databaseURI: string): void => {
  mongoose.set('strictQuery', true)

  void mongoose.connect(databaseURI)

  mongoose.connection.on('connected', () => {
    logger.info('Database connected')
  })

  mongoose.connection.on('close', () => {
    logger.info('Database disconnected')
  })

  mongoose.connection.on('error', (error) => {
    logger.error(`Database error: ${error}`)
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Database disconnected because app termination')
      process.exit(0)
    })
  })
}

export const DBDisconnect = (): void => {
  mongoose.connection.close(() => {
    logger.info('Database disconnected successful')
  })
}
