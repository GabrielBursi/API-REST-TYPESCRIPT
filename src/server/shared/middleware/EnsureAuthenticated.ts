import { JWTService } from '../services/JWTService';
import { StatusCodes } from 'http-status-codes';
import { RequestHandler } from 'express';

export const ensureAuthenticated: RequestHandler = (req, res, next) => {

    const { authorization } = req.headers

    if(!authorization){
        return res.status(StatusCodes.UNAUTHORIZED).json({errors: {default: 'Não autorizado.'}})
    }

    const [type, token] = authorization.split(' ')

    if (type !== 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).json({ errors: { default: 'Não autorizado.' } })
    }

    const jwtData = JWTService.verify(token)

    if(jwtData === 'JWT_NOT_FOUND'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: 'Não foi possível gerar o token.' } })

    }else if(jwtData === 'INVALID_TOKEN'){
        return res.status(StatusCodes.UNAUTHORIZED).json({ errors: { default: 'Não autorizado.' } })
    }

    req.headers.idUser = jwtData.uid.toString()

    return next()
}