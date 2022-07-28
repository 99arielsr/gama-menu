import { Schema, model } from "mongoose";
import { ICategorias } from "./Categoria";

export interface ICardapio {
  nome: string;
  categorias: Schema.Types.ObjectId[] | ICategorias[];
}

const cardapioSchema = new Schema<ICardapio>(
  {
    nome: {
      type: Schema.Types.String,
    },
    categorias: [
      {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
      },
    ],
  },
  { timestamps: true }
);

export default model<ICardapio>("Cardapio", cardapioSchema);
