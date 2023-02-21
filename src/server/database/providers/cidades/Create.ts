import { ETableNames } from './../../ETableNames';
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const create = async (city: Omit<ICity, 'id'>): Promise<number | Error> => {

    try {
        const [ result ] = await Knex(ETableNames.cidade).insert(city).returning('id')

        if(typeof result === 'object') return result.id
        else if(result === 'number') return result

        return new Error('Erro ao criar registro')

    } catch (error) {
        console.log(error);
        return Error ('Erro ao criar registro: ' + error)
    }
}