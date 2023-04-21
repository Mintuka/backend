import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express"
import User from '../models/User'
import { secret } from '../services/createToken';

interface JwtPayload {
    _id: string;
}

export const isAuthenticated = async(req:Request, res:Response, next:NextFunction) => {
    const { authorization } = req.headers
    
    if (!authorization)
        return res.status(401).json({error: 'Authorization token required'})
    const token = authorization.split(' ')[1]
    
    if ( !token )
        return res.status(401).json({error: 'Authorization token required'})

    try{
        const {_id} = jwt.verify(token, secret) as JwtPayload
        req.body.user = await User.findOne({_id})
        if (req.body.user){
            next()
        }
        return
    }catch(err){
        return res.status(400).json({error: err})
    }
}