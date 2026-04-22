# VTube – Video Streaming Platform

VTube is a full-stack video platform inspired by YouTube, designed to handle video uploads, channel interactions, and content discovery using a scalable backend architecture.

---

## 🚀 Core Features

* Video upload pipeline using BunnyCDN (TUS upload + API integration)
* Channel system with subscriptions and notification modes
* Comment system with replies, likes, and dislikes
* Tag & hashtag-based video discovery
* Creator Studio for managing videos and content
* Google OAuth authentication

---

## 🏗️ System Architecture

* Backend handles:

  * Video metadata (MongoDB)
  * Channel & subscription logic
  * Comment system
* BunnyCDN handles:

  * Video storage
  * Encoding & streaming
* ImageKit handles:

  * Image uploads (logo/banner)

---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Frontend:** EJS, CSS
* **Media/CDN:** BunnyCDN, ImageKit
* **Auth:** Google OAuth (Passport.js)

---

## ⚠️ Limitations

* N+1 API calls for video metadata (performance issue)
* No caching layer (Redis not implemented)
* Likes/comments stored in arrays → not scalable
* Heavy dependency on BunnyCDN APIs

---

## 📈 Planned Improvements

* Add Redis caching for video lists & trending
* Move likes/subscriptions to separate collections
* Reduce external API calls via webhook syncing
* Introduce background jobs (BullMQ/queues)
* Implement recommendation logic

---

## 📂 Setup

```bash
git clone https://github.com/prernaranjan1/vtube.git
cd vtube
npm install
npm start
```

---

## 📸 Preview
# VTube – Video Streaming Platform

VTube is a full-stack video platform inspired by YouTube, designed to handle video uploads, channel interactions, and content discovery using a scalable backend architecture.

---

## 🚀 Core Features

* Video upload pipeline using BunnyCDN (TUS upload + API integration)
* Channel system with subscriptions and notification modes
* Comment system with replies, likes, and dislikes
* Tag & hashtag-based video discovery
* Creator Studio for managing videos and content
* Google OAuth authentication

---

## 🏗️ System Architecture

* Backend handles:

  * Video metadata (MongoDB)
  * Channel & subscription logic
  * Comment system
* BunnyCDN handles:

  * Video storage
  * Encoding & streaming
* ImageKit handles:

  * Image uploads (logo/banner)

---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Frontend:** EJS, CSS
* **Media/CDN:** BunnyCDN, ImageKit
* **Auth:** Google OAuth (Passport.js)

---

## ⚠️ Limitations (Honest)

* N+1 API calls for video metadata (performance issue)
* No caching layer (Redis not implemented)
* Likes/comments stored in arrays → not scalable
* Heavy dependency on BunnyCDN APIs

---

## 📈 Planned Improvements

* Add Redis caching for video lists & trending
* Move likes/subscriptions to separate collections
* Reduce external API calls via webhook syncing
* Introduce background jobs (BullMQ/queues)
* Implement recommendation logic

---

## 📂 Setup

```bash
git clone https://github.com/prernaranjan1/vtube.git
cd vtube
npm install
npm start
```

---

## 📸 Preview
<img width="1365" height="689" alt="image" src="https://github.com/user-attachments/assets/5f9b37be-d9ec-47d8-b16f-17e0ad4417e4" />
<img width="1355" height="729" alt="image" src="https://github.com/user-attachments/assets/7df9b050-0296-4d5c-9d47-3cb7e99ccb79" />
<img width="1366" height="660" alt="image" src="https://github.com/user-attachments/assets/8953b155-dbcd-46c3-b63a-0ee0b13184bf" />
<img width="1366" height="623" alt="image" src="https://github.com/user-attachments/assets/0c0eb982-d3e4-4356-aac3-7a562659a85d" />

---

## 🎯 What this project demonstrates

* Backend API design
* Database modeling & indexing
* External API integration (CDN)
* Real-world video platform architecture concepts


---

## 🎯 What this project demonstrates

* Backend API design
* Database modeling & indexing
* External API integration (CDN)
* Real-world video platform architecture concepts
