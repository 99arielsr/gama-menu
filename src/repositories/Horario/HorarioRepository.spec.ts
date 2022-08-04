import { faker } from "@faker-js/faker";
import HorarioRepository from ".";
import Horario from "../../models/Horario";
import { mongoDBConection } from "../../database";

beforeAll(async () => {
  await mongoDBConection.createConection();
})

describe("Horario Repository", () => {

  const horarioRepository = new HorarioRepository(Horario);
  const payload = {
    horario_abertura: faker.datatype.datetime(),
    horario_fechamento: faker.datatype.datetime(),
    domingo: true,
    segunda: false,
    terca: false,
    quarta: false,
    quinta: true,
    sexta: true,
    sabado: true
  };

  it("deve cadastrar um horario", async () => {
    const horario = await horarioRepository.create(payload);

    const horarioCadastrado = await Horario.findById(horario._id); 

    expect(horarioCadastrado).toBeTruthy();
    expect(horarioCadastrado).toHaveProperty("horario_abertura");
    expect(horarioCadastrado?.horario_abertura).toEqual(payload.horario_abertura);
  });

  it("deve encontrar todos horarios", async () => {
    const horarioLista = await horarioRepository.find();

    expect(horarioLista).toBeTruthy();
    expect(Array.isArray(horarioLista)).toBe(true);
  });

  it("deve encontrar horario por id", async () => {
    const horario = await horarioRepository.create(payload);
    const { id } = horario;

    const horarioId = await horarioRepository.findOne(id);
    expect(horarioId).toBeTruthy();
    expect(horarioId).toHaveProperty("horario_abertura")
  });

  it("deve atualizar horario por id", async () => {
    const horario = await horarioRepository.create(payload);
    const { id } = horario;

    const horarioAtualizado = await horarioRepository.update(id, payload);
    expect(horarioAtualizado).toBeTruthy();
    expect(horarioAtualizado).toHaveProperty("horario_abertura");
  });

  it("deve deletar horario por id", async () => {
    const horario = await horarioRepository.create(payload);

    const { id } = horario;

    const deletarhorario = await horarioRepository.deleteOne(id);
    const horarioDeletado = await Horario.findById(id);
    expect(deletarhorario).toBeTruthy();
    expect(horarioDeletado).toBeNull();
  })
});
