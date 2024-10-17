const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

// Set file type restrictions (e.g., only images)
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
  
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb('Error: Only images are allowed');
    }
  };
  
  // Set upload limits (e.g., file size limit)
  const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },  // file size limit - 5mb
    fileFilter,
  });
  
  module.exports = upload;