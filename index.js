const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectToMongo = require("./config/db.js");

connectToMongo();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  return res.status(200).send("Welcome To The Back-End Of PostGenerator");
});

app.use("/user", require("./routes/user.js"));
app.use("/dec", require("./routes/declaration.js"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
