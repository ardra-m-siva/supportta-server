Secure Authentication API
A RESTful API built using Express.js, MongoDB (with Mongoose), JWT for authentication, and bcrypt.js for password hashing.

⚙️ Tech Stack

Backend: Node.js, Express.js
Database: MongoDB (Mongoose ODM)
Authentication: JWT (Access + Refresh Tokens)
Password Security: bcrypt.js
Testing: Postman
PORT:3000

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
  "blockedUsers":[]
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
    "user": {
      ...,
      "password": encryptedPassword,
        "blockedUsers":[]
      ...
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

➕ Add Brand
POST /add-brand
Headers: Authorization: Bearer <accessToken>
Body:
{
  "brandName": "Adidas",
  "brandLogo": "https://example.com/adidas-logo.png",
  "categories": ["Footwear", "Sportswear"]
}

Response: 200 OK
{
  "brandName": "Adidas",
  "brandLogo": "https://example.com/adidas-logo.png",
  "categories": ["Footwear", "Sportswear"]
}

🔹Fetch All Brands
GET /all-brand
Headers: Authorization: Bearer <accessToken>
brandLogo:url of the logo
Response: 200 OK
[
  {
    "_id": "abc123",
    "brandName": "Adidas",
    "brandLogo": "https://example.com/adidas-logo.png",
    "categories": ["Footwear", "Sportswear"],
    "__v": 0
  },
  ...
]

🔹Add Products
POST /add-product
Headers: Authorization: Bearer <accessToken>
productImage:url of the logo
Body :
{
    "productName": "Sony Bravia",
  "description": "Fully HD tv 32 Inch",
  "price": 42000,
  "category": "TV",
  "brand": "Sony",
  "productImage": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRBqxELgjyadwJr6o92q2Pn7qq_Bpi7g0aEGUb69eCsp2Nva896xaPLBPqucVGCxCnQipYR4rSn23n3DPr4sus-BtFtrgtAOMWwUBD_nbb2Q553wYTkILBbHw",
}
Response : 200 OK
{
  "productName": "Sony Bravia",
  "description": "Fully HD tv 32 Inch",
  "price": 42000,
  "category": "TV",
  "brand": "Sony",
  "productImage": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRBqxELgjyadwJr6o92q2Pn7qq_Bpi7g0aEGUb69eCsp2Nva896xaPLBPqucVGCxCnQipYR4rSn23n3DPr4sus-BtFtrgtAOMWwUBD_nbb2Q553wYTkILBbHw",
  "userId":"...",
   "_id": "...",
    "__v": 0
}


