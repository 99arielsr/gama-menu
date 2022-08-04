import { faker } from "@faker-js/faker";
import CardapioRepository from ".";
import Cardapio from "../../models/Cardapio";
import { mongoDBConection } from "../../database";

beforeAll(async () => {
  await mongoDBConection.createConection();
})

describe("Cardapio Repository", () => {

  const cardapioRepository = new CardapioRepository(Cardapio);
  const payload = {
    nome: "Cardápio de Almoço"
  };

  it("deve cadastrar um cardapio", async () => {
    const cardapio = await cardapioRepository.create(payload);

    const cardapioCadastrado = await Cardapio.findById(cardapio._id); 

    expect(cardapioCadastrado).toBeTruthy();
    expect(cardapioCadastrado).toHaveProperty("nome");
    expect(cardapioCadastrado?.nome).toEqual(payload.nome);
  });

  it("deve encontrar todos cardapios", async () => {
    const cardapioLista = await cardapioRepository.find();

    expect(cardapioLista).toBeTruthy();
    expect(Array.isArray(cardapioLista)).toBe(true);
  });

  it("deve encontrar cardapio por id", async () => {
    const cardapio = await cardapioRepository.create(payload);
    const { id } = cardapio;

    const cardapioId = await cardapioRepository.findOne(id);
    expect(cardapioId).toBeTruthy();
    expect(cardapioId).toHaveProperty("nome");
  });

  it("deve atualizar cardapio por id", async () => {
    const cardapio = await cardapioRepository.create(payload);
    const { id } = cardapio;

    const cardapioAtualizado = await cardapioRepository.update(id, payload);
    expect(cardapioAtualizado).toBeTruthy();
    expect(cardapioAtualizado).toHaveProperty("nome");
  });

  it("deve deletar cardapio por id", async () => {
    const cardapio = await cardapioRepository.create(payload);

    const { id } = cardapio;

    const deletarcardapio = await cardapioRepository.deleteOne(id);
    const cardapioDeletado = await Cardapio.findById(id);
    expect(deletarcardapio).toBeTruthy();
    expect(cardapioDeletado).toBeNull();
  })
});
