# MiniCRM / CRM System
## README - How to Run the Project 

This guide explains how to run the project on another laptop or PC.

---

## 1. Project Overview

This project is a small business CRM system with these main modules:

- Admin login
- Dashboard summary
- Customer management
- Add / edit / delete customer
- Customer detail
- Interaction history
- Add interaction

Frontend and backend are separated:

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express.js
- **Database:** MySQL

---

## 2. Requirements

Before running the project, install these tools on the new device:

### Required software
- **Node.js**
- **MySQL Server**
- **MySQL Workbench** (recommended)
- **Visual Studio Code**
- **Live Server extension** in VS Code

---

## 3. Copy the Project to the New Device

Move the whole project folder to the new device.

For example:

```bash
CRM_Project/
```

Make sure the project still contains both frontend and backend files.

Typical structure:

```bash
CRM_Project/
│
├── css/
├── js/
├── dashboard.html
├── customers.html
├── customer-form.html
├── customer-detail.html
├── index.html
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 4. Set Up the Database

### Step 1: Open MySQL Workbench
Open MySQL Workbench on the new device.

### Step 2: Create the database
Create the database used by the project.

Example:

```sql
CREATE DATABASE ism_crm;
```

### Step 3: Import the SQL file
If your project has an exported `.sql` file, import it into MySQL.

For example:
- Open MySQL Workbench
- Go to **Server > Data Import**
- Choose the exported SQL file
- Import into the database `ism_crm`

If you do not have the SQL file imported yet, the system will not load real data.

### Step 4: Check important tables
Make sure these tables exist:

- `users`
- `customers`
- `interactions`
- `tasks`

---

## 5. Configure Database Connection

Open the backend config file.

Usually it is in:

```bash
server/config/db.js
```

Check and update the MySQL connection settings:

```javascript
host: "localhost"
user: "root"
password: "your_mysql_password"
database: "ism_crm"
```

Important:
- `user` must match the MySQL username on the new device
- `password` must match the MySQL password on the new device
- `database` must match the imported database name

Save the file after editing.

---

## 6. Install Backend Dependencies

Open terminal inside the backend folder:

```bash
cd server
```

Install required packages:

```bash
npm install
```

This will install Express, MySQL driver, CORS, and other required packages.

---

## 7. Start the Backend Server

Still inside the `server` folder, run:

```bash
node server.js
```

If the backend runs successfully, you should see a message similar to:

```bash
Server is running on port 5000
```

Keep this terminal open while using the project.

---

## 8. Start the Frontend

Open the main project folder in VS Code.

Then:
- Right click `index.html`
- Choose **Open with Live Server**

The frontend will usually run at:

```bash
http://127.0.0.1:5500/index.html
```

---

## 9. Login to the System

Open the login page in the browser and sign in with the admin account.

Use the account that already exists in your imported database.

Example test account used during development:

```text
Email: admin@ismcrm.com
Password: 123456
```

If this account does not work, check the `users` table in MySQL and use the correct admin record from the database.

---

## 10. Main Pages

After login, the system should allow access to these pages:

- `index.html` -> Login page
- `dashboard.html` -> Dashboard summary
- `customers.html` -> Customer list
- `customer-form.html` -> Add / edit customer
- `customer-detail.html?id=...` -> Customer detail and interactions

---

## 11. APIs Used by the Frontend

The frontend expects the backend to run at:

```text
http://localhost:5000
```

Important API examples:

- `POST /api/auth/login`
- `GET /api/dashboard/summary`
- `GET /api/customers`
- `GET /api/customers/:id`
- `POST /api/customers`
- `PUT /api/customers/:id`
- `DELETE /api/customers/:id`
- `GET /api/interactions/customer/:customerId`
- `POST /api/interactions`

If you change the backend port, you must also update the API base URL in the frontend JavaScript files.

---

## 12. Common Problems and Fixes

### Problem 1: Backend cannot connect to database
**Cause:** wrong MySQL username, password, or database name

**Fix:** check `server/config/db.js`

---

### Problem 2: Frontend loads but no data appears
**Cause:** backend is not running, or database was not imported

**Fix:**
- start backend with `node server.js`
- confirm MySQL database and tables exist

---

### Problem 3: Login does not work
**Cause:** admin account not found in database

**Fix:**
- check the `users` table
- confirm that the password matches the stored account

---

### Problem 4: Customer update shows database error
**Cause:** database schema on the new device is different from the current project version

**Fix:**
- make sure the imported SQL file is the latest version
- check important customer fields such as:
  - `source`
  - `last_contact`
  - `next_follow_up`

---

### Problem 5: Interaction cannot be added
**Cause:** backend expects `content` field in interaction payload

**Fix:**
- use the latest frontend JS files
- make sure the `interactions` table exists and the backend is updated

---

## 13. Recommended Run Order

For the best result on another device, follow this order:

1. Install Node.js and MySQL
2. Copy the project folder
3. Import the SQL database
4. Configure `server/config/db.js`
5. Run `npm install` inside `server`
6. Start backend with `node server.js`
7. Open frontend using Live Server
8. Log in and test the main modules

---

## 14. Minimum Demo Checklist

Before presenting on another device, test these functions:

- Login works
- Dashboard loads summary data
- Customer list loads
- Add customer works
- Edit customer works
- Delete customer works
- Customer detail loads
- Interaction history loads
- Add interaction works

---

## 15. Notes

- This version supports **one admin role**
- The **task section** is currently presented as a static module
- The project is intended for **small business customer information management**

---

## 16. Contact / Project Use

This README is intended to help run the project on another device for:
- class presentation
- testing
- project submission
- demo preparation
