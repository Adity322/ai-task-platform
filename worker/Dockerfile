# Stage 1: Build
FROM python:3.11-slim AS builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Production
FROM python:3.11-slim AS production

# Create non-root user
RUN addgroup --system appgroup && adduser --system --group appuser

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /root/.local /home/appuser/.local

# Copy worker source
COPY . .

# Set ownership
RUN chown -R appuser:appgroup /app

USER appuser

# Make sure scripts in .local are usable
ENV PATH=/home/appuser/.local/bin:$PATH

CMD ["python", "worker.py"]