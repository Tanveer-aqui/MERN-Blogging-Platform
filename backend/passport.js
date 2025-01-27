import dotenv from 'dotenv';
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./models/user.js";


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Find or create user
                // let user = await User.findOne({ googleId: profile.id });
                let user = await User.findOne({ email: profile.emails[0].value });

                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        profilePicture: profile.photos[0].value,
                        authProvider: 'google',
                    });
                    await user.save();

                }

                done(null, user); // Pass user to serializeUser
            } catch (error) {
                console.error("Error in Google OAuth strategy:", error);
                done(error, null);
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);        
        done(null, user);
    } catch (error) {
        console.error("Error in deserializing user:", error);
        done(error, null);
    }
});