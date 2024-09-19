require("dotenv").config();

const { Book } = require("./app/models");

async function main() {
  const books = await Book.findAll();
  console.log(books);
}

main();
