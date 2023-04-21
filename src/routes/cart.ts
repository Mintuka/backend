import express from 'express';
import { getCart, getCarts, createCart, updateCart, deleteCart } from '../controllers/cart';

export const router = express.Router();

router.post('/', createCart);
router.get('/', getCarts);
router.get('/:id', getCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);