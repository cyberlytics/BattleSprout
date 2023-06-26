import { MongoClient, Collection, Db } from "mongodb";

const uri: string = process.env.MONGO_URI || "mongodb://localhost:27017";
const client: MongoClient = new MongoClient(uri);

async function connect(): Promise<void> {
    try {
        await client.connect();
    } catch (err) {
        console.error(err);
    }
}

async function InsertOne(databaseName: string, collectionName: string, object: any): Promise<any> {
    try {
        const db: Db = client.db(databaseName);
        const collection: Collection<any> = db.collection(collectionName);
        const result = await collection.insertOne(object);        
        return result;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to insert');
    }
}

async function FindOne(databaseName: string, collectionName: string, query: any): Promise<any> {
    try {
        const db: Db = client.db(databaseName);
        const collection: Collection<any> = db.collection(collectionName);
        const result = await collection.findOne(query);
        return result;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to find');
    }
}

async function UpdateOne(databaseName: string, collectionName: string, filter:any , update: any): Promise<any> {
    try {
        const db: Db = client.db(databaseName);
        const collection: Collection<any> = db.collection(collectionName);
        const result = await collection.updateOne(filter,update);        
        return result;
    } catch (err) {      
        console.error(err);
        throw new Error('Failed to update');
    }
}

async function find(databaseName: string, collectionName: string, query: any): Promise<any[]> {
    try {
        const db: Db = client.db(databaseName);
        const collection: Collection<any> = db.collection(collectionName);
        const result = await collection.find(query).toArray();
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export {
    connect,
    InsertOne,
    FindOne,
    UpdateOne,
    find
};