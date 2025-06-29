import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from "fs";
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

 // Configuration
    cloudinary.config({ 
        cloud_name: config.cloudinary_cloud_name, 
        api_key: config.cloudinary_api_key, 
        api_secret: config.cloudinary_api_secrect // Click 'View API Keys' above to copy your API secret
    });
export const sendImageToCloudinary = async(imageName:string,path:string)=>{
     try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });
    // Delete local file after successful upload
    fs.unlink(path, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      } else {
        console.log("Local file deleted successfully:", path);
      }
    });

    return uploadResult;
  } catch (error) {
    console.error("Upload failed:", error);
    throw new AppError(httpStatus.BAD_REQUEST,'Upload failed');
  }
}

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd()+'/upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ storage: storage })