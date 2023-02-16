import { Knex } from "knex"
import path from 'path'

export const dev_env:Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, '..', '..', '..', '..','database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname,'..','migrations')
    },
    seeds:{
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    pool:{
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON')
            done()
        }
    }
}

export const test_env:Knex.Config = {
    ...dev_env,
    connection: ':memory:'
}

export const prod_env:Knex.Config = {
    ...dev_env
}