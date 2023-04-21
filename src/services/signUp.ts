import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import { createToken } from './createToken'
import User, { IUser } from '../models/User'

export const signUp = async(req: Request, res: Response) => {
    try{
        const {email, password} = req.body
        const isExistingUser = await User.findOne({email})
        if (isExistingUser){
            return res.status(400).json({message: 'email is already registered'})
        }
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password,salt)
        const user: IUser = await User.create({...req.body,password:hash})
        const token = createToken(user._id)
        return res.status(200).json({email, token})
    }catch(err){
        return res.status(400).json({message: err})
    }
}