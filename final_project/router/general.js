const express = require("express");
const axios = require("axios");

const public_users = express.Router();

const BOOKS_API = "http://localhost:5000";

public_users.get("/", async (req, res) => {
  try {
    const response = await axios.get(BOOKS_API);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve books"
    });
  }
});

public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const response = await axios.get(
      `${BOOKS_API}/isbn/${req.params.isbn}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(404).json({
      message: "Book not found"
    });
  }
});

public_users.get("/author/:author", async (req, res) => {
  try {
    const response = await axios.get(BOOKS_API);
    const author = req.params.author;

    const matchingBooks = Object.values(response.data).filter(
      book => book.author === author
    );

    res.json(matchingBooks);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve books by author"
    });
  }
});

public_users.get("/title/:title", async (req, res) => {
  try {
    const response = await axios.get(BOOKS_API);
    const title = req.params.title;

    const matchingBooks = Object.values(response.data).filter(
      book => book.title === title
    );

    res.json(matchingBooks);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve books by title"
    });
  }
});

module.exports.general = public_users;
