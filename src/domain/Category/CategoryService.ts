//@ts-nocheck
import { Category } from "../../Model/postgres/category.model";
import { CustomError } from "../../utils/exception/CustomError";

export const getCates = async (id?: string) => {
  try {
    if (!!id) {
      const oneCategory = await Category.findOne({ where: { id: id } });
      if (!oneCategory) {
        throw new CustomError("NotFoundError", "result not found in database");
      }
      return oneCategory.dataValues;
    } else {
      const allCategories = (await Category.findAll()).map(
        (category) => category.dataValues
      );
      return allCategories;
    }
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (label: string, description: string) => {
  try {
    const newCategory = await Category.create({
      label: label,
      description: description,
    });

    return newCategory.dataValues;
  } catch (error) {
    throw error;
  }
};
export const patchCategory = async (
  categoryId: string,
  label?: string,
  description?: string
) => {
  try {
    const updatedCategory = await Category.update(
      { label: label, description: description },
      {
        where: {
          id: categoryId,
        },
      }
    );
    if (updatedCategory[0] < 1) {
      throw new CustomError("NotFoundError", "result not found in database");
    }
    return updatedCategory;
  } catch (error) {
    throw error;
  }
};
