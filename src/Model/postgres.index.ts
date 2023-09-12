//@ts-nocheck
const postgresDbConfig = require("../config/postgres.config");
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
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
const blogUser = require("./postgres/blogUser.model")(sequelize, Sequelize);
// const category = require("./postgres/category.model")(sequelize, Sequelize);
const category = require("./postgres/category.model");
export const db = {
  Sequelize: Sequelize,
  sequelize,
  blogUser: blogUser,
  category: category,
};

Object.keys(db).forEach((model) => {
  if ("associate" in db[model]) {
    db[model].associate(db);
  }
});
