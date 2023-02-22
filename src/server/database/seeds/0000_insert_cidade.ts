import axios from "axios";
import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.cidade).count<[{ count: number }]>('* as count');
    if (!Number.isInteger(count) || Number(count) > 0) return;

    const { data } = await axios.get('https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json')
    const estados = data.estados
    const paranaCidades = estados.find((estado: any) => estado.sigla === 'PR')
    const cidadesToInsert = paranaCidades.cidades.map((nomeDaCidade: string) => ({ name: nomeDaCidade }))
    await knex(ETableNames.cidade).insert(cidadesToInsert);

};

