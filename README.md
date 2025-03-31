# 📌 COMP9784 Final Project

## 🔍 Project Overview

This project implements a backend API using **Express.js**, **MongoDB Atlas**, and **Mongoose** for user authentication, authorization, and license plate management. It includes robust data validation, security measures, and performance optimizations.

## ✅ Implemented Features

### ♥ **PROJECT 1: User Sign-Up Backend**

📜 **User Registration Collection Schema:**

```json
{
  "firstName": "Khoi",
  "lastName": "Trinh",
  "email": "johntrinhnhat@gmail.com",
  "password": "hashed_password",
  "emailVerified": false
}
```

🛠️ **API Endpoints:**

🔹 **`GET /users`**

- Retrieve all users with pagination (limit=10), sorting, and filtering.

🔹 **`POST /user/signup`**

- Register a user, hash the password, generate a JWT activation token, and send an activation email.

🔹 **`GET /user/activate/:email/:activationToken`**

- Validate and activate a user's email.

🔹 **`GET /user/sendActivationToken/:email`**

- Resend an activation token if the email is not verified.

---

### ♥ **PROJECT 2: License Plate Backend**

📜 **License Plate Collection Schema:**

```json
{
  "licensePlate": "VXND215",
  "status": "available",
  "dateCreated": ""
}
```

🛠️ **API Endpoints:**

🔹 **`PUT /licensePlates`**

- Retrieve all license plates with pagination (limit=5).

🔹 **`PUT /licensePlates/assign/:vin`**

- Assign the next available license plate to a VIN (validated to 17 characters, excluding I, O, and Q).

🔹 **`POST /licensePlates/revoke/:vin`**

- Revoke an assigned license plate.

🔹 **`GET /licensePlates/verify/:licensePlate`**

- Check if a license plate is assigned or available.

---

## 🔒 Security & ⚡ Performance Enhancements

🛡️ **Security Measures:**

- 🔑 API Key authentication for restricted access.
- 🛠️ Helmet, RateLimit middleware for security headers.
- ✅ Regular expressions for email, VIN, and license plate validation.

🚀 **Performance Optimizations:**

- 📉 Response compression enabled.
- ⏳ Rate limiting implemented to prevent abuse.

---

## ⚙️ Setup Instructions

### 🔧 **Prerequisites:**

- 🖥️ Node.js (Latest LTS version)
- 🗄️ MongoDB Atlas (or a local MongoDB instance)

### 🚀 **Installation Steps:**

1️⃣ **Clone the repository:**

```bash
git clone https://github.com/johntrinhnhat/johntrinhnhat-COMP9784-101137420-Final-Project.git
```

2️⃣ **Navigate to the project directory:**

```bash
cd COMP9784-101137420-Final-Project\License-Plate
```

```bash
cd COMP9784-101137420-Final-Project\User-Sign-Up
```

3️⃣ **Set up environment variables:**  
 Create a `.env` file in the root directory with the following variables:

```bash
DB_CONNECTION=<your_database_url>
JWT_SECRET=<your_jwt_secret>
EMAIL_SERVICE=<your_email_service>
```

4️⃣ **Install dependencies:**

```bash
npm install
```

5️⃣ **Run the server:**

```bash
npm run dev
```

---

## 📤 Submission Details

📂 **GitHub Repository:** [COMP9784-101137420-Final-Project](https://github.com/johntrinhnhat/johntrinhnhat-COMP9784-101137420-Final-Project)

📧 **Contact Email:** johntrinhnhat@gmail.com  
📌 **Subject:** COMP9784 Final Project Submission - KHOI NHAT TRINH
