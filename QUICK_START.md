# Quick Start Guide

Get up and running in 10 minutes!

## Prerequisites Checklist

- [ ] Node.js installed (v20.19.0+ recommended)
- [ ] Python 3.8+ installed
- [ ] Azure account with SQL Database and Blob Storage set up
- [ ] Git installed

## 5-Minute Setup

### 1. Backend (2 minutes)

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows PowerShell
# OR: venv\Scripts\activate.bat  # Windows CMD
# OR: source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt

# Create .env file with your Azure credentials
# See backend/.env.example for template

python app.py
```

Backend running on `http://localhost:5000` ✅

### 2. Frontend (2 minutes)

```bash
cd frontend
npm install
npm run dev
```

Frontend running on `http://localhost:3000` ✅

### 3. Test It (1 minute)

1. Open `http://localhost:3000`
2. Fill out the form
3. Share a trip!
4. See it appear in the list below

## GitHub Setup (5 minutes)

### First Time Only

```bash
# In project root
git add .
git commit -m "Initial commit: I Just Went To web app"

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/I_Just_Went_To.git
git branch -M main
git push -u origin main
```

## Common Issues

**Backend won't start?**
- Check `.env` file exists and has correct values
- Ensure virtual environment is activated
- Verify Azure SQL firewall allows your IP

**Frontend can't connect to API?**
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify `vite.config.js` proxy settings

**Git push fails?**
- Verify GitHub repository exists
- Check remote URL is correct
- Ensure you're authenticated with GitHub

## Need More Help?

- 📖 Full setup: See `SETUP_GUIDE.md`
- 🐙 GitHub: See `GITHUB_SETUP.md`
- 📚 Documentation: See `README.md`
- 🤝 Contributing: See `CONTRIBUTING.md`

## What's Next?

1. ✅ Set up local development
2. 📝 Configure Azure resources
3. 🚀 Deploy to production
4. ✨ Add features (auth, search, etc.)

---

**You're all set! Happy coding! 🎉**

