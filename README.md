# Online Tech

A practical technology learning site. The original project was a single React landing page. This version keeps that program — fundamentals, digital skills, a learning assistant, and certificates — and turns it into a working app.

## What you can do

- Browse and search six courses, filtered by level and topic
- Create an account and sign in
- Enroll for free, mark lessons complete, and pick up progress on the dashboard
- Unlock a printable certificate after every lesson in a course is complete
- Request a team quote or send a contact message (both are saved by the API)
- Ask the learning assistant about the catalog, enrollment, and certificates

## Run it

```bash
npm install
npm run dev
```

The site is at [http://localhost:5173](http://localhost:5173). The API runs at [http://localhost:4000](http://localhost:4000).

Demo learner:

- Email: `demo@onlinetech.dev`
- Password: `LearnTech1!`

That account is already enrolled in Technology Fundamentals, with the first two lessons marked complete.

## Scripts

- `npm run dev` — API and Vite together
- `npm run server` — API only
- `npm run build` — production frontend in `dist/`
- `npm start` — API, and the built site if `dist/` exists

Accounts, enrollments, quotes, and messages are stored in `server/data/db.json`. That folder is local and is not committed.
