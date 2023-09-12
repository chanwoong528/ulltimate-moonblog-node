//@ts-nocheck
import Sequelize from "sequelize";
import { sequelize } from "../postgres.index.ts";

export const Category = sequelize.define(
  "category",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    label: {
      type: Sequelize.STRING,
      require: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: Sequelize.STRING,
      require: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["label"], // Whatever other field you need to make unique
      },
    ],
  }
);

// module.exports = (sequelize, Sequelize) => {
//   const category = sequelize.define("category", {
//     id: {
//       type: Sequelize.UUID,
//       defaultValue: Sequelize.UUIDV4,
//       primaryKey: true,
//     },
//     label: {
//       type: Sequelize.STRING,

//       require: true,
//     },
//     description: {
//       type: Sequelize.STRING,
//       require: true,
//     },
//   });

//   return category;
// };
