import express from 'express';
import { 
    login, 
    logout, 
    session, 
    signup, 
    userPosts 
} from '../controllers/user.js';

const router = express.Router();

//SignUp
router.post('/signup', signup);

//Login
router.post('/login', login);

//Logout
router.get("/logout", logout);

//Session
router.get('/session', session);

//Posts of user
router.get('/users/:userId/posts', userPosts);


export default router;