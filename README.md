# BACKEND DEVELOPMENT FUNDAMENTALS
# LAB REPORT – 03

## REST API, Query Parameters, Validation and Debugging

**Student Name:** Avuku Mahesh  
**Roll Number:** 252U1R5012  
**Course:** Backend Development Fundamentals  
**Academic Year:** Year II – Term II  
**Submission Date:** 08-11-2026

---

# 1. OBJECTIVE

The objective of this lab is to develop a RESTful API using Node.js, Express.js, and SQLite. The lab focuses on implementing REST principles, designing resource-based endpoints, handling HTTP methods, and performing CRUD operations on book records.

It also aims to implement query parameters for searching, sorting, limiting, and offsetting records. Additionally, the lab focuses on validating incoming requests, handling errors using appropriate HTTP status codes, formatting JSON responses, and debugging common backend development issues.

Postman is used to test the API endpoints and verify their functionality for both successful and unsuccessful requests.

# 2. SOFTWARE AND TOOLS REQUIRED

1. **Visual Studio Code:** Used to write and manage backend source code.
2. **Node.js:** Used as the JavaScript runtime environment.
3. **Express.js:** Used to develop REST API endpoints.
4. **SQLite:** Used to store and manage book records.
5. **Postman:** Used to send API requests and test API responses.
6. **Git and GitHub:** Used for version control and project hosting.
7. **Web Browser:** Used to access and verify the API.

# 3. INTRODUCTION

REST stands for Representational State Transfer. It is an architectural style used for developing web services that allow applications to communicate through HTTP protocols.

A RESTful API provides access to resources using standard HTTP methods such as GET, POST, PUT, and DELETE. In this lab, a book management REST API is developed to perform operations on book records.

The API uses Express.js to handle incoming requests and SQLite as the database. JSON is used for exchanging information between the client and server.

The API supports retrieving books, searching records, sorting results, pagination, creating new books, updating existing books, and deleting records.

# 4. REST API ARCHITECTURE

The application follows a client-server architecture.

**Client:** Postman sends HTTP requests to the server.

**Server:** Node.js and Express.js receive requests, process the required operations, and generate responses.

**Database:** SQLite stores book information and handles database operations.

**Response:** The server returns JSON data along with appropriate HTTP status codes.

The communication flow is:

Postman → Express.js Server → SQLite Database → Express.js Server → JSON Response → Postman.

# 5. IMPLEMENTATION DETAILS

The REST API was developed using Node.js, Express.js, and SQLite.

The project contains the following important components:

- `server.js` – Handles API routes, HTTP requests, validation, and responses.
- `database.js` – Establishes the SQLite database connection and database operations.
- `package.json` – Contains project dependencies and scripts.
- `Screenshorts/` – Stores Postman testing screenshots.

The server runs locally at:

`http://localhost:3000`

The main API resource endpoint is:

`/books`

# 6. REST API ENDPOINTS

The following HTTP methods were implemented:

| HTTP Method | Endpoint | Purpose |
|---|---|---|
| GET | /books | Retrieve all books |
| GET | /books/:id | Retrieve a book by ID |
| POST | /books | Add a new book |
| PUT | /books/:id | Update an existing book |
| DELETE | /books/:id | Delete a book |

# 7. QUERY PARAMETERS

Query parameters are used to filter and organize API responses without creating additional endpoints.

The following query parameters were implemented:

**1. search_q**

Used to search for books based on partial title matches.

Example:
`GET /books?search_q=Python`

**2. order_by**

Specifies the field used for sorting records.

Example:
`GET /books?order_by=price`

**3. order**

Specifies the sorting direction, either ASC or DESC.

Example:
`GET /books?order_by=price&order=ASC`

**4. limit**

Specifies the maximum number of records returned.

Example:
`GET /books?limit=5`

**5. offset**

Specifies the number of records to skip.

Example:
`GET /books?limit=5&offset=5`

**6. min_price and max_price**

Used to filter books within a specified price range.

# 8. CRUD OPERATIONS

CRUD stands for Create, Read, Update, and Delete.

**Create:** The POST method is used to insert new book records into the database.

**Read:** The GET method retrieves all books or a particular book using its ID.

**Update:** The PUT method modifies the details of an existing book.

**Delete:** The DELETE method removes a particular book from the database.

These operations allow the client to manage book information through REST API endpoints.

# 9. REQUEST VALIDATION AND HTTP STATUS CODES

Request validation ensures that the server receives correct and meaningful data.

The API validates the following fields:

- Title must not be empty.
- Author must not be empty.
- Price must be a valid numeric value.
- Invalid book IDs must return an appropriate error response.

The following HTTP status codes are used:

| Status Code | Description |
|---|---|
| 200 | Request successful |
| 201 | Resource created successfully |
| 400 | Invalid request or validation error |
| 404 | Requested resource not found |
| 500 | Internal server error |

