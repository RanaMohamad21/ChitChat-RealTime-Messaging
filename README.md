# ChitChat Real-Time Messaging - Backend

ChitChat's backend is designed to handle real-time messaging, user authentication, and chatroom operations efficiently and securely. Built with modern web technologies, it supports public and private rooms, direct messaging, and notifications, ensuring seamless communication between users.

## Features
- **Real-Time Messaging**: Handles instant communication via Web Sockets.
- **User Authentication**: Secured with JSON Web Tokens (JWT) for robust user verification and session management.
- **Chatroom Operations**: Supports both public and private chatrooms.
- **Direct Messaging**: Facilitates one-on-one private conversations.
- **Notifications**: Provides real-time notifications for new messages and updates.

## Technologies Used
- **Node.js**: Core runtime for building scalable server-side applications.
- **Web Sockets**: Enables real-time communication.
- **JWT**: Secures authentication and manages user sessions.
- **Express.js**: Simplifies routing and server management.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/RanaMohamad21/ChitChat-RealTime-Messaging.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ChitChat-RealTime-Messaging
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server
1. Start the server:
   ```bash
   npm start
   ```
2. The server will run on `http://localhost:5000` by default.

### Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```
PORT=5000
JWT_SECRET=your_jwt_secret
DB_URI=your_database_uri
```

## API Endpoints

### Authentication
- **POST /signup**: Registers a new user.
- **POST /login**: Authenticates a user and returns a JWT.
- **GET /logout**: Logs out the user.

### Profile Management
- **GET /getProfile**: Fetches the profile of the user.
- **PUT /updateUsername**: Updates the username of the user.
- **POST /uploadProfilePhoto**: Uploads a profile photo for the user.
- **DELETE /deleteProfilePhoto**: Deletes the profile photo of the user.

### Messaging
- **POST /sendMessage**: Sends a message to a recipient (identified by ID).
- **POST /getMessage**: Retrieves messages between the sender and a specific recipient (identified by ID).

### User and Group Management
- **GET /sidebarUsers**: Retrieves a list of users for the sidebar.
- **GET /search/:searched**: Searches for users or groups based on the provided term.
- **GET /filterUsers**: Filters users based on specified criteria.
- **GET /filterGroups**: Filters groups based on specified criteria.

## Demo
Experience the live application:
[ChitChat Demo](https://drive.google.com/file/d/1W6-XqZDMrGmQCCPjQGt1ojz2AXyKSJJY/view?usp=drive_link)

## Frontend Repo
[ChitChat frontend](https://github.com/Roaa227/ChitChat-RealTime-Messaging)

## Contributing
We welcome contributions! Please submit a pull request or open an issue for feedback.
