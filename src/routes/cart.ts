import express from 'express';
import { getCart, getCarts, updateCart, deleteCart } from '../controllers/cart';
import { isAuthenticated } from '../middlewares/isAuthenticated';

export const router = express.Router();

router.get('/', getCarts);
router.get('/:id', isAuthenticated, getCart);
router.put('/', isAuthenticated, updateCart);
router.delete('/:id', isAuthenticated, deleteCart);