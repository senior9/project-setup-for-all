import dotenv from 'dotenv';
import path from 'path';

// Correct path to the .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Print all environment variables to debug
// console.log(process.env);

// Log the specific environment variable to check if it's defined
// console.log('DATABASE_URL:', process.env.DATABASE_URL);

export default {
  node_env:process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_pass:process.env.DEFAULT_PASS,
  bcrypt_salt_round:process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_token:process.env.JWT_ACCESS_SECRECT,
  jwt_refresh_token:process.env.JWT_REFRESH_SECRECT,
  jwt_access_token_expires_in:process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_token_expires_in:process.env.JWT_REFRESH_EXPIRES_IN,
  reset_password_link:process.env.RESET_PASSWORD_LINK,
  cloudinary_cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secrect:process.env.CLOUDINARY_API_SECRECT

};
