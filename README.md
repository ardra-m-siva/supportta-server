# 🔐 Secure RESTful API

A RESTful API built using **Express.js**, **MongoDB** (with Mongoose), **JWT** for authentication, and **bcrypt.js** for password hashing.

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ODM)  
- **Authentication**: JWT (Access + Refresh Tokens)  
- **Password Security**: bcrypt.js  
- **Testing**: Postman  
- **Port**: 3000  

---

## 📥 Clone the Repository

```bash
git clone https://github.com/username/repo-name.git
cd repo-name


Install dependencies
----------------------
npm install

Create a .env file in the root directory:
DBCONNECTIONSTRING=your_mongodb_connection_string (include the password and the databaseName)
JWTPASSWORD=your_secret_key

Run the server
--------------------
npm start

 API Endpoints
---------------------
🔹 Register User
--------------------
POST , /register
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
------------------
POST,  /login 
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
     },
    "accessToken": "token_here",
    "refreshToken": "refresh_token_here"
}

Edit User
--------------------
PUT , /edit
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

🔹 Delete Use
--------------------
DELETE /delete
Headers: Authorization: Bearer accessToken_here
Response: 200 OK - deleted User Details
{
  "_id": "...",
  "username": "newName/oldName",
  ...
}

🔹 JWT Refresh Token Flow
---------------------------
Endpoint: GET /refresh-token
Body (JSON):
Response:
{
  "accessToken": "new_access_token_here"
}

Brand Management
--------------------
➕ Add Brand
-------------------
POST /add-brand
Headers: Authorization: Bearer accessToken_here
Body:
{
  "brandName": "Adidas",
  "brandLogo": "logo_here" ,
  "categories": ["Footwear", "Sportswear"]
}

Response: 200 OK
{
  "brandName": "Adidas",
  "brandLogo": "logo_here",
  "categories": ["Footwear", "Sportswear"]
}

🔹Fetch All Brands
-----------------------
GET /all-brand
Headers: Authorization: Bearer accessToken_here
brandLogo: url of the logo
Response: 200 OK
[
  {
    "_id": "abc123",
    "brandName": "Adidas",
    "brandLogo": "logo_url_here",
    "categories": ["Footwear", "Sportswear"],
    "__v": 0
  },
  ...
]

 Product Management API
----------------------------
🔹Add Products
------------------------
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
  "productImage": "image_url_here",
}
Response : 200 OK
{
  "productName": "Sony Bravia",
  "description": "Fully HD tv 32 Inch",
  "price": 42000,
  "category": "TV",
  "brand": "Sony",
  "productImage": "image_url_here",
  "userId":"...",
   "_id": "...",
    "__v": 0
}

Update Product
--------------------
Endpoint: PUT /update-product/:id
Description: Updates an existing product. Only the product owner (user who created it) can update the product.

🔐 Authentication:
Requires a valid JWT. The userId should be extracted from the authenticated request (e.g., using middleware).

Headers: Authorization: Bearer <accessToken>
Request Body:
{
  "productName": "Updated Product Name",
  "description": "Updated product description",
  "price": 199.99,
  "category": "Updated Category",
  "brand": "Updated Brand",
  "productImage": "image-url-or-base64"
}

Response:  200 OK
 Updated product object

Error Responses:
404 Not Found: If the product does not exist
403 Forbidden: If the user is not the owner of the product
400 Bad Request: For other errors 

 Delete Product
--------------------
Endpoint: DELETE /api/products/:id
Description: Deletes an existing product. Only the product owner can delete the product.

Authentication:
Same as above – must be logged in and provide a valid token.

Success Response:200 OK
Content: Deleted product object

Error Responses:
404 Not Found: If the product does not exist
403 Forbidden: If the user is not the owner of the product
400 Bad Request: For other server-side errors

 Block / Unblock User   s
-----------------------------------
Blocks a user by adding their ID to the blockedUsers array
---------------------

PUT /block-user
Headers:

Authorization: Bearer accesstoken
Body:
{
   "targetedUser":"user_id_of_person_to_be_blocked"
}
Responses:

200 OK: User Object after blocked 
400 Bad Request: User already blocked
404 Not Found: Requesting user not found

 Unblock User
 ------------------
 Unblocks a user by removing their ID from the blockedUsers array.

PUT /unblock-user
Headers:
Authorization: Bearer <accesstoken>
Body:
Body:
{
   "targetedUser":"user_id_of_person_to_be_unblocked"
}

Responses:
200 OK:  User Object after unblocked 
400 Bad Request: User is not blocked
404 Not Found: Requesting user not found

Get All Products -----------------
GET /all-products

GET /products?brand=Sony&category=TV&sort=price&order=asc
Headers:
Authorization: Bearer <accessToken>

Query Parameters:

sort	String	Field to sort by (price, productName, etc.). Defaults to createdAt.
order	String	Sorting order (asc or desc). Defaults to desc.
brand	String	Filter by brand name.
category	String	Filter by category.


Returns all products added by all users except:
Users who have blocked the current user.

Supports:
Filtering by brand and category.
Sorting by selected field (e.g. price, productName).

This route is protected. User must be logged in and provide a valid JWT token in the headers.

Success Response:
Status: 200 OK
Response Body:
[
  {
    "_id": "..",
    "productName": "Sony Bravia",
    "description": "Full HD TV 32 Inch",
    "price": 42000,
    "category": "TV",
    "brand": "Sony",
    "productImage": "..",
    "userId": "..",
    "__v": 0
  },
  {...},
  ...
]

API: Get Logged-in User's Products
--------------------------------
Route:
GET , /my-products

Description:
Returns all products added by the logged-in user.
Headers:
Authorization:	Bearer <accessToken>
Response: array of objects
[
{},
{..},
...
]