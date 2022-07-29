import { application } from "express";
import server from "supertest";
import App from "../../../infra/App";
import { faker } from "@faker-js/faker";

describe("E2E - Proprietario", () => {
  const app = new App();
  const application = app.getInstance();

  it("deve cadastrar proprietario ao executar o endpoint /proprietario no método post", async () => {
    await app.setup({
      isTest: true,
    });
    const response = await server(application).post("/proprietario").send({
      id: "62e1e6285ef145a9793caeef",
      nome: faker.name.findName(),
      email: faker.internet.email(),
      senha: faker.internet.password(),
    });

    expect(response.statusCode).toEqual(201);
  });

  it("deve retornar a lista de proprietario ao executar o endpoint /proprietario no método get", async () => {
    await app.setup({
      isTest: true,
    });
    const response = await server(application).get("/proprietario").send();

    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("deve retornar um proprietario pelo id ao executar o endpoint /proprietario/:id no método get", async () => {
    await app.setup({
      isTest: true,
    });
    const response = await server(application)
      .get("/proprietario/62e1e6285ef145a9793caeef")
      .send();

    expect(response.statusCode).toEqual(200);
  });

  it("deve atualizar um proprietario pelo id ao executar o endpoint /proprietario/:id no método put", async () => {
    await app.setup({
      isTest: true,
    });
    const response = await server(application)
      .put("/proprietario/62e1e6285ef145a9793caeef")
      .send({
        id: "62e1e6285ef145a9793caeef",
        nome: faker.name.findName(),
        email: faker.internet.email(),
        senha: faker.internet.password(),
      });

    expect(response.statusCode).toEqual(200);
  });

  it.skip("deve deletar um proprietario pelo id ao executar o endpoint /proprietario:id no método delete", async () => {
    await app.setup({
      isTest: true,
    });
    const response = await server(application)
      .delete("/proprietario/62e1e6285ef145a9793caeef")
      .send();

    expect(response.statusCode).toEqual(204);
  });
});
