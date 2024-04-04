import express from 'express';
import upload from '../../middleware/multer';
import cloudinary from '../../utils/cloudinary';
import authMiddleWare from '../../middleware/authMiddleware';
import uploadImage from '../controllers/uploadImage';

const uploadRouter = express.Router();

uploadRouter.post('/', upload.single('image'), authMiddleWare, uploadImage);

export default uploadRouter;
