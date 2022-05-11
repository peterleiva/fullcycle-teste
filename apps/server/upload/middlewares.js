const path = require("path");
const multer = require("multer");
const { mkdirSync } = require("fs");

exports.uploadFile = function uploadFile(
  filename,
  dest = path.resolve(__dirname, "../uploads")
) {
  mkdirSync(dest, { recursive: true, mode: 0o700 });

  return multer({ dest }).single(filename);
};
