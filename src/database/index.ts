import Conection from "./Conection";
import ENV from "../infra/config/env";

const mongoDBConection = new Conection(ENV.DATABASE);
export { mongoDBConection };
