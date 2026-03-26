# RAGEMP RP Framework

A modern, structured **Roleplay framework for RAGE:MP**, built with **TypeScript**, **PostgreSQL (TypeORM)**, and a **React-based CEF UI**.

This project is designed as a **foundation for building RP servers**, not a pre-built gamemode.

---

## 🧩 What is this?

Most RAGE:MP projects become hard to maintain as they grow:

- logic spread across client/server/frontend
- unclear data flow
- tightly coupled systems
- no consistent structure

This framework solves that by providing:

- a clear architecture
- structured communication between layers
- predictable development patterns

---

## ✨ What you get

- Authentication & Character system  
- Inventory system  
- Command system  
- Chat & notification system  
- Player HUD (CEF)  
- Interaction menu (radial UI)  

All built on top of:

- a modular server/client/frontend architecture  
- shared types and utilities  
- PostgreSQL + TypeORM integration  

---

## 🧠 Core Principles

This framework is built around a few key ideas:

- **Server is authoritative**  
  All gameplay logic lives on the server.

- **Separation of concerns**  
  Server = logic, Client = bridge, Frontend = UI.

- **Predictable structure**  
  Systems follow consistent patterns across the project.

- **UI is optional**  
  Features can exist without CEF.

---

## 📁 Structure

```text
source/server   → gameplay logic, systems, database
source/client   → RAGE:MP bridge layer
source/shared   → shared types & utilities
frontend        → CEF UI (React + Vite)
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/shr0x/ragemp-rp-gamemode
cd ragemp-rp-gamemode
npm install
```

Then configure your environment and database.

---

## 📚 Documentation

All documentation is available in the Wiki:

👉 https://github.com/shr0x/ragemp-rp-gamemode/wiki


---

## ⚠️ Status

This project is actively evolving.  
Expect changes as the framework improves.

---

## 📌 Final Note

This is a **tool**, not a finished server.

You are expected to build your own gameplay on top of it.