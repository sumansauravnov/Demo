require("dotenv").config();
const { default: axios } = require("axios");
const { CASEDATA } = require("../model/caseData.model");
const { saveTheLink } = require("../services/savelink");

const createMeetings = async (req, res) => {
  const { caseId, startTime, endTime, title, description } = req.body;
  try {
    const cases = await CASEDATA.findById(caseId);
    let token = process.env.WEBEX_TOKEN;
    console.log(cases.arbitratorEmail);
    axios
      .post(
        "https://webexapis.com/v1/meetings",
        {
          meetingType: "personal",
          title,
          agenda: description,
          start: startTime,
          end: endTime,
          enabledAutoRecordMeeting: true,
          enabledJoinBeforeHost: false,
          unlockedMeetingJoinSecurity: "allowJoinWithLobby",
          enableAutomaticLock: true,
          automaticLockMinutes: 0,
          allowAnyUserToBeCoHost: false,
          allowFirstUserToBeCoHost: false,
          hostEmail: "vikram0104irctc@gmail.com",
          enabledBreakoutSessions: true,
          timezone: "Asia/Kolkata",
          attendees: [
            {
              email: cases.arbitratorEmail,
              role: "prsenter",
            },
          ],
        },
        {
          headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        saveTheLink(response.data.webLink, caseId);
        res.status(200).json({
          message: "Meeting created successfully",
          data: response.data,
        });
      })
      .catch((error) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createMeetings };
