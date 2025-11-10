# Azure Blob Storage Setup Guide

This guide walks you through setting up Azure Blob Storage for storing photos in the "I Just Went To" app.

## Step 1: Create Storage Account in Azure Portal

### 1.1 Navigate to Azure Portal
1. Go to https://portal.azure.com
2. Sign in with your Azure account
3. Click **+ Create a resource** or search for "Storage account"

### 1.2 Configure Basic Settings

**Basics Tab:**

1. **Subscription**: Select your Azure subscription
2. **Resource Group**: 
   - Use the same resource group as your SQL Database (e.g., `IJustWentTo-RG`)
   - Or create new if you prefer
3. **Storage account name**: 
   - Choose a unique name (e.g., `ijustwenttostorage`)
   - Must be globally unique (3-24 characters, lowercase letters and numbers only)
   - Example: `ijustwenttostorage123`
4. **Region**: Choose closest to you (same as your SQL Database if possible)
5. **Performance**: 
   - **Standard** (recommended for most use cases)
   - Premium is faster but more expensive
6. **Redundancy**: 
   - **Locally-redundant storage (LRS)** - Cheapest, good for development
   - **Geo-redundant storage (GRS)** - More resilient, for production
   - For development: Choose **LRS**
   - For production: Consider **GRS**

### 1.3 Configure Advanced Settings (Optional)

Click **Next: Advanced** tab:

1. **Security**: Leave defaults (can enable later if needed)
2. **Data Lake Storage Gen2**: Leave unchecked (not needed for this app)
3. **Blob access tier**: **Hot** (for frequent access)
4. **NFS v3**: Leave unchecked
5. **Hierarchical namespace**: Leave unchecked

Click **Next: Networking**

### 1.4 Configure Networking

1. **Network access**: 
   - **Public access from all networks** (for development)
   - OR **Enable public access from selected virtual networks and IP addresses** (more secure)
   - For production, consider restricting access
2. **Network routing**: Leave default
3. Click **Next: Data protection**

### 1.5 Configure Data Protection

Leave defaults for development:
- **Enable soft delete for blobs**: Optional (adds cost)
- **Enable soft delete for containers**: Optional
- **Enable soft delete for file shares**: Optional

Click **Next: Encryption**

### 1.6 Configure Encryption

Leave defaults:
- **Encryption type**: Microsoft-managed keys (default)
- Click **Next: Tags** (skip tags) → **Review + create**

### 1.7 Review and Create

1. Review all settings
2. Click **Create**
3. Wait for deployment (takes 1-2 minutes)
4. Click **Go to resource** when deployment completes

## Step 2: Create Container for Photos

### 2.1 Navigate to Containers

1. In your Storage Account, find **Data storage** section in left menu
2. Click **Containers**
3. Click **+ Container** button

### 2.2 Configure Container

1. **Name**: `photos` (or any name you prefer)
2. **Public access level**: 
   - **Blob (anonymous read access for blobs only)** - Recommended
     - This allows public URLs for photos
     - Users can view photos directly
   - **Private (no anonymous access)** - More secure, but photos need authentication
3. Click **Create**

✅ Your container is ready!

## Step 3: Get Storage Account Information

You need these details for your `.env` file:

### 3.1 Storage Account Name

1. On your Storage Account **Overview** page
2. **Name**: This is your storage account name (e.g., `ijustwenttostorage123`)

### 3.2 Storage Account URL

The URL format is:
```
https://YOUR_STORAGE_ACCOUNT_NAME.blob.core.windows.net
```

Replace `YOUR_STORAGE_ACCOUNT_NAME` with your actual account name.

Or find it in:
- **Overview** → **Primary endpoint** → Look for **Blob service** endpoint
- Example: `https://ijustwenttostorage123.blob.core.windows.net`

### 3.3 Access Keys

1. In your Storage Account, find **Security + networking** section
2. Click **Access keys**
3. You'll see two keys (Key1 and Key2) - either works
4. Click **Show** next to one of the keys
5. Copy the **Key** value
   - ⚠️ **Important**: Keep this secret! Never commit it to Git.
   - Example: `abc123def456ghi789...`

### 3.4 Container Name

- The container name you created (e.g., `photos`)

## Step 4: Update Your .env File

### 4.1 Open Your .env File

Navigate to `backend/.env` and add/update the Blob Storage section:

```env
# Azure SQL Database Configuration (already configured)
AZURE_SQL_SERVER=your-server.database.windows.net
AZURE_SQL_DATABASE=your-database-name
AZURE_SQL_USERNAME=your-username
AZURE_SQL_PASSWORD=your-password

# Azure Blob Storage Configuration
AZURE_STORAGE_ACCOUNT_URL=https://ijustwenttostorage123.blob.core.windows.net
AZURE_STORAGE_ACCOUNT_NAME=ijustwenttostorage123
AZURE_STORAGE_ACCOUNT_KEY=your-actual-access-key-here
AZURE_STORAGE_CONTAINER_NAME=photos

# Flask Configuration
PORT=5000
FLASK_ENV=development
```

### 4.2 Fill in Your Values

Replace with your actual values:

```env
AZURE_STORAGE_ACCOUNT_URL=https://YOUR_STORAGE_ACCOUNT.blob.core.windows.net
AZURE_STORAGE_ACCOUNT_NAME=YOUR_STORAGE_ACCOUNT
AZURE_STORAGE_ACCOUNT_KEY=YOUR_ACCESS_KEY_FROM_PORTAL
AZURE_STORAGE_CONTAINER_NAME=photos
```

