const path = require("path");
const multer = require("multer");
const express = require("express");


const PORT = 8000;
const app = express();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});


const upload = multer({ storage: storage });
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json()); //user to parse json data
app.use(express.urlencoded({ extended: true })); //user to parse form data


app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.send("File uploaded successfully");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});