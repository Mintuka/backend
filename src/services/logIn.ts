import {Request, Response} from 'express'
import User,{IUser} from '../models/User'
import bcrypt from 'bcrypt'
import { createToken } from './createToken'

export const logIn = async(req: Request, res: Response) => {
    const {email, password} = req.body
    if (!email || !password){
      return res.status(400).json({message: 'Email and Password are required'})
    }
    const user: IUser = await User.findOne({email})
    if (user){
        const auth = bcrypt.compare(password, user.password);
        if (!auth) {
          return res.status(200).json({message: 'incorrect password or email'})
        }
        const token = createToken(user._id)
        return res.status(200).json({email, firstName:user.firstName, lastName:user.lastName, token})
    }
    return res.status(200).json({message: 'User not registered'})
}