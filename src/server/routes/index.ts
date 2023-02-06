import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

export const router = Router()

router.get('/', (req, res) => {res.status(StatusCodes.ACCEPTED).json({msg:'pagina inicial'})})