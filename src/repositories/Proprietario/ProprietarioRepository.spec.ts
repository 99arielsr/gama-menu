import { faker } from "@faker-js/faker";
import ProprietarioRepository from ".";
import Proprietario from "../../models/Proprietario";
import { mongoDBConection } from "../../database";

beforeAll(async () => {
  await mongoDBConection.createConection();
})

describe("Proprietario Repository", () => {

  const proprietarioRepository = new ProprietarioRepository(Proprietario);
  const payload = {
    nome: faker.name.findName(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
    hashResetSenha: "",
    estabelecimento: [],
  };

  it("deve cadastrar um proprietario", async () => {
    const proprietario = await proprietarioRepository.create(payload);

    const proprietarioCadastrado = await Proprietario.findById(proprietario._id); 

    expect(proprietarioCadastrado).toBeTruthy();
    expect(proprietarioCadastrado).toHaveProperty("nome");
    expect(proprietarioCadastrado?.nome).toEqual(payload.nome);
  });

  it("deve encontrar todos proprietarios", async () => {
    const proprietarioLista = await proprietarioRepository.find();

    expect(proprietarioLista).toBeTruthy();
    expect(Array.isArray(proprietarioLista)).toBe(true);
  });

  it("deve encontrar proprietario por id", async () => {
    const proprietario = await proprietarioRepository.create(payload);
    const { id } = proprietario;

    const proprietarioId = await proprietarioRepository.findOne(id);
    expect(proprietarioId).toBeTruthy();
  });

  it("deve atualizar proprietario por id", async () => {
    const proprietario = await proprietarioRepository.create(payload);
    const { id } = proprietario;

    const proprietarioAtualizado = await proprietarioRepository.update(id, payload);
    expect(proprietarioAtualizado).toBeTruthy();
    expect(proprietarioAtualizado).toHaveProperty("nome");
  });

  it("deve deletar proprietario por id", async () => {
    const proprietario = await proprietarioRepository.create(payload);

    const { id } = proprietario;

    const deletarProprietario = await proprietarioRepository.deleteOne(id);
    const proprietarioDeletado = await Proprietario.findById(id);
    expect(deletarProprietario).toBeTruthy();
    expect(proprietarioDeletado).toBeNull();
  })
});
