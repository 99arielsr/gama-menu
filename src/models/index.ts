//import { mySqlConection } from "../database";
import proprietarioSchema from "./Proprietario";
import estabelecimentoSchema from "./Estabelecimento";
import enderecoSchema from "./Endereco";
import horarioSchema from "./Horario";
import imagesSchema from "./Images"

//const sintomas = new Sintomas(mySqlConection);
const proprietario = new proprietarioSchema();
const estabelecimento = new estabelecimentoSchema();
const endereco = new enderecoSchema();
const horario = new horarioSchema();
const images = new imagesSchema();


export {
  proprietario,
  estabelecimento,
  endereco,
  horario,
  images,
};
