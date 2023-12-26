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

const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb("Image only!");
    }
};

const upload = multer({ storage });

router.post('/', upload.single("image"), (req, res) => { // "image" for file.fieldname. we look for key:image in req.body from FE
    res.send({
        message: "Image uploaded",
        image: `/${req.file.path}`,
    });
});

export default router;