import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CidadesController } from '../controllers'

export const router = Router()

router.get('/', (req, res) => {res.status(StatusCodes.ACCEPTED).json({msg:'pagina inicial'})})

//*cidades
router.get('/cidades', CidadesController.getAllValidationBody, CidadesController.getAll)
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById)
router.post('/cidades', CidadesController.createValidationBody, CidadesController.create)
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById)
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById)

//*pessoas