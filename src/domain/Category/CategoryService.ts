//@ts-nocheck
import { Category } from "../../Model/postgres/category.model";

const getCates = async (req, res) => {
  console.log(await Category.findAll());
  return await Category.findAll();
};

const createCategory = async (req, res) => {
  return await Category.create({label:"aaa", description:"abcs"});
};

export { getCates, createCategory };
