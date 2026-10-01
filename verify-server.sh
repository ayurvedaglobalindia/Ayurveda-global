#!/bin/bash
# Quick Server Verification

PORT=3000
PROJECT_DIR="/data/data/com.termux/files/home/Ayur-Veda-Global"

echo "Verifying server on port $PORT..."

# Check process
if [ -f "$PROJECT_DIR/.server.pid" ]; then
    PID=$(cat "$PROJECT_DIR/.server.pid")
    if kill -0 "$PID" 2>/dev/null; then
        echo "✓ Process running (PID: $PID)"
    else
        echo "✗ Process dead (PID: $PID)"
        exit 1
    fi
else
    echo "✗ No PID file"
    exit 1
fi

# Check port
if lsof -ti:$PORT 2>/dev/null | grep -q "$PID" || pgrep -P "$PID" >/dev/null || curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT" 2>/dev/null | grep -qE "200|304"; then
    echo "✓ Port $PORT is active and serving"
else
    echo "✗ Port $PORT not reachable"
    exit 1
fi

# Check HTTP
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "http://localhost:$PORT" 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ HTTP 200 OK"
    echo ""
    echo "Server verified successfully!"
    echo "Preview URL: http://localhost:$PORT"
    exit 0
else
    echo "✗ HTTP $HTTP_CODE"
    echo "Check logs: tail -f $PROJECT_DIR/server.log"
    exit 1
fi