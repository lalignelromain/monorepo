const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-client");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "user",
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

// User.associate = (models) => {
//     User.belongsToMany(models.Book, {
//         through: "possessed",
//         as: "books_possessed",
//         foreignKey: "user_id",
//         otherKey: "book_id"
//       });
// }

module.exports = User;
