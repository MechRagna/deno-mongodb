import { connectMongoDB, insertOne } from "./mongodb.ts";
import { IDbConfig } from "./types.ts";
import { mongoError } from "./mongoError.ts";

// const config: IDbConfig = {
//   MONGO_URL:
//     "mongodb://root:dbpassword01@ds263078.mlab.com:63078/wallet-awtrae",
//   DATABASE: "wallet-awtrae",
//   COLLECTION_NAME: "events",
// };

// interface EventSchema {
//   email: string;
//   wallet_id: string;
//   type: string;
//   is_scheduled: boolean;
//   period: string;
//   amount: number;
//   description: string;
//   main_event_tag: string;
//   sub_event_tag: string;
//   date: string;
// }

// const event = {
//   email: "candotti.cesar@gmail.com",
//   wallet_id: "5ea37a1347f0cc226c6bc553",
//   type: "incoming",
//   is_scheduled: true,
//   period: "once",
//   amount: 1000000,
//   description: "Evento desde Deno y desde el modulo",
//   main_event_tag: "venta",
//   sub_event_tag: "librería",
//   date: "2019-12-12T18:14:21",
// };

// const db = connectMongoDB<EventSchema>(config);
// const resp = await db.insertOne(event);

// const resp = await insertOne<EventSchema>(config, event);

const error = {
  message: 'An error occurred when trying to execute a write operation: WriteError(WriteError { code: 11000, code_name: None, message: "E11000 duplicate key error index: fair-price.users_password.$_id_ dup key: { : \"asd2@email.com\" }" })',
  stack: ` Error: An error occurred when trying to execute a write operation: WriteError(WriteError { code: 11000, code_name: None, message: "E11000 duplicate key error index: fair-price.users_password.$_id_ dup key: { : \"asd2@email.com\" }" })
  at Array.<anonymous> (util.ts:52:33)
  at handleAsyncMsgFromRust (core.js:181:34)`
}

const resp = mongoError(error);
console.log(resp);