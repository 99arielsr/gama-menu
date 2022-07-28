import { Schema, model } from "mongoose";

export interface IImages {
  link: string;
  nome: string;
  descricao: string;
}

const imagesSchema = new Schema<IImages>(
  {
    link: {
      type: Schema.Types.String,
    },
    nome: {
      type: Schema.Types.String,
    },
    descricao: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);

export default model<IImages>("Images", imagesSchema);