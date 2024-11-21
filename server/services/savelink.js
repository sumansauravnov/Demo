const { CASEDATA } = require("../model/caseData.model");

const saveTheLink = async (link, caseid) => {
  try {
    const cases = await CASEDATA.findById(caseid);
    cases.meetLinks.push(link);
    await cases.save();
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { saveTheLink };
