Secure Authentication API
A RESTful API built using Express.js, MongoDB (with Mongoose), JWT for authentication, and bcrypt.js for password hashing.

⚙️ Tech Stack

Backend: Node.js, Express.js
Database: MongoDB (Mongoose ODM)
Authentication: JWT (Access + Refresh Tokens)
Password Security: bcrypt.js
Testing: Postman

Clone the repo

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

Install dependencies
npm install

Create a .env file in the root directory:
DBCONNECTIONSTRING=your_mongodb_connection_string (include the password and the databaseName)
JWTPASSWORD=your_secret_key

Run the server
npm start

 API Endpoints

🔹 Register User
POST /register

Body:
{
  "username": "John",
  "email": "john@example.com",
  "password": "123456"
}
Response: 200 OK
{
  "_id": "...",
  "username": "John",
  "email": "john@example.com",
  "profilePhoto": ""
}

🔹 Login User
POST /login 
Body:
{
  "email": "john@example.com",
  "password": "123456"
}
Response: 200 OK
{
    "user": {...
    "password": encryptedPassword
     },
    "accessToken": "token_here",
     "refreshToken": "refresh_token_here"
}

Edit User
PUT /edit
Headers: Authorization: Bearer <accessToken>

FormData (for uploading image + fields):
username: newName /oldName
email: oldEmail
password: encryptedPassword
profilePhoto: (file)

Response : 200 OK
{
  "_id": "...",
  "username": "newName/oldName",
  ...
}

🔹 Delete User
DELETE /delete
Headers: Authorization: Bearer <accessToken>
Response: 200 OK - deleted User Details
{
  "_id": "...",
  "username": "newName/oldName",
  ...
}

🔹 JWT Refresh Token Flow
Endpoint: POST /refresh-token
Body (JSON):
{
  "refreshToken": "your_refresh_token_here"
}
Response:
{
  "accessToken": "new_access_token_here"
}