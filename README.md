# Kanban Task Board

A responsive, full stack Kanban-style task board built with React and Supabase. Create tasks, then drag them across **To Do**, **In Progress**, and **Done** columns to track your work. Tasks are saved to a PostgreSQL database, so they persist between sessions.

**[Live Demo](https://kanban-task-board-orpin.vercel.app)**

<!-- Add a screenshot: save it as screenshot.png in the repo root, or delete the image line above. -->

## Features

- Create and delete tasks
- Four columns: To Do, In Progress, In Review, and Done
- Drag-and-drop task movement between columns (including trash)
- Instant updates with no page reloads, using React state
- Persistent storage with Supabase (PostgreSQL)
- Responsive layout

## Tech Stack

- **Frontend:** JavaScript, React
- **Backend / Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel

## Getting Started

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/sampow50/kanban-task-board.git
cd kanban-task-board

# Install dependencies
npm install
```

Create a `.env` file in the project root with your own Supabase project credentials:

```
[YOUR_SUPABASE_URL_VARIABLE_NAME]=your-supabase-project-url
[YOUR_SUPABASE_ANON_KEY_VARIABLE_NAME]=your-supabase-anon-key
```

<!-- Look in your source code (search for "createClient") to find the exact environment variable names, then replace the bracketed names above. Never commit your .env file or put real keys in this README. -->

Then start the development server:

```bash
npm start
```

Open the local address shown in your terminal (usually `http://localhost:3000`).

<!-- If the project uses Vite, the command is "npm run dev" and the address is usually http://localhost:5173. Check the "scripts" section of package.json. -->

## How It Works

Each task belongs to one of three columns. The React app keeps the board in state, so creating, deleting, or dragging a task updates the affected columns immediately. Changes are saved to a Supabase PostgreSQL database, so the board looks the same when you come back to it.

## Project Structure

```
kanban-task-board/
├── public/        # Static assets
├── src/           # React components and application logic
├── package.json   # Dependencies and scripts
└── README.md
```

## Future Improvements

- [Edit task titles and add descriptions]
- [Due dates and task priorities]
- [Multiple boards per user]

## Deployment

The frontend is deployed on Vercel, with Supabase providing the database. Live at [kanban-task-board-orpin.vercel.app](https://kanban-task-board-orpin.vercel.app).

## Author

**Samuel Powell**
[GitHub](https://github.com/sampow50) | [LinkedIn](https://www.linkedin.com/in/samuel-powell-8903222b6)
