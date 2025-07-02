import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
mongoose
  .connect(
    "mongodb+srv://kamalrajindtn:12345@cluster0.nfkcnos.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const dataSchema = mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
});

const model = mongoose.model("UserData", dataSchema);

app.use(
  cors({
    origin: "https://kamalrajms.github.io",
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/sayHello", (req, res) => {
  console.log(req);
  res.json({ message: "success" }).status(200);
});

app.post("/formSubmission", async (req, res) => {
  try {
    const { name, age, sex } = req.body;
    const newUser = new model({ name, age, sex });
    await newUser.save();

    res.json({ message: "success" }).status(200);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Listening");
});
