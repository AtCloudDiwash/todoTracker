require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(bodyParser.json());

app.use("/", userRoutes);

app.use((req, res) => {
  res.status(404).json({ msg: "404 Error, Page not found" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
});
