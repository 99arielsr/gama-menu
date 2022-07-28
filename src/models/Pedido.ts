import { Schema, model } from "mongoose";
import { IEndereco } from "./Endereco";
import { IEstabelecimento } from "./Estabelecimento";
import { IProdutos } from "./Produto";

export interface IPedidos {
    cliente: string; //Schema.Types.ObjectId | ICliente[];
    estabelecimento: Schema.Types.ObjectId | IEstabelecimento[];
    endereco: Schema.Types.ObjectId | IEndereco;
    produtos: Schema.Types.ObjectId[] | IProdutos[];
    delivery: boolean;
    retirada: boolean;
    status: string;

  }

const pedidoSchema = new Schema <IPedidos> ({
    cliente: {
        type: Schema.Types.String,
    },
    estabelecimento: [
        {
          type: Schema.Types.ObjectId,
          ref: "Estabelecimento",
        },
    ],
    endereco: [
        {
            type: Schema.Types.ObjectId,
            ref: "Endereco",
        },
    ],
    produtos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Produtos",
        },
    ],
    delivery: {
        type: Schema.Types.Boolean,
    },
    retirada: {
        type: Schema.Types.Boolean,
    },
    status: {
        type: Schema.Types.String,
    }
},
{timestamps: true}
);

export default model <IPedidos>("Pedidos", pedidoSchema);