#!/bin/bash
# Ayur-Veda-Global Termux Setup Script
# Run this once to set up the project

set -e

PROJECT_DIR="/data/data/com.termux/files/home/Ayur-Veda-Global"
cd "$PROJECT_DIR"

echo "=========================================="
echo "Ayur-Veda-Global Termux Setup"
echo "=========================================="

# 1. Detect framework and install dependencies
echo "[1/6] Detecting framework and installing dependencies..."

if [ ! -f "package.json" ]; then
    echo "ERROR: package.json not found in $PROJECT_DIR"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
    echo "Installing npm dependencies..."
    npm install --legacy-peer-deps 2>&1 | tail -20
else
    echo "Dependencies already installed, checking for updates..."
    npm install --legacy-peer-deps 2>&1 | tail -10
fi

# 2. Fix common startup issues
echo "[2/6] Fixing startup configuration..."

# Ensure next.config.js has correct hostname binding
if ! grep -q "0.0.0.0" next.config.js 2>/dev/null; then
    echo "Configuring Next.js for 0.0.0.0 binding..."
fi

# Create .env.local if missing
if [ ! -f ".env.local" ]; then
    cat > .env.local << 'EOF'
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Ayur Veda Global
EOF
    echo "Created .env.local"
fi

# 3. Kill any existing processes on port 3000
echo "[3/6] Checking for existing servers on port 3000..."
EXISTING_PID=$(lsof -ti:3000 2>/dev/null || true)
if [ -n "$EXISTING_PID" ]; then
    echo "Killing existing process(es) on port 3000: $EXISTING_PID"
    kill -9 $EXISTING_PID 2>/dev/null || true
    sleep 2
fi

# Also check for any node processes from this project
PIDS=$(pgrep -f "next.*dev.*3000" 2>/dev/null || true)
if [ -n "$PIDS" ]; then
    echo "Killing stray next dev processes: $PIDS"
    kill -9 $PIDS 2>/dev/null || true
    sleep 1
fi

# 4. Start development server in background
echo "[4/6] Starting development server on 0.0.0.0:3000..."

# Remove old log file
rm -f server.log

# Start server with nohup
nohup npm run dev -- --hostname 0.0.0.0 --port 3000 > server.log 2>&1 &
SERVER_PID=$!

echo $SERVER_PID > .server.pid
echo "Server started with PID: $SERVER_PID"

# 5. Wait for server to be ready and verify
echo "[5/6] Waiting for server to compile..."
sleep 10

# Check if process is still alive
if ! kill -0 $SERVER_PID 2>/dev/null; then
    echo "ERROR: Server process died. Check server.log:"
    cat server.log
    exit 1
fi

# Wait for "Ready" message in logs (up to 60 seconds)
echo "Waiting for Next.js to be ready..."
for i in {1..30}; do
    if grep -q "Ready in" server.log 2>/dev/null || grep -q "Local:" server.log 2>/dev/null; then
        echo "Server is ready!"
        break
    fi
    if ! kill -0 $SERVER_PID 2>/dev/null; then
        echo "ERROR: Server process died during startup"
        cat server.log
        exit 1
    fi
    sleep 2
done

# 6. Verify with curl
echo "[6/6] Verifying server with curl..."
sleep 3
for i in {1..5}; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null | grep -q "200"; then
        echo ""
        echo "=========================================="
        echo "SUCCESS! Server is running and responding"
        echo "=========================================="
        echo "Preview URL: http://localhost:3000"
        echo "Server PID: $SERVER_PID"
        echo "Log file: $PROJECT_DIR/server.log"
        echo ""
        echo "To view logs: tail -f $PROJECT_DIR/server.log"
        echo "To stop: bash $PROJECT_DIR/stop.sh"
        echo "To restart: bash $PROJECT_DIR/restart.sh"
        exit 0
    fi
    echo "Attempt $i/5: Server not ready yet, waiting..."
    sleep 3
done

echo "WARNING: Server may still be compiling. Check logs:"
tail -30 server.log
echo ""
echo "Preview URL: http://localhost:3000 (may still be loading)"