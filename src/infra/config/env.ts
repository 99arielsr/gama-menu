import "dotenv/config";

const ENV = {
  DATABASE: process.env.DATABASE as string,
  SECRET: process.env.SECRET as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL as string,
};

export default ENV;
