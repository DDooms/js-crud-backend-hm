# javascript-crud
User Management API Documentation
This documentation provides an overview of the User Management API. The API allows you to manage users by performing various operations such as retrieving users, adding users, updating user information, and deleting users.

API Endpoints
GET /users
Retrieves a list of all users.

Response
Status Code: 200 (OK)
Body: Array of user objects containing user information.
GET /users/:id
Retrieves a specific user by their ID.

Parameters
id (integer): The ID of the user.
Response
Status Code: 200 (OK)
Body: User object containing user information.
POST /users
Adds a new user.

Request Body
name (string): The name of the user.
surname (string): The surname of the user.
username (string): The username of the user.
email (string): The email of the user.
dob (string): The date of birth of the user.
Response
Status Code: 201 (Created)
Body: Success message indicating the user has been created successfully.
PUT /users/:id
Updates a specific user by their ID.

Parameters
id (integer): The ID of the user.
Request Body
name (string): The updated name of the user.
surname (string): The updated surname of the user.
username (string): The updated username of the user.
email (string): The updated email of the user.
dob (string): The updated date of birth of the user.
Response
Status Code: 200 (OK)
Body: Success message indicating the user has been successfully updated.
DELETE /users/:id
Deletes a specific user by their ID.

Parameters
id (integer): The ID of the user.
Response
Status Code: 200 (OK)
Body: Success message indicating the user has been successfully deleted.
Error Handling
The API handles errors in the following ways:

If an error occurs during the execution of an operation, an appropriate error response with a status code and error message will be sent.
If a user is not found (e.g., when retrieving or updating a user), a 404 (Not Found) status code will be returned with an error message indicating that the user does not exist.
Database Configuration
The API connects to a PostgreSQL database using the pg module. The database configuration is as follows:

Database Name: users
User: postgres
Password: postgres
Host: localhost
Port: 5432
Please ensure that you have a PostgreSQL server running and the database is set up accordingly.

Server Configuration
The API is hosted using Express.js. The server is configured as follows:

Port: 3000
Running the API
To run the User Management API:

Ensure you have a PostgreSQL server running and the database is set up as specified in the database configuration.
Run npm install to install the required dependencies.
Start the server by running node server.js.
The API will be accessible at http://localhost:3000.
