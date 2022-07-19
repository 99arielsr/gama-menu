import { Schema, model } from "mongoose";
import { IUser } from "./Users";

export interface IImages {
  link: string;
  nome: string;
  user: Schema.Types.ObjectId | IUser;
}

const imagesSchema = new Schema<IImages>(
  {
    link: {
      type: Schema.Types.String,
    },
    nome: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);

export default model<IImages>("Images", imagesSchema);
