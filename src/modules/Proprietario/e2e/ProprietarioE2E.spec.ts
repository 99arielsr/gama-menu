import { application } from "express";
import server from "supertest";
import App from "../../../infra/App";

describe("E2E - Proprietario", () => {  
  it("deve retornar status 201 ao cadastrar um profissional", async () => {
    const app = new App();
    app.setup({
      isTest: true,
    });
    const application = app.getInstance();
    const response = await server(application).get("/proprietario").send({
      nome: "Teste",
      email: "teste@teste.com",
      senha: "tesTe@123"
    });

    console.log(response);
    expect(response.statusCode).toEqual(201);
  })
})