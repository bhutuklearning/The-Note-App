# The Note App

A full-stack Notes application with a rich text editor, allowing users to create, read, update, and delete notes with formatting options. The backend is built with Express.js and MongoDB, while the frontend is planned for future development. This is the first project of the **backend serires** which I started on LinkedIn and Twitter to upskill myself and also for the purpose of learn and build in public. The postman collection is also uploaded to show the proofs of testing the API endpoints. Connect with me on:
- **LinkedIn:** [Amritanshu Goutam](https://www.linkedin.com/in/amritanshu-goutam-015bab248/)
- **X(Twitter):** [Amritanshutwt](https://x.com/Amritanshutwt)


## 🚀 Features

- **Rich Text Editing**: Create notes with HTML formatting (bold, italic, lists, headings, etc.)
- **CRUD Operations**: Create, read, update, and delete notes
- **Sorting**: View all notes with newest-first sorting
- **Engagement**: Like/dislike notes functionality
- **Search Capability**: Search notes by title and author
- **Security**: Sanitized HTML content to prevent XSS attacks
- **User Attribution**: Associate notes with creators namre and their social links.
- **Responsive API**: RESTful API design for easy integration

## 🛠️ Technologies Used

### Backend

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling or ODM.
- **Sanitize-HTML**: Security middleware to prevent XSS attacks
- **Dotenv**: Environment variable management

### Frontend (Planned)

- To be implemented in future iterations

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager
- Postman (optional, for API testing)

## ⚙️ Installation & Setup

### Backend Setup

1. Clone the repository

   ```bash
   git clone https://github.com/bhutuklearning/The-Note-App.git
   cd The-Note-App
   ```

2. Install dependencies

   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables

   - Create a `.env` file in the backend directory
   - Add your MongoDB connection string and other environment variables

   ```
   PORT=13000
   MONGODB_URI=mongodb://localhost:27017/notes-app
   NODE_ENV=development
   ```

4. Start the development server

   ```bash
   npm run backend
   ```

5. Verify the server is running by visiting:
   ```
   http://localhost:13000
   ```
   You should see a welcome message: `{"success": true, "message": "Welcome to the Notes API"}`

## 📚 API Documentation

### Base URL

```
http://localhost:13000/api/v1
```

### Endpoints

| Method | Endpoint             | Description                            |
| ------ | -------------------- | -------------------------------------- |
| GET    | `/notes`             | Get all notes (sorted by newest first) |
| GET    | `/notes/:id`         | Get note by ID                         |
| POST   | `/notes/create-note` | Create a new note                      |
| PUT    | `/notes/:id`         | Update a note                          |
| DELETE | `/notes/:id`         | Delete a note                          |
| POST   | `/notes/:id/like`    | Like a note                            |
| POST   | `/notes/:id/dislike` | Dislike a note                         |
| GET    | `/notes/search`      | Search notes by title or author        |

### Request & Response Examples

#### Create a Note

```json
// POST /api/v1/notes/create-note
// Request Body
{
  "title": "My First Note",
  "content": "<p>This is a <strong>formatted</strong> note.</p>",
  "createdBy": {
    "name": "John Doe",
    "socialLink": "https://github.com/johndoe"
  }
}

// Response
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "My First Note",
    "content": "<p>This is a <strong>formatted</strong> note.</p>",
    "createdBy": {
      "name": "John Doe",
      "socialLink": "https://github.com/johndoe"
    },
    "likes": 0,
    "createdAt": "2023-06-22T10:00:00.000Z",
    "updatedAt": "2023-06-22T10:00:00.000Z"
  }
}
```

#### Update a Note

```json
// PUT /api/v1/notes/60d21b4667d0d8992e610c85
// Request Body
{
  "title": "Updated Note Title",
  "content": "<p>This is an <em>updated</em> note.</p>",
  "createdBy": {
    "name": "John Doe",
    "socialLink": "https://github.com/johndoe"
  }
}

// Response
{
  "success": true,
  "message": "Note updated successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Updated Note Title",
    "content": "<p>This is an <em>updated</em> note.</p>",
    "createdBy": {
      "name": "John Doe",
      "socialLink": "https://github.com/johndoe"
    },
    "likes": 0,
    "createdAt": "2023-06-22T10:00:00.000Z",
    "updatedAt": "2023-06-22T10:30:00.000Z"
  }
}
```

## 📁 Project Structure

```
Project-1/
├── backend/
│   ├── src/
│   │   ├── configs/
│   │   │   └── db.js             # Database connection setup
│   │   ├── controllers/
│   │   │   └── notes.controller.js # Note CRUD operations
│   │   ├── middlewares/          # Express middlewares (future use)
│   │   ├── models/
│   │   │   └── notes.model.js    # Mongoose schema for notes
│   │   ├── routes/
│   │   │   └── notes.routes.js   # API route definitions
│   │   └── server.js             # Express app initialization
│   ├── .env                      # Environment variables
│   ├── package.json              # Backend dependencies
│   └── package-lock.json
├── frontend/                     # To be implemented
├── Notes App-Backend Series.postman_collection.json # Postman collection for API testing
└── README.md
```

```

## 🧪 Testing the API

A Postman collection is included in the repository for easy API testing:

1. Import the `Notes App-Backend Series.postman_collection.json` file into Postman
2. Ensure the backend server is running
3. Execute the requests to test different endpoints

## 🔮 Future Roadmap

- **Frontend Implementation**:
  - Develop React.js frontend with responsive design
  - Implement rich text editor integration
  - Create intuitive UI for note management

- **Authentication & Authorization**:
  - Add user registration and login
  - Implement JWT authentication

Made with ❤️ by Amritanshu Goutam
```

This comprehensive README.md includes all the information from my previous answer, with additional details about API endpoints, request/response examples, project structure, and testing instructions.

## 👤 Contact

- **Author:** [Amritanshu Goutam](https://github.com/bhutuklearning)
- **LinkedIn:** [Amritanshu Goutam](https://www.linkedin.com/in/amritanshu-goutam-015bab248/)
- **Email:** amritanshugoutam@gmail.com
