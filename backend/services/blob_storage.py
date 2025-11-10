import os
from azure.storage.blob import BlobServiceClient
from azure.identity import DefaultAzureCredential
from datetime import datetime
import uuid

def get_blob_service_client():
    account_url = os.getenv('AZURE_STORAGE_ACCOUNT_URL')
    account_name = os.getenv('AZURE_STORAGE_ACCOUNT_NAME')
    account_key = os.getenv('AZURE_STORAGE_ACCOUNT_KEY')
    
    if account_key:
        return BlobServiceClient(account_url=account_url, credential=account_key)
    elif account_name:
        account_url = f"https://{account_name}.blob.core.windows.net"
        credential = DefaultAzureCredential()
        return BlobServiceClient(account_url=account_url, credential=credential)
    else:
        raise ValueError("Azure Storage credentials are missing. Please check your .env file.")

def upload_photo(file):
    try:
        container_name = os.getenv('AZURE_STORAGE_CONTAINER_NAME', 'photos')
        blob_service_client = get_blob_service_client()
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        unique_id = str(uuid.uuid4())[:8]
        file_extension = os.path.splitext(file.filename)[1] if file.filename else '.jpg'
        blob_name = f"{timestamp}_{unique_id}{file_extension}"
        
        container_client = blob_service_client.get_container_client(container_name)
        
        if not container_client.exists():
            from azure.storage.blob import PublicAccess
            container_client.create_container(public_access=PublicAccess.Blob)
        
        blob_client = container_client.get_blob_client(blob_name)
        
        # Reset file pointer to beginning if needed
        file.seek(0)
        blob_client.upload_blob(file.read(), overwrite=True, content_type=file.content_type)
        
        return blob_client.url
    except Exception as e:
        print(f"Error uploading photo: {str(e)}")
        raise

def get_photo_url(blob_name):
    try:
        container_name = os.getenv('AZURE_STORAGE_CONTAINER_NAME', 'photos')
        blob_service_client = get_blob_service_client()
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_name)
        return blob_client.url
    except Exception as e:
        print(f"Error getting photo URL: {str(e)}")
        return None

