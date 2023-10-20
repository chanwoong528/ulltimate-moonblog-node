//@ts-nocheck

import ERROR_CODE from "../../utils/constant/ERROR_CODE";
import RESPONSE_CODE from "../../utils/constant/RESPONSE_CODE";
import { getPosts } from "./PostService";
import OpenAI from "openai";

const express = require("express");
const router = new express.Router();
const openai = new OpenAI({
  organization: "org-hJLENY4679XPtJ4fnRyJBXEi",
  apiKey: process.env.OPENAI_API_KEY,
});
router.get("/", (req, res) => {
  const { id, categoryId } = req.query;
  getPosts(id, categoryId)
    .then((result) => {
      openai.chat.completions
        .create({
          model: "gpt-3.5-turbo-16k",
          messages: [
            {
              role: "user",
              content: "Say hi",
            },
          ],
          max_tokens: 2048,
        })
        .then((result) => {
          console.log(result.choices);
          return result.choices;
        });
    })
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
// router.patch("/:postId", (req, res) => {
//   const { postId } = req.params;
//   const { titleEng, contentEng, titleKor, contentKor } = req.body;
//   patchPost(postId, titleEng, contentEng, titleKor, contentKor)
//     .then((result) => {
//       return res
//         .status(RESPONSE_CODE["patch"](result).code)
//         .send(RESPONSE_CODE["patch"](result));
//     })
//     .catch((error) => {
//       return res
//         .status(ERROR_CODE[error.name].code)
//         .send(ERROR_CODE[error.name]);
//     });
// });

module.exports = router;
