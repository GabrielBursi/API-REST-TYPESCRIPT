import { UsuariosController } from './../controllers/usuarios/index';
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CidadesController, PessoasController } from '../controllers'

export const router = Router()

router.get('/', (req, res) => {res.status(StatusCodes.ACCEPTED).json({msg:'pagina inicial'})})

//*cidades
router.get('/cidades', CidadesController.getAllValidationBody, CidadesController.getAll)
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById)
router.post('/cidades', CidadesController.createValidationBody, CidadesController.create)
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById)
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById)

//*pessoas
router.get('/pessoas', PessoasController.getAllValidationBody, PessoasController.getAll)
router.get('/pessoas/:id', PessoasController.getByIdValidation, PessoasController.getById)
router.post('/pessoas', PessoasController.createValidationBody, PessoasController.create)
router.put('/pessoas/:id', PessoasController.updateByIdValidation, PessoasController.updateById)
router.delete('/pessoas/:id', PessoasController.deleteByIdValidation, PessoasController.deleteById)

//*usuarios
router.post('/entrar', UsuariosController.signInValidationBody, UsuariosController.signIn)
router.post('/cadastrar', UsuariosController.signUpValidationBody, UsuariosController.signUp)