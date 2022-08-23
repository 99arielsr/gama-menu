import Estabelecimento from "../models/Estabelecimento";
import Proprietario from "../models/Proprietario";
import Horario from "../models/Horario";
import Endereco from "../models/Endereco";
import Cardapio from "../models/Cardapio";
import Categoria from "../models/Categoria";
import Subcategoria from "../models/Subcategoria";
import Produto from "../models/Produto";
import Images from "../models/Images";
import Pedido from "../models/Pedido";
import Teste from "../models/Teste";

import ProprietarioRepository from "./Proprietario";
import EstabelecimentoRepository from "./Estabelecimento";
import EnderecoRepository from "./Endereco";
import HorarioRepository from "./Horario";
import CardapioRepository from "./Cardapio";
import CategoriaRepository from "./Categoria";
import SubcategoriaRepository from "./Subcategoria";
import ProdutoRepository from "./Produto";
import ImageRepository from "./Images";
import PedidoRepository from "./Pedido";
import TesteRepository from "./Teste";

const proprietarioRepository = new ProprietarioRepository(Proprietario);
const estabelecimentoRepository = new EstabelecimentoRepository(
  Estabelecimento
);
const enderecoRepository = new EnderecoRepository(Endereco);
const horarioRepository = new HorarioRepository(Horario);
const cardapioRepository = new CardapioRepository(Cardapio);
const categoriaRepository = new CategoriaRepository(Categoria);
const subcategoriaRepository = new SubcategoriaRepository(Subcategoria);
const produtoRepository = new ProdutoRepository(Produto);
const imageRepository = new ImageRepository(Images);
const pedidoRepository = new PedidoRepository(Pedido);
const testeRepository = new TesteRepository(Teste);

export {
  proprietarioRepository,
  estabelecimentoRepository,
  enderecoRepository,
  horarioRepository,
  cardapioRepository,
  categoriaRepository,
  subcategoriaRepository,
  produtoRepository,
  imageRepository,
  pedidoRepository,
  testeRepository,
};
