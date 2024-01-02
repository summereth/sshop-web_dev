import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Set storage address on server
const storage = multer.diskStorage({
    // set up path destination
    destination (req, file, cb) {
        cb(null, 'uploads/'); // cb for callback, null for error
    },
    // set up filename format
    filename (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpg|jpeg|png|webp/;
    const mimetypes = /image\/jpg|image\/jpeg|image\/png|image\/webp/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);
    
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Image only!"), false);
    }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image"); // "image" for file.fieldname. we look for key:image in req.body from FE

router.post('/', (req, res) => {
    uploadSingleImage(req, res, (err) => {
      if (err) {
        return res.status(400).send({ message: err.message });
      }
  
      res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`,
      });
    });
  });

export default router;