#!/bin/bash
# Ayur Veda Global System & Health Diagnostics Script

echo "========================================================"
echo "🩺 AYUR VEDA GLOBAL DIAGNOSTICS & SYSTEM HEALTH CHECK"
echo "========================================================"
echo ""

PROJECT_DIR="/data/data/com.termux/files/home/Ayur-Veda-Global"
cd "$PROJECT_DIR" || exit 1

# 1. Environment & Node
echo "[1/5] Checking Environment & Runtime..."
echo "  • Node Version: $(node -v 2>/dev/null || echo 'NOT FOUND')"
echo "  • NPM Version:  $(npm -v 2>/dev/null || echo 'NOT FOUND')"
echo "  • Memory Usage:"
free -m 2>/dev/null || cat /proc/meminfo 2>/dev/null | head -3 || echo "  (Memory info unavailable)"
echo ""

# 2. TypeScript Compilation Check
echo "[2/5] Checking TypeScript Types & Compilation..."
if npx tsc --noEmit; then
  echo "  ✓ TypeScript compile check: 0 ERRORS (PASSED)"
else
  echo "  ✗ TypeScript compile check: FAILED"
fi
echo ""

# 3. Server Process & Port Check
echo "[3/5] Checking Local Server & Port 3000..."
PID=$(cat .server.pid 2>/dev/null)
if [ -n "$PID" ] && kill -0 "$PID" 2>/dev/null; then
  echo "  ✓ Server process is ACTIVE (PID: $PID)"
else
  # Check if port 3000 has any process
  PORT_PID=$(pgrep -f "next-server" 2>/dev/null | head -1)
  if [ -z "$PORT_PID" ]; then
    PORT_PID=$(lsof -ti:3000 2>/dev/null | head -1)
  fi
  if [ -n "$PORT_PID" ]; then
    echo "  ✓ Server running on port 3000 (PID: $PORT_PID)"
    echo "$PORT_PID" > .server.pid
  elif curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000" 2>/dev/null | grep -q "200"; then
    echo "  ✓ Server is responding with HTTP 200 on port 3000"
  else
    echo "  ✗ No server running on port 3000"
  fi
fi
echo ""

# 4. HTTP Route Diagnostics
echo "[4/5] Testing HTTP Endpoints..."
ROUTES=("/" "/shop" "/product/body-essential-nutrition" "/product/staymax-delay-spray" "/product/vitality-power-combo" "/categories" "/about" "/contact" "/faq" "/track-order" "/account")
ALL_OK=true

for route in "${ROUTES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$route" 2>/dev/null || echo "000")
  if [ "$STATUS" = "200" ]; then
    echo "  ✓ Route $route -> HTTP 200 OK"
  else
    echo "  ✗ Route $route -> HTTP $STATUS"
    ALL_OK=false
  fi
done
echo ""

# 5. Automated Test Suite
echo "[5/5] Running Test Suite..."
npx tsx src/scripts/run-tests.ts
TEST_EXIT=$?
echo ""

echo "========================================================"
if [ "$ALL_OK" = true ] && [ "$TEST_EXIT" -eq 0 ]; then
  echo "🎉 ALL CHECKS PASSED: Ayur Veda Global is HEALTHY & READY!"
  echo "Preview URL: http://localhost:3000"
else
  echo "⚠ DIAGNOSTICS DETECTED ISSUES. Please review output above."
fi
echo "========================================================"