**Important Notes:**
- **URL**: Must include `https://` and `.blob.core.windows.net`
- **Account Name**: Just the account name, no URL parts
- **Access Key**: The full key string (usually very long, ~80+ characters)
- **Container Name**: Exact name you created (case-sensitive)

### 4.3 Example (Filled In)

```env
AZURE_STORAGE_ACCOUNT_URL=https://ijustwenttostorage123.blob.core.windows.net
AZURE_STORAGE_ACCOUNT_NAME=ijustwenttostorage123
AZURE_STORAGE_ACCOUNT_KEY=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
AZURE_STORAGE_CONTAINER_NAME=photos
```

## Step 5: Test Blob Storage Connection

### 5.1 Test with Python

1. Activate your virtual environment:
   ```bash
   cd backend
   .\venv\Scripts\Activate.ps1  # Windows PowerShell
   ```

2. Test the connection:
   ```bash
   python -c "from services.blob_storage import get_blob_service_client; client = get_blob_service_client(); print('Connection successful!')"
   ```

### 5.2 Test by Uploading a Photo

1. Start your Flask app:
   ```bash
   python app.py
   ```

2. Use the frontend (http://localhost:3000) to upload a test photo
3. Check Azure Portal:
   - Go to your Storage Account
   - Click **Containers** → `photos` container
   - You should see your uploaded photo file

### 5.3 Verify Photo URL

After uploading a photo via your app:
1. The API will return a `photoUrl` in the response
2. Copy that URL and paste it in a browser
3. You should see the photo (if container is set to public access)

## Step 6: Troubleshooting

### Error: "Storage account credentials are missing"

**Problem**: `.env` file not configured or missing values
**Solution**:
1. Verify `.env` file exists in `backend/` folder
2. Check all Blob Storage variables are filled in
3. No quotes around values
4. No extra spaces

### Error: "Container does not exist"

**Problem**: Container name doesn't match
**Solution**:
1. Check container name in Azure Portal
2. Verify it matches `AZURE_STORAGE_CONTAINER_NAME` in `.env`
3. Container name is case-sensitive
4. Ensure container was created successfully

### Error: "Authentication failed"

**Problem**: Wrong access key or account name
**Solution**:
1. Verify access key is correct (copy entire key)
2. Check account name matches exactly
3. Ensure you're using the correct subscription

### Error: "Permission denied"

**Problem**: Container access level or permissions
**Solution**:
1. Check container public access level (should be "Blob" for public photos)
2. Verify Storage Account allows public access
3. Check network access settings in Storage Account

### Photos not displaying in browser

**Problem**: Container might be private or URL incorrect
**Solution**:
1. Check container access level is "Blob" (public read)
2. Verify photo URL is correct format
3. Test URL directly in browser
4. Check CORS settings if accessing from different domain

## Step 7: Cost Optimization

### Development Tips

1. **Use LRS redundancy** - Cheapest option
2. **Set access tier to "Hot"** - Lower access costs
3. **Delete test photos** - Keep storage costs down
4. **Monitor usage** - Check Azure Cost Management

### Pricing Estimates (US East, approximate)

- **Storage**: ~$0.018 per GB per month (LRS)
- **Operations**: ~$0.005 per 10,000 transactions
- **Data transfer**: First 5 GB free, then ~$0.09 per GB

**For development**: Expect ~$1-5/month for moderate usage

## Step 8: Security Best Practices

### 1. Access Keys Security

- ✅ Never commit access keys to Git (already in `.gitignore`)
- ✅ Don't share keys publicly
- ✅ Regenerate keys if accidentally exposed
- ✅ Use Azure Key Vault for production

### 2. Container Access

- **Development**: Public access (Blob level) is fine
- **Production**: Consider private access with SAS tokens

### 3. Network Security

- **Development**: Public access from all networks
- **Production**: Restrict to specific IPs/networks if possible

### 4. Key Rotation

Regularly rotate access keys:
1. Azure Portal → Storage Account → Access keys
2. Generate new key
3. Update `.env` file
4. Delete old key after testing

## Quick Reference Checklist

- [ ] Storage Account created in Azure Portal
- [ ] Container named "photos" created
- [ ] Container set to "Blob" public access (for public photos)
- [ ] Storage account name copied
- [ ] Storage account URL noted (with https://)
- [ ] Access key copied from Access keys section
- [ ] Container name noted
- [ ] `.env` file updated with all Blob Storage values
- [ ] Connection tested successfully
- [ ] Test photo uploaded and verified

## Next Steps

Once Blob Storage is configured:

1. ✅ Test photo upload from frontend
2. ✅ Verify photos appear in Azure Portal
3. ✅ Check photo URLs work in browser
4. ✅ Test full app workflow (create trip with photo)

## Common Questions

**Q: Can I use a different container name?**
A: Yes! Just update `AZURE_STORAGE_CONTAINER_NAME` in `.env`. The code will create it automatically if it doesn't exist.

**Q: Do I need to create the container manually?**
A: The code will create it automatically if it doesn't exist, but creating it manually lets you set the public access level upfront.

**Q: What file types are supported?**
A: Any image file (jpg, png, gif, webp, etc.). The app doesn't restrict file types, but consider adding validation in production.

**Q: How do I delete old photos?**
A: Use Azure Portal → Storage Account → Containers → photos → Select files → Delete, or implement deletion in your app later.

**Q: Can I resize images before uploading?**
A: Yes! You can add image processing in `backend/services/blob_storage.py` using Pillow library (already in requirements.txt).

---

**You're all set! Your Blob Storage is ready to store trip photos!** 📸

