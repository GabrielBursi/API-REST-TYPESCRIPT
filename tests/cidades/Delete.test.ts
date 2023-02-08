import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

describe('Cidades - method: delete', () => {
    it('Excluir registro por ID', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({name: 'Maringa'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        
        const resDelete = await testServer
            .delete(`/cidades/${res1.body}`)
            .send()

        expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })
    it('Excluir registro que não existe', async () => {
        const res1 = await testServer
            .delete('/cidades/99999999')
            .send()

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })
})