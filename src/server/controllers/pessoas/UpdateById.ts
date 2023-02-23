import { PessoasProvider } from './../../database/providers/pessoas/index';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware"
import { IPessoa } from '../../database/models';

interface IParamProps {
    id?: number
}

interface IBodyProps extends Omit<IPessoa, 'id'> {}

const paramsSchemaValidation: yup.SchemaOf<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
})

const bodySchemaValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    cityId: yup.number().integer().required()
})

export const updateByIdValidation = validation({
    params: paramsSchemaValidation,
    body: bodySchemaValidation
})

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.id) 
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    

    const result = await PessoasProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    

    return res.status(StatusCodes.NO_CONTENT).send();
}