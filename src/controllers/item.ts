import express,{Request, Response} from 'express';
import mongoose from 'mongoose';

import Item from '../models/Item';

const router = express.Router();

export const createItem =async (req: Request, res: Response) => { 
    try {
        const { name, price, amount, image } = req.body
        const item = await Item.create({ name, price, amount, image})
        return res.status(201).json(item);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getItems = async (req:Request, res:Response) => { 
    try {
        const Items = await Item.find()
        return res.status(200).json(Items);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getItem = async (req:Request, res:Response) => { 
    const { id } = req.params;

    try {
        const item = await Item.findById(id)
        
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateItem = async (req:Request, res:Response) => { 
    const { id } = req.params;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No item with id: ${id}`);

        const { price, amount } = req.body
        if ( amount )
            return res.status(400).json({ message: "Amount can'/t be below zero"})
        if ( price )
            return res.status(400).json({ message: "Price can'/t be below zero"})

        const item = await Item.findById(id)
        if ( amount > item.amount )
            return res.status(400).json({ message: `We have only ${item.amount} availables`})

        const updatedItem = { ...req.body, _id: id };
    
        await Item.findByIdAndUpdate(id, updatedItem, { new: true });
    
        return res.status(200).json(updatedItem);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteItem = async (req:Request, res:Response) => { 
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No item with id: ${id}`);

        await Item.findByIdAndRemove(id);
    
        return res.status(204).json({ message: "item deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export default router;