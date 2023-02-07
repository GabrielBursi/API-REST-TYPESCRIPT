import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface IQueryProps {
    page?: number,
    limit?: number,
    filter?:string
}

const querySchemaValidation: yup.SchemaOf<IQueryProps> = yup.object().shape({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired()
})

export const getAllValidationBody = validation({
    query: querySchemaValidation,
})

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    console.log(req.query);
}