# Food Delivery App

A web application for food delivery built with the MERN stack, featuring microservices for authentication and menu management.


A demonstration of the project can be found [here](https://drive.google.com/file/d/1z9KQsODLEn76yMmXjQ7FB_OPzx3-SxZ1/view?usp=sharing).
## Setup

### Prerequisites

- Docker installed on your machine.
- Basic knowledge of Docker and Docker Compose.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Heril-Lalwani/Food-Delivery-App.git
   cd Food-Delivery-App
2. **Build and Start the Docker Containers**
   ```bash
   docker-compose up -d --build

3. **Running the App**
   Once the containers are up and running, you can access the web application by navigating to    http://localhost:3000 in your browser.

   To stop the application, use:
   ```bash
   docker-compose down
4. **Project Structure**
/frontend: Contains the React frontend code.
/auth-service: Contains the authentication microservice.
/food-display-service: Contains the microservice for displaying and adding food items.
/mongos: Configuration for the MongoDB container.
5. **Demo**
   A demonstration of the project can be found [here](https://drive.google.com/file/d/1z9KQsODLEn76yMmXjQ7FB_OPzx3-SxZ1/view?usp=sharing).

## Introduction

This project is a food delivery web application with the following pages:
- **Login page**
- **Signup page**
- **Home page**
- **Add Item page**

The application is built using the MERN (MongoDB, Express, React, Node.js) stack and is containerized using Docker.

## Architecture

The application consists of the following microservices and components:

1. **Frontend**: A React.js web app served on port `3000`.
2. **mongos**: MongoDB instance to store user and menu data.
3. **Auth-service**: Handles authentication and runs on port `5002`.
4. **Food-display service**: Manages food item display and additions to the menu, running on port `5001`.

### Protocols and Communication

- Microservices communicate with each other via REST APIs.
- All containers are connected via a Docker bridge network.

## Approach and Microservices Design

### Why Microservices?

Microservices architecture was chosen for this project to ensure scalability, maintainability, and modularity. By dividing the application into smaller, independent services, each responsible for a specific function, we gain several advantages:

1. **Scalability**: Each microservice can be scaled independently based on its load. For example, if the authentication service experiences high traffic, it can be scaled up without affecting the other services.

2. **Maintainability**: Smaller, focused codebases are easier to manage, test, and update. This also reduces the risk of unintended side effects when making changes.

3. **Modularity**: Each microservice is developed and deployed independently, which allows for faster development cycles and easier troubleshooting.

### Microservices in the Project

The application is split into the following microservices:

1. **Auth-service (Port 5002)**:
   - **Purpose**: Handles all user authentication-related functionalities, such as login, signup, and token management.
   - **Why**: Security is a critical aspect of any web application, and isolating the authentication logic into its own service ensures that it can be secured and managed separately. It also allows for the potential reuse of this service in other applications.

2. **Food-display service (Port 5001)**:
   - **Purpose**: Manages the retrieval and addition of food items to the menu.
   - **Why**: The menu management logic is a core component of the application and warrants its own service. By isolating this functionality, we ensure that updates or changes to the food items don't interfere with other parts of the system.

### Inter-service Communication

- **REST API**: The microservices communicate with each other using REST APIs, which provide a simple and standardized way of interacting between services. This also allows for flexibility in integrating new services or updating existing ones without disrupting the overall system.

### Network and Containerization

- **Docker Containers**: Each service runs in its own Docker container, ensuring consistency across development, testing, and production environments.
- **Bridge Network**: All containers are connected via a Docker bridge network, which isolates them from external traffic and secures the internal communication between services.

### Conclusion

This microservices approach allows the Food Delivery App to be robust, scalable, and easier to manage. Each service's isolation ensures that changes can be made with minimal impact on the overall system, making it an ideal architecture for a modern web application.

