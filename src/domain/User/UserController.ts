//@ts-nocheck
const express = require("express");

import ERROR_CODE from "../../utils/constant/ERROR_CODE";
import RESPONSE_CODE from "../../utils/constant/RESPONSE_CODE";
import { getUsers, createUser, patchUser } from "./UserService";

import { genAccToken, genRefToken } from "../../utils/common/jwtUtil";
import { genPw } from "../../utils/common/bcryptUtil";

const router = new express.Router();

router.get("/", (req, res) => {
  const { id } = req.query;

  getUsers(id)
    .then((result) => {
      return res
        .status(RESPONSE_CODE["retrieve"](result).code)
        .send(RESPONSE_CODE["retrieve"](result));
    })
    .catch((error) => {
      return res
        .status(ERROR_CODE[error.name].code)
        .send(ERROR_CODE[error.name]);
    });
});
router.post("/", (req, res) => {
  const { loginType, email, pw, name } = req.body;
  const manipulatePw = genPw(loginType, pw);
  createUser(loginType, email, manipulatePw, name)
    .then((result) => {
      const accessToken = genAccToken(
        result.loginType,
        result.email,
        result.role
      );
      const refreshToken = genRefToken(
        result.loginType,
        result.email,
        result.role
      );
      res.cookie("access_token", accessToken);
      res.cookie("refresh_token", refreshToken);

      return res
        .status(RESPONSE_CODE["created"](result).code)
        .send(RESPONSE_CODE["created"](result));
    })
    .catch((error) => {
      return res
        .status(ERROR_CODE[error.name].code)
        .send(ERROR_CODE[error.name]);
    });
});
router.patch("/:userId", (req, res) => {
  const { userId } = req.params;
  const {
    loginType,
    pw,
    name,
    role,
    active,
    verified,
    marketingConsent,
    privacyConsent,
  } = req.body;
  if (!!userId)
    return res
      .status(ERROR_CODE["NotFoundError"].code)
      .send(ERROR_CODE["NotFoundError"]);
  const manipulatePw = genPw(loginType, pw);

  patchUser(
    userId,
    manipulatePw,
    name,
    role,
    active,
    verified,
    marketingConsent,
    privacyConsent
  )
    .then((result) => {
      return res
        .status(RESPONSE_CODE["patch"](userId).code)
        .send(RESPONSE_CODE["patch"](userId));
    })
    .catch((error) => {
      return res
        .status(ERROR_CODE[error.name].code)
        .send(ERROR_CODE[error.name]);
    });
});

// router.post("/auth", (req,res)=>{
//   const { loginType, email, pw, name } = req.body;
// })

module.exports = router;
