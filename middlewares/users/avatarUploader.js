const singleUploader = require("../../utilities/singleUploder");

const avatarUpload = (req, res, next) => {
  singleUploader(
    "avatar",
    ["image/jpg", "image/png", "image/jpeg"],
    1000000,
    "Only .jpg png or jpeg file allowed!"
  );

  avatarUpload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: err.message,
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avatarUpload