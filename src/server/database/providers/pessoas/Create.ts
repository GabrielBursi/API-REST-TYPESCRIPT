import { ETableNames } from './../../ETableNames';
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const create = async (person: Omit<IPessoa, 'id'>): Promise<number | Error> => {

    try {

        const [{ count }] = await Knex(ETableNames.cidade)
            .where('id', '=', person.cityId)
            .count<[{ count: number }]>('* as count');

        if (count === 0) 
            return new Error('A cidade usada no cadastro não foi encontrada');
        
        const [ result ] = await Knex(ETableNames.pessoa).insert(person).returning('id')

        if(typeof result === 'object') return result.id
        else if(result === 'number') return result

        return new Error('Erro ao criar registro')

    } catch (error) {
        console.log(error);
        return Error ('Erro ao criar registro: ' + error)
    }
}