//@ts-nocheck
const postgresDbConfig = require("../../config/postgres.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  postgresDbConfig.DB,
  postgresDbConfig.USER,
  postgresDbConfig.PASSWORD,
  {
    host: postgresDbConfig.HOST,
    dialect: postgresDbConfig.dialect,
    port: postgresDbConfig.PORT,
    timezone: "+09:00",
    pool: {
      max: postgresDbConfig.pool.max,
      min: postgresDbConfig.pool.min,
      acquire: postgresDbConfig.pool.acquire,
      idle: postgresDbConfig.pool.idle,
    },
  }
);

const db = {};
db.blogUser = require("./postgres/blogUser.model")(sequelize, Sequelize);
db.category = require("./postgres/category.model")(sequelize, Sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.article = require("./ModelObject/article.model.js")(sequelize, Sequelize);
// db.user = require("./ModelObject/user.model.js")(sequelize, Sequelize);
// db.category = require("./ModelObject/category.model.js")(sequelize, Sequelize);

module.exports = db;
