import { Schema, model } from "mongoose";
import { IImages } from "./Images";

export interface IProduto {
  nome: string;
  descricao: string;
  preco: number;
  imagem: Schema.Types.ObjectId[] | IImages[];
}

const produtoSchema = new Schema<IProduto>(
  {
    nome: {
      type: Schema.Types.String,
    },
    descricao: {
      type: Schema.Types.String,
    },
    preco: {
      type: Schema.Types.Number,
    },
    imagem: [
      {
        type: Schema.Types.ObjectId,
        ref: "Images",
      },
    ],
  },
  { timestamps: true }
);

export default model<IProduto>("Produto", produtoSchema);
