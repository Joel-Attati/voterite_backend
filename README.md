Voting Platform Backend Logic Documentation
🧩 Overall Logic (Backend Flow Summary)
The system revolves around Events, each containing Categories, and each Category containing Nominees. Votes are cast per nominee, and both admins and users interact with the same event data, but at different permission levels.
👨‍💻 USER SIDE (Frontend + Backend Interaction)
1. Viewing Events
When a user visits the site, the frontend calls GET /events. The backend fetches all active events and returns details like event name, image, ID, status, and duration.
2. Viewing Categories within an Event
When a user selects an event, GET /events/:eventId returns categories with nominees, votes, and percentages so the frontend can show live leaderboards.
3. Voting for a Nominee
Users select a nominee, enter votes, and pay via the payment method we set. After payment confirmation, POST /votes updates the nominee’s votes, recalculates percentages, and returns updated data. Frontend uses real-time updates to refresh votes instantly.

🧑‍💼 ADMIN SIDE (Management Interface)
1. Creating a New Event
Admin fills event name, image, duration, and vote amount. POST /admin/events saves it and generates an event ID.
2. Adding Categories to an Event
Admin adds categories using POST /admin/events/:eventId/categories. Backend auto-generates IDs and links them to the event.
3. Adding Nominees to a Category
Admin adds nominee details via POST /admin/events/:eventId/categories/:categoryId/nominees. Backend auto-generates a unique code, initializes votes to zero, and reflects it on the user side instantly.
4. Live Monitoring & Analytics
Admins can monitor votes, revenue, and leaderboards in real-time. GET /admin/analytics provides total votes, revenue, and top nominees.
🔁 Real-Time Sync (User + Admin)
Whenever a vote is cast, the backend updates votes and recalculates percentages. Both admin and user views update live via Firebase or WebSocket.
🧱 Data Structure in Database (Example)
events → categories → nominees

events: {
  eventId: {
    name: 'National Students Impact Awards 2025',
    image: '...',
    vote_amount: 1,
    categories: {
      categoryId: {
        name: 'Student Leader of the Year',
        nominees: {
          nomineeId: {
            name: 'David Tetteh', votes: 270, percentage: 27.55, unique_code: 'NS1001'
          }
        }
      }
    }
  }
}
⚙️ Summary of Key Logic
Action	Actor	Backend Logic
Create event	Admin	Save event → generate ID
Add category	Admin	Attach to event → generate ID
Add nominee	Admin	Auto-generate unique code + init votes
Cast vote	User	Update votes, calculate %, update cash
View live updates	User/Admin	Real-time sync of votes + %
Analytics	Admin	Aggregate total votes, revenue, leaders

🗳️ Voterite Backend API
A robust backend service for managing user accounts, elections, and voting data for the Voterite application, built using Node.js and the Express framework.

📝 Table of Contents
Features

Technologies

Setup and Installation

Environment Variables

Running the Application

API Endpoints

Contributing

License

✨ Features
User Authentication: Secure registration, login, and token-based authentication (JWT).

Election Management: CRUD operations for creating, updating, and viewing elections.

Voting System: Secure and verifiable process for submitting votes.

Role-Based Access: Differentiate between Admins and regular Voters.

🛠️ Technologies
Runtime: Node.js

Framework: Express.js

Database: [MongoDB]

ORM/ODM: [Mongoose]

Authentication: JSON Web Tokens (JWT)

🚀 Setup and Installation
Follow these steps to get the development environment running on your local machine.

Clone the Repository:

Bash

git clone https://github.com/Joel-Attati/voterite_backend.git
cd voterite_backend/backend
Install Dependencies:

Bash

npm install

⚙️ Environment Variables
The application requires specific environment variables for configuration. You must create a file named .env in the root directory of your backend folder and populate it with the required values.

File: .env

Code snippet

# Server Configuration
PORT=5000

# Database Configuration (Example for MongoDB)
MONGO_URI="mongodb://localhost:27017/voterite_db"
# If using a different DB, replace with your connection string

# JWT Secret
JWT_SECRET="YOUR_VERY_STRONG_SECRET_KEY_HERE"
JWT_LIFETIME="1d"
⚠️ SECURITY NOTE: The .env file is intentionally 

▶️ Running the Application
To start the server in development mode:

Bash

node server.js
The API will be running at http://localhost:<PORT> (e.g., http://localhost:5000).

🔗 API Endpoints
Category	Method	Endpoint	Description
T    /api/events                          # List all events
GET    /api/events/:id                      # Get single event
GET    /api/events/:id/categories           # Get event categories
GET    /api/events/:id/categories/:catId    # Get category nominees
POST   /api/vote                            # Cast a vote
GET    /api/vote/stats                      # Get statistics
🤝 Contributing
We welcome contributions! If you have suggestions or want to improve the codebase:

Fork the repository.

Create a new feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add amazing feature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📜 License
Distributed under the MIT License. See LICENSE for more information.

Project Maintainer: Joel Attati
