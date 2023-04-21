import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import { createToken } from './createToken'
import User, { IUser } from '../models/User'
import Cart from '../models/Cart'

export const signUp = async(req: Request, res: Response) => {
    const {email, password} = req.body

    try{
        const isExistingUser = await User.findOne({email})
        if (isExistingUser){
            return res.status(400).json({message: 'email is already registered'})
        }
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password,salt)
        const user: IUser = await User.create({...req.body,password:hash})
        const token = createToken(user._id)

        await Cart.create({ userId: user._id })

        return res.status(201).json({email, firstName : user.firstName, token})
    }catch(err){
        return res.status(500).json({message: err})
    }
}