import express,{Request, Response} from 'express';
import mongoose from 'mongoose';

import Cart, { ICart } from '../models/Cart';
import Item from '../models/Item';

const router = express.Router();

export const getCarts = async (req:Request, res:Response) => { 
    try {
        const cartItems = await Cart.find()
        return res.status(200).json(cartItems);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getCart = async (req:Request, res:Response) => { 
    const { id } = req.params;

    try {
        const cart = await Cart.findById(id)
        const items = cart.itemsId
        let populatedItems = []
        for (let itemData of items) {
            const { id, amount } = itemData
            const item = await Item.findById(id).select('name price image').lean().exec();  
            if ( item ) {
                const { name, price, image } = item
                const populatedItem = { amount , name, price, image }
                populatedItems.push(populatedItem)
            }         
        }
        
        return res.status(200).json({ cartItems: populatedItems});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateCart = async (req:Request, res:Response) => { 
    const { items, userId } = req.body;
    try {
        const cart:any = await Cart.findOne({ userId })
        const { _id, itemsId } = cart
        if (!mongoose.Types.ObjectId.isValid(_id)) 
            return res.status(404).json({ message: `No Cart with id: ${_id}` });

        const updatedCart = { itemsId: [...itemsId, ...items], _id: _id };
        await Cart.findByIdAndUpdate(_id, updatedCart, { new: true });
    
        return res.status(200).json(updatedCart);
    
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteCart = async (req:Request, res:Response) => { 
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(404).json({ message: `No Cart with id: ${id}` });

        await Cart.findByIdAndRemove(id);
    
        return res.status(204).json({ message: "Cart deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default router;