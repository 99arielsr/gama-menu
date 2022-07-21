import { Schema, model } from "mongoose";
import IHorario from "../repositories/Horario/IHorario";

const horarioSchema = new Schema<IHorario>(
  {
    hora_abre: {
      type: Schema.Types.Date,
    },
    hora_fecha: {
      type: Schema.Types.Date,
    },
    domingo: {
      type: Schema.Types.Boolean,
    },
    segunda: {
      type: Schema.Types.Boolean,
    },
    terca: {
      type: Schema.Types.Boolean,
    },
    quarta: {
      type: Schema.Types.Boolean,
    },
    quinta: {
      type: Schema.Types.Boolean,
    },
    sexta: {
      type: Schema.Types.Boolean,
    },
    sabado: {
      type: Schema.Types.Boolean,
    },
  },
  { timestamps: true }
);

export default model<IHorario>("Horario", horarioSchema);