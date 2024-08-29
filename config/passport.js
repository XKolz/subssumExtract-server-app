// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/User');

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: '/auth/google/callback'
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     // Check if the user already exists in the database
//     let user = await User.findOne({ googleId: profile.id });
//     if (user) {
//       return done(null, user);
//     }

//     // If not, create a new user
//     user = new User({
//       googleId: profile.id,
//       username: profile.displayName,
//       email: profile.emails[0].value
//     });
    
//     await user.save();
//     done(null, user);
//   } catch (err) {
//     done(err, false, { message: err.message });
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Adjust the path to your User model

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (user) {
      return done(null, user);
    }
    
    user = new User({
      googleId: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value
    });
    
    await user.save();
    done(null, user);
  } catch (err) {
    done(err, false, { message: err.message });
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
