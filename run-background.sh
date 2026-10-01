#!/bin/bash
# Robust Background Server Runner for Termux
# Uses proper process isolation, nohup, and doesn't hang

set -e

PROJECT_DIR="/data/data/com.termux/files/home/Ayur-Veda-Global"
cd "$PROJECT_DIR"

PORT=3000
HOST="0.0.0.0"
LOG_FILE="$PROJECT_DIR/server.log"
PID_FILE="$PROJECT_DIR/.server.pid"

echo "=========================================="
echo "Starting Ayur-Veda-Global in Background"
echo "=========================================="

# Function: Kill existing server properly
kill_existing() {
    echo "Checking for existing server..."
    
    # Kill by saved PID
    if [ -f "$PID_FILE" ]; then
        OLD_PID=$(cat "$PID_FILE" 2>/dev/null)
        if [ -n "$OLD_PID" ] && kill -0 "$OLD_PID" 2>/dev/null; then
            echo "  Stopping old server (PID: $OLD_PID)..."
            kill -TERM "$OLD_PID" 2>/dev/null
            sleep 2
            if kill -0 "$OLD_PID" 2>/dev/null; then
                kill -9 "$OLD_PID" 2>/dev/null
            fi
        fi
    fi
    
    # Kill anything on port
    PORT_PIDS=$(lsof -ti:$PORT 2>/dev/null || true)
    if [ -n "$PORT_PIDS" ]; then
        echo "  Killing processes on port $PORT: $PORT_PIDS"
        kill -9 $PORT_PIDS 2>/dev/null || true
    fi
    
    # Kill any next dev for this project
    PROJECT_PIDS=$(pgrep -f "next.*dev.*$PORT" 2>/dev/null || true)
    if [ -n "$PROJECT_PIDS" ]; then
        kill -9 $PROJECT_PIDS 2>/dev/null || true
    fi
    
    sleep 1
}

# Function: Start server with proper isolation
start_server() {
    echo "Starting server on $HOST:$PORT..."
    
    # Clear old log
    > "$LOG_FILE"
    
    # Start with proper nohup and process isolation
    # Use setsid to create new session, disown to detach from shell
    setsid bash -c "
        cd '$PROJECT_DIR'
        exec npm run dev -- --hostname $HOST --port $PORT
    " >> "$LOG_FILE" 2>&1 &
    
    SERVER_PID=$!
    
    # Save PID
    echo $SERVER_PID > "$PID_FILE"
    
    # Disown so it doesn't get SIGHUP when shell exits
    disown $SERVER_PID 2>/dev/null || true
    
    echo "Server started with PID: $SERVER_PID"
    echo "Log file: $LOG_FILE"
}

# Function: Wait for server ready with timeout
wait_ready() {
    echo "Waiting for server to compile (max 90 seconds)..."
    
    local max_wait=90
    local waited=0
    
    while [ $waited -lt $max_wait ]; do
        # Check if process still alive
        if ! kill -0 "$SERVER_PID" 2>/dev/null; then
            echo "ERROR: Server process died!"
            echo "Last 50 lines of log:"
            tail -50 "$LOG_FILE"
            return 1
        fi
        
        # Check HTTP response
        if curl -s -o /dev/null -w "%{http_code}" --max-time 5 "http://localhost:$PORT" 2>/dev/null | grep -q "200"; then
            echo ""
            echo "=========================================="
            echo "SUCCESS: Server is ready!"
            echo "=========================================="
            echo "Preview URL: http://localhost:$PORT"
            echo "Server PID: $SERVER_PID"
            echo "Log file: $LOG_FILE"
            echo ""
            echo "Commands:"
            echo "  View logs:  tail -f $LOG_FILE"
            echo "  Stop:       bash $PROJECT_DIR/stop.sh"
            echo "  Restart:    bash $PROJECT_DIR/restart.sh"
            return 0
        fi
        
        # Check for "Ready" in logs (Next.js specific)
        if grep -q "Ready in" "$LOG_FILE" 2>/dev/null; then
            # Give it a moment more
            sleep 3
            if curl -s -o /dev/null -w "%{http_code}" --max-time 5 "http://localhost:$PORT" 2>/dev/null | grep -q "200"; then
                echo ""
                echo "=========================================="
                echo "SUCCESS: Server is ready!"
                echo "=========================================="
                echo "Preview URL: http://localhost:$PORT"
                return 0
            fi
        fi
        
        sleep 2
        waited=$((waited + 2))
        echo -n "."
    done
    
    echo ""
    echo "WARNING: Timeout waiting for server. Check logs:"
    tail -30 "$LOG_FILE"
    return 1
}

# MAIN EXECUTION
kill_existing
start_server
wait_ready

# Keep this script running? No - exit immediately so OpenCode doesn't hang
# The server runs in background via setsid+disown
exit 0