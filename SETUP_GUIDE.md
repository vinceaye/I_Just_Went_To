# Complete Setup Guide - I Just Went To

This guide will walk you through setting up the entire project from scratch.

## Step 1: GitHub Repository Setup

### Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right, select "New repository"
3. Name it: `I_Just_Went_To`
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Connect Local Repository to GitHub

Open your terminal in the project root and run:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/I_Just_Went_To.git

# Rename branch to main (if needed)
git branch -M main

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: I Just Went To web app - React frontend and Flask backend"

# Push to GitHub
git push -u origin main
```

### Verify GitHub Setup

1. Go to your repository on GitHub
2. You should see all your project files
3. Check that `.env` files are NOT visible (they should be in .gitignore)

## Step 2: Backend Setup

### Install Python Dependencies

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate virtual environment:
   - **Windows PowerShell**: `.\venv\Scripts\Activate.ps1`
   - **Windows CMD**: `venv\Scripts\activate.bat`
   - **Linux/Mac**: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Configure Azure SQL Database

1. **Create Azure SQL Database:**
   - Go to [Azure Portal](https://portal.azure.com)
   - Create a new SQL Database
   - Note down:
     - Server name (e.g., `myserver.database.windows.net`)
     - Database name
     - Admin username
     - Password

2. **Configure Firewall:**
   - In Azure Portal, go to your SQL Server
   - Click "Set server firewall"
   - Add your current IP address
   - Click "Save"

3. **Create .env file:**
   ```bash
   # In backend directory, create .env file
   # Copy from .env.example template
   ```
   
   Add your credentials:
   ```
   AZURE_SQL_SERVER=your-server.database.windows.net
   AZURE_SQL_DATABASE=your-database-name
   AZURE_SQL_USERNAME=your-admin-username
   AZURE_SQL_PASSWORD=your-password
   ```

### Configure Azure Blob Storage

1. **Create Storage Account:**
   - In Azure Portal, create a new Storage Account
   - Choose "StorageV2" account kind
   - Create a container named "photos"

2. **Get Access Keys:**
   - Go to your Storage Account
   - Click "Access keys" in the left menu
   - Copy one of the keys

3. **Update .env file:**
   ```
   AZURE_STORAGE_ACCOUNT_URL=https://your-storage-account.blob.core.windows.net
   AZURE_STORAGE_ACCOUNT_NAME=your-storage-account-name
   AZURE_STORAGE_ACCOUNT_KEY=your-access-key
   AZURE_STORAGE_CONTAINER_NAME=photos
   ```

### Test Backend

1. Start the Flask server:
   ```bash
   python app.py
   ```

2. Test the health endpoint:
   - Open browser: `http://localhost:5000/api/health`
   - You should see: `{"status":"healthy","message":"I Just Went To API is running"}`

## Step 3: Frontend Setup

### Install Node Dependencies

1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Test Frontend

1. Start development server:
   ```bash
   npm run dev
   ```

2. Open browser: `http://localhost:3000`
   - You should see the "I Just Went To..." homepage

## Step 4: Full Stack Testing

### Create a Test Trip

1. With both servers running:
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

2. Fill out the form on the frontend:
   - Name: "Test User"
   - Location: "Paris, France"
   - Date: Today's date
   - Description: "Testing the app!"
   - Photo: (optional, select an image)

3. Click "Share Your Trip"

4. Verify the trip appears in the list below

### Verify Database

1. In Azure Portal, go to your SQL Database
2. Use Query Editor or Azure Data Studio
3. Run:
   ```sql
   SELECT * FROM trips;
   ```
4. You should see your test entry

### Verify Blob Storage

1. In Azure Portal, go to your Storage Account
2. Navigate to the "photos" container
3. You should see uploaded photos

## Step 5: Git Workflow Best Practices

### Daily Workflow

```bash
# 1. Check what's changed
git status

# 2. Add specific files (preferred) or all files
git add path/to/file
# OR
git add .

# 3. Commit with descriptive message
git commit -m "Add feature: user authentication"

# 4. Push to GitHub
git push
```

### Good Commit Messages

- ✅ "Add trip form validation"
- ✅ "Fix photo upload bug"
- ✅ "Update database schema for user profiles"
- ❌ "Updates"
- ❌ "Fixed stuff"
- ❌ "Changes"

### Branching Strategy (Optional)

For larger features:

```bash
# Create feature branch
git checkout -b feature/user-authentication

# Make changes and commit
git add .
git commit -m "Implement user authentication"

# Push branch
git push -u origin feature/user-authentication

# Create Pull Request on GitHub
# Then merge to main
```

## Step 6: Azure Deployment (Production)

### Deploy Backend to Azure App Service

1. **Create App Service:**
   - In Azure Portal, create Web App
   - Choose Python runtime stack
   - Select your subscription and resource group

2. **Configure Environment Variables:**
   - Go to Configuration → Application settings
   - Add all variables from your `.env` file:
     - `AZURE_SQL_SERVER`
     - `AZURE_SQL_DATABASE`
     - etc.

3. **Deploy:**
   - Use Azure CLI or VS Code Azure extension
   - Or use the GitHub Actions workflow (`.azure/pipelines/azure-pipelines.yml`)

### Deploy Frontend to Azure Static Web Apps

1. **Create Static Web App:**
   - In Azure Portal, create Static Web App
   - Connect to your GitHub repository

2. **Configure Build:**
   - Build location: `frontend`
   - App location: `frontend`
   - Output location: `dist`
   - API location: (leave empty or point to your App Service)

3. **Set API URL:**
   - In Static Web App Configuration, add:
     - `VITE_API_BASE_URL=https://your-app-service.azurewebsites.net/api`

## Troubleshooting

### Backend Issues

**"Database connection failed"**
- Check firewall rules in Azure SQL
- Verify credentials in `.env`
- Ensure ODBC Driver 18 is installed

**"Module not found"**
- Activate virtual environment
- Run `pip install -r requirements.txt`

### Frontend Issues

**"Cannot connect to API"**
- Verify backend is running on port 5000
- Check `vite.config.js` proxy settings
- Check browser console for errors

**"Build fails"**
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then reinstall

### Git Issues

**"Remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/I_Just_Went_To.git
```

**"Permission denied"**
- Check GitHub credentials
- Consider using SSH keys or Personal Access Token

## Next Steps

- [ ] Implement user authentication
- [ ] Add trip editing/deletion
- [ ] Implement search functionality
- [ ] Add map integration
- [ ] Set up CI/CD pipeline
- [ ] Add unit tests
- [ ] Optimize image uploads
- [ ] Add pagination

## Getting Help

- Check the main `README.md` for API documentation
- Review Azure documentation for specific services
- Check GitHub Issues for common problems

