const { addExpertiers } = require("../controllers/expert.controller");

const expertRoute = require("express").Router();

expertRoute.post("/", addExpertiers);

module.exports = { expertRoute };
