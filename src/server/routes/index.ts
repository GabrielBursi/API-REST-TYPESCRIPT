import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CidadesController } from '../controllers'

export const router = Router()

router.get('/', (req, res) => {res.status(StatusCodes.ACCEPTED).json({msg:'pagina inicial'})})

//*cidades
router.post('/cidades', CidadesController.create)

//*pessoas