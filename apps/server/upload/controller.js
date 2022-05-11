const path = require("path");
const { uploadFile } = require("./middlewares");
const { rename } = require("fs/promises");

const upload = async (req, res, next) => {
  if (!req.file) {
    res.status(404).send("no file found");
  } else {
    try {
      const {
        file: { destination, originalname, path: oldFile },
      } = req;

      await rename(oldFile, path.join(destination, originalname));
      res.sendStatus(200);
    } catch (error) {
      console.error("error saving file '%s'", req.file.filename);
      console.error(error);
      res.sendStatus(500);
    }
  }
};

module.exports = {
  upload: [uploadFile("file", process.env.FILE_DEST), upload],
};
