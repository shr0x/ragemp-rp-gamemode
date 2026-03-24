# 🚀 Getting Started

This guide will help you set up and run the project locally.

---

# 🧠 Understanding the Project

This gamemode is split into **three main parts**:

| Layer  | Description                          |
| ------ | ------------------------------------ |
| Server | Backend logic (Node.js + TypeScript) |
| Client | RAGE:MP client-side scripts          |
| CEF    | Frontend UI (React app)              |

Each part is built and run separately.

---

# 📦 Requirements

* Node.js (v18+ recommended)
* PostgreSQL
* RAGE:MP server

---

# 📥 Installation

```bash
git clone https://github.com/shr0x/ragemp-rp-gamemode
cd ragemp-rp-gamemode
npm install
```

---

# ⚙️ Environment Setup

Create a `.env` file in the root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=ragemp
```

---

# 🗄 Database Setup

You must create the database manually.

Example (PostgreSQL):

```sql
CREATE DATABASE ragemp;
```

Make sure PostgreSQL is running before starting the project.

---

# 🔧 Build & Run Scripts Explained

This project uses multiple scripts to handle different parts of the system.

---

## 🧱 Build Everything

```bash
npm run build
```

This runs:

* `build:client`
* `build:server`
* `build:cef`

Use this for production builds.

---

## 🖥 Server

### Build server

```bash
npm run build:server
```

### Watch server (auto rebuild)

```bash
npm run watch:server
```

---

## 🎮 Client (RAGE:MP)

### Build client

```bash
npm run build:client
```

### Watch client

```bash
npm run watch:client
```

---

## 🔁 Watch Client + Server Together

```bash
npm run watch:both
```

This runs both watchers in parallel using `concurrently`.

---

## 🌐 CEF (Frontend)

### Development mode

```bash
npm run watch:cef
```

This will:

* install frontend dependencies
* start React dev server

---

### Production build

```bash
npm run build:cef
```

---

# 🧠 Recommended Development Setup

For development, run:

```bash
npm run watch:both
npm run watch:cef
```

This will:

* auto-rebuild client & server on changes
* run frontend in dev mode

---

# ▶️ Running the Server

1. Start your RAGE:MP server
2. Make sure compiled files exist (`build` or `watch`)
3. Connect to:

```text
localhost:22005
```

---

# 🧪 First Run

Once connected:

* Register a user
* Create a character
* You should see the HUD/UI working

---

# ⚠️ Common Issues

## Nothing updates when editing code

Make sure you are running:

```bash
npm run watch:both
```

---

## UI not loading

Make sure:

```bash
npm run watch:cef
```

is running.

---

## Database errors

* PostgreSQL must be running
* `.env` must be correct
* database must exist

---

# 📁 Helpful Scripts

### Format code

```bash
npm run format-client
npm run format-server
```

---

# 🧠 Next Step

👉 Read: `core-concepts.md`

This explains how the framework is structured and how to build features properly.
