# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start development server with auto-reload (nodemon)
- `npm start` — Start production server
- No test suite is configured yet (`npm test` will fail)

## Architecture

Node.js/Express REST API with MySQL via Sequelize ORM and Claude AI integration.

**Request flow:** `routes/` → `controllers/` → `models/` (DB) or `services/` (Claude AI)

**Entry point** (`src/app.js`): loads env vars, registers routes under `/api`, syncs Sequelize schema, starts on port 3000.

**Layers:**
- `src/config/db.js` — Sequelize instance (reads `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST` from env)
- `src/models/user.model.js` — `Usuario` table: `id`, `nombre`, `email`, timestamps
- `src/routes/user.routes.js` — Mounts routes; currently exposes `GET /api/usuarios`
- `src/controllers/user.controller.js` — Handler logic (`crearUsuario`)
- `src/services/claude.service.js` — Calls Anthropic API (`claude-sonnet-4-5` model, 1024 token max); requires `ANTHROPIC_API_KEY` in env

**Environment variables** (`.env`, not committed):
```
PORT=3000
DB_NAME=cris_node
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
ANTHROPIC_API_KEY=   # required for Claude service, not yet set
```

## Known Issues

- `GET /api/usuarios` is mapped to `crearUsuario` — should be `POST` for user creation
- `claude.service.js` is not wired to any route/controller yet
Use comments sparingly. Only comment complex code.

# Instrucciones de Git y GitHub para Claude

- Cada vez que resuelvas una tarea o un bug, crea una rama nueva con el formato `feature/descripcion` o `bugfix/descripcion`.
- Los mensajes de los commits deben seguir la convención de Commits Semánticos (ej: `feat(users): agregar conexion a mysql`).
- No hagas `git push` directamente a la rama `main` o `master` sin preguntar primero.
- Si encuentras un error crítico en el código actual, abre un Issue en GitHub si la herramienta lo permite.