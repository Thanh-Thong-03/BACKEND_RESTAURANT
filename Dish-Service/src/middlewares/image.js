const cloudinary = require("../config/cloudinary"); // Assuming cloudinary config is here
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
class ImageUploadMiddleware {
  constructor() {
    this.storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      folder: "BANK", // Adjust folder name as needed
      allowedFormats: ["jpg", "png", "jpeg"],
      transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional image transformations
    });
  }

  uploadImage(fieldName, maxCount) {
    const upload = multer({ storage: this.storage }).fields([
      { name: fieldName, maxCount: maxCount },
    ]);
    return (req, res, next) => {
      upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({ message: "Error uploading image" });
        }
        next();
      });
    };
  }

  getImagePath(req) {
    const uploadedImage = req.files["dish_img"][0];
    if (!uploadedImage) {
      throw new Error("No image uploaded");
    }
    return uploadedImage.path;
  }

}
module.exports = ImageUploadMiddleware;
