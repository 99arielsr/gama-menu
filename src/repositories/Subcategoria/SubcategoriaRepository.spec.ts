import { faker } from "@faker-js/faker";
import SubcategoriaRepository from ".";
import Subcategoria from "../../models/Subcategoria";
import { mongoDBConection } from "../../database";

beforeAll(async () => {
  await mongoDBConection.createConection();
})

describe("Subcategoria Repository", () => {

  const subcategoriaRepository = new SubcategoriaRepository(Subcategoria);
  const payload = {
    nome: "Salgadas"
  };

  it("deve cadastrar um subcategoria", async () => {
    const subcategoria = await subcategoriaRepository.create(payload);

    const subcategoriaCadastrado = await Subcategoria.findById(subcategoria._id); 

    expect(subcategoriaCadastrado).toBeTruthy();
    expect(subcategoriaCadastrado).toHaveProperty("nome");
    expect(subcategoriaCadastrado?.nome).toEqual(payload.nome);
  });

  it("deve encontrar todos subcategorias", async () => {
    const subcategoriaLista = await subcategoriaRepository.find();

    expect(subcategoriaLista).toBeTruthy();
    expect(Array.isArray(subcategoriaLista)).toBe(true);
  });

  it("deve encontrar subcategoria por id", async () => {
    const subcategoria = await subcategoriaRepository.create(payload);
    const { id } = subcategoria;

    const subcategoriaId = await subcategoriaRepository.findOne(id);
    expect(subcategoriaId).toBeTruthy();
    expect(subcategoriaId).toHaveProperty("nome")
  });

  it("deve atualizar subcategoria por id", async () => {
    const subcategoria = await subcategoriaRepository.create(payload);
    const { id } = subcategoria;

    const subcategoriaAtualizado = await subcategoriaRepository.update(id, payload);
    expect(subcategoriaAtualizado).toBeTruthy();
    expect(subcategoriaAtualizado).toHaveProperty("nome");
  });

  it("deve deletar subcategoria por id", async () => {
    const subcategoria = await subcategoriaRepository.create(payload);

    const { id } = subcategoria;

    const deletarsubcategoria = await subcategoriaRepository.deleteOne(id);
    const subcategoriaDeletado = await Subcategoria.findById(id);
    expect(deletarsubcategoria).toBeTruthy();
    expect(subcategoriaDeletado).toBeNull();
  })
});