JSON responses are used to provide consistent information about successful operations and errors.

# 10. POSTMAN API TESTING

Postman was used to test the REST API endpoints. Different HTTP methods and query parameters were used to verify the functionality of the application.

The following 11 test cases were performed:

**Test 1: GET All Books**

Method: GET

Endpoint: `http://localhost:3000/books`

Purpose: To retrieve all available book records from the database.

[Insert Screenshot 1 – getallbooks.png]

**Test 2: GET Book by ID**

Method: GET

Endpoint: `http://localhost:3000/books/1`

Purpose: To retrieve a particular book using its unique ID.

[Insert Screenshot 2 – getbyid.png]

**Test 3: POST Add New Book**

Method: POST

Endpoint: `http://localhost:3000/books`

Purpose: To insert a new book record into the database using JSON request data.

[Insert Screenshot 3 – addbookbypost.png]

**Test 4: Sorting Books in Ascending Order**

Method: GET

Endpoint: `http://localhost:3000/books?order_by=price&order=ASC`

Purpose: To retrieve book records sorted by price in ascending order.

[Insert Screenshot 4 – sorting asc.png]

**Test 5: Offset and Pagination**

Method: GET

Endpoint: `http://localhost:3000/books?limit=5&offset=5`

Purpose: To skip the first five records and retrieve the next five records.

[Insert Screenshot 5 – offset.png]

**Test 6: Search Books**

Method: GET

Endpoint: `http://localhost:3000/books?search_q=Python`

Purpose: To search for books using a partial title match.

[Insert Screenshot 6 – searchbyget.png]

**Test 7: GET Book Not Found**

Method: GET

Endpoint: `http://localhost:3000/books/999`

Purpose: To verify the API response when the requested book ID does not exist.

[Insert Screenshot 7 – booknotfound byget.png]

**Test 8: DELETE Book**

Method: DELETE

Endpoint: `http://localhost:3000/books/10`

Purpose: To delete an existing book record from the database.

[Insert Screenshot 8 – delete.png]

**Test 9: DELETE Book Not Found**

Method: DELETE

Endpoint: `http://localhost:3000/books/999`

Purpose: To verify the error response when attempting to delete a nonexistent book.

[Insert Screenshot 9 – delete not found.png]

**Test 10: PUT Update Book**

Method: PUT

Endpoint: `http://localhost:3000/books/1`

Purpose: To update the details of an existing book record.

[Insert Screenshot 10 – updatebyput.png]

**Test 11: PUT Book Not Found**

Method: PUT

Endpoint: `http://localhost:3000/books/999`

Purpose: To verify the API response when attempting to update a nonexistent book.

[Insert Screenshot 11 – putbynotfound.png]

# 11. DEBUGGING AND ERROR HANDLING

During the development process, different backend errors were identified and resolved.

**1. EADDRINUSE Error**

This error occurs when the requested port is already being used by another process. It was resolved by stopping the existing server process and restarting the application.

**2. Incorrect Import Path**

An incorrect database module path can prevent the application from starting. The issue was resolved by checking the file name and correcting the require statement.

**3. Incorrect SQLite Table Name**

A mismatch between the table name used in SQL queries and the actual database table caused database errors. It was resolved by using the correct table name.

**4. Missing Await Keyword**

An asynchronous database operation returned a Promise instead of the expected result. Adding the `await` keyword ensured that the operation completed before processing the response.

These debugging exercises helped improve understanding of backend errors and troubleshooting techniques.

# 12. RESULTS AND OBSERVATIONS

The REST API was successfully developed and tested using Postman.

The following observations were made:

1. GET requests successfully retrieved book records.
2. POST requests successfully inserted new book records.
3. PUT requests updated existing book information.
4. DELETE requests removed selected book records.
5. Query parameters supported searching, sorting, and pagination.
6. Invalid book IDs generated appropriate not-found responses.
7. Request validation helped prevent invalid input data.
8. Debugging techniques helped resolve common backend development issues.

All 11 selected Postman test cases were performed to verify the API functionality.

# 13. CONCLUSION

This lab provided practical experience in developing and testing RESTful APIs using Node.js, Express.js, and SQLite. It helped in understanding REST principles, HTTP methods, CRUD operations, query parameters, request validation, JSON responses, and HTTP status codes.

Testing the API using Postman improved the understanding of client-server communication and API debugging. The lab also provided practical knowledge of handling database operations and resolving common backend development errors.

Overall, the lab successfully demonstrated the implementation of a RESTful Book Management API and strengthened the fundamental concepts of backend development.

# 14. PROJECT REPOSITORY

**GitHub Repository:**

https://github.com/avukumahesh78-ui/Avuku-Mahesh-BDF-L3

The repository contains the backend source code, README documentation, and 11 Postman testing screenshots.
