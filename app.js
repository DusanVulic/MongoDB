console.log("hello");

const express = require("express");

const { connectDb, getDb } = require("./db");

//import from mongoDB in order to read id
const { ObjectId } = require("mongodb");

//init app and middleware

const app = express();

app.use(express.json());

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
                res.status(200).json(doc);
            })
            .catch((error) => {
                res.status(500).json({ error: "there is no book with that ID" });
            });
    } else {
        res.status(500).json({ error: "not a vali id document" });
    }
});

app.post("/books", (req, res) => {
    const book = req.body;

    db.collection("books")
        .insertOne(book)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: "could not create document" });
        });
});

app.delete("/books/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection("books")
            .deleteOne({ _id: ObjectId(req.params.id) })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ error: "could not delete that object" });
            });
    } else {
        res.status(500).json({ error: "not a valid  document id" });
    }
});

app.patch("/books/:id", (req, res) => {
    const updates = req.body;

    if (ObjectId.isValid(req.params.id)) {
        db.collection("books")
            .updateOne({ _id: ObjectId(req.params.id) }, {
                $set: updates,
            })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ error: "could not update document" });
            });
    } else {
        res.status(500).json({ error: "could not update document" });
    }
});

// book sample:

// {
//     "title":"dusanovo putesestvije",
//     "author":"Dusan Vulic",
//     "rating":9,
//     "pages":430,
//     "genres":[
//         "fantasy", "magic"
//     ],
//     "reviews":[
//         {"name":"bagzi","body":"great book"},
//         {"name":"duki","body":"awesome"}
//     ]

// }