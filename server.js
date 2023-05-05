require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");

const app = require("./app");

const DB = process.env.MONGODB_DATABASE_URL.replace(
  "<password>",
  process.env.MONGODB_DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(process.env.NODE_ENV);
  console.log(`Server running on  http://127.0.0.1:${port}`);
});
