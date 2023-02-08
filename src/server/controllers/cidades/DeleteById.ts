import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware"

interface IParamProps {
    id?: number
}

const paramsSchemaValidation: yup.SchemaOf<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
})

export const deleteByIdValidation = validation({
    params: paramsSchemaValidation
})

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
    console.log(req.params.id);

    res.status(StatusCodes.NO_CONTENT).json({ "warning": "Ainda não implementado!" })
}