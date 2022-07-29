import IRepository from "../IRepository";
import { Model } from "mongoose";
import { IImages } from "../../models/Images";

export default class ImageRepository implements IRepository {
  private imageModel: any;
  constructor(imageModel: Model<IImages>) {
    this.imageModel = imageModel;
  }
  async create(payload: { link: string; nome: string; descricao: string }) {
    return this.imageModel.create(payload);
  }

  async find() {
    return this.imageModel.find();
  }

  async findOne(id: any) {
    return this.imageModel.findById(id);
  }

  async update(
    id: any,
    payload: {
      link: string;
      nome: string;
      descricao: string;
    }
  ) {
    await this.imageModel.findByIdAndUpdate({ _id: id }, payload);
  }

  async deleteOne(id: any) {
    return await this.imageModel.deleteOne({ _id: id });
  }
}
