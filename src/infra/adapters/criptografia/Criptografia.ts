export default class Criptografia {
  private lib: any;

  constructor(lib: any) {
    this.lib = lib;
  }

  hash(payload: string) {
    return this.lib.hash(payload, 10);
  }
}
