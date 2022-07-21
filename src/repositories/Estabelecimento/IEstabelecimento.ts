import { Schema, model } from "mongoose";
import IEdereco from "../Endereco/IEndereco";
import IHorario from "../Horario/IHorario";
import IImages from "../Images/IImages";

export default interface IEstabelecimento {
  name: string;
  logo: Schema.Types.ObjectId | IImages[];
  endereco: Schema.Types.ObjectId[] | IEdereco[];
  ativo: boolean;
  horario_funcionameno: Schema.Types.ObjectId[] | IHorario[];
  delivery: boolean;
  retirada: boolean;
}