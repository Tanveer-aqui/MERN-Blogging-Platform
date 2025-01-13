import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: false,
        unique: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    profilePicture: {
        type: String,
    },
    authProvider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local',
    },
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'username',
});

const User = mongoose.model('User', userSchema);
export default User;
