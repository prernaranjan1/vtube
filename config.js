const passport = require("passport");
require("dotenv").config();

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Channel = require("@models/Channel");
const { createUniqueHandle } = require("@lib/utils");

// Log OAuth configuration
const callbackUrl = `${process.env.HOST_URL || "http://localhost:3000"}/api/auth/google/callback`;
console.log("✅ Google OAuth Callback URL =>", callbackUrl);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackUrl,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let channel = await Channel.findOne({ email: profile.emails[0].value });

        if (!channel) {
          const handle = await createUniqueHandle(profile.emails[0].value.split("@")[0]);
          channel = await Channel.create({
            name: profile.displayName,
            handle: handle,
            email: profile.emails[0].value,
            logoURL: profile.photos[0].value.split("=")[0],
          });
          console.log("✅ New channel created:", channel.handle);
        } else {
          console.log("✅ Existing user found:", channel.handle);
        }

        cb(null, channel);
      } catch (err) {
        console.error("❌ Google Auth Error:", err.message);
        cb(err);
      }
    }
  )
);

passport.serializeUser((channel, done) => {
  console.log("✅ Serializing user:", channel.id);
  done(null, channel.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const channel = await Channel.findById(id);
    if (!channel) {
      console.warn("⚠️ User not found in database:", id);
      return done(null, false);
    }
    done(null, channel);
  } catch (error) {
    console.error("❌ Deserialize Error:", error.message);
    done(error);
  }
});

module.exports = passport;
