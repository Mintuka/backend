import jwt from 'jsonwebtoken'
export const secret = 'secret'
const expiresIn = 30*24*60*60

export const createToken = (_id: any) => {
    return jwt.sign({_id}, secret, {expiresIn})
}