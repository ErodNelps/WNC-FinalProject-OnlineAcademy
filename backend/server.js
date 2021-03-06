const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");

// set up express
// pP7Tx6reSo265ktW
const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize()); 
require("./middleware/passport");
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes
app.use("/users", require("./routes/userRouter"));
app.use("/courses", require("./routes/courseRouter"));
app.use("/category", require("./routes/categoryRouter"));
app.use("/subcategory", require("./routes/subCategoryRouter"))
app.use("/student", require("./routes/studentCourseRouter"))
app.use("/media", require("./routes/mediaRouter"))