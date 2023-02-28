import { JWTService } from './../../shared/middleware/JWTService';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';
import { UsuariosProviders } from './../../database/providers/usuarios/index';
import { PasswordCrypto } from '../../shared/services';

interface IBodyProps extends Omit<IUsuario, 'id' | 'name'> { }

const bodySchemaValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    email: yup.string().email().required().min(5),
    password: yup.string().required().min(6),
})

export const signInValidationBody = validation({
    body: bodySchemaValidation,
})

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const { email, password } = req.body

    const user = await UsuariosProviders.getByEmail(email)

    if (user instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Email ou senha incorretos.'
            }
        });

    const compareHashPassword = await PasswordCrypto.verifyPassword(password, user.password)
    if (!compareHashPassword)
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha incorretos.'
            }
        });
    
    const accessToken = JWTService.signIn({uid: user.id})
    if(accessToken === 'JWT_SECRET_NOT_FOUND')
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao gerar token de acesso'
            }
        });

    return res.status(StatusCodes.OK).json({ accessToken })
}