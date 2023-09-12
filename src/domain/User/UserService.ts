import { User } from "../../Model/postgres/blogUser.model";
import { genAccToken, genRefToken } from "../../utils/common/jwtUtil";
import { CustomError } from "../../utils/exception/CustomError";

export const getUsers = async (
  id?: string,
  loginType?: string,
  email?: string
) => {
  try {
    if (!!id) {
      const oneUser = await User.findOne({ where: { id: id } });
      if (!oneUser) {
        throw new CustomError("NotFoundError", "result not found in database");
      }
      return oneUser.dataValues;
    } else if (!!loginType && !!email) {
      const oneUser = await User.findOne({ where: { email, loginType } });
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
    const newUser = await User.create({
      loginType,
      email,
      pw,
      name,
    });
    const accessToken = genAccToken(loginType, email, newUser.dataValues.role);
    const refreshToken = genRefToken(loginType, email, newUser.dataValues.role);
    delete newUser.dataValues["pw"];
    return { ...newUser.dataValues, accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

export const postLogin = async (loginType: string, email: string) => {
  try {
    let existingUser = await getUsers(loginType, email);
    console.log(existingUser);
  } catch (error) {}
};
