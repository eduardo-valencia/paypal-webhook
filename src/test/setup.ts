import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

jest.setTimeout(20000)

let mongo: MongoMemoryServer = null as unknown as MongoMemoryServer

const setupMongoose = async () => {
  mongo = await MongoMemoryServer.create()
  const mongoUri: string = mongo.getUri()
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

const clearCollectionData = (collection: any) => collection.deleteMany({})

const clearCollections = async () => {
  const collections: any[] = await mongoose.connection.db.collections()
  const promises = collections.map(clearCollectionData)
  await Promise.all(promises)
}

beforeAll(async () => {
  await setupMongoose()
})

beforeEach(async () => {
  await clearCollections()
})

const stopMongoose = async () => {
  await mongo.stop()
  await mongoose.connection.close()
}

afterAll(async () => {
  await stopMongoose()
})
