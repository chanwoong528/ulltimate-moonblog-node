import { User } from "../../Model/postgres/blogUser.model";
import { CustomError } from "../../utils/exception/CustomError";
import { comparePw } from "../../utils/common/bcryptUtil";

export const getUsers = async (
  id?: string,
  loginType?: string,
  email?: string,
  pw?: string
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
      if (loginType === "email" && !!pw) {
        const pwResult = await comparePw(pw, oneUser.dataValues.pw);
        if (!pwResult)
          throw new CustomError("PasswordIncorrectError", "Password incorrect");
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
    const existingUser = await User.findOne({ where: { email, loginType } });
    if (!!existingUser) {
      delete existingUser.dataValues["pw"];
      return existingUser.dataValues;
    }
    const newUser = await User.create({
      loginType,
      email,
      pw,
      name,
    });
    delete newUser.dataValues["pw"];
    return newUser.dataValues;
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

export const patchUser = async (
  id: string,
  pw?: string,
  name?: string,
  role?: string,
  active?: string,
  verified?: string,
  marketingConsent?: string,
  privacyConsent?: string
) => {
  try {
    const updatedUser = await User.update(
      {
        ...(!!pw && { pw }),
        ...(!!name && { name }),
        ...(!!role && { role }),
        ...(!!active && { active }),
        ...(verified && { verified }),
        ...(marketingConsent && { marketingConsent }),
        ...(privacyConsent && { privacyConsent }),
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (updatedUser[0] < 1) {
      throw new CustomError("NotFoundError", "result not found in database");
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
