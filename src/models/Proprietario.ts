import { Schema, model } from "mongoose";
import { IEstabelecimento } from "./Estabelecimento";

export interface IProprietario {
  nome: string;
  email: string;
  senha: string;
  hashResetSenha: string | null;
  estabelecimento: Schema.Types.ObjectId[] | IEstabelecimento[];
}

const proprietarioSchema = new Schema <IProprietario> ({
  nome: {
        type: Schema.Types.String,
  },
  email: {
      type: Schema.Types.String,
  },
  senha: {
    type: Schema.Types.String,
  },
  hashResetSenha: {
    type: Schema.Types.String,
  },
  estabelecimento: [
    {
      type: Schema.Types.ObjectId,
      ref: "Estabelecimento",
    },
  ],
},
{timestamps: true}
);

export default model <IProprietario>("Proprietario", proprietarioSchema);