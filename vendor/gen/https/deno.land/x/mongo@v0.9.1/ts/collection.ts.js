import { CommandType } from "./types.ts";
import { convert, parse } from "./type_convert.ts";
import { dispatchAsync, encode } from "./util.ts";
export var BSONType;
(function (BSONType) {
    BSONType[BSONType["Double"] = 1] = "Double";
    BSONType[BSONType["String"] = 2] = "String";
    BSONType[BSONType["Object"] = 3] = "Object";
    BSONType[BSONType["Array"] = 4] = "Array";
    BSONType[BSONType["BinData"] = 5] = "BinData";
    BSONType[BSONType["Undefined"] = 6] = "Undefined";
    BSONType[BSONType["ObjectId"] = 7] = "ObjectId";
    BSONType[BSONType["Boolean"] = 8] = "Boolean";
    BSONType[BSONType["Date"] = 9] = "Date";
    BSONType[BSONType["Null"] = 10] = "Null";
    BSONType[BSONType["Regex"] = 11] = "Regex";
    BSONType[BSONType["DBPointer"] = 12] = "DBPointer";
    BSONType[BSONType["JavaScript"] = 13] = "JavaScript";
    BSONType[BSONType["Symbol"] = 14] = "Symbol";
    BSONType[BSONType["JavaScriptWithScope"] = 15] = "JavaScriptWithScope";
    BSONType[BSONType["Int"] = 16] = "Int";
    BSONType[BSONType["Timestamp"] = 17] = "Timestamp";
    BSONType[BSONType["Long"] = 18] = "Long";
    BSONType[BSONType["Decimal"] = 19] = "Decimal";
    BSONType[BSONType["MinKey"] = -1] = "MinKey";
    BSONType[BSONType["MaxKey"] = 127] = "MaxKey";
})(BSONType || (BSONType = {}));
export class Collection {
    constructor(client, dbName, collectionName) {
        this.client = client;
        this.dbName = dbName;
        this.collectionName = collectionName;
    }
    async _find(filter, options) {
        const doc = await dispatchAsync({
            command_type: CommandType.Find,
            client_id: this.client.clientId,
        }, encode(JSON.stringify({
            dbName: this.dbName,
            collectionName: this.collectionName,
            filter,
            ...options,
        })));
        return doc;
    }
    async count(filter) {
        const count = await dispatchAsync({
            command_type: CommandType.Count,
            client_id: this.client.clientId,
        }, encode(JSON.stringify({
            dbName: this.dbName,
            collectionName: this.collectionName,
            filter,
        })));
        return count;
    }
    async findOne(filter) {
        return parse(await this._find(filter, { findOne: true }))[0] ?? null;
    }
    async find(filter, options) {
        return parse(await this._find(filter, { findOne: false, ...options }));
    }
    async insertOne(doc) {
        const _id = await dispatchAsync({
            command_type: CommandType.InsertOne,
            client_id: this.client.clientId,
        }, encode(JSON.stringify({
            dbName: this.dbName,
            collectionName: this.collectionName,
            doc: convert(doc),
        })));
        return _id;
    }
    async insertMany(docs) {
        const _ids = await dispatchAsync({
            command_type: CommandType.InsertMany,
            client_id: this.client.clientId,
        }, encode(JSON.stringify({
            dbName: this.dbName,
            collectionName: this.collectionName,
            docs: convert(docs),
        })));
        return _ids;
    }
    async _delete(query, deleteOne = false) {
        const deleteCount = await dispatchAsync({
            command_type: CommandType.Delete,
            client_id: this.client.clientId,
        }, encode(JSON.stringify({
            dbName: this.dbName,
            collectionName: this.collectionName,
            query,
            deleteOne,
        })));
        return deleteCount;
    }
    deleteOne(query) {
        return this._delete(query, true);
    }
    deleteMany(query) {
        return this._delete(query, false);
    }
    async _update(query, update, updateOne = false, options) {
        const result = await dispatchAsync({
            command_type: CommandType.Update,
            client_id: this.client.clientId,
        }, encode(JSON.stringify({
            dbName: this.dbName,
            collectionName: this.collectionName,
            query: convert(query),
            update: convert(update),
            updateOne,
            options: options ?? null,
        })));
        return result;
    }
    updateOne(query, update, options) {
        return this._update(query, update, true, options);
    }
    updateMany(query, update, options) {
        return this._update(query, update, false, options);
    }
    async aggregate(pipeline) {
        const docs = await dispatchAsync({
            command_type: CommandType.Aggregate,
            client_id: this.client.clientId,
        }, encode(JSON.stringify({
            dbName: this.dbName,
            collectionName: this.collectionName,
            pipeline,
        })));
        return parse(docs);
    }
    async createIndexes(models) {
        const docs = await dispatchAsync({
            command_type: CommandType.CreateIndexes,
            client_id: this.client.clientId,
        }, encode(JSON.stringify({
            dbName: this.dbName,
            collectionName: this.collectionName,
            models,
        })));
        return docs;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbGxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFdBQVcsRUFBd0MsTUFBTSxZQUFZLENBQUM7QUFDL0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUtsRCxNQUFNLENBQU4sSUFBWSxRQXNCWDtBQXRCRCxXQUFZLFFBQVE7SUFDbEIsMkNBQVUsQ0FBQTtJQUNWLDJDQUFNLENBQUE7SUFDTiwyQ0FBTSxDQUFBO0lBQ04seUNBQUssQ0FBQTtJQUNMLDZDQUFPLENBQUE7SUFDUCxpREFBUyxDQUFBO0lBQ1QsK0NBQVEsQ0FBQTtJQUNSLDZDQUFPLENBQUE7SUFDUCx1Q0FBSSxDQUFBO0lBQ0osd0NBQUksQ0FBQTtJQUNKLDBDQUFLLENBQUE7SUFDTCxrREFBUyxDQUFBO0lBQ1Qsb0RBQVUsQ0FBQTtJQUNWLDRDQUFNLENBQUE7SUFDTixzRUFBbUIsQ0FBQTtJQUNuQixzQ0FBRyxDQUFBO0lBQ0gsa0RBQVMsQ0FBQTtJQUNULHdDQUFJLENBQUE7SUFDSiw4Q0FBTyxDQUFBO0lBQ1AsNENBQVcsQ0FBQTtJQUNYLDZDQUFZLENBQUE7QUFDZCxDQUFDLEVBdEJXLFFBQVEsS0FBUixRQUFRLFFBc0JuQjtBQW9IRCxNQUFNLE9BQU8sVUFBVTtJQUNyQixZQUNtQixNQUFtQixFQUNuQixNQUFjLEVBQ2QsY0FBc0I7UUFGdEIsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQVE7SUFDdEMsQ0FBQztJQUVJLEtBQUssQ0FBQyxLQUFLLENBQ2pCLE1BQXNCLEVBQ3RCLE9BQXFCO1FBRXJCLE1BQU0sR0FBRyxHQUFHLE1BQU0sYUFBYSxDQUM3QjtZ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