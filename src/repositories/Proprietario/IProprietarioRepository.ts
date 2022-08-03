export default interface IProprietarioRepository {
  create(payload: any): Promise<any>;
  find(payload?: any): Promise<any>;
  findOne(id: any): Promise<any>;
  update(id: any, payload: any): Promise<any>;
  deleteOne(id: any): Promise<any>;
  count(payload: any): Promise<any>;
}