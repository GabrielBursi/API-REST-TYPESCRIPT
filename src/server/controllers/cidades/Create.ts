import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import * as yup from 'yup';

interface ICidade {
    nome: string,
    estado: string
}

const bodySchemaValidation: yup.SchemaOf<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3)
})

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    let validatedData: ICidade | undefined = undefined

    try {
        validatedData = await bodySchemaValidation.validate(req.body,{abortEarly: false})
    } catch (err) {
        const yupError = err as yup.ValidationError
        const errors: Record<string, string> = {}

        yupError.inner.forEach(error => {
            if(!error.path) return

            errors[error.path] = error.message
        })

        return res.status(StatusCodes.BAD_REQUEST).json({ errors })
    }
    console.log(validatedData);
    
}

export const teste = {}