import express from 'express';
import { getUsers, updateUser, getUser, deleteUser } from '../controllers/user';

import { logIn } from '../services/logIn';
import { signUp } from '../services/signUp'

export const router = express.Router();

router.post('/log-in', logIn)
router.post('/sign-up', signUp);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);