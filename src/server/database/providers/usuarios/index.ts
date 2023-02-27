import * as create from './Create'
import * as getByEmail from './GetByEmail'

export const UsuariosProviders = {
    ...create,
    ...getByEmail
}