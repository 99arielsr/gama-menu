import { Schema, model } from "mongoose";
import IEstabelecimento from "../repositories/Estabelecimento/IEstabelecimento"

const estabelecimentoSchema = new Schema <IEstabelecimento> ({
    nome: {
        type: Schema.Types.String,
    },
    segmento: {
        type: Schema.Types.String,
    },
    logo: [
        {
          type: Schema.Types.ObjectId,
          ref: "Images",
        },
    ],
    endereco: [
        {
            type: Schema.Types.ObjectId,
            ref: "Endereco",
        },
    ],
    ativo: {
        type: Schema.Types.Boolean,
    },
    horario_funcionamento: [
        {
            type: Schema.Types.ObjectId,
            ref: "Horario",
        },
    ],
    delivery: {
        type: Schema.Types.Boolean,
    },
    retirada: {
        type: Schema.Types.Boolean,
    }
},
{timestamps: true}
);

export default model <IEstabelecimento>("Estabelecimento", estabelecimentoSchema);