import { Schema, model } from "mongoose";
import { IProdutos } from "./Produto";

export interface ISubcategorias {
  nome: string;
  produtos: Schema.Types.ObjectId[] | IProdutos[];
}

const subcatecoriaSchema = new Schema<ISubcategorias>(
  {
    nome: {
      type: Schema.Types.String,
    },
    produtos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Produto",
      },
    ],
  },
  { timestamps: true }
);

export default model<ISubcategorias>("Subcategoria", subcatecoriaSchema);