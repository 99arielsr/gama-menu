import { Request, Response } from "express";
import Images from "../../../models/Images";
import User from "../../../models/Users";

const controller = {
  async create(req: Request, res: Response) {
    const { name, email, senha, occupation, state } = req.body;
    const { file } = req;

    const savedUser = await User.count({
      email,
    });

    if (savedUser) {
      return res.status(400).json("Email já cadastrado no banco");
    }

    const image = await Images.create({
      link: `/uploads/${file?.filename}`,
      nome: file?.filename,
    });

    const newUser = await User.create({
      ...req.body,
      images: [image._id],
    });

    return res.status(201).json(newUser);
  },

  async list(req: Request, res: Response) {
    const users = await User.find().populate({
      path: "images",
      select: "nome",
    });

    return res.json(users);
  },
};

export default controller;
