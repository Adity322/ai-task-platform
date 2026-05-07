FROM python:3.11-slim

WORKDIR /app

# Create non-root user
RUN addgroup --system appgroup && adduser --system --group appuser

# Install dependencies system-wide
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy worker source
COPY . .

# Set ownership
RUN chown -R appuser:appgroup /app

USER appuser

CMD ["python", "worker.py"]
