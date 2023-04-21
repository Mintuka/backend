import express,{Request, Response} from 'express';
import mongoose from 'mongoose';

import Cart from '../models/Cart';

const router = express.Router();

export const getCarts = async (req:Request, res:Response) => { 
    try {
        const cartItems = await Cart.find().populate('itemIds')
        return res.status(200).json(cartItems);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getCart = async (req:Request, res:Response) => { 
    const { id } = req.params;

    try {
        const cart = await Cart.findById(id).populate('itemIds')
        
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateCart = async (req:Request, res:Response) => { 
    const { id } = req.params;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Cart with id: ${id}`);

        const updatedCart = { itemIds: [...req.body], _id: id };
    
        await Cart.findByIdAndUpdate(id, updatedCart, { new: true });
    
        return res.status(200).json(updatedCart);
    
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteCart = async (req:Request, res:Response) => { 
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Cart with id: ${id}`);

        await Cart.findByIdAndRemove(id);
    
        return res.status(204).json({ message: "Cart deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default router;