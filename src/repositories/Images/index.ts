import IRepository from "../IRepository";
import { Model } from "mongoose";
import { IImages } from "../../models/Images";

export default class ImageRepository implements IRepository {
  private imageModel: any;
  constructor(imageModel: Model<IImages>) {
    this.imageModel = imageModel;
  }
  async create(
    payload: { 
      link: string; 
      nome: string;
    }
  ){
    return this.imageModel.create(payload);
  }
  
  async find() {
    return this.imageModel.find();
  }

  async findOne(payload: any) {}
  async update(payload: any) {}
  async delete(payload: any) {}
}
