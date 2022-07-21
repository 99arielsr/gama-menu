import IRepository from "../IRepository";
import IImages from "./IImages";
import { Model } from "mongoose";

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
  
  async find(payload?: any) {}
  async update(payload: any) {}
  async findAll(payload?: any) {}
  async findById(id: any) {}
  async delete(id: any) {}
}