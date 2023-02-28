import { ETableNames } from './../../ETableNames';
import { Knex } from "../../knex";
import { IUsuario } from "../../models";
import { PasswordCrypto } from '../../../shared/services';

export const create = async (user: Omit<IUsuario, 'id'>): Promise<number | Error> => {

    try {

        const hashedPassword = await PasswordCrypto.hashPassword(user.password)

        const [result] = await Knex(ETableNames.usuario).insert({...user, password: hashedPassword}).returning('id')

        if (typeof result === 'object') return result.id
        else if (result === 'number') return result

        return new Error('Erro ao criar registro')

    } catch (error) {
        console.log(error);
        return Error('Erro ao criar registro: ' + error)
    }
}