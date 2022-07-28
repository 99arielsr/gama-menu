jest.mock("../../../repositories/Proprietario");

import { criptografia } from "../../../infra/adapters/criptografia";
import ProprietarioRepository from "../../../repositories/Proprietario";
import ProprietarioUseCase from "./ProprietarioUseCase";

const ProprietarioRepositoryMock =
  ProprietarioRepository as jest.Mock<ProprietarioRepository>;

describe("Proprietario - UseCase", () => {
  it("deve criar um proprietario", async () => {
    const proprietarioRepositoryMocked =
      new ProprietarioRepositoryMock() as jest.Mocked<ProprietarioRepository>;

    const payload = {
      nome: "Teste",
      email: "teste@teste.com",
      senha: "Teste#123",
    };

    const novaSenha = criptografia.hashSync(payload.senha);

    proprietarioRepositoryMocked.create.mockResolvedValue({
      id: 1,
      ...payload,
      senha: novaSenha,
    });

    const useCase = new ProprietarioUseCase(proprietarioRepositoryMocked);

    const response = await useCase.criar(payload);

    console.log(response);
    expect(response).toBeTruthy();
    expect(response).toHaveProperty("id");
  });
});
