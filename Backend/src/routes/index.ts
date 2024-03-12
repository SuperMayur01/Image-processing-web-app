import express from 'express';
import { handleRequest, validateQuery, sendAllImages } from './api/image';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./assets")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const uploadStorage = multer({ storage: storage })

//route to get processed image
router.get('/image', validateQuery, handleRequest);
router.get('/getAllImages', sendAllImages);

//Upload Multiple files
router.post("/upload", uploadStorage.array("file", 10), (req: express.Request, res: express.Response) => {
    return res.json({message: "File Uploaded"})
})

export default router;
