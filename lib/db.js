const mongoose = require('mongoose');
const multer = require('multer');
const ImageKit = require('imagekit');
const axios = require('axios');

require('dotenv').config();

// 🔴 Safety check
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing");
  process.exit(1);
}

// ✅ Connect MongoDB (ONLY ONE CONNECTION)
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => console.info("✅ Connected to MongoDB"))
.catch(err => {
  console.error("❌ MongoDB Error:", err.message);
  process.exit(1);
});

// ✅ ImageKit
const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// ✅ Bunny API
const bunnyStreamEndpoint = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos`;

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

    return response.data.guid;
  } catch (error) {
    console.error("❌ Bunny Error:", error.response?.data || error.message);
    throw new Error("Bunny video creation failed");
  }
};

// ✅ Multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

module.exports = {
  mongoose,
  upload,
  imageKit,
  createVideoEntry,
  bunnyStreamEndpoint,
};
