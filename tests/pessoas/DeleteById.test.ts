import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - method: delete', () => {
    
    let cityId: number | undefined = undefined
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ name: "Cidade" })
    
        cityId = resCidade.body
    })

    it('Excluir registro por ID', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({ name: 'Pessoas', cityId, email: 'testedelete@teste.com' })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        
        const resDelete = await testServer
            .delete(`/pessoas/${res1.body}`)
            .send()

        expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })
    it('Excluir registro que não existe', async () => {
        const res1 = await testServer
            .delete('/pessoas/99999999')
            .send()

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })
})