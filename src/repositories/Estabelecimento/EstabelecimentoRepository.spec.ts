import { faker } from "@faker-js/faker";
import EstabelecimentoRepository from ".";
import Estabelecimento from "../../models/Estabelecimento";
import { mongoDBConection } from "../../database";

beforeAll(async () => {
  await mongoDBConection.createConection();
})

describe("Estabelecimento Repository", () => {

  const estabelecimentoRepository = new EstabelecimentoRepository(Estabelecimento);
  const payload = {
    nome: faker.commerce.department(),
    segmento: faker.commerce.product(),
    logo: [],
    endereco: [],
    cardapio: [],
    ativo: true,
    horario: [],
    delivery: true,
    retirada: true,
    pedidos: []
  };

  it("deve cadastrar um estabelecimento", async () => {
    const estabelecimento = await estabelecimentoRepository.create(payload);

    const estabelecimentoCadastrado = await Estabelecimento.findById(estabelecimento._id); 

    expect(estabelecimentoCadastrado).toBeTruthy();
    expect(estabelecimentoCadastrado).toHaveProperty("nome");
    expect(estabelecimentoCadastrado?.nome).toEqual(payload.nome);
  });

  it("deve encontrar todos estabelecimentos", async () => {
    const estabelecimentoLista = await estabelecimentoRepository.find();

    expect(estabelecimentoLista).toBeTruthy();
    expect(Array.isArray(estabelecimentoLista)).toBe(true);
  });

  it("deve encontrar estabelecimento por id", async () => {
    const estabelecimento = await estabelecimentoRepository.create(payload);
    const { id } = estabelecimento;

    const estabelecimentoId = await estabelecimentoRepository.findOne(id);
    expect(estabelecimentoId).toBeTruthy();
  });

  it("deve atualizar estabelecimento por id", async () => {
    const estabelecimento = await estabelecimentoRepository.create(payload);
    const { id } = estabelecimento;

    const estabelecimentoAtualizado = await estabelecimentoRepository.update(id, payload);
    expect(estabelecimentoAtualizado).toBeTruthy();
    expect(estabelecimentoAtualizado).toHaveProperty("nome");
  });

  it("deve deletar estabelecimento por id", async () => {
    const estabelecimento = await estabelecimentoRepository.create(payload);

    const { id } = estabelecimento;

    const deletarestabelecimento = await estabelecimentoRepository.deleteOne(id);
    const estabelecimentoDeletado = await Estabelecimento.findById(id);
    expect(deletarestabelecimento).toBeTruthy();
    expect(estabelecimentoDeletado).toBeNull();
  })
});
