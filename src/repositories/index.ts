import Estabelecimento from "../models/Estabelecimento";
import Proprietario from "../models/Proprietario";
import Horario from "../models/Horario";
import Endereco from "../models/Endereco";
import Cardapio from "../models/Cardapio"
import Categoria from "../models/Categoria"
import Subcategoria from "../models/Subcategoria"
import Produto from "../models/Produto"
import Images from "../models/Images"

import ProprietarioRepository from "./Proprietario";
import EstabelecimentoRepository from "./Estabelecimento"
import EnderecoRepository from "./Endereco";
import HorarioRepository from "./Horario";
import CardapioRepository from "./Cardapio";
import CategoriaRepository from "./Categoria";
import SubcategoriaRepository from "./Subcategoria";
import ProdutoRepository from "./Produto";
import ImageRepository from "./Images";

const proprietarioRepository = new ProprietarioRepository(Proprietario);
const estabelecimentoRepository = new EstabelecimentoRepository(Estabelecimento);
const enderecoRepository = new EnderecoRepository(Endereco);
const horarioRepository = new HorarioRepository(Horario);
const cardapioRepository = new CardapioRepository(Cardapio);
const categoriaRepository = new CategoriaRepository(Categoria);
const subcategoriaRepository = new SubcategoriaRepository(Subcategoria);
const produtoRepository = new ProdutoRepository(Produto);
const imageRepository = new ImageRepository(Images);

export { proprietarioRepository, estabelecimentoRepository, enderecoRepository, horarioRepository, cardapioRepository, categoriaRepository, subcategoriaRepository, produtoRepository, imageRepository };
