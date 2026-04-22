// Import required modules
const mongoose = require('mongoose');
const multer = require('multer');
const ImageKit = require('imagekit');
const axios = require('axios');

// Load environment variables
require('dotenv').config();

// MongoDB connection URL
const url = process.env.MONGODB_URI;

// ✅ Connect to MongoDB (modern syntax, no deprecations)
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.info("✅ Connected to MongoDB"))
  .catch(error => console.error("❌ Error connecting to MongoDB:", error.message));

// If you’re using GridFS or want a separate connection, keep this:
const conn = mongoose.createConnection(url);

// ✅ Initialize ImageKit
const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// ✅ BunnyCDN video API endpoint
const bunnyStreamEndpoint = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos`;

// ✅ Create a video entry in BunnyCDN (with full error handling)
const createVideoEntry = async (fileName) => {
  try {
    const response = await axios.post(
      bunnyStreamEndpoint,
      { title: fileName },
      {
        headers: {
          AccessKey: process.env.BUNNY_STREAM_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("🎬 Bunny video created successfully:", response.data);
    return response.data.guid;
  } catch (error) {
    console.error("❌ BunnyCDN video creation failed:");
    console.error(error.response?.data || error.message);
    throw new Error("Failed to create BunnyCDN video entry");
  }
};

// ✅ Configure multer for in-memory uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Export everything
module.exports = {
  mongoose,
  conn,
  upload,
  imageKit,
  createVideoEntry,
  bunnyStreamEndpoint,
};
