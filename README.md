# University Admission Calculator

## Project Description:

Develop a university admission calculator. When a student enters their exam scores, the system determines if they qualify for free enrollment. If not, it calculates the cost of tuition for the cheapest program.

## Technical requirements:

- Programming language - **Javascript**
- Framework - **Express.js**
- Database - **MySQL**
- **Docker**

## Environment Variables

The application requires the following environment variables to be set. These can be defined in a `.env` file at the root of your project.
The **default** values provided below are configured for running the application in **Docker**.

### Application Configuration

- `APP_PORT` (default: `3000`): The port on which the application will run.
- `API_BASE_PATH` (default: `/api/v1`): The base path for the API endpoints.

### Security Configuration

- `SECRET_KEY` (default: `my_secret_key`): A secret key used for various security purposes in the application.

### JWT Configuration

- `JWT_ACCESS_SECRET` (default: `my_jwt_access_secret_key`): The secret key used to sign access tokens.
- `JWT_REFRESH_SECRET` (default: `my_jwt_refresh_secret_key`): The secret key used to sign refresh tokens.
- `ACCESS_TOKEN_AGE_SECONDS` (default: `15`): The lifespan of an access token in seconds.
- `REFRESH_TOKEN_AGE_SECONDS` (default: `30`): The lifespan of a refresh token in seconds.

### MySQL Configuration

- `MYSQL_ROOT_PASSWORD` (default: `pass`): The password for the MySQL root user.
- `MYSQL_DATABASE` (default: `university_admission`): The name of the MySQL database to be used.
- `MYSQL_HOST` (default: `mysql_university_admission`): The hostname of the MySQL server.
- `MYSQL_PORT` (default: `3306`): The port on which the MySQL server is running.
- `MYSQL_USERNAME` (default: `user`): The username to connect to the MySQL database.
- `MYSQL_PASSWORD` (default: `user`): The password to connect to the MySQL database.

### Example `.env` File

An example `.env.example` file is provided at the root of the project. You can copy the contents of this file to create your own `.env` file.

## Database

Database for **University Admission Calculator** includes next tables:

