import { knex } from 'knex';
import { dev_env, prod_env, test_env } from './Environment';

const getEnvironment = () => {
    
    switch(process.env.NODE_ENV){
        case 'production': return prod_env
        case 'teste': return test_env
        default: return dev_env
    }
}

export const Knex = knex(getEnvironment())