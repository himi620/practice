import express from 'express';
import { register,login } from '../controller/user.js'; 
import { logout } from "../controller/user.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

export default router;