![database](https://github.com/user-attachments/assets/cdecded1-053b-4b5a-971c-1c2342cc6bf2)

### 1. student

The student table stores information about the students. It includes the following fields:

- `id`: An integer that serves as the primary key and is auto-incremented.
- `email`: A string that stores the student's email - address, which must be unique and not null.
- `password`: A string that stores the student's password, which is also not null.

### 2. refreshToken

The refreshToken table stores refresh tokens associated with students. It includes the following fields:

- `id`: An integer that serves as the primary key and is auto-incremented.
- `token`: A string that stores the refresh token, which is not null.
- `studentId`: An integer that references the id field in the student table.

### 3. exam

The exam table stores information about different exams. It includes the following fields:

- `id`: An integer that serves as the primary key and is auto-incremented.
- `name`: A string that stores the name of the exam, which is not null.

### 4. studentExam

The studentExam table stores the scores of students for various exams. It includes the following fields:

- `studentId`: An integer that references the id field in the student table.
- `examId`: An integer that references the id field in the exam table.
- `score`: An integer that stores the score of the student in the exam.

### 5. specialty

The specialty table stores information about different specialties offered. It includes the following fields:

- `id`: An integer that serves as the primary key and is auto-incremented.
- `name`: A string that stores the name of the specialty, which is not null.
- `tuitionCost`: A decimal value that stores the tuition cost for the specialty.
- `passingScoreForFree`: A decimal value that stores the minimum score required for free enrollment.
- `passingScoreForPaid`: A decimal value that stores the minimum score required for paid enrollment.

### 6. specialtyExamCoefficient

The specialtyExamCoefficient table stores the coefficients for exams for each specialty. It includes the following fields:

- `specialtyId`: An integer that references the id field in the specialty table.
- `examId`: An integer that references the id field in the exam table.
- `coefficient`: A decimal value that stores the coefficient of the exam for the specialty.

## Initial Database Data

The database is initially populated with the following data:

### 1. exam

Contains names of various exams:

- Mathematics
- Physics
- Chemistry
- Biology

### 2. specialty

Includes various specialties with their tuition costs and passing scores for free and paid enrollment. For example:
Computer Science (example):

- `tuitionCost`: 3000.00
- `passingScoreForFree`: 280.00
- `passingScoreForPaid`: 180.00

### 3. specialtyExamCoefficient

Maps coefficients of exams for each specialty. For example:
Computer Science (example):

- Mathematics: 1.5
- Physics: 1.3
- Chemistry: 1.2
- Biology: 1.1

#### **Note**: The example shown is for "Computer Science". Similar data is populated for all other specialties and exams.

#### The application includes SQL scripts to create and populate the database tables. These scripts are located in the src/sql/scripts directory:

- `src/sql/scripts/createTables.sql`: This file contains the SQL commands to create the necessary tables in the database.
- `src/sql/scripts/fillTables.sql`: This file contains the SQL commands to populate the created tables with initial data.

## Base URL

`http://localhost:3000`

## API Endpoints

### 1. Signup

**Endpoint:**
POST `api/v1/signup`

- Creates a new student account.

**Request Body:**

```json
{
  "email": "user@gamil.com",
  "password": "Aa1234"
}
```

**Responses:**

- **201 Created:**
  ```json
  {
    "message": "Student signed up successfully",
    "accessToken": "<accessToken>"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "error": "That email is already in use",
    "path": "email"
  }
  ```
  ```json
  {
    "error": "<emailValidation>",
    "path": "email"
  }
  ```
  ```json
  {
    "error": "<passwordValidation>",
    "path": "password"
  }
  ```
  ![signup](https://github.com/user-attachments/assets/d204fb24-0c4a-454a-a827-b833a46cd75f)

### 2. Login

**Endpoint:**
POST `api/v1/login`

- Authenticates a student and returns an access token.

**Request Body:**

```json
{
  "email": "user@gamil.com",
  "password": "Aa1234"
}
```

**Responses:**

- **200 OK:**
  ```json
  {
    "message": "Student logged in successfully",
    "accessToken": "<accessToken>"
  }
  ```
- **401 Unauthorized:**

  ```json
  {
    "error": "No such email exists",
    "path": "email"
  }
  ```

  ```json
  {
    "error": "Password is incorrect",
    "path": "password"
  }
  ```

  ![login](https://github.com/user-attachments/assets/3347b216-f99b-4d75-8931-cedbf85f1272)

### 3. Logout

**Endpoint:**
GET `api/v1/logout`

- Logs out the student and clears the tokens.

**Responses:**

**200 OK:**

```json
{
  "message": "Student logged out successfully"
}
```

![logout](https://github.com/user-attachments/assets/a55f349d-109a-4749-8dc2-e827942d699d)

### 4. Refresh Token

**Endpoint:**
GET `api/v1/refresh`

- Generates new access and refresh tokens using the provided refresh token stored in cookies.

**Responses:**

- **200 OK:**

  ```json
  {
    "message": "Tokens refreshed successfully",
    "accessToken": "<accessToken>",
    "studentId": "<studentId>"
  }
  ```

- **401 Unauthorized:**

  ```json
  {
    "error": "No refresh token provided"
  }
  ```

  ```json
  {
    "error": "Refresh token is not valid"
  }
  ```

  ```json
  {
    "error": "Student with such token is not found"
  }
  ```

  ![refresh](https://github.com/user-attachments/assets/6da0001d-4884-4a03-8e21-de1cecaf0e41)

### 5. Enroll

**Endpoint:**
POST `api/v1/enroll`

- Calculates list of specialties for students based on their scores.

**Request Body:**

```json
{
  "scores": {
    "Mathematics": 90,
    "Physics": 12,
    "Chemistry": 12,
    "Biology": 86
  }
}
```

**Responses:**

- **200 OK:**

  ```json
  {
    "message": "List of specialties defined successfully",
    "type": "free",
    "specialties": [
      {
        "id": 9,
        "name": "Biomedical Engineering",
        "tuitionCost": 3200,
        "passingScoreForFree": 280,
        "passingScoreForPaid": 190,
        "coefficients": {
          "1": 1.5,
          "2": 1.4,
          "3": 1.4,
          "4": 1.3
        },
        "totalScore": "280.4",
        "calculationDetails": "90 * 1.5 + 12 * 1.4 + 12 * 1.4 + 86 * 1.3",
        "requiredScore": 280
      }
    ]
  }
  ```

- **401 Unauthorized (Invalid Access Token):**

  ```json
  {
    "error": "Invalid Access Token"
  }
  ```

- **400 Bad Request (Invalid Scores):**

  ```json
  {
    "error": "<scoresValidation>"
  }
  ```

  ![enroll](https://github.com/user-attachments/assets/35e85144-58b0-4bd9-a45c-ff1999d92a2a)

### 6. Get Student Scores

**Endpoint:**
GET `api/v1/getStudentScores`

- Retrieves the student's scores.

**Responses:**

- **200 OK:**

  ```json
  {
    "scores": {
      "Mathematics": 90,
      "Physics": 12,
      "Chemistry": 12,
      "Biology": 86
    }
  }
  ```

- **401 Unauthorized:**

  ```json
  {
    "error": "Invalid Access Token"
  }
  ```

  ![getStudentsScores](https://github.com/user-attachments/assets/b36a8290-fc6a-4f8b-bc0a-b69f136daa1e)

## Authentication

The application uses **JSON Web Tokens** (JWT) for authentication. JWT is a compact, URL-safe means of representing claims to be transferred between two parties. It allows the application to verify the identity of users and provide secure access to protected resources.

### JWT Tokens

The application uses two types of JWT tokens:

- `Access Token`: This token is used to access protected routes and resources. It has a short expiration time for security purposes.
- `Refresh Token`: This token is used to obtain a new access token when the current access token expires. It has a longer expiration time.

### Storage of Tokens

- `Access Token`: The access token is stored in the client's local storage. It is included in the Authorization header of requests to protected routes.
- `Refresh Token`: The refresh token is stored in an HTTP-only cookie to enhance security. It is also stored in the database in the refreshToken table for verification purposes.

### Token Flow

1. **User Signup/Login**: Upon successful signup or login, the server generates an access token and a refresh token. The access token is sent to the client in the response and stored in local storage. The refresh token is sent as an HTTP-only cookie and stored in the refreshToken table in the database.
2. **Accessing Protected Routes**: When the client makes a request to a protected route, it includes the access token in the Authorization header. The server verifies the token using the requireAuth middleware.
3. **Refreshing Tokens**: If the access token expires, the client can use the refresh token to obtain a new access token by making a request to the refresh endpoint. The server verifies the refresh token stored in the cookie and generates new tokens.

## Middlewares

### Authentication Middleware: `requireAuth`

This middleware ensures that requests to protected routes are authenticated. It checks for the presence and validity of an access token in the `Authorization` header of the request in the following format:`Authorization: Bearer <access_token>`.If the access token is missing or invalid, it returns an appropriate error response.

### Usage:

The requireAuth middleware is used to protect the following routes:

- POST `/api/v1/enroll`
- GET `/api/v1/getStudentScores`

Error Responses:

- **401 Unauthorized:**

  ```json
  {
    "error": "Unauthorized. No token is found"
  }
  ```

  ```json
  {
    "error": "Unauthorized. Token is invalid"
  }
  ```

  ![Authorization](https://github.com/user-attachments/assets/221527f5-6e45-4759-a35e-c56ac84123ea)

## Running the app with DOCKER

```bash
# create .env file and define all environment variables

# run the docker containers
$ docker-compose up -d

# run the docker containers and rebuild images if they have changed
$ docker-compose up -d --build
```

## Running the app (without DOCKER)

### Installation first time only!

```bash
# create .env file and define all environment variables

# install the dependencies
$ npm install

# start the application
$ npm start
```

## Test

```bash
# unit tests
$ npm test
```

## Shutdown

```bash
# stop the app in the terminal where it is running
$ CTRL + C

# stop the docker containers and all unnecessary volumes
$ docker-compose down -v
```
