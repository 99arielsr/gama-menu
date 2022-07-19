import { Schema, model } from "mongoose";
import { IImages } from "./Images";

export interface IUser {
  name: string;
  email: string;
  senha: string;
  state: string;
  occupation: string;
  images: Schema.Types.ObjectId[] | IImages[];
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: Schema.Types.String,
    },
    email: {
      type: Schema.Types.String,
    },
    senha: {
      type: Schema.Types.String,
    },
    state: {
      type: Schema.Types.String,
    },
    occupation: {
      type: Schema.Types.String,
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Images",
      },
    ],
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
