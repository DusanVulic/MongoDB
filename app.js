console.log("hello");

const express = require("express");

const { connectDb, getDb } = require("./db");

//import from mongoDB in order to read id
const { ObjectId } = require("mongodb");

//init app and middleware

const app = express();

// db connection

let db;
connectDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log("app listening on port 3000");
        });
        db = getDb();
    }
});

/// routes

app.get("/books", (req, res) => {
    let books = [];

    db.collection("books")
        .find()
        .sort({ author: 1 })
        .forEach((book) => books.push(book))
        .then(() => {
            res.status(200).json(books);
        })
        .catch(() => {
            res.status(500).json({ error: "oooops, could not fetch the documents" });
        });

    // res.json({ msg: "welcome to the api" });
});

app.get("/books/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection("books")
            .findOne({ _id: ObjectId(req.params.id) })
            .then((doc) => {
                return res.status(200).json(doc);
            })
            .catch((error) => {
                res.status(500).json({ error: "there is no book with that ID" });
            });
    } else {
        res.status(500).json({ error: "not a vali id document" });
    }
});