const { Book, User, Univers } = require("../models");
const userController = require("./userController");
const sequelize = require("../sequelize-client");

const bookController = {
  async allBook(req, res) {
    try {
      const books = await Book.findAll();
      res.json(books);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "Une erreur est survenue lors de la récupération des livres",
        });
    }
  },

  async getBooksByUnivers(req, res) {
    try {
      const universId = req.params.universId;

      const books = await Book.findAll({
        where: {
          univers_id: universId,
        },
      });
      res.json(books);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error:
            "Une erreur est survenue lors de la récupération des livres par univers",
        });
    }
  },
  async oneBook(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      res.json(book);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "une erreur est survenue lors de la sélection du livre",
        });
    }
  },
  async randomBooks(req, res) {
    try {
      const books = await Book.findAll({
        order: sequelize.random(),

        limit: 9,
      });

      console.log("texte erreur", sequelize.random());
      res.json(books);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "Une erreur est survenue lors de la sélection des livres",
        });
    }
  },
};

module.exports = bookController;
