type User = {
  _id: any;
  name: string;
  email: string;
};

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
