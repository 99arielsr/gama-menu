import { Schema, model } from "mongoose";
import IImages from "../repositories/Images/IImages";

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