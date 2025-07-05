import multer from "multer";
import path from "path";
import fs from "fs";

// Define a proper upload directory
const uploadPath = path.join(process.cwd(), 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadPath); // <- save files here
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    callback(null, uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

export default upload;
