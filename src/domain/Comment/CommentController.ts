//@ts-nocheck
const express = require("express");

import ERROR_CODE from "../../utils/constant/ERROR_CODE";
import RESPONSE_CODE from "../../utils/constant/RESPONSE_CODE";

import { isLoggedIn } from "../../middleware/AuthMiddleware";
import { createGuestbook, getGuestbooks } from "./CommentService";

const router = new express.Router();

router.post("/", isLoggedIn, (req, res) => {
  const { parentId } = req.query;
  const { content } = req.body;
  const accessToken = req.cookies.access_token;
  createGuestbook(accessToken, content, parentId)
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

router.get("/", (req, res) => {
  const { id, parentId } = req.query;
  getGuestbooks(id, parentId)
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

module.exports = router;
