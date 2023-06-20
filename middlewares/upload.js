const multer = require("multer");
const path = require("path");

const tmpDirPath = path.join(__dirname, "..", "tmp");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDirPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
