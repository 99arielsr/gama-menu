import { Schema, model } from "mongoose";

export interface IEndereco {
  cep: string
  logradouro: string;
  numero: string;
  complemento: string;
  referencia: string;
  bairro: string;
  cidade: string;
  estado: string;
}

const enderecoSchema = new Schema<IEndereco>(
  {
    cep: {
      type: Schema.Types.String,
    },
    logradouro: {
      type: Schema.Types.String,
    },
    numero: {
      type: Schema.Types.String,
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