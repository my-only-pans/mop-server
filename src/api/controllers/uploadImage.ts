import { Request, Response } from 'express';
import cloudinary from '../../utils/cloudinary';

export default function (req: any, res: Response) {
  cloudinary.uploader.upload(req.file.path, function (err: any, result: any) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'Error',
      });
    }

    res.status(200).json({ url: result.url });
  });
}
