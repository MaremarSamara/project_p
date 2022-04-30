const express = require("express");
const DrugController = require("../controller/index");
const DrugRouter = express.Router();
DrugRouter.get("/:drugName?", DrugController.getDrug);

module.exports = DrugRouter;