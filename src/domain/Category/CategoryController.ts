//@ts-nocheck
import { getCates } from "./CategoryService";
import ERROR_CODE from "../../utils/constant/ERROR_CODE";
import RESPONSE_CODE from "../../utils/constant/RESPONSE_CODE";

const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  const { id } = req.query;

  getCates(id)
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
