const { EXPERTIES } = require("../model/areaOfExperties.model");

const addExpertiers = async (req, res) => {
  const { name } = req.body;

  try {
    const expertise = new EXPERTIES({
      name,
    });
    await expertise.save();
    res.status(201).json({ message: "Expertise added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addExpertiers };
