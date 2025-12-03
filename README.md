#README.md
# Airbnb-Clone (MERN + EJS) 🏠

A full-stack Airbnb-like web application built with Node.js, Express, MongoDB, and EJS — allowing hosts to register homes, guests to browse homes, upload images & documents, and manage bookings. Designed as a learning / demo project, but much functionality is complete (home listing, add/edit/delete home, file uploads, session-based auth, etc.).

## 🔗 Live Demo  
[https://airbnb-project-by-mern-stack-2.onrender.com](https://airbnb-project-by-mern-stack-3.onrender.com)  

*(If live demo not available, skip this section or mention “Local setup only.”)*

## 🛠 Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose)  
- **View Engine:** EJS (Embedded JavaScript)  
- **File Upload / Storage:** — images & PDF upload + file-system storage  
- **Frontend / Static:** HTML, CSS (custom), served by Express  
- **Session & Authentication:** express-session (cookie-based)  
- **Deployment:** Hosted on Render.com (or another cloud provider)  

## 📂 Project Structure

```
/ (root)
│ — app.js  
│ — package.json  
│ — /controllers  
│ — /models  
│ — /routes  
│ — /views  
│     └── /host  
│         └── edit-home.ejs, host-home-list.ejs, …  
│     └── /partials (head, header, footer…)  
│ — /public (static files: css, images…)  
│ — /uploads (if storing uploaded files)  
│ — /rules-files (for PDF uploads)  
│ — utils, etc.  
```

(*Your actual structure may vary — update accordingly.*)  

## 🚀 Getting Started (Local Setup)

### Prerequisites  
- [Node.js](https://nodejs.org) (v14 or above recommended)  
- [MongoDB](https://www.mongodb.com/) (local or Atlas)  
- npm (comes with Node.js)  

### Setup & Run

1. Clone the repository:  
   ```bash
   git clone https://github.com/omkar0605shelar/Airbnb-project-by-MERN-stack-.git
   cd Airbnb-project-by-MERN-stack-
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Setup environment variables:  
   Create a file `.env` in the root (if you use environment variables), e.g.:  
   ```text
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key
   ```

4. Start the server:  
   ```bash
   npm start
   ```
   or, if using nodemon (for development):  
   ```bash
   npm run dev
   ```

5. Open browser and go to: `http://localhost:3000`  

*(Adjust port if configured differently.)*

## ✅ Features

- User session-based login / (guest or host — adjust as needed)  
- Hosts can **add**, **edit**, **delete** homes  
- Upload **image** and **PDF rules file** for each home  
- List all homes — viewing by guests/hosts  
- Simple UI using EJS and custom CSS  
- File storage for uploads  
- Organized backend (models, controllers, routes)  

## 🔧 Deployment (Production)

1. Push to your favorite host (e.g. Render, Heroku, Vercel with Node backend)  
2. Configure environment variables (database URI, session secret, etc.)  
3. Ensure file-upload folders (e.g. `public`, `uploads`, `rules-files`) are set up and write-permissions are correct  
4. Access via `https://your-app-url` (for deployed version)  

*(You can also add CI/CD or Docker setup later.)*

## 📋 Roadmap & TODOs

- Add user authentication (sign up / login / role-based: host / guest)  
- Add booking/reservation functionality  
- Improve UI (use React or frontend framework)  
- Add validations on server & client side  
- Add unit / integration tests  
- Support image storage on cloud (e.g. AWS S3)  
- Add user profile, reviews, search & filters  

## 🤝 Contributing  

Contributions are welcome!  
If you want to contribute:  
- Fork the repo  
- Create a new branch (e.g. `feature/my-feature`)  
- Make your changes / improvements  
- Commit with descriptive message  
- Open a Pull Request  

Please ensure code style consistency, meaningful commit messages, and no sensitive data (like `.env`) is committed.


