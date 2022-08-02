//import { mySqlConection } from "../database";
import proprietarioSchema from "./Proprietario";
import estabelecimentoSchema from "./Estabelecimento";
import enderecoSchema from "./Endereco";
import horarioSchema from "./Horario";
import imagesSchema from "./Images"
import cardapioSchema from "./Cardapio";
import categoriaSchema from "./Categoria";
import subcategoriaSchema from "./Subcategoria";
import produtoSchema from "./Produto";
import pedidosSchema from "./Pedido";

//const sintomas = new Sintomas(mySqlConection);
const proprietario = new proprietarioSchema();
const estabelecimento = new estabelecimentoSchema();
const endereco = new enderecoSchema();
const horario = new horarioSchema();
const images = new imagesSchema();
const cardapio = new cardapioSchema();
const categoria = new categoriaSchema();
const subcategoria = new subcategoriaSchema();
const produto = new produtoSchema();
const pedido = new pedidosSchema();


export {
  proprietario,
  estabelecimento,
  endereco,
  horario,
  images,
  cardapio,
  categoria,
  subcategoria,
  produto,
  pedido
};
