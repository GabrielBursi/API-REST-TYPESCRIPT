import { ensureAuthenticated } from './../shared/middleware/EnsureAuthenticated';
import { UsuariosController } from './../controllers/usuarios/index';
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CidadesController, PessoasController } from '../controllers'

export const router = Router()

router.get('/', (req, res) => {res.status(StatusCodes.ACCEPTED).json({msg:'pagina inicial'})})

//*cidades 
//!privado
router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidationBody, CidadesController.getAll)
router.get('/cidades/:id', ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById)
router.post('/cidades', ensureAuthenticated, CidadesController.createValidationBody, CidadesController.create)
router.put('/cidades/:id', ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById)
router.delete('/cidades/:id', ensureAuthenticated, CidadesController.deleteByIdValidation, CidadesController.deleteById)

//*pessoas
//!privado
router.get('/pessoas', ensureAuthenticated, PessoasController.getAllValidationBody, PessoasController.getAll)
router.get('/pessoas/:id', ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById)
router.post('/pessoas', ensureAuthenticated, PessoasController.createValidationBody, PessoasController.create)
router.put('/pessoas/:id', ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById)
router.delete('/pessoas/:id', ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById)

//*usuarios
router.post('/entrar', UsuariosController.signInValidationBody, UsuariosController.signIn)
router.post('/cadastrar', UsuariosController.signUpValidationBody, UsuariosController.signUp)