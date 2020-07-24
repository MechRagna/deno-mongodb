import { MongoClient } from "./deps.ts";
import { config } from "./types.ts";

const connectMongoDB = <DataSchema>(dbConfig: config) => {
  const client = new MongoClient();
  client.connectWithUri(dbConfig.MONGO_URL);
  const db = client.database(dbConfig.DATABASE);
  return db.collection<DataSchema>(dbConfig.COLLECTION_NAME);
};

const insertOne = async <DataSchema>(dbConfig: config, data: any) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.insertOne(data);
};

const insertMany = async <DataSchema>(dbConfig: config, data: any[]) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.insertMany(data);
};

const findOne = async <DataSchema>(dbConfig: config, filter?: object) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.findOne(filter);
};

const find = async <DataSchema>(dbConfig: config, filter?: object) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.find(filter);
};

const updateOne = async <DataSchema>(dbConfig: config, filter: object, data: object) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.updateOne(filter, data);
};

const updateMany = async <DataSchema>(dbConfig: config, filter: object, data: object) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.updateMany(filter, data);
};

const deleteOne = async <DataSchema>(dbConfig: config, filter: object) => {
  const collection = connectMongoDB<DataSchema>(dbConfig);
  return await collection.deleteOne(filter);
};

const deleteMany = async <DataSchema>(dbConfig: config, filter: object) => {
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
