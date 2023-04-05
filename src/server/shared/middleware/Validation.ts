import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema, ValidationError } from 'yup'

type TFieldReq = 'body' | 'params' | 'query' | 'header'

type AllSchemas = Record<TFieldReq, ObjectSchema<any>>

type TValidation = (schema: Partial<AllSchemas>) => RequestHandler

export const validation: TValidation = ( schemas ) => async (req, res, next) =>{

    const errorsResult: Record<string, Record<string, string>> = {}

    Object.entries(schemas).forEach(([key, schema]) => {

        try {
            schema.validateSync(req[key as TFieldReq] , { abortEarly: false })
        } catch (err) {
            const yupError = err as ValidationError
            const errors: Record<string, string> = {}
    
            yupError.inner.forEach(error => {
                if (!error.path) return
    
                errors[error.path] = error.message
            })

            errorsResult[key] = errors
        }
    })
    
    if (Object.entries(errorsResult).length === 0) return next()
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult })
}