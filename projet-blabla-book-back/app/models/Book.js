const {Model, DataTypes} = require("sequelize");
const sequelize = require("../sequelize-client");

class Book extends Model {}    

Book.init({
   
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_publication: {
        type: DataTypes.DATE,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    summary: {
        type: DataTypes.STRING
    }
    }, {
        
    
    sequelize,
    tableName: "book"
});

// Book.associate = (models) => {
//     Book.belongsToMany(models.User, {
//         through: "possessed",
//         as: "users_possessed",
//         foreignKey: "book_id",
//         otherKey: "user_id"
//       });
// }
module.exports = Book;