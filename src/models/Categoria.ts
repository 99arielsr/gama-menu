import { Schema, model } from "mongoose";
import { ISubcategorias } from "./Subcategoria";

export interface ICategoria {
  nome: string;
  subcategorias: Schema.Types.ObjectId[] | ISubcategorias[];
}

const categoriaSchema = new Schema<ICategoria>(
  {
    nome: {
      type: Schema.Types.String,
    },
    subcategorias: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subcategoria",
      },
    ],
  },
  { timestamps: true }
);

export default model<ICategoria>("Categoria", categoriaSchema);
