import Conection from "./Conection";

const mongoDBConection = new Conection("mongodb://localhost:27017/Lacrei-api");
export { mongoDBConection };
