import dotenv from 'dotenv'

import { convertObjectToCamelCase } from '../utils/transform'

dotenv.config()

interface Keys {
  port?: number
  databaseUrl: string
  paypalEmail: string
  useSandbox?: boolean
}

const getCamelCasedKeys = (): object =>
  convertObjectToCamelCase<object>(process.env)

const validateKeyExists =
  (keys: Object) =>
  (key: keyof Keys): void => {
    if (!keys.hasOwnProperty(key)) {
      throw new Error(`${key} is missing in the environment variables.`)
    }
  }

const camelCasedKeys: object = getCamelCasedKeys()

const validateKeys = () => {
  const requiredKeys: (keyof Keys)[] = ['databaseUrl', 'paypalEmail']
  requiredKeys.forEach(validateKeyExists(camelCasedKeys))
}

validateKeys()

export default camelCasedKeys as Keys
