//@ts-nocheck

const express = require("express");
const bcrypt = require("bcrypt");

import ERROR_CODE from "../../utils/constant/ERROR_CODE";
import RESPONSE_CODE from "../../utils/constant/RESPONSE_CODE";
import { getUsers, createUser } from "./UserService";

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

  const manipulatePw =
    loginType === "email"
      ? bcrypt.hashSync(pw, Number(process.env.BCRYPT_SALT_ROUND))
      : `snsSignInPw:${loginType}`;
  createUser(loginType, email, manipulatePw, name)
    .then((result) => {
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

module.exports = router;
