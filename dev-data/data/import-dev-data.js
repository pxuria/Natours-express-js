const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Tour = require("../../models/tourModel.js");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then(() => console.log("DB Conneted"));

// reading json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"));

// import data
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("data successfully created");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") importData();
else if (process.argv[2] === "--delete") deleteData();
console.log(process.argv);
