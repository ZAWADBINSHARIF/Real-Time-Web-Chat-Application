const singleUploader = require("../../utilities/singleUploder");

const avatarUpload = () => {
  singleUploader(
    "avatar",
    ["jpg", "png", "jpeg"],
    1000000,
    "Only .jpg png or jpeg file allowed"
  );
};

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
