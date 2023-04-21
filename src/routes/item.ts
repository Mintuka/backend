import express from 'express';
import { getItem, getItems, createItem, updateItem, deleteItem } from '../controllers/item';

export const router = express.Router();

router.post('/', createItem);
router.get('/', getItems);
router.get('/:id', getItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);