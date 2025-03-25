# COMP9784 Final Project

## 📌 Project Overview

This project implements a backend API using Express.js with ***MongoDB Atlas*** and ***Mongoose*** integration. It includes user authentication, authorization, and license plate management with proper data validation and security measures.

## ✅ Implemented Features

# **♥ PROJECT 1: User Sign-Up Backend**

## 📝 User Registration Table (collection):

`{
    firstName: "Khoi",
    lastName: "Trinh",
    email: "khoi.trinh@gmail.com",
    password: "ABCD1234",
    emailVerified: false
}`


## 🔹API Endpoint:

> Route: POST /user/signup

### Functionality:

+ Stores user details in the database.

+ Hashes the password before saving.

+ Generates a JWT activation token.

+ Sends an email with an activation link.

> Route: GET /user/activate/:email/:activationToken

### Functionality:

+ Validates and decodes the activation token.

+ Updates the Email Verified field upon successful validation.

> Route: GET /user/sendActivationToken/:email

### Functionality:

+ Generates and sends a new activation token if the email is not verified.

# **♥ PROJECT 2: License Plate Backend**

## 📝 License Plate Assignment Table:

Fields: License Plate, VIN (validated), Date Created.

## 🔹API Endpoint:

> Route: PUT /licensePlates/assign/:vin

### Functionality:

+ Assigns the next available license plate to a given VIN.

+ Ensures VIN validation (17 characters, no I, O, or Q).

> Route: POST /licensePlates/revoke/:vin

### Functionality:

+ Revokes the assigned license plate from the given VIN.

> Route: GET /licensePlates/verify/:licensePlate

### Functionality:

+ Checks if a given license plate is assigned or available.

## 🔒 Security & ⚡ Performance Enhancements

+ API Security:

+ Implemented API Keys for restricted access.

+ Used Helmet for security headers.

+ Input Validation:

+ Regular expressions to validate email, VIN, and license plate formats.

+ Performance Optimization:

+ Enabled response compression.

+ Implemented rate limiting to prevent abuse.

## ⚙️ Setup Instructions

### 🔧 Prerequisites:

+ Ensure you have the following installed:

+ Node.js (Latest LTS version)

+ MongoDB Atlas (or a local MongoDB instance)

### 🚀 Installation Steps:

1️⃣ Clone the repository:

   git clone https://github.com/johntrinhnhat/johntrinhnhat-COMP9784-101137420-Final-Project.git

2️⃣ Navigate to the project root directory:

   cd COMP9784-101137420-Final-Project

3️⃣ Install dependencies:

   npm install

4️⃣ Set up environment variables:

Create a .env file in the root directory.

Add necessary variables:

DB_CONNECTION=<your_database_url>
JWT_SECRET=<your_jwt_secret>
EMAIL_SERVICE=<your_email_service>

5️⃣ Run the server:

   npm run dev

📤 Submission Details

📂 GitHub Repository:

Repository Name: COMP9784-101137420-Final-Project

GitHub URL: COMP9784-101137420-Final-Project

📧 Email Contact:

Email: johntrinhnhat@gmail.com

Subject: COMP9784 Final Project Submission - KHOI NHAT TRINH