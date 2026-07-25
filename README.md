# Student Results Portal

Full-stack CRUD app with role-based authentication (Admin + Student).

## Stack
- Node.js + Express (backend)
- MongoDB + Mongoose (database)
- EJS (views)
- express-session + connect-mongo (auth sessions)
- PDFKit (result PDF export)

## Features
- **Admin**: create/edit/delete students, create/edit/delete results per student
- **Student**: log in, view own results only, download results as PDF
- Passwords hashed with bcrypt
- Role-based route protection via middleware

## Working from your phone (no laptop)

1. **Push this folder to GitHub** — easiest way is the GitHub mobile app or
   github.com in your phone browser: create a new repo, use "Add file → Upload files",
   and upload this whole folder (or use the GitHub web editor to paste each file in).
2. **Get a free MongoDB database** — go to mongodb.com/cloud/atlas on your phone,
   create a free (M0) cluster, create a database user, and copy the connection string.
   Add your current IP (or 0.0.0.0/0 for simplicity while testing) to network access.
3. **Deploy on Render** (render.com, works fully in mobile browser):
   - New → Web Service → connect your GitHub repo
   - Build command: `npm install`
   - Start command: `node server.js`
   - Add environment variables from `.env.example`: `MONGO_URI`, `SESSION_SECRET`
4. **Create your admin account** — Render has a "Shell" tab under your service where
   you can run `node seed.js` once, right from the browser (no terminal needed on your phone).
   This creates login: `admin001` / `admin123` — change the password after first login.
5. **Create student accounts** by logging in as admin and using "Add Student".

## Local field reference

- Student login uses **Registration Number** + password (not email).
- Grades are auto-calculated from score: A(70+) B(60+) C(50+) D(45+) E(40+) F(<40).
- Deleting a student also deletes their results.

## Folder structure
```
config/db.js          - MongoDB connection
models/                - User, Result schemas
middleware/auth.js     - login check + role guard
routes/                - auth, admin, student routes
views/                 - EJS templates (login, admin/*, student/*)
public/css/style.css   - styling
server.js              - app entry point
seed.js                - creates first admin account
```
