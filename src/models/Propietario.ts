import { Schema, model } from "mongoose";
import IPropietario from "../repositories/Propietario/IPropietario"

const propietarioSchema = new Schema <IPropietario> ({
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

export default model <IPropietario>("Propietario", propietarioSchema);