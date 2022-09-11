const express = require("express");

const multer = require("multer");

const { UpdateUserAvata } = require("../src/models/user");
const { UpdateCategoryAvata } = require("../src/models/category");
const { UpdateImageManufacturer } = require("../src/models/manufacturer");

const Router = express.Router();

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./src/public/upload");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `image-${Date.now()}.${ext}`);
  },
});
const multerConfigImageProduct = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./src/public/upload/Product");
  },
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}`);
  },
});
const multerConfigImageNews = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./src/public/upload/News");
  },
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Chỉ hình ảnh mới được chấp nhận"));
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage,
});
const uploadImageProduct = multer({
  storage: multerConfigImageProduct,
  fileFilter: isImage,
});
const uploadImageNews = multer({
  storage: multerConfigImageNews,
  fileFilter: isImage,
});

Router.post("/image/user/:id", upload.single("photo"), async (req, res) => {
  const result = await UpdateUserAvata(req.file.filename, req.params.id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Cập nhật thất bại",
    });
  }
});
Router.post("/image/category/:id", upload.single("photo"), async (req, res) => {
  const result = await UpdateCategoryAvata(req.file.filename, req.params.id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Cập nhật thất bại",
    });
  }
});
Router.post("/image/brand/:id", upload.single("photo"), async (req, res) => {
  const result = await UpdateImageManufacturer(
    req.file.filename,
    req.params.id
  );
  if (result) {
    res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Cập nhật thất bại",
    });
  }
});
Router.post(
  "/image/product",
  uploadImageProduct.single("photo"),
  async (req, res) => {
    res.status(200).json({
      success: true,
      message: "Đã thêm ảnh sản phẩm",
      // fileName: req.file.filename,
    });
  }
);
Router.post(
  "/image/news",
  uploadImageNews.single("photo"),
  async (req, res) => {
    res.status(200).json({
      success: true,
      message: "Đã thêm ảnh tin tức",
      // fileName: req.file.filename,
    });
  }
);

module.exports = Router;
