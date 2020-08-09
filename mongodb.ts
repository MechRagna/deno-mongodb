import { MongoClient } from "./deps.ts";
import { IDbConfig } from "./types.ts";

const connectMongoDB = <DataSchema>(dbConfig: IDbConfig) => {
  const client = new MongoClient();
  client.connectWithUri(dbConfig.MONGO_URL);
  const db = client.database(dbConfig.DATABASE);
  return db.collection<DataSchema>(dbConfig.COLLECTION_NAME);
};

const insertOne = async <DataSchema>(dbConfig: IDbConfig, data: any) => {
  try {
    const client = new MongoClient();
    client.connectWithUri(dbConfig.MONGO_URL);
    const db = client.database(dbConfig.DATABASE);
    const collection = db.collection<DataSchema>(dbConfig.COLLECTION_NAME);
    return await collection.insertOne(data);
  } catch (error) {
    throw error;
  }
};

const insertMany = async <DataSchema>(dbConfig: IDbConfig, data: any[]) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.insertMany(data);
};

const findOne = async <DataSchema>(dbConfig: IDbConfig, filter?: object) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.findOne(filter);
};

const find = async <DataSchema>(dbConfig: IDbConfig, filter?: object) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.find(filter);
};

const updateOne = async <DataSchema>(dbConfig: IDbConfig, filter: object, data: object) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.updateOne(filter, data);
};

const updateMany = async <DataSchema>(dbConfig: IDbConfig, filter: object, data: object) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.updateMany(filter, data);
};

const deleteOne = async <DataSchema>(dbConfig: IDbConfig, filter: object) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.deleteOne(filter);
};

const deleteMany = async <DataSchema>(dbConfig: IDbConfig, filter: object) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.deleteMany(filter);
};

export {
  connectMongoDB,
  insertOne,
  insertMany,
  findOne,
  find,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany
};
