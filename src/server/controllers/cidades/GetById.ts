import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware"

interface IParamProps {
    id?: number
}

const paramsSchemaValidation: yup.SchemaOf<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
})

export const getByIdValidation = validation({
    params: paramsSchemaValidation
})

export const getById = async (req: Request<IParamProps>, res: Response) => {
    console.log(req.params.id);
    
}