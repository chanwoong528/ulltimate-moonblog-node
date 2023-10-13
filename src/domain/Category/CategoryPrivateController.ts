//@ts-nocheck
import { createCategory, patchCategory } from "./CategoryService";
import ERROR_CODE from "../../utils/constant/ERROR_CODE";
import RESPONSE_CODE from "../../utils/constant/RESPONSE_CODE";

const express = require("express");
const router = new express.Router();

router.post("/", (req, res) => {
  const { label, description } = req.query;

  createCategory(label, description)
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

router.patch("/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  const { label, description } = req.body;
  if (!!categoryId)
    return res
      .status(ERROR_CODE["NotFoundError"].code)
      .send(ERROR_CODE["NotFoundError"]);

  patchCategory(categoryId, label, description)
    .then((result) => {
      return res
        .status(RESPONSE_CODE["patch"](categoryId).code)
        .send(RESPONSE_CODE["patch"](categoryId));
    })
    .catch((error) => {
      return res
        .status(ERROR_CODE[error.name].code)
        .send(ERROR_CODE[error.name]);
    });
});
module.exports = router;
