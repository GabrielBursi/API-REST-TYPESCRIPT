import { ETableNames } from './../../ETableNames';
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const create = async (user: Omit<IUsuario, 'id'>): Promise<number | Error> => {

    try {
        const [result] = await Knex(ETableNames.usuario).insert(user).returning('id')

        if (typeof result === 'object') return result.id
        else if (result === 'number') return result

        return new Error('Erro ao criar registro')

    } catch (error) {
        console.log(error);
        return Error('Erro ao criar registro: ' + error)
    }
}