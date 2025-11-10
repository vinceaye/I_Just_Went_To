from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
from dotenv import load_dotenv
from models.database import init_db, get_db_connection
from services.blob_storage import upload_photo, get_photo_url

load_dotenv()

app = Flask(__name__)
CORS(app)

init_db()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'I Just Went To API is running'})

@app.route('/api/trips', methods=['GET'])
def get_trips():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT TOP 50 id, user_name, location, description, photo_url, trip_date, created_at
            FROM trips
            ORDER BY created_at DESC
        """)
        
        trips = []
        for row in cursor.fetchall():
            trips.append({
                'id': row[0],
                'userName': row[1],
                'location': row[2],
                'description': row[3],
                'photoUrl': row[4],
                'tripDate': row[5].isoformat() if row[5] else None,
                'createdAt': row[6].isoformat() if row[6] else None
            })
        
        cursor.close()
        conn.close()
        
        return jsonify(trips), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/trips', methods=['POST'])
def create_trip():
    try:
        data = request.form.to_dict()
        file = request.files.get('photo')
        
        user_name = data.get('userName', 'Anonymous')
        location = data.get('location')
        description = data.get('description', '')
        trip_date_str = data.get('tripDate')
        
        if not location:
            return jsonify({'error': 'Location is required'}), 400
        
        photo_url = None
        if file and file.filename:
            photo_url = upload_photo(file)
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        trip_date = datetime.fromisoformat(trip_date_str) if trip_date_str else datetime.now()
        
        cursor.execute("""
            INSERT INTO trips (user_name, location, description, photo_url, trip_date)
            OUTPUT INSERTED.id
            VALUES (?, ?, ?, ?, ?)
        """, (user_name, location, description, photo_url, trip_date))
        
        trip_id = cursor.fetchone()[0]
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return jsonify({
            'id': trip_id,
            'userName': user_name,
            'location': location,
            'description': description,
            'photoUrl': photo_url,
            'tripDate': trip_date.isoformat()
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)

