export default interface IRepository {
  create(payload: any): Promise<any>;
  update(payload: any): Promise<any>;
  find(payload: any): Promise<any>;
  findAll(payload: any): Promise<any>;
  delete(payload: any): Promise<any>;
}