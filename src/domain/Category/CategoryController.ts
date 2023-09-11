//@ts-nocheck
import { getCates, createCategory } from "./CategoryService";
const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  getCates(req, res);
});

router.post("/", (req, res) => {
  createCategory(req, res);
});

module.exports = router;
