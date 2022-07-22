import Estabelecimento from "../models/Estabelecimento";
import Proprietario from "../models/Proprietario";
import Horario from "../models/Horario";
import Endereco from "../models/Endereco";

import ProprietarioRepository from "./Proprietario"
import EstabelecimentoRepository from "./Estabelecimento"
import EnderecoRepository from "./Endereco";
import HorarioRepository from "./Horario";

const proprietarioRepository = new ProprietarioRepository(Proprietario);
const estabelecimentoRepository = new EstabelecimentoRepository(Estabelecimento);
const enderecoRepository = new EnderecoRepository(Endereco);
const horarioRepository = new HorarioRepository(Horario);

export { proprietarioRepository, estabelecimentoRepository, enderecoRepository, horarioRepository };