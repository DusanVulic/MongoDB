const { MongoClient } = require("mongodb");

let dbConnection;

const uri =
    "mongodb+srv://Dusan123:DusaN1234@nodeexpressprojects.xowmjvz.mongodb.net/MongoDBucenje?retryWrites=true&w=majority";

const connectDb = (cb) => {
    MongoClient.connect(uri)
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