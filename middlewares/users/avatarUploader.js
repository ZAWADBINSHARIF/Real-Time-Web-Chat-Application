const singleUploader = require("../../utilities/singleUploder");

const avatarUpload = (req, res, next) => {
  const upload = singleUploader(
    "avatars",
    ["image/jpg", "image/png", "image/jpeg"],
    1000000,
    "Only .jpg png or jpeg file allowed!"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message
          }
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avatarUpload