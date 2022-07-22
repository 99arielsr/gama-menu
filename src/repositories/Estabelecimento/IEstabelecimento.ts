import { Schema } from "mongoose";
import IEdereco from "../Endereco/IEndereco";
import IHorario from "../Horario/IHorario";
import IImages from "../Images/IImages";

export default interface IEstabelecimento {
  nome: string;
  segmento: string;
  logo: Schema.Types.ObjectId | IImages[];
  endereco: Schema.Types.ObjectId | IEdereco[];
  ativo: boolean;
  horario: Schema.Types.ObjectId | IHorario[];
  delivery: boolean;
  retirada: boolean;
}