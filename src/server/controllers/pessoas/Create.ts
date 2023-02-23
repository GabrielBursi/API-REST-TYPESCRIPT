import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IPessoa } from '../../database/models';
import { PessoasProvider } from '../../database/providers';

interface IBodyProps extends Omit<IPessoa, 'id'> {}

const bodySchemaValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    cityId: yup.number().integer().required()
})

export const createValidationBody = validation( {
    body: bodySchemaValidation,
} )

export const create = async (req: Request<{}, {}, IPessoa>, res: Response) => {

    const result = await PessoasProvider.create(req.body)

    if(result instanceof Error) 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });

    return res.status(StatusCodes.CREATED).json(result)
}