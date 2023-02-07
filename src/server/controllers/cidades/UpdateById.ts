import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware"

interface IParamProps {
    id?: number
}

interface IBodyProps {
    nome: string
}

const paramsSchemaValidation: yup.SchemaOf<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
})

const bodySchemaValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    nome: yup.string().required().min(3),
})

export const updateByIdValidation = validation({
    params: paramsSchemaValidation,
    body: bodySchemaValidation
})

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    console.log(req.params.id);
    console.log(req.body.nome);
}