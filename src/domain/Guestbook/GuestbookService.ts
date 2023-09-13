import Guestbook from "../../Model/mongo/guestbook.model";
import { User } from "../../Model/postgres/blogUser.model";
import { verifyToken } from "../../utils/common/jwtUtil";
import { CustomError } from "../../utils/exception/CustomError";

export const createGuestbook = async (accessToken: string, content: string) => {
  try {
    const userData = verifyToken(accessToken);
    console.log(userData.data);
    const author = await User.findOne({
      where: {
        loginType: userData.data.loginType,
        email: userData.data.email,
      },
    });
    if (!author) {
      throw new CustomError("aaa");
    }
    console.log(author.dataValues.id);
    console.log(author.dataValues.name);
    console.log(content);
    const newGuestbook = await Guestbook.create({});
  } catch (error) {}
};
