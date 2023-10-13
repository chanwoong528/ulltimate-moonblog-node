//@ts-nocheck
const express = require("express");

import ERROR_CODE from "../../utils/constant/ERROR_CODE";
import RESPONSE_CODE from "../../utils/constant/RESPONSE_CODE";

import { isLoggedIn } from "../../middleware/AuthMiddleware";
import { createGuestbook, patchComment } from "./CommentService";

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

router.patch("/count", (req, res) => {
  const { id, type } = req.query;

  patchComment(id, type)
    .then((result) => {
      return res
        .status(RESPONSE_CODE["patch"](result).code)
        .send(RESPONSE_CODE["patch"](result));
    })
    .catch((error) => {
      return res
        .status(ERROR_CODE[error.name].code)
        .send(ERROR_CODE[error.name]);
    });
});

module.exports = router;
