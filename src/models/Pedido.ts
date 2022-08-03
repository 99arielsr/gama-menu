import { Schema, model } from "mongoose";
import { IEndereco } from "./Endereco";
import { IProduto } from "./Produto";

export interface IPedido {
    cliente: Schema.Types.ObjectId //| ICliente[]; ainda será implementado
    enderecoEntrega?: Schema.Types.ObjectId[] | IEndereco[];
    produtos: Schema.Types.ObjectId[] | IProduto[];
    entrega: boolean;
    status: string;
  }

const pedidoSchema = new Schema <IPedido> ({
    cliente: {
        type: Schema.Types.ObjectId,
    },
    enderecoEntrega: {
        type: Schema.Types.ObjectId,
    },
    produtos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Produto",
        },
    ],
    entrega: {
        type: Schema.Types.Boolean,
    },
    status: {
        type: Schema.Types.String,
    }
},
{timestamps: true}
);

export default model <IPedido>("Pedido", pedidoSchema);