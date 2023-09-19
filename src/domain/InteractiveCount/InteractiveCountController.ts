//@ts-nocheck
const express = require("express");

import ERROR_CODE from "../../utils/constant/ERROR_CODE";
import RESPONSE_CODE from "../../utils/constant/RESPONSE_CODE";
import {
  createOrPatchInteractive,
  getInteractiveCount,
} from "./InteractiveCountService";

const router = new express.Router();

router.get("/", (req, res) => {
  const { userId, contentId } = req.query;
  console.log(userId);
  getInteractiveCount(userId, contentId)
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
  const { userId, contentId, contentType, interactiveType } = req.body;
  createOrPatchInteractive(userId, contentId, contentType, interactiveType)
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
