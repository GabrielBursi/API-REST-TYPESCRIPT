import { CidadesProvider } from './../../database/providers/cidades/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ICity } from '../../database/models';

interface IBodyProps extends Omit<ICity, 'id'> {}

const bodySchemaValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    name: yup.string().required().min(3).max(150),
})

export const createValidationBody = validation( {
    body: bodySchemaValidation,
} )

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {

    const result = await CidadesProvider.create(req.body)

    if(result instanceof Error) 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors: {default: result.message}})

    return res.status(StatusCodes.CREATED).json({result})
}