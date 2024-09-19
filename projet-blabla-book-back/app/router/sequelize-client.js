const { Sequelize } = require("sequelize");

// Ceci est une instance de connexion à la BDD Postgres (c'est notre "client")
const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  define: {
    // createdAt: "created_at", // Dans notre table et côté JS, le champ 'createdAt' s'appelle `create_at`
    // updatedAt: "updated_at" // Comme on va avoir plusieurs models, on peut aussi mettre cette liaison directement dans l'instance sequelize
    underscored: true, // coté JS les TS restent createdAt et updatedAt mais dans la db, les colonnes responsantes s'appellent created_at et updated_at
  },
});

// Note : même pas besoin de faire le `connect()`. Par défaut, il se connecte à la base.

module.exports = sequelize;

(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
