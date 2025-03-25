# COMP9784 Final Project

## 📌 Project Overview

This project implements a backend API using Express.js with **_MongoDB Atlas_** and **_Mongoose_** integration. It includes user authentication, authorization, and license plate management with proper data validation and security measures.

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

> POST localhost:3000/user/signup

#### Functionality:

- Stores user details in the database.

- Hashes the password before saving.

- Generates a JWT activation token.

- Sends an email with an activation link.

> GET localhost:3000/user/activate/:email/:activationToken

#### Functionality:

- Validates and decodes the activation token.

- Updates the Email Verified field upon successful validation.

> GET localhost:3000/user/sendActivationToken/:email

#### Functionality:

- Generates and sends a new activation token if the email is not verified.

# **♥ PROJECT 2: License Plate Backend**

## 📝 License Plate Assignment Table:

Fields: License Plate, VIN (validated), Date Created.

## 🔹API Endpoint:

> PUT localhost:3000/licensePlates/assign/:vin

#### Functionality:

- Assigns the next available license plate to a given VIN.

- Ensures VIN validation (17 characters, no I, O, or Q).

> POST localhost:3000/licensePlates/revoke/:vin

#### Functionality:

- Revokes the assigned license plate from the given VIN.

> GET localhost:3000/licensePlates/verify/:licensePlate

#### Functionality:

- Checks if a given license plate is assigned or available.

## 🔒 Security & ⚡ Performance Enhancements

- API key authentication

- helmet

- input Validation:

- regular expressions to validate email, VIN, and license plate formats.

- enabled response compression.

- rate litming.

## ⚙️ Setup Instructions

### 🔧 Prerequisites:

- Ensure you have the following installed:

- Node.js (Latest LTS version)

- MongoDB Atlas (or a local MongoDB instance)

### 🚀 Installation Steps:

1️⃣ Clone the repository:

`git clone https://github.com/johntrinhnhat/johntrinhnhat-COMP9784-101137420-Final-Project.git`

2️⃣ Navigate to the project 1 or 2 root directory:

`cd COMP9784-101137420-Final-Project/User-Sign-Up`
`cd COMP9784-101137420-Final-Project/License-Plate`

3️⃣ Install dependencies:

`npm install`

4️⃣ Set up environment variables:

`code .env`

5️⃣ Run the server:

`npm run dev`

📤 Submission Details

📂 GitHub Repository:

Repository Name: COMP9784-101137420-Final-Project

GitHub URL: COMP9784-101137420-Final-Project

📧 Email Contact:

*Email: johntrinhnhat@gmail.com*

Subject: COMP9784 Final Project Submission - KHOI NHAT TRINH
