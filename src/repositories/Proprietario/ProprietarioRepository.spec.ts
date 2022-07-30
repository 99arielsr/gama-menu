import { faker } from "@faker-js/faker";
import ProprietarioRepository from ".";
import Proprietario from "../../models/Proprietario";
import { mongoDBConection } from "../../database";

beforeAll(async () => {
  await mongoDBConection.createConection();
})

describe("Proprietario Repository", () => {
  it("deve cadastrar um proprietario", async () => {
    const payload = {
      nome: faker.name.findName(),
      email: faker.internet.email(),
      senha: faker.internet.password(),
      hashResetSenha: "",
      estabelecimento: [],
    };

    const proprietarioRepository = new ProprietarioRepository(Proprietario);
    const userSaved = await proprietarioRepository.create(payload);

    const cadastrado = await Proprietario.findById(userSaved._id); 

    expect(cadastrado).toBeTruthy();
    expect(cadastrado).toHaveProperty("nome");
    expect(cadastrado?.nome).toEqual(payload.nome);
  });
});
