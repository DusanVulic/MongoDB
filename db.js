const { MongoClient } = require("mongodb");

// must require dotenv to hide connection parameters
require("dotenv").config();

let dbConnection;

const connectDb = (cb) => {
    // below is usage of dotenv
    MongoClient.connect(process.env.MONGO_URI)
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