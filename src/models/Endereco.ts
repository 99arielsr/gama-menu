import { Schema, model } from "mongoose";
import IEndereco from "../repositories/Endereco/IEndereco";

const enderecoSchema = new Schema<IEndereco>(
  {
    logradouro: {
      type: Schema.Types.String,
    },
    numero: {
      type: Schema.Types.Number,
    },
    complemento: {
      type: Schema.Types.String,
    },
    referencia: {
      type: Schema.Types.String,
    },
    bairro: {
      type: Schema.Types.String,
    },
    cidade: {
      type: Schema.Types.String,
    },
    estado: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);

export default model<IEndereco>("Endereco", enderecoSchema);