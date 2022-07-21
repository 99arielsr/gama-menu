import IRepository from "../../../repositories/IRepository";
import IProprietario from "../../../repositories/Proprietario/IProprietario";
import IEstabelecimento from "../../../repositories/Estabelecimento/IEstabelecimento";
import IEdereco from "../../../repositories/Endereco/IEndereco";
import IHorario from "../../../repositories/Horario/IHorario";

type PayloadCadastroProprietario = IProprietario;
type PayloadCadastroEstabelecimento = IEstabelecimento;
type PayloadCadastroEndereco = IEdereco;
type PayloadCadastroHorario = IHorario


export default class CadastroUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  cadastroProfissional(payload: PayloadCadastroProprietario, id: any){
    const proprietarioData = {
      name: payload.name,
      email: payload.email,
      senha: payload.senha,
    }
    const novoProprietario = this.repository.update(proprietarioData);
    return novoProprietario;
  }
  cadastroEstabelecimento(payload: PayloadCadastroEstabelecimento, id: any){
    const estabelecimentoData = {
      name: payload.name,
      segmento: payload.segmento,
      ativo: payload.ativo,
      delivery: payload.delivery,
      retirada: payload.retirada,
      
    }
    const novoEstabelecimento = this.repository.update(estabelecimentoData);
    return novoEstabelecimento;
  }
  cadastroEndereco(payload: PayloadCadastroEndereco, id: any){
    const enderecoData = {
      logradouro: payload.logradouro,
      numero: payload.numero,
      complemento: payload.complemento,
      referencia: payload.referencia,
      bairro: payload.bairro,
      cidade: payload.cidade,
      estado: payload.estado,
    }
    const novoEndereco = this.repository.update(enderecoData);
    return novoEndereco;
  }
  cadastroHorario(payload: PayloadCadastroHorario, id: any){
    const horarioData = {
      hora_abre: payload.hora_abre,
      hora_fecha: payload.hora_fecha,
      domingo: payload.domingo,
      segunda: payload.segunda,
      terca: payload.terca,
      quarta: payload.quarta,
      quinta: payload.quinta,
      sexta: payload.sexta,
      sabado: payload.sabado,
    }
    const novoHorario = this.repository.update(horarioData);
    return novoHorario;
  }
}