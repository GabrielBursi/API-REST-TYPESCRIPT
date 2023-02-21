import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { CidadesProvider } from "../../database/providers/cidades";
import { validation } from "../../shared/middleware"

interface IParamProps {
    id?: number
}

interface IBodyProps {
    name: string
}

const paramsSchemaValidation: yup.SchemaOf<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
})

const bodySchemaValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    name: yup.string().required().min(3),
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
    

    const result = await CidadesProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    

    return res.status(StatusCodes.NO_CONTENT).json(result);
}