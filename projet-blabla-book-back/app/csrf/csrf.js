const csrf = require("csurf");

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // Utiliser HTTPS en production
    sameSite: "Strict", // Protéger contre les attaques CSRF
  },
});

module.exports = csrfProtection;
