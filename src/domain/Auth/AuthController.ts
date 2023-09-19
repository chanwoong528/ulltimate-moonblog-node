//@ts-nocheck
const express = require("express");

import ERROR_CODE from "../../utils/constant/ERROR_CODE";
import RESPONSE_CODE from "../../utils/constant/RESPONSE_CODE";

import { getUsers } from "../User/UserService";
import { isLoggedIn } from "../../middleware/AuthMiddleware";

import {
  verifyToken,
  genAccToken,
  genRefToken,
} from "../../utils/common/jwtUtil";

const router = new express.Router();

//for test jwt
router.get("/", isLoggedIn, (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});
//for test jwt

//generate Access token based on RefreshToken
router.post("/token", (req, res) => {
  const refreshToken = req.body.refresh_token;
  const decoded = verifyToken(refreshToken);

  if (!decoded.validity) {
    return res
      .status(ERROR_CODE[decoded.data].code)
      .send(ERROR_CODE[decoded.data]);
  }
  const { id, loginType, email, role } = decoded.data;
  const newAccessToken = genAccToken(id, loginType, email, role);
  res.cookie("access_token", newAccessToken);
  return res
    .status(RESPONSE_CODE["created"]({ loginType, email, role }).code)
    .send(RESPONSE_CODE["created"]({ loginType, email, role, newAccessToken }));
});

//login with [email/pw] or [snsLogin]
router.post("/", (req, res) => {
  const { loginType, email, pw } = req.body;
  getUsers(undefined, loginType, email, pw)
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
      delete result.pw;
      return res
        .status(RESPONSE_CODE["authorized"](result).code)
        .send(RESPONSE_CODE["authorized"](result));
    })
    .catch((error) => {
      return res
        .status(ERROR_CODE[error.name].code)
        .send(ERROR_CODE[error.name]);
    });
});

module.exports = router;
