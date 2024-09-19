const { User, Book } = require("../models");
const { Model } = require("sequelize");
const sequelize = require("../sequelize-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key"); // Utilisation de require() pour importer la clé correctement

const userController = {
  async allUser(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "une erreur est survenue lors de la récupération des livres",
      });
    }
  },

  async oneUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "une erreur est survenue" });
    }
  },

  async getAllBookOfUser(req, res) {
    try {
      const userId = req.params.id;
      const userBooks = await Book.findAll({
        include: {
          model: User,
          association: "users_possessed",
          where: { id: userId },
          through: { attributes: [] },
        },
      });
      res.json(userBooks);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Une erreur est survenue lors de la récupération des livres",
      });
    }
  },

  async addBookToUser(req, res) {
    try {
      const userId = req.params.id;
      const bookId = req.params.bookId;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      const book = await Book.findByPk(bookId);

      if (!book) {
        return res.status(404).json({ error: "Livre non trouvé" });
      }

      await user.addBooks_possessed(book, {
        // through: { status: true }
      });
      res.status(200).json({ message: "livre ajouté" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Une erreur est survenue lors de la récupération des livres",
      });
    }
  },

  async deleteBookFromWishlist(req, res) {
    try {
      const userId = req.params.userId;
      const bookId = req.params.bookId;
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).send({ error: "Utilisateur non trouvé" });
        return;
      }
      const book = await Book.findByPk(bookId);
      if (!book) {
        res.status(404).send({ error: "Livre non trouvé" });
        return;
      }
      // console.log(Object.keys(book.__proto__));
      await user.removeBooks_want(book);
      res
        .status(200)
        .json({ message: "Livre supprimé de la liste d'envie avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "une erreur est survenue" });
    }
  },

  async signup(req, res) {
    try {
      // Optionnel : validation des données
      const { firstname, lastname, username, email, password } = req.body;

      if (!firstname || !lastname || !username || !email || !password) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
      }

      // Création de l'utilisateur
      const user = await User.create(req.body);

      // Suppression du mot de passe de la réponse
      const { password: _, ...userWithoutPassword } = user.toJSON();

      // Renvoi des informations de l'utilisateur sans le mot de passe
      res.json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  },

  async login(req, res) {
    try {
      // Validation des données
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
      }

      // Recherche de l'utilisateur par username et email
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }

      // Comparaison du mot de passe fourni avec celui stocké (haché) dans la base de données
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: "Mot de passe incorrect" });
      }

      // Si le mot de passe correspond, on crée un token JWT
      const token = jwt.sign({ userId: user.id }, privateKey, {
        expiresIn: "1h",
      });

      // Si le mot de passe correspond, retour succès (ex. message ou token JWT)
      const message = `Connexion réussie`;
      res.json({ message, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  },

  async updateUser(req, res) {
    try {
      console.log("Données reçues dans req.body:", req.body);
      const userId = req.params.id;

      // Vérifie si l'utilisateur existe
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      // Mise à jour de l'utilisateur
      const [updatedRows] = await User.update(req.body, {
        where: { id: userId },
      });

      console.log("Nombre de lignes modifiées:", updatedRows);

      if (updatedRows === 0) {
        return res.status(400).json({ error: "Aucune modification détectée" });
      }

      // Récupérer l'utilisateur mis à jour
      const updatedUser = await User.findByPk(userId);
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "Une erreur est survenue lors de la mise à jour de l'utilisateur",
      });
    }
  },

  async getUserWishlist(req, res) {
    try {
      const userId = req.params.id; // Récupère l'ID depuis les paramètres de l'URL

      // Vérifier si l'utilisateur existe
      const user = await User.findOne({
        where: { id: userId },
        include: { model: Book, as: "books_want" }, // Associe les livres via la relation 'want'
      });

      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      res.json(user.books_want); // Renvoie la wishlist
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  },

  async addBookToWishlist(req, res) {
    try {
      const { userId, bookId } = req.params; // Récupération des IDs de l'URL
      console.log("userId:", userId);
      console.log("bookId:", bookId);
      // Vérifier si l'utilisateur existe
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      // Vérifier si le livre existe
      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({ error: "Livre non trouvé" });
      }
      console.log(Object.keys(user.__proto__)); // Vérifie les méthodes disponibles pour `user`

      // Ajouter le livre à la wishlist via la table 'want'
      await user.addBooks_want(book); // Sequelize crée automatiquement la relation via la table 'want'

      // Récupérer la liste des livres avec la relation 'want' pour renvoyer l'utilisateur et ses livres
      const updatedUser = await User.findOne({
        where: { id: userId },
        include: { model: Book, as: "books_want" },
      });

      res.json(updatedUser); // Renvoyer l'utilisateur avec sa liste d'envies mise à jour
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  },

  async updateBookState(req, res) {
    try {
      console.log("Reçu dans le body : ", req.body);
      const userId = req.params.userId;
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).send({ error: "Utilisateur non trouvé" });
        return;
      }
      const bookId = req.params.bookId;
      const book = await Book.findByPk(bookId);
      if (!book) {
        res.status(404).send({ error: "Livre non trouvé" });
        return;
      }
      const newStatus = req.body.status;
      console.log(typeof newStatus);
      if (typeof newStatus !== "boolean") {
        return res
          .status(400)
          .send({ error: "Le statut doit être un booléen" });
      }

      await user.setBooks_possessed(book, { through: { status: newStatus } });

      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async deleteOneBookOfLibrary(req, res) {
    try {
      const userId = req.params.userId;
      const bookId = req.params.bookId;
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).send({ error: "Utilisateur non trouvé" });
        return;
      }
      const book = await Book.findByPk(bookId);
      if (!book) {
        res.status(404).send({ error: "Livre non trouvé" });
        return;
      }
      // console.log(Object.keys(book.__proto__));
      await user.removeBooks_possessed(book);
      res
        .status(200)
        .json({ message: "Livre supprimé de la bibliothèque avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "une erreur est survenue" });
    }
  },
  async logoutUser(req, res) {
    try {
      const userId = req.params.userId;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send({ error: "Utilisateur non trouvé" });
      }

      // Assure-toi que 'user' est bien défini avant d'appeler 'destroy'
      await user.destroy(); // <-- Vérifie cette ligne

      res.sendStatus(200);
    } catch (error) {
      console.error(
        "Erreur lors de la déconnexion de l'utilisateur :",
        error.message
      );
      res.status(500).send({ error: "Erreur serveur" });
    }
  },
  // async updateBookState(req, res) {
  //   try {
  //     console.log("Reçu dans le body : ", req.body);
  //     const userId = req.params.userId;
  //     const user = await User.findByPk(userId);
  //     if (!user) {
  //       res.status(404).send({ error: "Utilisateur non trouvé" });
  //       return;
  //     }
  //     const bookId = req.params.bookId;
  //     const book = await Book.findByPk(bookId);
  //     if (!book) {
  //       res.status(404).send({ error: "Livre non trouvé" });
  //       return;
  //     }
  //     const newStatus = req.body.status;
  //     console.log(typeof newStatus);
  //     if (typeof newStatus !== "boolean") {
  //       return res.status(400).send({ error: "Le statut doit être un booléen" });
  //     }

  //     await user.setBooks_possessed(book, { through: { status: newStatus } });

  //     res.sendStatus(200);
  //   } catch (error) {
  //     console.error(error);
  //     res.sendStatus(500);
  //   }
  // },

  async updateBookStateTest(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).send({ error: "Utilisateur non trouvé" });
        return;
      }
      const bookId = req.params.bookId;
      const book = await Book.findByPk(bookId);
      if (!book) {
        res.status(404).send({ error: "Livre non trouvé" });
        return;
      }

      const possessedRecord = await user.getBooks_possessed({
        where: { id: bookId },
      });

      if (possessedRecord.length === 0) {
        return res.status(404).send({
          error: "Le livre n'est pas dans la bibliothèque de l'utilisateur",
        });
      }

      const newStatus = req.body.status;
      if (typeof newStatus !== "boolean") {
        return res
          .status(400)
          .send({ error: "Le statut doit être un booléen" });
      }

      await user.addBooks_possessed(book, { through: { status: newStatus } });
      // await user.Books_possessed[0].Possessed.update({ status: newStatus });
      // const possessed = possessedRecord[0].possessed; // Accès à l'objet possessed
      // await possessed.update({ status: newStatus });

      console.log("Possessed Record: ", possessedRecord);
      console.log("New Status: ", newStatus);

      res.status(200).json({ message: "status modifié" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ errror: "status non modifié" });
    }
  },
};

module.exports = userController;
