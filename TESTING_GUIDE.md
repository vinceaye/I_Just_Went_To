# Testing Your App - Step by Step

## Step 1: Test Backend Connection

### 1.1 Start Flask Server

1. Open a terminal/command prompt
2. Navigate to backend folder:
   ```bash
   cd backend
   ```
3. Activate virtual environment:
   ```bash
   .\venv\Scripts\Activate.ps1  # PowerShell
   # OR
   venv\Scripts\activate.bat     # CMD
   ```
4. Start Flask:
   ```bash
   python app.py
   ```

### 1.2 What to Look For

✅ **Success indicators:**
- You see: "Database initialized successfully"
- You see: "Running on http://127.0.0.1:5000"
- No error messages about connection

❌ **Common errors:**
- **"Azure SQL connection settings are missing"** → Check your `.env` file exists and has all SQL variables
- **"Cannot connect to server"** → Check firewall rules in Azure Portal
- **"Login failed"** → Verify username/password in `.env`
- **"Driver not found"** → Install ODBC Driver 18 for SQL Server (Windows)

### 1.3 Test Health Endpoint

1. Open a new browser tab
2. Go to: `http://localhost:5000/api/health`
3. You should see:
   ```json
   {"status":"healthy","message":"I Just Went To API is running"}
   ```

## Step 2: Test Database Connection

### 2.1 Verify Database Initialization

When you start `app.py`, it should:
- Connect to Azure SQL
- Create the `trips` table if it doesn't exist
- Print "Database initialized successfully"

### 2.2 Test API Endpoints

**Get all trips:**
- Browser: `http://localhost:5000/api/trips`
- Should return: `[]` (empty array if no trips yet)

**Create a trip (using Postman or curl):**
```bash
curl -X POST http://localhost:5000/api/trips \
  -F "userName=Test User" \
  -F "location=Paris, France" \
  -F "description=Testing the app" \
  -F "tripDate=2024-01-15"
```

## Step 3: Set Up Frontend

### 3.1 Install Frontend Dependencies

Open a **NEW terminal** (keep backend running):

1. Navigate to frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### 3.2 Start Frontend Server

1. Start development server:
   ```bash
   npm run dev
   ```
2. You should see:
   ```
   VITE v7.x.x ready in XXX ms
   ➜  Local:   http://localhost:3000/
   ```
3. Open browser to: `http://localhost:3000`

## Step 4: Test Full Application

### 4.1 Create Your First Trip

1. Fill out the form on `http://localhost:3000`:
   - **Your Name**: Your name
   - **Location**: Any location (e.g., "Tokyo, Japan")
   - **Date**: Pick a date
   - **Description**: Write something about the trip
   - **Photo**: Upload an image (optional but recommended)
2. Click **"Share Your Trip"**
3. You should see:
   - Success message (or trip appears in list)
   - Trip card appears in the "Recent Trips" section

### 4.2 Verify in Azure

**Check SQL Database:**
1. Azure Portal → Your SQL Database
2. Use Query Editor or Azure Data Studio
3. Run: `SELECT * FROM trips;`
4. You should see your trip entry

**Check Blob Storage:**
1. Azure Portal → Your Storage Account
2. Containers → `photos`
3. You should see your uploaded photo

## Step 5: Troubleshooting

### Backend Issues

**Port 5000 already in use:**
- Change `PORT=5001` in `.env`
- Restart Flask app

**Database connection timeout:**
- Check firewall rules in Azure SQL
- Verify server name includes `.database.windows.net`
- Check your IP is allowed

**Photo upload fails:**
- Verify Blob Storage credentials in `.env`
- Check container exists and is named correctly
- Verify container has "Blob" public access

### Frontend Issues

**Can't connect to API:**
- Ensure backend is running on port 5000
- Check `vite.config.js` has correct proxy settings
- Check browser console for errors

**Blank page:**
- Check browser console for errors
- Verify `npm install` completed successfully
- Try `npm run dev` again

### Common Windows Issues

**ODBC Driver missing:**
1. Download: https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
2. Install "ODBC Driver 18 for SQL Server"
3. Restart terminal and Flask app

**PowerShell execution policy:**
If you can't activate venv:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Success Checklist

- [ ] Backend starts without errors
- [ ] "Database initialized successfully" message appears
- [ ] Health endpoint works (`/api/health`)
- [ ] Frontend starts on `http://localhost:3000`
- [ ] Can create a trip via form
- [ ] Trip appears in the list
- [ ] Photo uploads successfully (if tested)
- [ ] Trip visible in Azure SQL Database
- [ ] Photo visible in Azure Blob Storage

## Next Steps

Once everything works:
1. ✅ Test creating multiple trips
2. ✅ Test uploading different photo types
3. ✅ Verify all trips display correctly
4. ✅ Test on different browsers
5. ✅ Set up GitHub repository (see `GITHUB_SETUP.md`)
6. ✅ Prepare for Azure deployment

---

**Congratulations! Your app is working!** 🎉

