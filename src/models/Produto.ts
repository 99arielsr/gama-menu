import { Schema, model } from "mongoose";
import { IImages } from "./Images";

export interface IProdutos {
  nome: string;
  descricao: string;
  preco: number;
  foto: Schema.Types.ObjectId[] | IImages[];
}

const produtoSchema = new Schema<IProdutos>(
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
    foto: [
      {
        type: Schema.Types.ObjectId,
        ref: "Images",
      },
    ],
  },
  { timestamps: true }
);

export default model<IProdutos>("Produto", produtoSchema);
