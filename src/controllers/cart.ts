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
    const { userId } = req.body;

    try {
        const cart:any = await Cart.findOne({ userId })
        const items = cart.itemsId
        let populatedItems = []
        for (let id of items) {
            const item = await Item.findById(id).select('name price image').lean().exec();  
            if ( item ) {
                const { name, price, image } = item
                const populatedItem = { name, price, image, _id:id }
                populatedItems.push(populatedItem)
            }         
        }
        return res.status(200).json({ cartItems: populatedItems});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateCart = async (req:Request, res:Response) => { 
    const { itemId, isAdd, userId } = req.body;
    try {
        const cart:any = await Cart.findOne({ userId })
        let { _id, itemsId } = cart
        if (!mongoose.Types.ObjectId.isValid(_id)) 
            return res.status(404).json({ message: `No Cart with id: ${_id}` });
        let result = [...itemsId]
        if ( isAdd === true ) {
            if ( !itemsId.includes(itemId) )
                result.push(itemId)
        }else {
            result = result.filter( (id:any) => id !== itemId)
        }
        
        const updatedCart = { itemsId: [...result], _id: _id };
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