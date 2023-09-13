//@ts-nocheck
import jwt from "jsonwebtoken";

export const genRefToken = (loginType: string, email: string, role: string) => {
  const refreshToken = jwt.sign(
    { loginType, email, role },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 24 }
  );
  return refreshToken;
};

export const genAccToken = (loginType: string, email: string, role: string) => {
  const accessToken = jwt.sign(
    { loginType, email, role },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 15 }
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
