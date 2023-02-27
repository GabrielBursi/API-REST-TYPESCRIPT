import { Knex } from "knex";
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pessoa, table => {
            table.bigIncrements('id').primary().index();
            table.string('name').index().notNullable();
            table.string('email').unique().notNullable();

            table
                .bigInteger('cityId')
                .index()
                .notNullable()
                .references('id')
                .inTable(ETableNames.cidade)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.pessoa}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.pessoa)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.pessoa}`);
        });
}