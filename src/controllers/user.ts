import express,{Request, Response} from 'express';
import mongoose from 'mongoose';

import User from '../models/User';

const router = express.Router();

export const getUsers = async (req:Request, res:Response) => { 
    try {
        const Users = await User.find().select('-password');
        res.status(200).json(Users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req:Request, res:Response) => { 
    const { id } = req.params;

    try {
        const user = await User.findById(id).select("-password");
        
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateUser = async (req:Request, res:Response) => { 
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const updateduser = { ...req.body, _id: id };

    await User.findByIdAndUpdate(id, updateduser, { new: true });

    res.json(updateduser);
}

export const deleteUser = async (req:Request, res:Response) => { 
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "user deleted successfully." });
}

export default router;