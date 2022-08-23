import { Schema, model } from "mongoose";

export interface ITeste {
  name: string;
  email: string;
  password: string;
}

const testeSchema = new Schema<ITeste>(
  {
    name: {
      type: Schema.Types.String,
    },
    email: {
      type: Schema.Types.String,
    },
    password: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);

export default model<ITeste>("Teste", testeSchema);
