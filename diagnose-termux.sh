#!/bin/bash
# Termux Shell Timeout Root Cause Diagnosis
# Run this in your actual Termux terminal to identify the issue

set -e

echo "=========================================="
echo "Termux Shell Timeout Diagnosis"
echo "=========================================="
echo ""

# 1. Check Termux version and environment
echo "[1/8] Environment Info:"
echo "  TERMUX_VERSION: ${TERMUX_VERSION:-unknown}"
echo "  ANDROID_VERSION: $(getprop ro.build.version.release 2>/dev/null || echo unknown)"
echo "  SHELL: $SHELL"
echo "  PWD: $PWD"
echo "  USER: $(whoami)"
echo "  HOME: $HOME"
echo ""

# 2. Check for stuck processes
echo "[2/8] Checking for stuck/hanging processes..."
STUCK_PIDS=$(ps aux | grep -E "(npm|node|next|bash)" | grep -v grep | awk '{print $2}')
if [ -n "$STUCK_PIDS" ]; then
    echo "  Found processes that may be stuck:"
    ps aux | grep -E "(npm|node|next|bash)" | grep -v grep
    echo ""
    echo "  Killing them..."
    kill -9 $STUCK_PIDS 2>/dev/null || true
    sleep 1
else
    echo "  No stuck npm/node/next processes found"
fi
echo ""

# 3. Check port 3000
echo "[3/8] Checking port 3000..."
if lsof -ti:3000 2>/dev/null; then
    echo "  Port 3000 is in use by:"
    lsof -ti:3000 | xargs ps -p
    echo "  Killing..."
    kill -9 $(lsof -ti:3000) 2>/dev/null || true
else
    echo "  Port 3000 is free"
fi
echo ""

# 4. Check disk space and inodes
echo "[4/8] Disk Space & Inodes:"
df -h /data/data/com.termux/files/home 2>/dev/null | tail -1
df -i /data/data/com.termux/files/home 2>/dev/null | tail -1
echo ""

# 5. Check npm/node versions
echo "[5/8] Node/NPM Versions:"
node --version 2>/dev/null || echo "  node: NOT INSTALLED"
npm --version 2>/dev/null || echo "  npm: NOT INSTALLED"
echo ""

# 6. Check project directory
echo "[6/8] Project Directory Check:"
PROJECT_DIR="/data/data/com.termux/files/home/Ayur-Veda-Global"
if [ -d "$PROJECT_DIR" ]; then
    echo "  Project exists: $PROJECT_DIR"
    ls -la "$PROJECT_DIR" | head -20
    if [ -f "$PROJECT_DIR/package.json" ]; then
        echo "  package.json: EXISTS"
    else
        echo "  package.json: MISSING"
    fi
    if [ -d "$PROJECT_DIR/node_modules" ]; then
        echo "  node_modules: EXISTS ($(ls -1 $PROJECT_DIR/node_modules | wc -l) packages)"
    else
        echo "  node_modules: MISSING"
    fi
else
    echo "  Project directory NOT FOUND"
fi
echo ""

# 7. Test basic shell responsiveness
echo "[7/8] Shell Responsiveness Test:"
start=$(date +%s%N)
sleep 0.1
end=$(date +%s%N)
elapsed=$(( (end - start) / 1000000 ))
echo "  sleep 0.1 took ${elapsed}ms (should be ~100ms)"
if [ $elapsed -gt 500 ]; then
    echo "  WARNING: Shell is slow/laggy"
fi
echo ""

# 8. Test npm install speed
echo "[8/8] Quick npm test (dry-run)..."
cd "$PROJECT_DIR" 2>/dev/null || { echo "  Cannot cd to project"; exit 1; }
timeout 30 npm install --dry-run --legacy-peer-deps 2>&1 | tail -5 || echo "  npm test timed out or failed"

echo ""
echo "=========================================="
echo "Diagnosis Complete"
echo "=========================================="
echo ""
echo "NEXT STEPS based on findings:"
echo "1. If shell is slow -> Restart Termux app completely"
echo "2. If node/npm missing -> pkg install nodejs-lts"
echo "3. If port stuck -> Run stop.sh then start.sh"
echo "4. If npm hangs -> Check network, try: npm config set registry https://registry.npmmirror.com"
echo "5. If disk full -> Clean cache: npm cache clean --force"
echo "5. If still broken -> Reinstall Termux or use: termux-reload-settings"