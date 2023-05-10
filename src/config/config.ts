import * as dotenv from 'dotenv'

dotenv.config()

interface IConfig {
  port: number
  databaseURI: string
  jwtSecret: string
  jwtExpire: string
}

const configuration: IConfig = {
  port: Number(process.env.PORT),
  databaseURI: process.env.DATABASE_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpire: process.env.JWT_EXPIRE!
}

function config (): IConfig {
  return configuration
}

export default config
