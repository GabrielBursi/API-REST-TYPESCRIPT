import * as jwt from 'jsonwebtoken'

interface JWTData {
    uid: number
}

const signIn = (data: JWTData): string | 'JWT_NOT_FOUND' => {
    if(!process.env.JWT_SECRET) 
    return 'JWT_NOT_FOUND'

    return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '24h'})
}

const verify = (token: string): JWTData | 'INVALID_TOKEN' | 'JWT_NOT_FOUND' => {
    if (!process.env.JWT_SECRET)
    return 'JWT_NOT_FOUND'

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(typeof decoded === 'string')
        return 'INVALID_TOKEN'

        return decoded as JWTData

    } catch (error) {
        return 'INVALID_TOKEN'
    }
}

export const JWTService = {
    signIn,
    verify
}