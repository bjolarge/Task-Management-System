import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { resolve } from 'path';

@Injectable()

// export class CloudinaryService {
//   async uploadImage(
//     file: Express.Multer.File,
//   ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    
//     return new Promise((resolve, reject) => {
//       const upload = v2.uploader.upload_stream((error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       });
    
//       toStream(file.buffer).pipe(upload);
//     });
//   }
// }

export class CloudinaryService{
  constructor(){
    v2.config({
      cloud_name: 'de9ffqetm',
      api_key: '651867874917122',
      api_secret: 'Gfq2qQECLkpx8J0QQqLP7mRGunM',
    });
  }

  async uploadImage(
    filePath:string,
  ): Promise<UploadApiResponse| UploadApiErrorResponse>{
    return new Promise((resolve,reject)=>{
      v2.uploader.upload(filePath,{folder:'joeuploads'}, (error,result)=>{
        if(error) return reject(error);
        resolve(result);
      });
    });
    }
}