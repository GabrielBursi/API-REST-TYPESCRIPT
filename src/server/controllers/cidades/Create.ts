import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface ICidade {
    name: string,
}

const bodySchemaValidation: yup.SchemaOf<ICidade> = yup.object().shape({
    name: yup.string().required().min(3),
})

export const createValidationBody = validation( {
    body: bodySchemaValidation,
} )

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body);

    res.status(StatusCodes.CREATED).json({"warning": "Ainda não implementado!"})
}