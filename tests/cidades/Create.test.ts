import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

describe('Cidades - method: post', () => {
    it('Cria registro', async () => {
        const res1 = await testServer
            .post('/cidades')
            .send({name: 'Teste'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(res1.body).toHaveProperty('result')
    })
    it('Criar registro com name curto - min: 3', async () => {
        const res1 = await testServer
        .post('/cidades')
        .send({name: 'AB'})

        expect(res1.body).toHaveProperty('errors.body.name')
    })
})