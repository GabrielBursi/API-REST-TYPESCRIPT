import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface ICidade {
    nome: string,
    estado: string
}

const bodySchemaValidation: yup.SchemaOf<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3)
})

export const createValidationBody = validation( {
    body: bodySchemaValidation,
} )

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body);
}