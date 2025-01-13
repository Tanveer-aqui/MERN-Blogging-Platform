import passport from 'passport';
import User from '../models/user.js';
import SuccessRes from '../utils/SuccessRes.js'
import Blog from '../models/blog.js';


//SignUp
export const signup =  async(req, res, next) => {
    const {username, email, password} = req.body;
    const newUser = new User({username, email});
    const registeredUser = await User.register(newUser, password);
        
    req.login(registeredUser, (err) => {
        if(err) {
            return next(err);
        }
        return SuccessRes(res, "Registered Successfully!", {user: {
            userId: req.user._id, 
            username: newUser.username,
            email: newUser.email
        }})
    })
};

export const login = (req, res, next) => {
    const {redirectUrl} = req.body;
    passport.authenticate('local', (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'An internal server error occurred.' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Login failed. Please try again.' });
        }
        req.session.redirectUrl = redirectUrl || '/';
        return res.json({
          message: 'Logged in successfully',
          user: {
            userId: user._id,
            username: user.username,
            email: user.email,
          },
          redirectUrl: req.session.redirectUrl,
        });
      });
    })(req, res, next);
};


export const logout =  (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Session destruction failed" });
            }
            res.clearCookie('connect.sid');
            return res.status(200).json({ message: "Logged out successfully" });
        });
    });
};

export const session = (req, res) => {    
    if (req.isAuthenticated()) {
        
        return res.status(200).json({
            user: { 
                userId: req.user._id, 
                username: req.user.username, 
                email: req.user.email,
                profilePicture: req.user.profilePicture
            }
        });
    }
    return res.status(401).json({ message: "Unauthorized! Please log in." });
};

export const userPosts =  async(req, res, next) => {
    const {userId} = req.params;
    const blogs = await Blog.find({owner: userId});
    SuccessRes(res, "Posts by User retrived!", {blogCount: blogs.length, data: blogs})
};