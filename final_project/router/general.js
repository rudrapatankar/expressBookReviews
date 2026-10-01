const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username=req.body.username;
  const password = req.body.password;
  if (username && password) {
        if (!doesExist(username)) {
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "Unable to register user."});
});


public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null));
});


public_users.get('/isbn/:isbn',function (req, res) {
  let book = books[req.params.isbn]
    res.send(JSON.stringify(book));
 });
  

public_users.get('/author/:author',function (req, res) {
   let book = books[req.params.author]
    res.send(JSON.stringify(book));
});


public_users.get('/title/:title',function (req, res) {
   let book = books[req.params.title]
    res.send(JSON.stringify(book));
});

public_users.get('/review/:isbn',function (req, res) {
  let book = books[req.params.isbn]
  res.send(JSON.stringify(book.reviews));
});

module.exports.general = public_users;
