#!/data/data/com.termux/files/usr/bin/bash
# Start Ayur-Veda-Global development server (assumes setup already done)

PROJECT_DIR="/data/data/com.termux/files/home/Ayur-Veda-Global"
cd "$PROJECT_DIR"

echo "Starting Ayur-Veda-Global server..."

# Check if already running
if [ -f ".server.pid" ]; then
    PID=$(cat .server.pid)
    if kill -0 $PID 2>/dev/null; then
        echo "Server already running (PID: $PID)"
        echo "Preview URL: http://localhost:3000"
        exit 0
    fi
fi

# Kill any existing on port 3000
PIDS=$(lsof -ti:3000 2>/dev/null || true)
if [ -n "$PIDS" ]; then
    kill -9 $PIDS 2>/dev/null || true
    sleep 1
fi

# Start server
nohup npm run dev -- --hostname 0.0.0.0 --port 3000 > server.log 2>&1 &
SERVER_PID=$!
echo $SERVER_PID > .server.pid
echo "Server started with PID: $SERVER_PID"

# Wait and verify
sleep 8
for i in {1..10}; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null | grep -q "200"; then
        echo "Server ready at http://localhost:3000"
        exit 0
    fi
    sleep 2
done

echo "Server starting... check logs with: tail -f $PROJECT_DIR/server.log"
echo "Preview URL: http://localhost:3000"