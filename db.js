const { MongoClient, ClientSession } = require("mongodb");

let dbConnection;

const connectDb = (cb) => {
    MongoClient.connect("mongodb://localhost:27017/bookstore")
        .then((client) => {
            dbConnection = client.db();
            return cb();
        })
        .catch((err) => {
            console.log(err);
            return cb(err);
        });
};

const getDb = () => dbConnection;

module.exports = { connectDb, getDb };