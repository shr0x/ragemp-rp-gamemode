# Source Layout

`source/` is organized by runtime first, then by responsibility:

- `client/`: RAGE:MP client bootstrap, services, systems, handlers, procedures, events, and extensions.
- `server/`: server bootstrap, core framework files, services, commands, events, data access, modules, and extensions.
- `shared/`: code and data reused by both runtimes.

Each runtime uses a `bootstrap/` folder so the entry file stays focused on startup flow while registration side effects stay grouped by concern.
