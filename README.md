# NOVA — AI Analytics Workspace

## Overview

NOVA is a fictional AI-powered analytics workspace marketing homepage. It demonstrates how teams could turn complex business data into understandable insights, visualizations, and actionable decisions. All dashboard figures are clearly labelled product demonstration data.

## Tech Stack

- Python 3.12+
- Django 5.x
- HTML5, CSS3, and vanilla JavaScript
- Chart.js
- SQLite for local development

## Features

- Responsive premium SaaS homepage with accessible semantic markup
- Django server-rendered template and controlled demo analytics data
- Chart.js hero visualization and interactive Revenue/Customers/Orders demo
- Keyboard-accessible mobile navigation, visible focus states, and reduced-motion support
- Lightweight scroll/reveal and navigation micro-interactions
- Deployment-ready static file and database configuration

## Local Setup

```bash
python -m venv venv
```

Activate the virtual environment:

```bash
# Windows PowerShell
venv\Scripts\Activate.ps1

# macOS/Linux
source venv/bin/activate
```

Install dependencies and start the project:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Then open `http://127.0.0.1:8000/`.

## Project Structure

- `nova/` — Django settings, application entry points, and root routing.
- `home/` — the single homepage app, URL, view, and smoke test.
- `templates/home/index.html` — server-rendered homepage template.
- `static/css/style.css` — responsive visual system and animation rules.
- `static/js/main.js` — menu, scroll behavior, Chart.js, and interactive demo.
- `DECISIONS.md` — engineering rationale for the challenge.

## Deployment

The project is ready for a Django-compatible service such as Render. Create a PostgreSQL database if persistence is later needed, set `DATABASE_URL` to its connection string, and set `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, and `DJANGO_ALLOWED_HOSTS` to the deployed hostname. Use `build.sh` as the build command and `gunicorn nova.wsgi:application` as the start command. WhiteNoise serves collected static files in production.

For the current static product showcase, SQLite remains the local default. `dj-database-url` makes the later PostgreSQL transition configuration-only.

## Design Decisions

See [DECISIONS.md](DECISIONS.md).
