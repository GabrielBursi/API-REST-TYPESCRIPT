import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - Create', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'create-pessoas@gmail.com';
        await testServer.post('/cadastrar').send({ email, password: '123456', name: 'Teste' });
        const signInRes = await testServer.post('/entrar').send({ email, password: '123456' });

        accessToken = signInRes.body.accessToken;
    });

    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Teste' });

        cidadeId = resCidade.body;
    });


    it('Criar sem usar token de autenticação', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidadeId: 1,
                email: 'juca@gmail.com',
                name: 'Juca silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });
    it('Cria registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidadeId,
                email: 'juca@gmail.com',
                name: 'Juca silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    it('Cadastra registro 2', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidadeId,
                name: 'Juca silva',
                email: 'juca2@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    it('Tenta criar registro com email duplicado', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidadeId,
                name: 'Juca silva',
                email: 'jucaduplicado@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidadeId,
                email: 'jucaduplicado@gmail.com',
                name: 'duplicado',
            });
        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');
    });
    it('Tenta criar registro com name muito curto', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidadeId,
                email: 'juca@gmail.com',
                name: 'Ju',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.name');
    });
    it('Tenta criar registro sem name', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidadeId,
                email: 'juca@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.name');
    });
    it('Tenta criar registro sem email', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidadeId,
                name: 'Juca da Silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });
    it('Tenta criar registro com email inválido', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidadeId,
                email: 'juca gmail.com',
                name: 'Juca da Silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });
    it('Tenta criar registro sem cidadeId', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                email: 'juca@gmail.com',
                name: 'Juca da Silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cidadeId');
    });
    it('Tenta criar registro com cidadeId inválido', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidadeId: 'teste',
                email: 'juca@gmail.com',
                name: 'Juca da Silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cidadeId');
    });
    it('Tenta criar registro sem enviar nenhuma propriedade', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
        expect(res1.body).toHaveProperty('errors.body.cidadeId');
        expect(res1.body).toHaveProperty('errors.body.name');
    });
});