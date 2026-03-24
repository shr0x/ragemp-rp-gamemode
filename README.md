# RAGEMP RP Gamemode (Framework)

A modern, modular **Roleplay framework for RAGE:MP**, built with **TypeScript**, **PostgreSQL**, and a **React-based CEF UI**.

This project is designed to be used as a **base foundation** for building scalable RP servers — not just a gamemode.

---

## ✨ Features

* Authentication & Character System
* Inventory System
* Command System
* Chat & Notifications
* Player HUD (CEF)
* Interaction Menu (Radial UI)
* Modular Client/Server Architecture
* Shared Types & Utilities
* Database integration (PostgreSQL + TypeORM)

---

## 🧠 Philosophy

This framework is built around:

* **Separation of concerns** (client / server / shared / frontend)
* **Modularity** (features live in their own systems)
* **Scalability** (easy to extend without breaking existing code)
* **Developer experience** (typed, structured, predictable)

---

## 📁 Project Structure

* `source/client` → Client-side logic (RAGE:MP)
* `source/server` → Server-side logic
* `source/shared` → Shared code between client/server
* `frontend` → CEF UI (React + Vite)

---

## 🚀 Getting Started

```bash
git clone https://github.com/shr0x/ragemp-rp-gamemode
cd ragemp-rp-gamemode
npm install
```

Then configure your `.env` and database.

---


## 📚 Documentation

Full documentation available in `/docs`

---

## ⚠️ Status

Work in progress — APIs may change.

---
