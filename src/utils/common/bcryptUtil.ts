const bcrypt = require("bcrypt");

export const genPw = (loginType: string, pw: string) => {
  if (loginType === "email") {
    return bcrypt.hashSync(pw, Number(process.env.BCRYPT_SALT_ROUND));
  }
  return `snsSignInPw:${loginType}`;
};

export const comparePw = async (pw: string, hashedPw: string) => {
  const match = await bcrypt.compare(pw, hashedPw);
  if (match) {
    return true;
  }
  return false;
};
