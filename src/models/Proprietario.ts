import { Schema, model } from "mongoose";
import { IEstabelecimento } from "./Estabelecimento";

export interface IProprietario {
  nome: string;
  email: string;
  senha: string;
  hashResetSenha: string;
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

declare namespace Express {
  export interface Request {
    user?: IProprietario;
  }
}

export default model <IProprietario>("Proprietario", proprietarioSchema);