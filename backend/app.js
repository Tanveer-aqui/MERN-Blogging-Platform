import dotenv from 'dotenv';
dotenv.config(); 

import './passport.js'

import express from 'express'
import { PORT } from './config.js'
import mongoose from 'mongoose';
import blogRoute from "./routes/blog.js"
import commentRoute from "./routes/comment.js"
import cors from 'cors';
import ExpressError from './utils/ExpressError.js';
import passport from 'passport';
import LocalStrategy from 'passport-local'
import User from './models/user.js';
import session from 'express-session';
import userRoute from './routes/user.js'
import authRoute from './routes/auth.js'
import bookmarkRoute from './routes/bookmark.js'
import path from 'path';

import { fileURLToPath } from 'url';
import MongoStore from 'connect-mongo';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URL = process.env.MONGODB_URL;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}))

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: {
    secret: process.env.SESSION_SECRET
  },
  touchAfter: 24 * 3600
})

store.on('error', (e) => {
  console.log('ERROR IN MONGO SESSION STORE', e);
});


const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGO_URL
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: "none",
  }
}

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/blogs", blogRoute);
app.use("/blogs/:id/comments", commentRoute);
app.use('/bookmarks', bookmarkRoute);
app.use("/", userRoute);
app.use("/", authRoute);



app.get("/", (req, res) => {
  res.status(200).json("This is root")
})


app.use("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"))
})

app.use((err, req, res, next) => {
  let {status = 500, message="Something went wrong"} = err;
  res.status(status).json({message: message});
})

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
          console.log(`Server listening on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("MongoDB connection error: ", err);
    })
