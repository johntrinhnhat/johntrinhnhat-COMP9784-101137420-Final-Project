# COMP9784 Final Project

📌 Project Overview

This project implements a backend API using Express.js with database integration. It includes user authentication, authorization, and license plate management with proper data validation and security measures.

✅ Implemented Features (as per assignment requirements)

🔹 Part 1: User Sign Up Backend

📝 User Registration Table:

Fields: First Name, Last Name, Email, Password (hashed), Date Created, Email Verified.

🔹 User Sign-Up API Endpoint:

Route: POST /user/signup

Functionality:

Stores user details in the database.

Hashes the password before saving.

Generates a JWT activation token.

Sends an email with an activation link.

🔹 User Activation API Endpoint:

Route: GET /user/activate/:email/:activationToken

Functionality:

Validates and decodes the activation token.

Updates the Email Verified field upon successful validation.

🔹 Resend Activation Token API Endpoint:

Route: GET /user/sendActivationToken/:email

Functionality:

Generates and sends a new activation token if the email is not verified.

🔹 Part 2: License Plate Backend

📝 License Plate Assignment Table:

Fields: License Plate, VIN (validated), Date Created.

🔹 License Plate Assignment API Endpoint:

Route: PUT /licensePlates/assign/:vin

Functionality:

Assigns the next available license plate to a given VIN.

Ensures VIN validation (17 characters, no I, O, or Q).

🔹 License Plate Revocation API Endpoint:

Route: POST /licensePlates/revoke/:vin

Functionality:

Revokes the assigned license plate from the given VIN.

🔹 License Plate Verification API Endpoint:

Route: GET /licensePlates/verify/:licensePlate

Functionality:

Checks if a given license plate is assigned or available.

🔒 Security & ⚡ Performance Enhancements

API Security:

Implemented API Keys for restricted access.

Used Helmet for security headers.

Input Validation:

Regular expressions to validate email, VIN, and license plate formats.

Performance Optimization:

Enabled response compression.

Implemented rate limiting to prevent abuse.

⚙️ Setup Instructions

🔧 Prerequisites:

Ensure you have the following installed:

Node.js (Latest LTS version)

MongoDB or PostgreSQL (based on your database choice)

🚀 Installation Steps:

1️⃣ Clone the repository:

2️⃣ Navigate to the project directory:

cd COMP9784-YOUR_STUDENT_ID-Final-Project

3️⃣ Install dependencies:

npm install

4️⃣ Set up environment variables:

Create a .env file in the root directory.

Add necessary variables:

5️⃣ Run the server:

npm start dev

📤 Submission Details

📂 GitHub Repository:

Repository Name: COMP9784-101137420-Final-Project

GitHub URL: [](https://github.com/johntrinhnhat/johntrinhnhat-COMP9784-101137420-Final-Project/tree/main)

📧 Email contact: johntrinhnhat@gmail.com

Subject: COMP9784 Final Project Submission - KHOI NHAT TRINH
