import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - UpdateById', () => {

    let cityId: number | undefined = undefined
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ name: "Cidade" })

        cityId = resCidade.body
    })

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({ name: 'Pessoas', cityId, email: 'testegetbyid@teste.com' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({ name: 'Pessoas', cityId, email: 'testegetbyid@teste.com' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/pessoas/99999')
            .send({ name: 'Pessoas', cityId, email: 'testeupdatebyid@teste.com' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});