const Book = require("./Book");
const User = require("./User");
const Univers = require("./Univers");

Univers.hasMany(Book, {
  foreignKey: "univers_id",
  as: "books_univers",
});
Book.belongsTo(Univers, {
  foreignKey: "univers_id",
  as: "univers",
});

User.belongsToMany(Book, {
  through: "possessed",
  as: "books_possessed",
  foreignKey: "user_id",
});
Book.belongsToMany(User, {
  through: "possessed",
  as: "users_possessed",
  foreignKey: "book_id",
});

User.belongsToMany(Book, {
  through: "want",
  as: "books_want",
  foreignKey: "user_id",
});
Book.belongsToMany(User, {
  through: "want",
  as: "users_want",
  foreignKey: "book_id",
});

module.exports = { Book, User, Univers };
