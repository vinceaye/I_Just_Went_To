# I Just Went To...

A social media web application where users can share their travel experiences, including location, date, photos, and descriptions.

## 🚀 Tech Stack

- **Frontend**: React.js with Vite
- **Backend**: Flask (Python)
- **Database**: Azure SQL Database
- **Storage**: Azure Blob Storage
- **Auth**: Azure AD B2C (optional, future implementation)
- **Hosting**: 
  - Frontend: Azure Static Web Apps
  - Backend: Azure App Service

## 📁 Project Structure

```
I_Just_Went_To/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service layer
│   │   └── ...
│   └── ...
├── backend/               # Flask API
│   ├── models/           # Database models
│   ├── services/         # Business logic (Blob Storage)
│   └── app.py           # Flask application
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v20.19.0 or v22.12.0+ recommended)
- Python 3.8+
- Azure account with:
  - Azure SQL Database
  - Azure Blob Storage account
  - (Optional) Azure App Service for backend hosting
  - (Optional) Azure Static Web Apps for frontend hosting

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **Windows**: `venv\Scripts\activate`
   - **Linux/Mac**: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the `backend` directory:
   ```bash
   cp .env.example .env
   ```

6. Configure your `.env` file with your Azure credentials:
   ```
   AZURE_SQL_SERVER=your-server.database.windows.net
   AZURE_SQL_DATABASE=your-database-name
   AZURE_SQL_USERNAME=your-username
   AZURE_SQL_PASSWORD=your-password
   AZURE_STORAGE_ACCOUNT_URL=https://your-storage-account.blob.core.windows.net
   AZURE_STORAGE_ACCOUNT_NAME=your-storage-account-name
   AZURE_STORAGE_ACCOUNT_KEY=your-storage-account-key
   AZURE_STORAGE_CONTAINER_NAME=photos
   PORT=5000
   ```

7. Run the Flask server:
   ```bash
   python app.py
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory (optional, for production):
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## 🔧 Azure Setup

### Azure SQL Database

1. Create an Azure SQL Database in the Azure Portal
2. Note the server name, database name, username, and password
3. Ensure the firewall allows connections from your IP address
4. Update the connection settings in `backend/.env`

### Azure Blob Storage

1. Create a Storage Account in Azure Portal
2. Create a container named "photos" (or update `AZURE_STORAGE_CONTAINER_NAME` in `.env`)
3. Get your storage account name and access key
4. Update the storage settings in `backend/.env`

### Azure App Service (Backend Deployment)

1. Create an App Service in Azure Portal
2. Configure deployment from GitHub or local Git
3. Set environment variables in App Service Configuration
4. Ensure the App Service has ODBC Driver 18 for SQL Server installed

### Azure Static Web Apps (Frontend Deployment)

1. Create a Static Web App in Azure Portal
2. Connect it to your GitHub repository
3. Configure build settings:
   - Build location: `frontend`
   - App location: `frontend`
   - Output location: `dist`
4. Set the API URL in environment variables

## 📝 API Endpoints

### `GET /api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "message": "I Just Went To API is running"
}
```

### `GET /api/trips`
Get all trip entries.

**Response:**
```json
[
  {
    "id": 1,
    "userName": "John Doe",
    "location": "Paris, France",
    "description": "Amazing trip!",
    "photoUrl": "https://...",
    "tripDate": "2024-01-15T00:00:00",
    "createdAt": "2024-01-15T10:30:00"
  }
]
```

### `POST /api/trips`
Create a new trip entry.

**Request (multipart/form-data):**
- `userName` (string): User's name
- `location` (string, required): Location name
- `description` (string): Trip description
- `tripDate` (string, ISO format): Date of the trip
- `photo` (file, optional): Photo file

**Response:**
```json
{
  "id": 1,
  "userName": "John Doe",
  "location": "Paris, France",
  "description": "Amazing trip!",
  "photoUrl": "https://...",
  "tripDate": "2024-01-15T00:00:00"
}
```

## 🚢 Deployment

### Local Development

1. Start the backend server:
   ```bash
   cd backend
   python app.py
   ```

2. Start the frontend server (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser

### Production Build

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. The built files will be in `frontend/dist/`

3. Deploy to Azure Static Web Apps or your preferred hosting service

## 📦 Git & GitHub Setup

### Initial Setup

1. Initialize Git (already done):
   ```bash
   git init
   ```

2. Add all files:
   ```bash
   git add .
   ```

3. Create initial commit:
   ```bash
   git commit -m "Initial commit: I Just Went To web app"
   ```

### GitHub Repository Setup

1. Create a new repository on GitHub (don't initialize with README)

2. Add the remote:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/I_Just_Went_To.git
   ```

3. Push to GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Future Commits

Always follow this workflow:

1. Check status:
   ```bash
   git status
   ```

2. Add changed files:
   ```bash
   git add .
   # Or specific files: git add path/to/file
   ```

3. Commit with descriptive message:
   ```bash
   git commit -m "Description of changes"
   ```

4. Push to GitHub:
   ```bash
   git push
   ```

## 🔐 Security Notes

- Never commit `.env` files to Git (already in `.gitignore`)
- Use environment variables for all sensitive configuration
- For production, use Azure Key Vault for secrets management
- Implement authentication (Azure AD B2C) before production deployment

## 🧪 Testing

### Testing the API

You can test the API endpoints using tools like:
- Postman
- curl
- Browser developer tools

Example curl command:
```bash
curl http://localhost:5000/api/trips
```

## 📚 Next Steps

- [ ] Implement Azure AD B2C authentication
- [ ] Add user profiles
- [ ] Implement trip editing and deletion
- [ ] Add search and filtering
- [ ] Implement pagination for trip list
- [ ] Add map integration for locations
- [ ] Implement likes/comments
- [ ] Add unit and integration tests
- [ ] Set up CI/CD pipeline

## 🤝 Contributing

This is a learning project. Feel free to contribute improvements!

## 📄 License

This project is for educational purposes.

