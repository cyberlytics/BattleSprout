const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_CONNECTION_STRING;

const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
    } catch (err) {
        console.error(err);
    }
}

async function InsertOne(databaseName, collectionName, object) {
    try {
        const collection = client.db(databaseName).collection(collectionName);
        const result = await collection.insertOne(object);
        return result;
    } catch (err) {
        console.error(err);
    }
}

async function FindOne(databaseName, collectionName, query) {
    try {
        const collection = client.db(databaseName).collection(collectionName);
        const result = await collection.findOne(query);
        return result;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    connect,
    InsertOne,
    FindOne
};