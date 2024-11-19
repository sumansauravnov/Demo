const xlsx = require("xlsx");
const { CASEDATA } = require("../model/caseData.model");

const handleCaseData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { clientName, clientId } = req.body;

    if (!clientName || !clientId) {
      return res.status(400).json({ message: "Client details are required" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const defaultersData = xlsx.utils.sheet_to_json(sheet);

    if (defaultersData.length === 0) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    const transformedDefaulters = defaultersData.map((row) => ({
      name: row.name || "",
      emailId: row.emailId || "",
      contactNo: row.contactNo || "",
      accountNo: row.accountNo || "",
      amount: Number(row.amount) || 0,
      caseStatus: "Pending",
      decision: "",
      decisionDate: null,
      remarks: row.remarks || "",
      isArbitrated: false,
      isPaid: false,
      isClosed: false,
    }));

    const newCaseData = new CASEDATA({
      clientName,
      clientId,
      fileName: req.file.originalname,
      defaulters: transformedDefaulters,
      caseCount: transformedDefaulters.length,
    });

    await newCaseData.save();

    return res.json({
      message: `Successfully uploaded ${transformedDefaulters.length} records`,
      success: true,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).json({
      message: "Error processing file",
      error: error.message,
    });
  }
};



const handleGetCaseData = async  (req,res)=>{
  try {
    const cases = await CASEDATA.find()
    res.status(200).json({ cases });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { handleCaseData, handleGetCaseData };
