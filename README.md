# 🌐 GDELT Global News Search

This is a modern full-stack application for searching real-time global news using the [GDELT Full Text Search API](https://blog.gdeltproject.org/gdelt-2-0-our-global-world-in-realtime/).  
It includes:

- 🧠 **Node.js + Express (TypeScript)** backend to proxy and parse GDELT responses.
- ⚛️ **React (Vite)** frontend to query and visualize the results.
- 🌗 **Light/Dark mode toggle** with modern responsive UI.

---

## 📁 Project Structure

```
gdelt_app/
├── backend/            # Express + TypeScript API proxy
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── frontend/           # React frontend (Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── .gitignore
├── README.md
└── package.json        # Optional root-level for concurrent dev
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/gdelt_app.git
cd gdelt_app
```

### 2️⃣ Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

---

### 3️⃣ Run in Development

> 📌 You need both the backend and frontend running.  
You can start them individually or with a single root command (see below).

#### Individually:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

#### OR: Concurrently (Optional)

If you've added the `concurrently` package in a root `package.json`:

```bash
npm install
npm run dev
```

---

## 🌍 About the App

- Enter a search term (e.g., `nigeria`, `climate`, `AI`)
- The backend proxies the GDELT Full Text API, scrapes and parses HTML responses using `cheerio`
- Results are parsed into a structured format and returned to the frontend
- The frontend displays each article in a modern card layout with title, image (if available), publication info, and link

---

## 🌓 Light / Dark Mode

The app includes a toggle for switching between light and dark themes.  
This uses local state and inline styles for simplicity — easily adaptable for Tailwind, CSS modules, or styled-components.

---

## 🧪 Tech Stack

| Layer      | Tech                       |
|------------|----------------------------|
| Frontend   | React + Vite               |
| Backend    | Node.js + Express + TypeScript |
| Parsing    | Cheerio (server-side HTML) |
| Proxy/API  | GDELT Full Text Search API |
| Styling    | Custom responsive layout   |

---

## 🛠 Future Improvements

- Add language and region filters
- Implement pagination or infinite scroll
- Improve error handling with toasts or modals
- Deploy with Vercel (frontend) + Railway/Render (backend)
- Unit and integration tests (Jest, Supertest)

---

## 📄 License

MIT © jared_kirschbaum
