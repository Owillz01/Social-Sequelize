const { db, DataTypes, Model } = require("../db/connection");

class Like extends Model {}

Like.init(
  {
    reactionType: DataTypes.STRING,
    createdAt: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "Like",
  }
);
module.exports = Like;
