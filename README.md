[![Tests](https://github.com/papermerge/papermerge-core/actions/workflows/tests.yml/badge.svg)](https://github.com/papermerge/papermerge-core/actions/workflows/tests.yml)

<p align="center">
<img src="./auth-server/ui2/public/GenSys_BG.png" />
</p>
<h1 align="center">Gensys DMS</h1>

GenSys DMS is a customized document management system developed from the open-source Papermerge DMS. It is designed to efficiently handle scanned documents and digital archives by using OCR (Optical Character Recognition) to extract text, index it, and make it available for full-text search. The system provides a modern, user-friendly interface similar to desktop file browsers, with key features such as a dual-panel document browser, drag-and-drop functionality, tagging, hierarchical folders, and advanced search capabilities to help users store and organize documents with ease.

It supports multiple file formats, including PDF, TIFF, JPEG, and PNG, making it an ideal solution for long-term digital document storage and management.

<p align="center">
<img src="./artwork/new_dashboard.jpg" />
</p>

## Features Highlights

- Web UI with desktop like experience
- OpenAPI compliant REST API
- Works with PDF, JPEG, PNG and TIFF documents
- Document Versioning
- Tags - assign colored tags to documents or folders
- Documents and Folders - users can organize documents in folders
- Document Types (i.e. Categories)
- Custom Fields (metadata) per document type
- Multi-User
- Group ownership
- Share documents and folders between users and/or groups of users
- UI is available in multiple languages
- Page Management - delete, reorder, cut, move, extract pages
- OCR (Optical Character Recognition) of the documents
- OCRed text overlay (you can download document with OCRed text overlay)
- Full Text Search of the scanned documents

## Customized Features
- Centralized Dashboard
- Analytics & Reports
- Two-Factor Authentication
- Branding & UI Improvements
- Tooltips/Helper Text
- Forgot Password Function



## Documentation

Papermerge DMS documentation is available
at [https://docs.papermerge.io](https://docs.papermerge.io/)

## Development
## Quick Start with Docker

The easiest way to run GenSys DMS locally is using Docker Compose. This will start all required services (backend, workers, database, etc.) with minimal setup.

### 1. Clone the repository

```bash
git clone https://github.com/papermerge/papermerge-core.git
cd papermerge-core
```

### 2. Configure Environment Variables

Create a `.env` file in the project root (or copy and edit the provided `.env.example` if available) and set the required environment variables. The Docker Compose file uses placeholders for all sensitive values, so you must provide them in your `.env` file. Example:

```env
# Database
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name

# Test Database (for ephemeral/test containers)
TEST_POSTGRES_USER=testuser
TEST_POSTGRES_PASSWORD=testpass
TEST_POSTGRES_DB=testdb

# Papermerge Core
PAPERMERGE__DATABASE__URL=postgresql://your_db_user:your_db_password@db:5432/your_db_name
PAPERMERGE__REDIS__URL=redis://redis:6379/0
PAPERMERGE__SEARCH__URL=solr://solr:8983/papermerge
PAPERMERGE__MAIN__MEDIA_ROOT=/app/media
PAPERMERGE__MAIN__API_PREFIX=/api
PAPERMERGE__SECURITY__SECRET_KEY=your_secret_key_here
PAPERMERGE__AUTH__USERNAME=your_admin_user
PAPERMERGE__AUTH__EMAIL=your_admin_email
PAPERMERGE__AUTH__PASSWORD=your_admin_password

# S3 (optional, if using S3 storage)
PAPERMERGE__S3__BUCKET_NAME=your_bucket
AWS_REGION_NAME=your_region
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_ADDRESSING_STYLE=path

# Email
PAPERMERGE__EMAIL__SMTP_HOST=smtp.example.com
PAPERMERGE__EMAIL__SMTP_PORT=587
PAPERMERGE__EMAIL__SMTP_USERNAME=your_email
PAPERMERGE__EMAIL__SMTP_PASSWORD=your_email_password
PAPERMERGE__EMAIL__SMTP_USE_TLS=false
PAPERMERGE__EMAIL__SMTP_START_TLS=true
PAPERMERGE__EMAIL__FROM_ADDRESS=noreply@example.com

# Frontend (optional)
PAPERMERGE__FRONTEND__URL=https://your-frontend-url
```

You can adjust these values as needed. The Docker Compose file will automatically use this `.env` file.

### 3. Start the Application

To start all services, run:

```bash
docker compose -f docker-compose.full_local.yml up --build
```

This will build and start all required services (backend, workers, database, etc.).

Access the backend API docs at: http://localhost:8000/docs
Access the frontend UI at: http://localhost:5173 (or as specified in the compose file output)

### 4. Stopping the Application

To stop all services:

```bash
docker compose -f docker-compose.full_local.yml down
```

---

### Database Migration (Alembic)

After starting the services, you may need to run database migrations for both the Auth Server and Papermerge Core. Use the following commands in separate terminals:

#### Migrate Auth Server Database

```bash
cd auth-server
alembic upgrade head
```

#### Migrate Papermerge Core Database

```bash
cd papermerge/core
alembic upgrade head
```

Make sure your `.env` or environment variables are set so Alembic can connect to the correct database.

---


### Backend

Make sure you have installed [poetry](https://python-poetry.org/) version 2.1.
Install all dependencies:

```
$ poetry install -E pg
```

Make sure you have the following environment variables set (e.g. with direnv):

```
export PAPERMERGE__DATABASE__URL=postgresql://coco:jumbo@127.0.0.1:5433/pmgdb
export PAPERMERGE__MAIN__MEDIA_ROOT=$HOME/var/pmgdata
export PAPERMERGE__MAIN__API_PREFIX='/api'
export VITE_AUTH_URL=http://localhost:8001


# Security
export PAPERMERGE__SECURITY__SECRET_KEY=$(openssl rand -hex 32)

# Emails
export PAPERMERGE__EMAIL__SMTP_HOST=smtp.gmail.com
export PAPERMERGE__EMAIL__SMTP_PORT=587
export PAPERMERGE__EMAIL__SMTP_USERNAME=your@email.com
export PAPERMERGE__EMAIL__SMTP_PASSWORD=yourpassword
export PAPERMERGE__EMAIL__SMTP_USE_TLS=false
export PAPERMERGE__EMAIL__SMTP_START_TLS=true
export PAPERMERGE__EMAIL__FROM_ADDRESS=noreply@gensysteam.com

```

Start BE with following command:

```
$ poetry run task server
```

This command will start BE server on localhost port 8000.
Access its swagger docs via `http://localhost:8000/docs`

### Frontend

Switch to UI folder.

```
cd frontend/
```

Make sure following environment variables are defined (
adjust their values accordingly):

```
VITE_REMOTE_USER=admin
VITE_REMOTE_USER_ID=49e78737-7c6e-410f-ae27-315b04bdec69
VITE_REMOTE_GROUPS=admin
VITE_BASE_URL=http://localhost:8000
VITE_KEEP_UNUSED_DATA_FOR=1
```

Another vite variables you may consider:

* VITE_REMOTE_ROLES

Of course, you will need to adjust user ID, username to match your BE.

`VITE_KEEP_UNUSED_DATA_FOR` will cache data returned from BE for one second

Start FE:

```commandline
cd frontend
yarn workspace ui dev
```
