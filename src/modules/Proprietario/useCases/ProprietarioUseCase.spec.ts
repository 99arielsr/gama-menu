jest.mock("../../../repositories/Proprietario");
import { faker } from "@faker-js/faker";

import { criptografia } from "../../../infra/adapters/criptografia";
import ProprietarioRepository from "../../../repositories/Proprietario";
import ProprietarioUseCase from "./ProprietarioUseCase";

const ProprietarioRepositoryMock =
  ProprietarioRepository as unknown as jest.Mock<ProprietarioRepository>;
const proprietarioRepositoryMocked =
  new ProprietarioRepositoryMock() as jest.Mocked<ProprietarioRepository>;

const id = faker.database.mongodbObjectId();
const payload = {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: faker.internet.password(),
};
const useCase = new ProprietarioUseCase(proprietarioRepositoryMocked);

describe("Proprietario - UseCase", () => {
  it("deve criar um proprietario", async () => {
    const novaSenha = criptografia.hashSync(payload.senha);

    proprietarioRepositoryMocked.create.mockResolvedValue({
      id: id,
      ...payload,
      senha: novaSenha,
    });

    const response = await useCase.criar(payload);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty("id");
    expect(response.senha).toBe(novaSenha);
    expect(proprietarioRepositoryMocked.create).toHaveBeenCalledTimes(1);
  });

  it("deve listar todos proprietarios", async () => {
    proprietarioRepositoryMocked.find.mockResolvedValue([]);

    const response = await useCase.listar();

    expect(response).toBeTruthy();
    expect(Array.isArray(response)).toBe(true);
    expect(proprietarioRepositoryMocked.find).toBeCalledTimes(1);
  });

  it("deve listar proprietario por id", async () => {

    proprietarioRepositoryMocked.findOne.mockResolvedValue({id});

    const response = await useCase.listarId(id);
    
    expect(response).toBeTruthy();
    expect(proprietarioRepositoryMocked.findOne).toBeCalledTimes(1);
  });

  it("deve atualizar proprietario por id", async () => {
    proprietarioRepositoryMocked.update.mockResolvedValue({});
    const response = await useCase.atualizar(id, {
      nome: payload.nome,
      email: payload.email,
      senha: payload.senha,
    });

    expect(response).toBeTruthy();
    expect(proprietarioRepositoryMocked.update).toBeCalledTimes(1);
    expect(proprietarioRepositoryMocked.update).toBeCalledWith(id, payload);
  });

  it("deve deletar proprietario por id", async () => {
    proprietarioRepositoryMocked.deleteOne.mockResolvedValue({});

    const response = await useCase.deletar(id);

    expect(response).toBeTruthy();
    expect(proprietarioRepositoryMocked.deleteOne).toBeCalledTimes(1);
  })
});
