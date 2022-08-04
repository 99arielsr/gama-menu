import { faker } from "@faker-js/faker";
import EnderecoRepository from ".";
import Endereco from "../../models/Endereco";
import { mongoDBConection } from "../../database";

beforeAll(async () => {
  await mongoDBConection.createConection();
})

describe("Endereco Repository", () => {

  const enderecoRepository = new EnderecoRepository(Endereco);
  const payload = {
    logradouro: faker.address.streetName(),
    numero: faker.address.buildingNumber(),
    complemento: faker.address.secondaryAddress(),
    referencia: "",
    bairro: faker.address.streetName(),
    cidade: faker.address.cityName(),
    estado: faker.address.state()
  };

  it("deve cadastrar um endereco", async () => {
    const endereco = await enderecoRepository.create(payload);

    const enderecoCadastrado = await Endereco.findById(endereco._id); 

    expect(enderecoCadastrado).toBeTruthy();
    expect(enderecoCadastrado).toHaveProperty("logradouro");
    expect(enderecoCadastrado?.logradouro).toEqual(payload.logradouro);
  });

  it("deve encontrar todos enderecos", async () => {
    const enderecoLista = await enderecoRepository.find();

    expect(enderecoLista).toBeTruthy();
    expect(Array.isArray(enderecoLista)).toBe(true);
  });

  it("deve encontrar endereco por id", async () => {
    const endereco = await enderecoRepository.create(payload);
    const { id } = endereco;

    const enderecoId = await enderecoRepository.findOne(id);
    expect(enderecoId).toBeTruthy();
  });

  it("deve atualizar endereco por id", async () => {
    const endereco = await enderecoRepository.create(payload);
    const { id } = endereco;

    const enderecoAtualizado = await enderecoRepository.update(id, payload);
    expect(enderecoAtualizado).toBeTruthy();
    expect(enderecoAtualizado).toHaveProperty("logradouro");
  });

  it("deve deletar endereco por id", async () => {
    const endereco = await enderecoRepository.create(payload);

    const { id } = endereco;

    const deletarendereco = await enderecoRepository.deleteOne(id);
    const enderecoDeletado = await Endereco.findById(id);
    expect(deletarendereco).toBeTruthy();
    expect(enderecoDeletado).toBeNull();
  })
});
