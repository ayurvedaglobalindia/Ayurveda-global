#!/bin/bash
# Restart Ayur-Veda-Global development server

PROJECT_DIR="/data/data/com.termux/files/home/Ayur-Veda-Global"

echo "Restarting Ayur-Veda-Global server..."
bash "$PROJECT_DIR/stop.sh"
sleep 2
bash "$PROJECT_DIR/setup-termux.sh"