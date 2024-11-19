const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
const { handleCaseData, handleGetCaseData } = require("../controllers/caseData.controller");

const caseDataRoute = require("express").Router();

caseDataRoute.post("/", upload.single("excelFile"), handleCaseData);

caseDataRoute.get("/", handleGetCaseData);

module.exports = { caseDataRoute };
