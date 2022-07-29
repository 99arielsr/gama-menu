import {v2 as cloudinary} from "cloudinary";

export default class Conection {
  private api_key: string;
  private api_secret: string;
  private cloud_url: string;

  constructor(api_key: string, api_secret: string, cloud_url: string){
    this.api_key = api_key;
    this.api_secret = api_secret;
    this.cloud_url = cloud_url;
  }

  async createConection() {
    try {
      cloudinary.config({
        api_key: this.api_key,
        api_secret: this.api_secret,
        cloud_url: this.cloud_url,
      })
      console.log("Cloud conectado");
    } catch (error) {
      console.error(error);
    }
  }

}