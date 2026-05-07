import redis
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os
import time
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler

load_dotenv()

# MongoDB connection
mongo_client = MongoClient(
    os.getenv("MONGO_URI"),
    tls=True,
    tlsAllowInvalidCertificates=True
)
db = mongo_client["test"]
tasks_collection = db["tasks"]

# Redis connection (Upstash TLS)
redis_client = redis.from_url(
    os.getenv("REDIS_URL"),
    decode_responses=True
)

# Simple health check server so Render doesn't complain
class HealthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Worker is running")
    def log_message(self, format, *args):
        pass  # Suppress logs

def start_health_server():
    server = HTTPServer(("0.0.0.0", 8001), HealthHandler)
    server.serve_forever()

# Start health server in background thread
threading.Thread(target=start_health_server, daemon=True).start()

print("Worker started...")

# Process operations
def process_task(operation, text):
    if operation == "uppercase":
        return text.upper()
    elif operation == "lowercase":
        return text.lower()
    elif operation == "reverse":
        return text[::-1]
    elif operation == "wordcount":
        return str(len(text.split()))
    else:
        raise Exception("Invalid operation")

# Worker loop
while True:
    print("Waiting for tasks...")
    queue_data = redis_client.brpop("taskQueue")
    task_id = queue_data[1]
    print(f"Processing task: {task_id}")
    try:
        task = tasks_collection.find_one({
            "_id": ObjectId(task_id)
        })
        if not task:
            print("Task not found")
            continue
        tasks_collection.update_one(
            {"_id": ObjectId(task_id)},
            {
                "$set": {"status": "running"},
                "$push": {"logs": "Task started"}
            }
        )
        time.sleep(2)
        result = process_task(
            task["operation"],
            task["inputText"]
        )
        tasks_collection.update_one(
            {"_id": ObjectId(task_id)},
            {
                "$set": {
                    "status": "success",
                    "result": result
                },
                "$push": {"logs": "Task completed successfully"}
            }
        )
        print(f"Task completed: {task_id}")
    except Exception as e:
        tasks_collection.update_one(
            {"_id": ObjectId(task_id)},
            {
                "$set": {"status": "failed"},
                "$push": {"logs": f"Error: {str(e)}"}
            }
        )
        print(f"Task failed: {str(e)}")
