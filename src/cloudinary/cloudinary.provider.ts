import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => v2.config({
      cloud_name: 'de9ffqetm',
      api_key: '651867874917122',
      api_secret: 'Gfq2qQECLkpx8J0QQqLP7mRGunM',
  }),
};