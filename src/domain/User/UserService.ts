import { User } from "../../Model/postgres/blogUser.model";
import { CustomError } from "../../utils/exception/CustomError";

export const getUsers = async (id?: string) => {
  try {
    if (!!id) {
      const oneUser = await User.findOne({ where: { id: id } });
      if (!oneUser) {
        throw new CustomError("NotFoundError", "result not found in database");
      }
      return oneUser.dataValues;
    } else {
      const allUsers = (await User.findAll()).map(
        (category) => category.dataValues
      );

      return allUsers;
    }
  } catch (error) {
    throw error;
  }
};
export const createUser = async (
  loginType: string,
  email: string,
  pw: string,
  name: string
) => {
  try {
    const newUser = await User.findOrCreate({
      where: {
        loginType,
        email,
      },
      defaults: {
        loginType,
        email,
        pw,
        name,
      },
    });
    return newUser[0].dataValues;
  } catch (error) {
    throw error;
  }
};
