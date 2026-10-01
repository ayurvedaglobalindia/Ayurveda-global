#!/bin/bash
# Stop Ayur-Veda-Global development server

PROJECT_DIR="/data/data/com.termux/files/home/Ayur-Veda-Global"
cd "$PROJECT_DIR"

echo "Stopping Ayur-Veda-Global server..."

# Kill by saved PID
if [ -f ".server.pid" ]; then
    PID=$(cat .server.pid)
    if kill -0 $PID 2>/dev/null; then
        echo "Stopping server (PID: $PID)..."
        kill -TERM $PID 2>/dev/null
        sleep 2
        if kill -0 $PID 2>/dev/null; then
            kill -9 $PID 2>/dev/null
            echo "Force killed"
        fi
    fi
    rm -f .server.pid
fi

# Kill any remaining processes on port 3000
PIDS=$(lsof -ti:3000 2>/dev/null || true)
if [ -n "$PIDS" ]; then
    echo "Killing remaining processes on port 3000: $PIDS"
    kill -9 $PIDS 2>/dev/null || true
fi

# Kill any next dev processes for this project
PIDS=$(pgrep -f "next.*dev.*3000" 2>/dev/null || true)
if [ -n "$PIDS" ]; then
    echo "Killing stray next processes: $PIDS"
    kill -9 $PIDS 2>/dev/null || true
fi

echo "Server stopped."