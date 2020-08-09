import { MongoClient } from "./deps.ts";
import { IDbConfig } from "./types.ts";
import { mongoError } from "./mongoError.ts";

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
    throw mongoError(error);
  }
};

const insertMany = async <DataSchema>(dbConfig: IDbConfig, data: any[]) => {
  try {
    const collection = connectMongoDB<DataSchema>(dbConfig);
    return await collection.insertMany(data);
  } catch (error) {
    throw mongoError(error);
  }
};

const findOne = async <DataSchema>(dbConfig: IDbConfig, filter?: object) => {
  try {
    const collection = connectMongoDB<DataSchema>(dbConfig);
    return await collection.findOne(filter);
  } catch (error) {
    throw mongoError(error);
  }
};

const find = async <DataSchema>(dbConfig: IDbConfig, filter?: object) => {
  try {
    const collection = connectMongoDB<DataSchema>(dbConfig);
    return await collection.find(filter);
  } catch (error) {
    throw mongoError(error);
  }
};

const updateOne = async <DataSchema>(
  dbConfig: IDbConfig,
  filter: object,
  data: object
) => {
  try {
    const collection = connectMongoDB<DataSchema>(dbConfig);
    return await collection.updateOne(filter, data);
  } catch (error) {
    throw mongoError(error);
  }
};

const updateMany = async <DataSchema>(
  dbConfig: IDbConfig,
  filter: object,
  data: object
) => {
  try {
    const collection = connectMongoDB<DataSchema>(dbConfig);
    return await collection.updateMany(filter, data);
  } catch (error) {
    throw mongoError(error);
  }
};

const deleteOne = async <DataSchema>(dbConfig: IDbConfig, filter: object) => {
  try {
    const collection = connectMongoDB<DataSchema>(dbConfig);
    return await collection.deleteOne(filter);
  } catch (error) {
    throw mongoError(error);
  }
};

const deleteMany = async <DataSchema>(dbConfig: IDbConfig, filter: object) => {
  try {
    const collection = connectMongoDB<DataSchema>(dbConfig);
    return await collection.deleteMany(filter);
  } catch (error) {
    throw mongoError(error);
  }
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
  deleteMany,
};
