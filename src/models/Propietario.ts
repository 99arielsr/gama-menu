import { Schema, model } from "mongoose";
import IProprietario from "../repositories/Proprietario/IProprietario"

const proprietarioSchema = new Schema <IProprietario> ({
  name: {
        type: Schema.Types.String,
  },
  email: {
      type: Schema.Types.String,
  },
  senha: {
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