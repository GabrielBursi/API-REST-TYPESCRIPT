import { IPessoa } from './../../models/IPessoa';
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IPessoa[] | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa)
            .select('*')
            .where('name', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit)
            
        return result;
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }
};