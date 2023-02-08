import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
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
    console.log(req.params.id);
    console.log(req.body.name);

    res.status(StatusCodes.CREATED).json({ "warning": "Ainda não implementado!" })
}