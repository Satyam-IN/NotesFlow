# NotesFlow — Notes Management & Productivity Suite

A modern productivity application designed to help users organize their notes, manage daily tasks, schedule events, and improve their productivity through a clean and intuitive interface.

## 🚀 Features

- **Dashboard:** Track daily goals, productivity statistics, and upcoming schedules.
- **Task Management:** Create, organize, prioritize, and track tasks.
- **Calendar:** Manage events and visualize your schedule.
- **Notes Management:** Create, organize, search, and categorize notes.
- **Settings:** Customize account information, appearance, notifications, and privacy preferences.
- **Focus Tracking:** Run 25-minute focus sessions that record real focused time (paused time excluded) and track your completion streak.
- **Productivity Analytics:** Live daily and weekly completed, pending, and focus statistics with a 7-day history view.
- **Local-first Storage:** Tasks, notes, events, preferences, and focus history persist in your browser.
- **Responsive UI:** Clean and modern interface built for desktop and mobile.

## 🖥️ Screenshots

### Dashboard
![NotesFlow Dashboard](screenshots/dashboard.png)

### Task Management
![NotesFlow Tasks](screenshots/tasks.png)

### Calendar
![NotesFlow Calendar](screenshots/calendar.png)

### Notes Management
![NotesFlow Notes](screenshots/notes.png)

### Settings
![NotesFlow Settings](screenshots/settings.png)

## 🛠️ Technologies Used

- React 19
- JavaScript (ES modules)
- HTML5
- Tailwind CSS v4
- Vite 8
- React Router 7
- Material Symbols & Inter

## ⚙️ Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Satyam-IN/NotesFlow.git
   ```

2. Navigate to the project directory:

   ```bash
   cd NotesFlow
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

> **Note:** NotesFlow is a front-end demo. All data is stored in your browser's
> `localStorage` and no backend is required. On first run you are signed in as the
> demo user; after signing out, `alex.rivera@notesflow.io` with any password of 8+
> characters signs you back in.

## 📂 Project Structure

```text
NotesFlow/
├── public/               # favicons and web manifest
├── screenshots/          # README screenshots
├── src/
│   ├── assets/           # logo and avatar images
│   ├── components/       # reusable UI and feature components
│   ├── data/             # seed data and shared constants
│   ├── hooks/            # useLocalStorage
│   ├── pages/            # route-level screens
│   ├── store/            # AppProvider state and actions
│   └── utils/            # analytics, dates, tasks, validation
├── stitch_extract/       # original design references
├── index.html
├── package.json
└── vite.config.js
```

## 🔮 Future Improvements

- Cloud synchronization
- AI-powered note organization
- Advanced productivity analytics
- Improved notification and reminder system
- Additional integrations

## 👨‍💻 Developer

**Satyam Kumar Jha**

GitHub: [@Satyam-IN](https://github.com/Satyam-IN)

## 📜 License

This project is available for educational and portfolio purposes.
