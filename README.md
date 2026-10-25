# Bike Rental REST API

A full-stack Bike Rental application developed using Spring Boot and React.js. The application provides a foundation for managing bike rental information through RESTful APIs and a responsive frontend.

## 🚀 Features

- Manage bike information using CRUD operations.
- Retrieve and maintain bike records.
- REST API integration between frontend and backend.
- Responsive user interface built with React.js.
- Database integration using Spring Data JPA and MySQL.
- API testing using Postman.

## 🛠️ Technologies Used

**Backend**
- Java
- Spring Boot
- Spring Web
- Spring Data JPA / Hibernate
- MySQL
- Maven

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

**Tools**
- Git & GitHub
- Postman
- VS Code
- MySQL Workbench

## 📁 Project Structure

```text
Bike-Rental-Rest-Api/
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
├── pom.xml
├── BikeRentalFrontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

*Adjust the folder names if your actual project structure differs.*

## ⚙️ Prerequisites

- Java JDK
- Maven
- Node.js and npm
- MySQL Server

## 🔧 Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Vamsidhar-Developer/Bike-Rental-Rest-Api.git
   ```

2. Open the backend project in your IDE.
3. Create or select your MySQL database.
4. Update `src/main/resources/application.properties` with your local database configuration.
5. Start the backend:

   ```bash
   mvn spring-boot:run
   ```

## 💻 Frontend Setup

1. Open a terminal in the frontend directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL displayed in the terminal.

## 🔗 API Endpoints

Example endpoint structure (adjust paths to match your controller):

| Method | Endpoint | Description |
|---|---|---|
| GET | `/bikes` | Retrieve all bikes |
| GET | `/bikes/{id}` | Retrieve a bike by ID |
| POST | `/bikes` | Add a bike |
| PUT | `/bikes/{id}` | Update bike details |
| DELETE | `/bikes/{id}` | Delete a bike |

## 🔐 Configuration

Configure your MySQL connection and frontend API base URL before running the application. Keep passwords and other secrets out of GitHub.

## 👨‍💻 Author

**Nelapati Vamsidhar**

GitHub: [Vamsidhar-Developer](https://github.com/Vamsidhar-Developer)

## 📄 License

This project is intended for educational and portfolio purposes unless a separate license is provided.
