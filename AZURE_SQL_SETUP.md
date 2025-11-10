# Azure SQL Database Setup Guide

This guide walks you through setting up Azure SQL Database for the "I Just Went To" app.

## Step 1: Create SQL Database in Azure Portal

### 1.1 Navigate to Azure Portal
1. Go to https://portal.azure.com
2. Sign in with your Azure account
3. Click **+ Create a resource** or search for "SQL Database"

### 1.2 Configure Basic Settings

**Basics Tab:**

1. **Subscription**: Select your Azure subscription
2. **Resource Group**: 
   - Create new: Click "Create new" → Name it (e.g., `MyApp-RG`)
   - Or use existing: Select from dropdown
3. **Database name**: `myapp-db` (or any name you prefer)
4. **Server**:
   - Click **Create new** (if you don't have a SQL Server yet)
   - **Server name**: Choose a unique name (e.g., `myapp-server`)
     - Must be globally unique
     - Only lowercase letters, numbers, and hyphens
     - Example: `myapp-server123`
   - **Location**: Choose closest to you (e.g., `East US`, `West Europe`)
   - **Authentication method**: Choose **Use SQL authentication**
   - **Server admin login**: Create username (e.g., `admin` or `myapp-admin`)
     - **IMPORTANT**: Save this username!
   - **Password**: Create strong password
     - **IMPORTANT**: Save this password! You'll need it for .env file.
     - Requirements: Min 8 characters, uppercase, lowercase, numbers
   - **Confirm password**: Re-enter password
   - Click **OK**

### 1.3 Configure Database Settings

1. **Want to use SQL elastic pool?**: Select **No**
2. **Compute + storage**:
   - Click **Configure database**
   - For development/testing: Select **Basic** tier
     - Service tier: **Basic**
     - Cost: ~$5/month
   - For production: Consider **Standard** or **General Purpose**
   - Click **Apply**
3. **Backup storage redundancy**: Leave default (Locally-redundant backup storage)

### 1.4 Review and Create

1. Click **Review + create**
2. Review all settings
3. Click **Create**
4. Wait for deployment (takes 2-5 minutes)
5. Click **Go to resource** when deployment completes

## Step 2: Configure Firewall Rules

**This is critical - without this, your app can't connect!**

### 2.1 Find Your Current IP Address

1. Open a new browser tab
2. Go to https://www.whatismyip.com
3. Copy your IPv4 address (e.g., `123.45.67.89`)

### 2.2 Add Firewall Rule in Azure

1. In Azure Portal, go to your **SQL Server** (not the database)
   - Click the server name link, or
   - Search for "SQL servers" in the top search bar
2. In the left menu, click **Networking** (or **SQL databases** → your database → **Connection strings** → look for firewall settings)
3. Under **Firewall rules**, you'll see two options:
   - **Allow Azure services and resources to access this server**: Keep this checked (ON)
   - **Add current client IP address**: Click this button
     - This automatically adds your current IP
   - **OR manually add IP**: 
     - Click **+ Add client IP**
     - Enter your IP from Step 2.1
     - Click **OK**
4. Click **Save** at the top

### 2.3 Alternative: Allow All IPs (Development Only - NOT Recommended for Production)

**⚠️ WARNING: Only for local development, never for production!**

1. Under Firewall rules, add:
   - **Rule name**: `AllowAll`
   - **Start IP address**: `0.0.0.0`
   - **End IP address**: `255.255.255.255`
2. Click **Save**

## Step 3: Get Connection Information

You need these details for your `.env` file:

### 3.1 Server Name

1. Go to your **SQL Server** (not the database)
2. On the **Overview** page, you'll see:
   - **Server name**: `your-server-name.database.windows.net`
   - Copy this entire value (including `.database.windows.net`)

### 3.2 Database Name

1. Go back to your **SQL Database**
2. On the **Overview** page:
   - **Name**: Your database name (e.g., `myapp-db`)

### 3.3 Username and Password

- **Username**: The Server admin login you created (e.g., `myapp-admin`)
- **Password**: The password you created

## Step 4: Configure Your .env File

### 4.1 Create .env File

1. Navigate to the `backend` folder in your project
2. Create a new file named `.env` (no extension)
3. Copy the following template:

```env
# Azure SQL Database Configuration
AZURE_SQL_SERVER=your-server.database.windows.net
AZURE_SQL_DATABASE=your-database-name
AZURE_SQL_USERNAME=your-admin-username
AZURE_SQL_PASSWORD=your-password-here

# Azure Blob Storage Configuration (set this up next)
AZURE_STORAGE_ACCOUNT_URL=https://your-storage-account.blob.core.windows.net
AZURE_STORAGE_ACCOUNT_NAME=your-storage-account-name
AZURE_STORAGE_ACCOUNT_KEY=your-storage-account-key
AZURE_STORAGE_CONTAINER_NAME=photos

# Flask Configuration
PORT=5000
FLASK_ENV=development
```

### 4.2 Fill in SQL Database Values

Replace the placeholders with your actual values:

```env
AZURE_SQL_SERVER=myserver123.database.windows.net
AZURE_SQL_DATABASE=myapp-db
AZURE_SQL_USERNAME=myapp-admin
AZURE_SQL_PASSWORD=YourSecurePassword123!
```

**Important Notes:**
- Server name: Include the full `.database.windows.net` part
- Username: Just the admin username, not the full server name
- Password: The exact password (no spaces, case-sensitive)

## Step 5: Test Connection

### 5.1 Install ODBC Driver (Windows)

Your Python code needs the ODBC Driver 18 for SQL Server:

1. Download from: https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
2. Install the driver
3. Restart your terminal/IDE

### 5.2 Test with Python

1. Activate your virtual environment:
   ```bash
   cd backend
   .\venv\Scripts\Activate.ps1
   ```

2. Test the connection:
   ```bash
   python -c "from models.database import get_db_connection, init_db; init_db(); print('Connection successful!')"
   ```

Or start your Flask app:
```bash
python app.py
```

If you see "Database initialized successfully" - you're good! ✅

## Step 6: Troubleshooting

### Error: "Cannot open server"

**Problem**: Firewall rule not set
**Solution**: 
1. Go back to Azure Portal
2. Add your current IP to firewall rules
3. Save changes
4. Wait 1-2 minutes
5. Try again

### Error: "Login failed"

**Problem**: Wrong username or password
**Solution**:
1. Double-check your `.env` file
2. Username should NOT include `@server-name`
3. Password is case-sensitive
4. Check for extra spaces in `.env` file

### Error: "Driver not found"

**Problem**: ODBC Driver not installed
**Solution**:
1. Install ODBC Driver 18 for SQL Server
2. Restart your terminal
3. Try again

### Error: "Connection timeout"

**Problem**: Server name incorrect
**Solution**:
1. Verify server name includes `.database.windows.net`
2. Check for typos in `.env` file
3. Ensure firewall allows your IP

## Quick Reference Checklist

- [ ] SQL Database created in Azure
- [ ] SQL Server created with admin username/password
- [ ] Firewall rule added for your IP address
- [ ] Server name copied (full name with `.database.windows.net`)
- [ ] Database name noted
- [ ] `.env` file created in `backend/` folder
- [ ] SQL credentials added to `.env` file
- [ ] ODBC Driver 18 installed (Windows)
- [ ] Connection tested successfully

## Next Steps

Once SQL Database is set up:

1. ✅ Set up Azure Blob Storage (for photos)
2. ✅ Install Python dependencies (`pip install -r requirements.txt`)
3. ✅ Test backend connection
4. ✅ Run Flask app (`python app.py`)

## Security Best Practices

1. **Never commit `.env` file to Git** (already in `.gitignore`)
2. **Use strong passwords** (min 16 characters, mixed case, numbers, symbols)
3. **Limit firewall rules** to only necessary IPs
4. **For production**: Use Azure Key Vault instead of `.env` files
5. **Enable Azure AD authentication** for production (future enhancement)

## Cost Considerations

- **Basic tier**: ~$5/month (suitable for development)
- **Standard tier**: ~$15-30/month (suitable for small production)
- **Stop database when not in use** to save costs (development only)
- Monitor usage in Azure Portal → Cost Management

---

**You're all set! Your database is ready to store trip entries!** 🎉

