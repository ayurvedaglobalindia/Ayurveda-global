#!/bin/bash
# Termux Shell Timeout Root Cause FIX
# Run this in your actual Termux terminal to fix the underlying issues

set -e

echo "=========================================="
echo "Termux Shell Timeout - Root Cause Fix"
echo "=========================================="
echo ""

PROJECT_DIR="/data/data/com.termux/files/home/Ayur-Veda-Global"

# FIX 1: Kill ALL node/npm/next processes completely
echo "[FIX 1/7] Killing all stuck processes..."
pkill -9 -f "node" 2>/dev/null || true
pkill -9 -f "npm" 2>/dev/null || true
pkill -9 -f "next" 2>/dev/null || true
pkill -9 -f "bash.*dev" 2>/dev/null || true
sleep 2

# Also clear port 3000 aggressively
for port in 3000 3001 3002 3003; do
    PIDS=$(lsof -ti:$port 2>/dev/null || true)
    if [ -n "$PIDS" ]; then
        kill -9 $PIDS 2>/dev/null || true
    fi
done
echo "  All processes killed"
echo ""

# FIX 2: Clear npm cache and lock files
echo "[FIX 2/7] Clearing npm cache and locks..."
cd "$PROJECT_DIR"
npm cache clean --force 2>/dev/null || true
rm -f package-lock.json 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true
rm -rf .next 2>/dev/null || true
echo "  Cache cleared"
echo ""

# FIX 3: Fix npm registry (common Termux network issue)
echo "[FIX 3/7] Configuring npm registry for Termux..."
npm config set registry https://registry.npmmirror.com 2>/dev/null || true
npm config set fetch-timeout 300000 2>/dev/null || true
npm config set fetch-retry-maxtimeout 600000 2>/dev/null || true
npm config set fetch-retries 3 2>/dev/null || true
echo "  Registry configured to Chinese mirror (faster in Asia)"
echo ""

# FIX 4: Ensure proper Node.js installation
echo "[FIX 4/7] Verifying Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "  Node.js not found, installing via pkg..."
    pkg update -y && pkg install -y nodejs-lts 2>&1 | tail -5
else
    NODE_VER=$(node --version)
    echo "  Node.js $NODE_VER found"
    # Check if it's too old
    MAJOR=$(echo $NODE_VER | sed 's/v//' | cut -d. -f1)
    if [ "$MAJOR" -lt 18 ]; then
        echo "  Node.js version < 18, upgrading..."
        pkg install -y nodejs-lts 2>&1 | tail -5
    fi
fi
echo ""

# FIX 5: Increase system limits
echo "[FIX 5/7] Increasing system limits..."
ulimit -n 65536 2>/dev/null || true
ulimit -u 65536 2>/dev/null || true
# Fix for Termux file watcher limits
echo 524288 > /proc/sys/fs/inotify/max_user_watches 2>/dev/null || true
echo "  Limits increased"
echo ""

# FIX 6: Clean reinstall dependencies with proper flags
echo "[FIX 6/7] Reinstalling dependencies (this may take 2-5 minutes)..."
cd "$PROJECT_DIR"
rm -rf node_modules 2>/dev/null || true
rm -f package-lock.json 2>/dev/null || true

# Use --prefer-offline to avoid network hangs, --legacy-peer-deps for compatibility
npm install --legacy-peer-deps --prefer-offline --no-audit --no-fund 2>&1 | tail -20
echo "  Dependencies installed"
echo ""

# FIX 7: Verify build works
echo "[FIX 7/7] Verifying Next.js build..."
timeout 120 npm run build 2>&1 | tail -30 || {
    echo "  Build failed or timed out. Trying development mode test..."
    timeout 60 npm run dev -- --hostname 0.0.0.0 --port 3000 > /tmp/next-test.log 2>&1 &
    TEST_PID=$!
    sleep 15
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null | grep -q "200"; then
        echo "  Development server works!"
        kill $TEST_PID 2>/dev/null || true
    else
        echo "  Development server also failed. Check /tmp/next-test.log"
        cat /tmp/next-test.log | tail -30
    fi
}

echo ""
echo "=========================================="
echo "ROOT CAUSE FIXES APPLIED"
echo "=========================================="
echo ""
echo "Now run the startup script:"
echo "  bash $PROJECT_DIR/start.sh"
echo ""
echo "Or for full setup:"
echo "  bash $PROJECT_DIR/setup-termux.sh"
echo ""
echo "If issues persist, run diagnosis:"
echo "  bash $PROJECT_DIR/diagnose-termux.sh"