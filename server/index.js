require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.connection");
const { userRoute } = require("./routes/user.route");
const { resetPasswordRoute } = require("./routes/resetpassword.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server health is good" });
});

app.use("/auth", userRoute);
app.use("/resetpassword", resetPasswordRoute);

const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`server is running on port ${port}`);
  await connection;
  console.log("db connected");
});
