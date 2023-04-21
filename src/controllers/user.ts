import express,{Request, Response} from 'express';
import mongoose from 'mongoose';

import User from '../models/User';

const router = express.Router();

export const getUsers = async (req:Request, res:Response) => { 
    try {
        const Users = await User.find().select('-password');
        return res.status(200).json(Users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUser = async (req:Request, res:Response) => { 
    const { id } = req.params;

    try {
        const user = await User.findById(id).select("-password");
        
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req:Request, res:Response) => { 
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

        const updateduser = { ...req.body, _id: id };
    
        await User.findByIdAndUpdate(id, updateduser, { new: true });
    
        return res.status(200).json(updateduser);        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req:Request, res:Response) => { 
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

        await User.findByIdAndRemove(id);
    
        return res.status(204).json({ message: "user deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default router;