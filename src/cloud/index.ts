import Conection from "./Conection";
import ENV from "../infra/config/env";

const cloudinaryConnection = new Conection(ENV.CLOUDINARY_API_KEY, ENV.CLOUDINARY_API_SECRET, ENV.CLOUDINARY_URL);
export { cloudinaryConnection }