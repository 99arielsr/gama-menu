import Proprietario from "../models/Proprietario";
import ProprietarioRepository from "./Proprietario";

const proprietarioRepository = new ProprietarioRepository(Proprietario);

export { proprietarioRepository };