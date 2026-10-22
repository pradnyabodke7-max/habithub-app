# HabitHub - Build Better Habits Every Day

A full-stack MERN habit tracker built for the FSD CCA2 assessment. Users can add habits, check them in daily, track streaks and weekly progress, search and filter habits, and view a completion heatmap.

## Features

1. Habit management: add, view, edit and delete habits
2. Daily check-in: mark a habit Done or Undo (no duplicate check-ins per day)
3. Streaks: current streak and best streak from real check-in dates
4. Weekly progress: completions in the last 7 days with a percentage bar
5. Search and filter: search by name and filter by category, working together
6. Calendar heatmap: green shades based on habits completed per day, with a date and count on hover

Extras: dashboard statistics, progress ring, motivation card, calendar page, loading and empty states, and toast notifications.

## Tech Stack

- Frontend: React (Vite), CSS3, Lucide React icons
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose

## Project Structure

```
habithub/
├── backend/
│   ├── models/        Habit.js, CheckIn.js
│   ├── routes/        habitRoutes.js, checkinRoutes.js
│   ├── server.js
│   └── .env.example
└── frontend/
    └── src/
        ├── components/   Sidebar, Header, StatsCards, HabitList, HabitCard,
        │                 HabitForm, SearchFilter, Heatmap, MotivationCard, Toast
        ├── pages/        Dashboard, AllHabits, CalendarPage
        ├── services/     api.js
        ├── utils/        dates.js, stats.js, categories.js
        ├── App.jsx
        └── App.css
```

## Setup Instructions

### Requirements
- Node.js (v18 or newer)
- MongoDB running locally, or a MongoDB Atlas connection string

### 1. Backend

```
cd backend
npm install
```

Create a file named `.env` inside `backend` (copy from `.env.example`):

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/habithub
```

Start the server:

```
npm run dev
```

The API runs at http://localhost:5000

### 2. Frontend

Open a second terminal:

```
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in the browser. Vite forwards `/api` requests to the backend.

## API Documentation

### Habits

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/habits | Get all habits |
| POST | /api/habits | Create a habit (name, category, dailyGoal) |
| PUT | /api/habits/:id | Update a habit |
| DELETE | /api/habits/:id | Delete a habit and its check-ins |

### Check-ins

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/checkins | Get all check-ins |
| POST | /api/checkins/toggle | Toggle check-in. Body: habitId, date (YYYY-MM-DD) |

Status codes: 200 OK, 201 Created, 400 validation error, 404 not found, 500 server error.

## Database Design

- **Habit**: name (2-50 chars), category (Health, Study, Fitness, Personal), dailyGoal (optional), timestamps
- **CheckIn**: habit (reference), date (YYYY-MM-DD text), timestamps. A unique index on habit + date prevents duplicate check-ins.

## How the Calculations Work

- **Current streak**: consecutive days counted backwards from today. If today is not checked in yet, counting starts from yesterday so the streak is not lost until the day ends.
- **Best streak**: the longest run of consecutive days in the habit's history.
- **Weekly progress**: check-ins in the last 7 days divided by 7, shown as a percentage.
- **Heatmap**: number of habits completed on each date, shaded by the share of total habits.
- Dates are stored as local YYYY-MM-DD text so time zones never shift a day.

## Troubleshooting

- **MongoDB connection failed**: start the MongoDB Server service on Windows, or check the Atlas username, password and Network Access IP list.
- **Cannot find module**: run `npm install` inside the folder showing the error.
- **Cannot reach the server**: make sure the backend is running on port 5000.
- **Port already in use**: close the old terminal or change PORT in `.env`.

## Author

Pradnya Bodke - SY MCA, MIT World Peace University, Pune