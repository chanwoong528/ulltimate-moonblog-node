//@ts-nocheck
const express = require("express");

import ERROR_CODE from "../../utils/constant/ERROR_CODE";
import RESPONSE_CODE from "../../utils/constant/RESPONSE_CODE";
import { createUser, patchUser } from "./UserService";

import { genAccToken, genRefToken } from "../../utils/common/jwtUtil";
import { genPw } from "../../utils/common/bcryptUtil";

const router = new express.Router();

router.post("/", (req, res) => {
  const { loginType, email, pw, name } = req.body;
  const manipulatePw = genPw(loginType, pw);
  createUser(loginType, email, manipulatePw, name)
    .then((result) => {
      const accessToken = genAccToken(
        result.id,
        result.loginType,
        result.email,
        result.role,
        result.name
      );
      const refreshToken = genRefToken(
        result.id,
        result.loginType,
        result.email,
        result.role,
        result.name
      );
      res.cookie("access_token", accessToken);
      res.cookie("refresh_token", refreshToken);

      return res
        .status(RESPONSE_CODE["created"](result).code)
        .send(RESPONSE_CODE["created"](result));
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(ERROR_CODE[error.name].code)
        .send(ERROR_CODE[error.name]);
    });
});

module.exports = router;
