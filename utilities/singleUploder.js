const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function singleUploader(
  subFolderName,
  allowedFileType,
  fileSizeLimit,
  errorMessage
) {
  const uploaderFolder = `${__dirname}/../public/uploads/${subFolderName}`;
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploaderFolder);
    },
    filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname);

      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });
  const upload = multer({
    storage,
    limits: {
      fileSize: fileSizeLimit,
    },
    fileFilter: (req, file, cb) => {
      if (allowedFileType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(errorMessage));
      }
    },
  });
  return upload;
}

module.exports = singleUploader;
