// import { faker } from "@faker-js/faker";
// import ProprietarioRepository from ".";
// import Proprietario from "../../models/Proprietario";
// import { proprietario } from "../../models";


// describe("Proprietario Repository", () => {
//   it("deve cadastrar um proprietario", async () => {
//     const payload = {
//       nome: faker.name.findName(),
//       email: faker.internet.email(),
//       senha: faker.internet.password(),
//       hashResetSenha: "",
//       estabelecimento: [],
//     };

//     const proprietarioRepository = new ProprietarioRepository(Proprietario);
//     await proprietarioRepository.create(payload);

//     const cadastrado = await Proprietario.modelName.findOne({
//       where: {
//         email: payload.email,
//       }
//     })

//     expect(cadastrado).toBe(true);
//     expect(cadastrado.nome).toEqual(payload.nome);
//   });
// });
