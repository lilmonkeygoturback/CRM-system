# MiniCRM

A web-based internal customer relationship management system for small businesses. The system supports centralized customer record management, interaction tracking, and basic follow-up task management through a simple admin interface.

---

## 1. Core Features

The current version includes **12 core features**:

1. Login
2. View Dashboard
3. View Customer List
4. Add Customer
5. Edit Customer
6. Delete Customer
7. View Customer Detail
8. View Interaction History
9. Add Interaction
10. View Follow-up Tasks
11. Add Follow-up Task
12. Mark Task as Completed / Update Task Stage

---

## 2. Technology Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Other packages:** CORS, dotenv, jsonwebtoken, mysql2, nodemon

---

## 3. Project Structure

```bash
ISM Project/
├── css/
├── db/
│   └── ism_crm_database.sql
├── js/
│   ├── customer-detail.js
│   ├── customer-form.js
│   ├── customers.js
│   ├── dashboard.js
│   ├── login.js
│   ├── main.js
│   └── tasks.js
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── .env
├── customer-detail.html
├── customer-form.html
├── customers.html
├── dashboard.html
├── index.html
├── tasks.html
├── package.json
└── README.md
```

> **Important:** `package.json` is located in the **project root**, not inside the `server` folder.

---

## 4. Prerequisites

Install the following before running the project:

- **Node.js**
- **MySQL Server**
- **MySQL Workbench** (recommended)
- **Visual Studio Code**
- **Live Server extension** in VS Code

---

## 5. Database Setup

### Step 1: Create the database

```sql
CREATE DATABASE ism_crm;
```

### Step 2: Import the SQL file

Import the file:

```bash
db/ism_crm_database.sql
```

Recommended method in MySQL Workbench:
- Open **Server > Data Import**
- Select `ism_crm_database.sql`
- Import into database `ism_crm`

### Step 3: Confirm the main tables exist

The project expects these tables:
- `users`
- `customers`
- `interactions`
- `tasks`

---

## 6. Environment Configuration

Open:

```bash
server/.env
```

Example configuration:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=ism_crm
JWT_SECRET=mycrmsecretkey
```

Update the values to match your MySQL environment.

---

## 7. Install Dependencies

Open a terminal in the **project root** and run:

```bash
npm install
```

---

## 8. Start the Backend Server

From the **project root**, run:

```bash
npm start
```

For development mode:

```bash
npm run dev
```

Expected output:

```bash
Connected to MySQL database
Server is running on port 5000
```

---

## 9. Start the Frontend

Open the project folder in VS Code.

Then:
- Right click `index.html`
- Choose **Open with Live Server**

Typical frontend URL:

```text
http://127.0.0.1:5500/index.html
```

---

## 10. Test Login Account

Sample account from the SQL seed data:

```text
Email: admin@ismcrm.com
Password: 123456
```

Additional seeded user:

```text
Email: staff@ismcrm.com
Password: 123456
```

---

## 11. Main Pages

- `index.html` → Login page
- `dashboard.html` → Dashboard summary
- `customers.html` → Customer list
- `customer-form.html` → Add / edit customer
- `customer-detail.html?id=...` → Customer detail, interactions, and customer tasks
- `tasks.html` → Follow-up task board

---

## 12. Task Module Scope

The follow-up task module supports:
- viewing customer-specific tasks
- viewing the overall task board
- creating new tasks for a selected customer
- updating task stage
- marking tasks as completed

Recommended task stages:
- `To Do`
- `In Progress`
- `Done`

---

## 13. API Endpoints

### Authentication
- `POST /api/auth/login`

### Dashboard
- `GET /api/dashboard/summary`

### Customers
- `GET /api/customers`
- `GET /api/customers/:id`
- `POST /api/customers`
- `PUT /api/customers/:id`
- `DELETE /api/customers/:id`

### Interactions
- `GET /api/interactions`
- `GET /api/interactions/customer/:customerId`
- `POST /api/interactions`

### Tasks
- `GET /api/tasks`
- `GET /api/tasks/customer/:customerId`
- `POST /api/tasks`
- `PUT /api/tasks/:id/stage`
- `PUT /api/tasks/:id/complete`

> If you change the backend port, update the API base URL inside the frontend JavaScript files.

---

## 14. Recommended Run Order

1. Install Node.js and MySQL
2. Import `db/ism_crm_database.sql`
3. Configure `server/.env`
4. Run `npm install`
5. Start backend with `npm start`
6. Open frontend with Live Server
7. Log in and test the main modules

---

## 15. Demo Checklist

Before presentation or submission, test the following:

- Login works
- Dashboard loads summary data
- Customer list loads correctly
- Add customer works
- Edit customer works
- Delete customer works
- Customer detail loads correctly
- Interaction history loads
- Add interaction works
- Customer-specific follow-up tasks load
- Add follow-up task works
- Mark task as completed works
- Task board loads correctly in `tasks.html`
- Task stage update works

---

## 16. Common Problems and Fixes

### 1. Backend cannot connect to database
**Cause:** wrong database credentials in `.env`

**Fix:** check:
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

### 2. Frontend opens but no data appears
**Cause:** backend is not running or database was not imported

**Fix:**
- start backend with `npm start`
- confirm MySQL is running
- confirm all tables were imported

### 3. Login fails
**Cause:** seeded user account is missing or credentials do not match the database

**Fix:**
- check the `users` table
- use a valid account from the imported database

### 4. Customer update returns database error
**Cause:** the imported schema is outdated or incomplete

**Fix:**
- re-import the latest `ism_crm_database.sql`
- confirm customer fields such as `source`, `last_contact`, and `next_follow_up` exist

### 5. Follow-up tasks do not display correctly
**Cause:** inconsistent task stage values in old data

**Fix:** use the standardized values:
- `To Do`
- `In Progress`
- `Done`

If your old database still contains `pending` or `completed`, run:

```sql
UPDATE tasks
SET stage = 'To Do'
WHERE stage = 'pending' AND id > 0;

UPDATE tasks
SET stage = 'Done'
WHERE stage = 'completed' AND id > 0;
```

### 6. `Due Today` shows 0 on the task page
**Cause:** no task in the database has a due date equal to the current date

**Fix:**
- check existing `due_date` values in MySQL
- create or update a task with today's date for testing

---

## 17. Notes

- This project is designed as a **MiniCRM** for small businesses.
- The main actor is **Admin**.
- The system focuses on core CRM operations rather than advanced enterprise features.
- The task module provides **basic follow-up task management**, not advanced workflow automation.

---

## 18. Future Improvements

Possible next enhancements:
- edit task details
- delete task
- filter tasks by stage or customer
- overdue highlighting
- reminder / notification support
- stronger authentication and authorization
- richer analytics on the dashboard

---

## 19. Purpose

This project was developed for:
- ISM coursework
- project demonstration
- report submission
- presentation and testing

