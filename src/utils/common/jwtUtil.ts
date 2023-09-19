//@ts-nocheck
import jwt from "jsonwebtoken";

export const genRefToken = (
  id: string,
  loginType: string,
  email: string,
  role: string,
  name: string
) => {
  const refreshToken = jwt.sign(
    { id, loginType, email, role, name },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 24 }
    // { expiresIn: 1 }
  );
  return refreshToken;
};

export const genAccToken = (
  id: string,
  loginType: string,
  email: string,
  role: string,
  name: string
) => {
  const accessToken = jwt.sign(
    { id, loginType, email, role, name },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 15 }
    // { expiresIn: 1 * 10 }
  );
  return accessToken;
};

export const verifyToken = (token: string) => {
  const decodedJWT = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        //TokenExpiredError
        //JsonWebTokenError
        return { validity: false, data: err.name };
      }
      return { validity: true, data: decoded };
    }
  );
  return decodedJWT;
};
