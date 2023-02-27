import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';
import { UsuariosProviders } from './../../database/providers/usuarios/index';

interface IBodyProps extends Omit<IUsuario, 'id'> { }

const bodySchemaValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    email: yup.string().email().required().min(5),
    name: yup.string().required().min(3),
    password: yup.string().required().min(6),
})

export const signUpValidationBody = validation({
    body: bodySchemaValidation,
})

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const result = await UsuariosProviders.create(req.body)

    if (result instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });

    return res.status(StatusCodes.CREATED).json(result)
}