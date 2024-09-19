// Importer les dépendances
const express = require("express");
const bodySanitizer = require("./app/sanitize/sanitize");
const cors = require("cors");
require("dotenv").config(); // Charger les variables d'environnement
// const csrf = require("csurf");
const cookieParser = require("cookie-parser");
// const csrfProtection = require("./app/csrf/csrf");
// Création de l'application express
const app = express();

// Middleware pour gérer les cookies
app.use(cookieParser());

// Configuration de la protection CSRF
// const csrfProtection = csrf({
//   cookie: {
//     httpOnly: true,
//     // secure: process.env.NODE_ENV === "production", // Utiliser HTTPS en production
//     sameSite: "Strict", // Protéger contre les attaques CSRF
//   },
// });

// Middleware CORS
const corsOptions = {
  origin: "http://localhost:5173", // Seules ces URL et IP sont autorisées à y accéder
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"], // Méthodes HTTP autorisées
  allowedHeaders: ["Content-Type", "Accept", "Authorization"], // En-têtes autorisés
  optionsSuccessStatus: 200, // Réponse
};
app.use(cors(corsOptions));

// On expose le contenu du dossier public
app.use(express.static("public")); // Cela expose le contenu du dossier public

// Middleware pour parser les requêtes JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodySanitizer);
// Route pour obtenir le token CSRF (nécessaire pour les requêtes côté client)
// app.get("/csrf-token", csrfProtection, (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

// Importer les routes après la création de l'application
const router = require("./app/router/router");
app.use(router);

// Lancer l'application
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Listening at http://localhost:${port}`);
});
