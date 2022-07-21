import { Schema } from "mongoose";
import IEstabelecimento from "../Estabelecimento/";

export default interface IPropietario {
  name: string;
  email: string;
  senha: string;
  estabelecimento: Schema.Types.ObjectId[] | IEstabelecimento [];
}