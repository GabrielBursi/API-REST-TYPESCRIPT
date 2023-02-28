import { compare, genSalt, hash } from "bcrypt"

const SALT_ROUNDS = 8

const hashPassword = async (password: string) => {
    const saltGenerated = await genSalt(SALT_ROUNDS)

    return await hash(password, saltGenerated)
}

const verifyPassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword)

}

export const PasswordCrypto = {
    hashPassword,
    verifyPassword
}