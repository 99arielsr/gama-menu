import { faker } from "@faker-js/faker";
import CategoriaRepository from ".";
import Categoria from "../../models/Categoria";
import { mongoDBConection } from "../../database";

beforeAll(async () => {
  await mongoDBConection.createConection();
})

describe("Categoria Repository", () => {

  const categoriaRepository = new CategoriaRepository(Categoria);
  const payload = {
    nome: "Pizzas"
  };

  it("deve cadastrar um categoria", async () => {
    const categoria = await categoriaRepository.create(payload);

    const categoriaCadastrado = await Categoria.findById(categoria._id); 

    expect(categoriaCadastrado).toBeTruthy();
    expect(categoriaCadastrado).toHaveProperty("nome");
    expect(categoriaCadastrado?.nome).toEqual(payload.nome);
  });

  it("deve encontrar todos categorias", async () => {
    const categoriaLista = await categoriaRepository.find();

    expect(categoriaLista).toBeTruthy();
    expect(Array.isArray(categoriaLista)).toBe(true);
  });

  it("deve encontrar categoria por id", async () => {
    const categoria = await categoriaRepository.create(payload);
    const { id } = categoria;

    const categoriaId = await categoriaRepository.findOne(id);
    expect(categoriaId).toBeTruthy();
    expect(categoriaId).toHaveProperty("nome");
  });

  it("deve atualizar categoria por id", async () => {
    const categoria = await categoriaRepository.create(payload);
    const { id } = categoria;

    const categoriaAtualizado = await categoriaRepository.update(id, payload);
    expect(categoriaAtualizado).toBeTruthy();
    expect(categoriaAtualizado).toHaveProperty("nome");
  });

  it("deve deletar categoria por id", async () => {
    const categoria = await categoriaRepository.create(payload);

    const { id } = categoria;

    const deletarcategoria = await categoriaRepository.deleteOne(id);
    const categoriaDeletado = await Categoria.findById(id);
    expect(deletarcategoria).toBeTruthy();
    expect(categoriaDeletado).toBeNull();
  })
});
