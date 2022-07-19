export default interface IRepository {
  create(payload: any): Promise<any>;
  update(): Promise<any>;
  find(): Promise<any>;
  findAll(): Promise<any>;
  delete(): Promise<any>;
}