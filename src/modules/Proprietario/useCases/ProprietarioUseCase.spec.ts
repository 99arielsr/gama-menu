jest.mock("../../../repositories/Proprietario");
import { faker } from "@faker-js/faker";

import { criptografia } from "../../../infra/adapters/criptografia";
import ProprietarioRepository from "../../../repositories/Proprietario";
import ProprietarioUseCase from "./ProprietarioUseCase";

const ProprietarioRepositoryMock =
  ProprietarioRepository as jest.Mock<ProprietarioRepository>;
const proprietarioRepositoryMocked =
  new ProprietarioRepositoryMock() as jest.Mocked<ProprietarioRepository>;

const payload = {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: faker.internet.password(),
};

describe("Proprietario - UseCase", () => {
  it("deve criar um proprietario", async () => {
    const novaSenha = criptografia.hashSync(payload.senha);

    proprietarioRepositoryMocked.create.mockResolvedValue({
      id: faker.database.mongodbObjectId(),
      ...payload,
      senha: novaSenha,
    });

    const useCase = new ProprietarioUseCase(proprietarioRepositoryMocked);

    const response = await useCase.criar(payload);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty("id");
    expect(response.senha).toBe(novaSenha);
  });
});
