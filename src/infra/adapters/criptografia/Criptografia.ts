export default class Criptografia {
  private lib: any;

  constructor(lib: any) {
    this.lib = lib;
  }

  hashSync(payload: string) {
    return this.lib.hashSync(payload, 10);
  }
}
