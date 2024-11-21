const { createMeetings } = require("../controllers/meeting.controller");

const meetingRoute = require("express").Router();

meetingRoute.post("/", createMeetings);

// meetingRoute.post("/join", joinMeetings);

module.exports = { meetingRoute };
