const passport = require("passport");
require("dotenv").config(); // Load environment variables from .env file

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Channel = require("@models/Channel"); // Import the Channel model
const { createUniqueHandle } = require("@lib/utils");

// Configure the Google strategy for use by Passport
console.log("✅ Google OAuth Callback URL =>",
  `${process.env.HOST_URL || "http://localhost:3000"}/api/auth/google/callback`
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Google client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google client secret
      callbackURL: `${process.env.HOST_URL || "http://localhost:3000"}/api/auth/google/callback`, // Flexible callback URL
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Find a channel by email
        let channel = await Channel.findOne({ email: profile.emails[0].value });

        // If no channel is found, create a new one
        if (!channel) {
          const handle = await createUniqueHandle(profile.emails[0].value.split("@")[0]);
          channel = await Channel.create({
            name: profile.displayName,
            handle: handle,
            email: profile.emails[0].value,
            logoURL: profile.photos[0].value.split("=")[0],
          });
        }

        // Return the channel through the callback
        cb(null, channel);
      } catch (err) {
        cb(err);
      }
    }
  )
);

// Serialize the user (store channel id in session)
passport.serializeUser((channel, done) => {
  done(null, channel.id);
});

// Deserialize the user (retrieve channel from DB)
passport.deserializeUser(async (id, done) => {
  try {
    const channel = await Channel.findById(id);
    done(null, channel);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
