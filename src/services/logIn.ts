import {Request, Response} from 'express'
import User,{IUser} from '../models/User'
import bcrypt from 'bcrypt'
import { createToken } from './createToken'

export const logIn = async(req: Request, res: Response) => {
    const {email, password} = req.body

    try {
      if (!email || !password){
        return res.status(400).json({message: 'Email and Password are required'})
      }
      const user: IUser = await User.findOne({email})
      if (user){
          const auth = bcrypt.compare(password, user.password);
          if (!auth) {
            return res.status(400).json({message: 'incorrect password or email'})
          }
          const token = createToken(user._id)
          return res.status(200).json({email, firstName:user.firstName, token})
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
  } 
}