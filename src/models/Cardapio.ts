import { Schema, model } from "mongoose";
import { ICategoria } from "./Categoria";

export interface ICardapio {
  nome: string;
  categorias: Schema.Types.ObjectId[] | ICategoria[];
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
