import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - GetAll', () => {

    let cityId: number | undefined = undefined
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({name: "Cidade"})
        
        cityId = resCidade.body
    })

    it('Buscar todos os registros', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({ name: 'Pessoas', cityId, email: 'testegelall@teste.com'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get('/pessoas')
            .send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});