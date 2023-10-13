//@ts-nocheck

import ERROR_CODE from "../../utils/constant/ERROR_CODE";
import RESPONSE_CODE from "../../utils/constant/RESPONSE_CODE";

import { createPost,  patchPost } from "./PostService";

const express = require("express");
const router = new express.Router();

router.post("/", (req, res) => {
  const { categoryId, titleEng, contentEng, titleKor, contentKor } = req.body;
  createPost(categoryId, titleEng, contentEng, titleKor, contentKor)
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

router.patch("/:postId", (req, res) => {
  const { postId } = req.params;
  const { titleEng, contentEng, titleKor, contentKor } = req.body;
  patchPost(postId, titleEng, contentEng, titleKor, contentKor)
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
