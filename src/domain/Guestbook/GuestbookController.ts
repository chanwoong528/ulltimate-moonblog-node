//@ts-nocheck
const express = require("express");

import ERROR_CODE from "../../utils/constant/ERROR_CODE";
import RESPONSE_CODE from "../../utils/constant/RESPONSE_CODE";

import { isLoggedIn } from "../../middleware/AuthMiddleware";
import { createGuestbook } from "./GuestbookService";

const router = new express.Router();

router.post("/", isLoggedIn, (req, res) => {
  const { content } = req.body;
  const accessToken = req.cookies.access_token;
  createGuestbook(accessToken, content);
});

module.exports = router;
