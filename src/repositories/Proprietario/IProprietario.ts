import { Schema } from "mongoose";
import IEstabelecimento from "../Estabelecimento";

export default interface IProprietario {
  name: string;
  email: string;
  senha: string;
  estabelecimento: Schema.Types.ObjectId[] | IEstabelecimento [];
}