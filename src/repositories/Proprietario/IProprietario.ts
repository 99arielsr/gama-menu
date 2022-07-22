import { Schema } from "mongoose";
import IEstabelecimento from "../Estabelecimento";

export default interface IProprietario {
  nome: string;
  email: string;
  senha: string;
  hashResetSenha: string;
  estabelecimento: Schema.Types.ObjectId[] | IEstabelecimento [];
}