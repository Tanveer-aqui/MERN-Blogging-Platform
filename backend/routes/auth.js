import express from 'express';
import passport from 'passport';

const router = express.Router();

// Google OAuth initiation
router.get(
    '/auth/google', 
    passport.authenticate('google', {
         scope: ['profile', 'email'],
    }));

// Google OAuth callback
router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('http://localhost:5173/');
    }
);

export default router;
