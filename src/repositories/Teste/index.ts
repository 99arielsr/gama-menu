import IRepository from "../IRepository";
import { ITeste } from "../../models/Teste";
import { Model, Schema } from "mongoose";

export default class TesteRepository implements IRepository {
  private testeModel: any;
  static testeModel: any;
  constructor(testeModel: Model<ITeste>) {
    this.testeModel = testeModel;
  }
  async create(payload: { name: string; email: string; password: string }) {
    return this.testeModel.create(payload);
  }

  async find() {
    return this.testeModel.find({}, ["-senha", "-__v"]);
  }

  async findOne(id: any) {
    return this.testeModel.findById(id, ["-senha", "-__v"]);
  }

  async update(
    id: any,
    payload: {
      name: string;
      email: string;
      password: string;
    }
  ) {
    return await this.testeModel.findByIdAndUpdate({ _id: id }, payload);
  }

  async deleteOne(id: any) {
    return await this.testeModel.findByIdAndDelete({ _id: id });
  }

  async count(payload: any) {
    return await this.testeModel.count(payload);
  }
}
