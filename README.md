# 🚗 Vehicle Rental Booking App

A full-stack vehicle rental application to book cars or bikes based on user preferences and availability. The form guides users through each step and prevents overlapping bookings.

---

## 🛠 Tech Stack

- **Frontend**: React.js (Create React App), Material UI, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **ORM**: Sequelize

---

## 📁 Project Structure

```

vehicle-rental/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── ...
│   └── .env
├── .gitignore
└── README.md

````

---

## 🔧 Environment Variables

### ✅ 1. Create `.env` in `/backend`

```env
DB_NAME=your_db_name
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306

PORT=5000
````

### ✅ 2. Create `.env` in `/frontend`

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/vehicle-booking-app.git
cd vehicle-booking-app
```

---

### 2. MySQL Setup

Log into MySQL and create the database:

```sql
CREATE DATABASE your_db_name;
```

---

### 3. Backend Setup

```bash
cd backend
npm install

# Run migrations
npx sequelize db:migrate

# Seed sample vehicle & type data
npx sequelize db:seed:all

# Start the server
npm start
```

---

### 4. Frontend Setup

```bash
cd ../frontend
npm install

# Start the React app
npm start
```

Your React app should now be running at [http://localhost:3000](http://localhost:3000)

---

## 🧪 Sample Data Seeded

* **Vehicle Types:**

  * Hatchback, SUV, Sedan (4-wheelers)
  * Cruiser (2-wheeler)

* **Vehicles:**

  * 2–3 per type (e.g., Alto, Thar, Splendor)

---

## ✅ Features

* Guided step-by-step form (1 input per screen)
* Real-time validation and error handling
* Prevents double bookings (backend overlap check)
* Summary table before submission
* Stores data in MySQL

---