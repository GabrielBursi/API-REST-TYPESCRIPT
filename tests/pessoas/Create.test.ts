import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - Create', () => {
    let cityId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ name: 'Teste' });

        cityId = resCidade.body;
    });


    it('Cria registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cityId,
                email: 'juca@gmail.com',
                name: 'Juca silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    it('Cadastra registro 2', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cityId,
                name: 'Juca silva',
                email: 'juca2@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    it('Tenta criar registro com email duplicado', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cityId,
                name: 'Juca silva',
                email: 'jucaduplicado@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer
            .post('/pessoas')
            .send({
                cityId,
                email: 'jucaduplicado@gmail.com',
                name: 'duplicado',
            });
        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');
    });
    it('Tenta criar registro com name muito curto', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cityId,
                email: 'juca@gmail.com',
                name: 'Ju',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.name');
    });
    it('Tenta criar registro sem name', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cityId,
                email: 'juca@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.name');
    });
    it('Tenta criar registro sem email', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cityId,
                name: 'Juca da Silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });
    it('Tenta criar registro com email inválido', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cityId,
                email: 'juca gmail.com',
                name: 'Juca da Silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });
    it('Tenta criar registro sem cityId', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                email: 'juca@gmail.com',
                name: 'Juca da Silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cityId');
    });
    it('Tenta criar registro com cityId inválido', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cityId: 'teste',
                email: 'juca@gmail.com',
                name: 'Juca da Silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cityId');
    });
    it('Tenta criar registro sem enviar nenhuma propriedade', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
        expect(res1.body).toHaveProperty('errors.body.cityId');
        expect(res1.body).toHaveProperty('errors.body.name');
    });
});