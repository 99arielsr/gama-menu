import { Request, Response } from "express";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { ObjectId } from "mongoose";
import Estabelecimento from "../../../models/Estabelecimento";
import Produto from "../../../models/Produto";
import ImageUseCase from "../useCases/ImageUseCase";

export default class ImageController {
  private useCase: ImageUseCase;

  constructor(useCase: ImageUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        if(!req.file){
          return res.status(400).json("Selecione a imagem que quer cadastrar")
        }

        let uploadedFile:UploadApiResponse;
        try {
          uploadedFile = await cloudinary.uploader.upload(req.file.path,{
            folder: "gama-menu",
            resource_type: "auto"
          })
        } catch (error) {
          return res.status(400).json("Erro no upload da imagem, contate o suporte")
        }

        const { id } = req.params;
        const { secure_url, original_filename } = uploadedFile;
        // const { file } = req;
        const { descricao } = req.body;

        const image = await this.useCase.criar({
          link: secure_url,
          nome: original_filename,
          descricao
        })

        const estabelecimento = await Estabelecimento.findById(id);
        const produto = await Produto.findById(id);

        if  (estabelecimento){
          await  Estabelecimento.findByIdAndUpdate( id, {
            logo: image.id
          })
          return res.status(201).json(image);
        } else if (produto) {
          await  Produto.findByIdAndUpdate( id, {
            imagem: image.id
          })
          return res.status(201).json(image);
        } else {
          return res.status(400).json("Indique um id de Estabelecimento ou Produto")
        }

      } catch (error) {
        return res.status(500).json("ERRO");
      }
    };
  }
}