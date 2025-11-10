# Start Here - Quick Startup Guide

Quick reference for starting your "I Just Went To" app after stepping away.

## 🚀 Quick Start (TL;DR)

**Terminal 1 - Backend:**
```bash
cd backend
.\venv\Scripts\Activate.ps1
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Open browser:** `http://localhost:3000`

---

## 📋 Detailed Startup Steps

### Prerequisites Checklist

Before starting, ensure:
- [ ] Azure SQL Database is running (check Azure Portal)
- [ ] Azure Blob Storage is accessible
- [ ] Your `.env` file exists in `backend/` folder with all credentials
- [ ] Python 3.8+ installed
- [ ] Node.js installed

### Step 1: Start Backend Server

1. Open a terminal/command prompt
2. Navigate to backend:
   ```bash
   cd "C:\Users\vince\OneDrive\Documents\Projects\I_Just_Went_To\backend"
   ```
3. Activate virtual environment:
   ```bash
   .\venv\Scripts\Activate.ps1
   ```
   (You should see `(venv)` in your prompt)
4. Start Flask server:
   ```bash
   python app.py
   ```
5. **Look for:**
   - ✅ "Database initialized successfully"
   - ✅ "Running on http://127.0.0.1:5000"

**Keep this terminal open!**

### Step 2: Start Frontend Server

1. Open a **NEW** terminal/command prompt
2. Navigate to frontend:
   ```bash
   cd "C:\Users\vince\OneDrive\Documents\Projects\I_Just_Went_To\frontend"
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. **Look for:**
   - ✅ "VITE v5.x.x ready"
   - ✅ "Local: http://localhost:3000/"

**Keep this terminal open too!**

### Step 3: Open Your App

1. Open your browser
2. Go to: `http://localhost:3000`
3. You should see your "I Just Went To..." app!

---

## 🔧 Troubleshooting

### Backend Won't Start

**Error: "Module not found"**
```bash
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

**Error: "Database connection failed"**
- Check your `.env` file exists in `backend/` folder
- Verify Azure SQL Database is running in Azure Portal
- Check firewall rules allow your IP

**Error: "Port 5000 already in use"**
- Find and close the process using port 5000
- Or change `PORT=5001` in `backend/.env`

### Frontend Won't Start

**Error: "Cannot find module"**
```bash
cd frontend
npm install
npm run dev
```

**Error: "Port 3000 already in use"**
- Find and close the process using port 3000
- Or the server might already be running - check `http://localhost:3000`

**Error: "Cannot connect to API"**
- Make sure backend is running on port 5000
- Check `http://localhost:5000/api/health` in browser

### Photos Not Showing

1. Check Azure Portal → Storage Account
2. Verify container `photos` has "Blob" public access
3. Verify storage account has "Allow blob public access" enabled
4. See `AZURE_BLOB_SETUP.md` for details

---

## 📁 Project Structure Reminder

```
I_Just_Went_To/
├── backend/          # Flask API
│   ├── .env          # ⚠️ Your credentials (don't commit!)
│   ├── app.py        # Main Flask app
│   └── venv/         # Python virtual environment
├── frontend/         # React app
│   ├── src/
│   └── node_modules/
└── START_HERE.md     # This file!
```

---

## 🎯 Quick Commands Reference

### Backend
```bash
# Navigate
cd backend

# Activate venv
.\venv\Scripts\Activate.ps1

# Install dependencies (if needed)
pip install -r requirements.txt

# Start server
python app.py

# Deactivate venv (when done)
deactivate
```

### Frontend
```bash
# Navigate
cd frontend

# Install dependencies (if needed)
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## ✅ Startup Verification Checklist

Before you start coding, verify:

1. **Backend running?**
   - Test: `http://localhost:5000/api/health`
   - Should return: `{"status":"healthy","message":"..."}`

2. **Frontend running?**
   - Test: `http://localhost:3000`
   - Should show your app

3. **Database connected?**
   - Backend terminal shows "Database initialized successfully"

4. **Can create trips?**
   - Try creating a test trip
   - Should appear in the list

5. **Photos working?**
   - Photos should display and be clickable to expand

---

## 🔗 Useful Links

- **Local App**: http://localhost:3000
- **API Health**: http://localhost:5000/api/health
- **API Trips**: http://localhost:5000/api/trips
- **Azure Portal**: https://portal.azure.com

---

## 📚 Full Documentation

- **Setup Guide**: `SETUP_GUIDE.md` - Complete setup instructions
- **Testing**: `TESTING_GUIDE.md` - How to test your app
- **Azure SQL**: `AZURE_SQL_SETUP.md` - Database setup
- **Azure Blob**: `AZURE_BLOB_SETUP.md` - Photo storage setup
- **GitHub**: `GITHUB_SETUP.md` - Version control setup
- **Quick Start**: `QUICK_START.md` - 5-minute setup
- **README**: `README.md` - Project overview

---

## 🛑 Stopping the Servers

When you're done:

1. **Backend**: Press `Ctrl+C` in the backend terminal
2. **Frontend**: Press `Ctrl+C` in the frontend terminal

Both servers will stop.

---

## 💡 Pro Tips

- **Keep both terminals open** while developing
- **Check the terminal output** for errors if something doesn't work
- **Refresh browser** after making code changes (React auto-reloads)
- **Backend needs restart** after changing Python code
- **Check browser console** (F12) for frontend errors

---

**You're all set! Happy coding! 🎉**

