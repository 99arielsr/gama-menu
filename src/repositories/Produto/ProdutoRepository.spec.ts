import { faker } from "@faker-js/faker";
import ProdutoRepository from ".";
import Produto from "../../models/Produto";
import { mongoDBConection } from "../../database";

beforeAll(async () => {
  await mongoDBConection.createConection();
})

describe("Produto Repository", () => {

  const produtoRepository = new ProdutoRepository(Produto);
  const payload = {
    nome: faker.commerce.productName(),
    descricao: faker.commerce.productDescription(),
    preco: faker.commerce.price()
  };

  it("deve cadastrar um produto", async () => {
    const produto = await produtoRepository.create(payload);

    const produtoCadastrado = await Produto.findById(produto._id); 

    expect(produtoCadastrado).toBeTruthy();
    expect(produtoCadastrado).toHaveProperty("nome");
    expect(produtoCadastrado?.nome).toEqual(payload.nome);
  });

  it("deve encontrar todos produtos", async () => {
    const produtoLista = await produtoRepository.find();

    expect(produtoLista).toBeTruthy();
    expect(Array.isArray(produtoLista)).toBe(true);
  });

  it("deve encontrar produto por id", async () => {
    const produto = await produtoRepository.create(payload);
    const { id } = produto;

    const produtoId = await produtoRepository.findOne(id);
    expect(produtoId).toBeTruthy();
    expect(produtoId).toHaveProperty("nome")
  });

  it("deve atualizar produto por id", async () => {
    const produto = await produtoRepository.create(payload);
    const { id } = produto;

    const produtoAtualizado = await produtoRepository.update(id, payload);
    expect(produtoAtualizado).toBeTruthy();
    expect(produtoAtualizado).toHaveProperty("nome");
  });

  it("deve deletar produto por id", async () => {
    const produto = await produtoRepository.create(payload);

    const { id } = produto;

    const deletarproduto = await produtoRepository.deleteOne(id);
    const produtoDeletado = await Produto.findById(id);
    expect(deletarproduto).toBeTruthy();
    expect(produtoDeletado).toBeNull();
  })
});
