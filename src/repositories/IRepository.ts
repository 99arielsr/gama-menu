export default interface IRepository {
  create(payload: any): Promise<any>;
  find(): Promise<any>;
  findOne(payload: any): Promise<any>;
  update(payload: any): Promise<any>;
  delete(payload: any): Promise<any>;
}