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

    const userSaved = await proprietarioRepository.create(payload);

    const cadastrado = await Proprietario.findById(userSaved._id); 

    expect(cadastrado).toBeTruthy();
    expect(cadastrado).toHaveProperty("nome");
    expect(cadastrado?.nome).toEqual(payload.nome);
  });

  it("deve encontrar todos proprietarios", async () => {
    const listar = proprietarioRepository.find();

    expect(listar).toBeTruthy();
  });

  it("deve encontrar proprietario por id", async () => {
    const listarId = proprietarioRepository.findOne("62e5a8404a012ace677c9cfa");
    expect(listarId).toBeTruthy();
  });

  it("deve atualizar proprietario por id", async () => {
    const atualizado = proprietarioRepository.update("62e5a8404a012ace677c9cfa", payload);
    expect(atualizado).toBeTruthy();
  });

  it("deve deletar proprietario por id", async () => {
    const deletado = proprietarioRepository.deleteOne("62e5a7eaf2b842597726f18d");
    expect(deletado).toBeTruthy();
  })
});
