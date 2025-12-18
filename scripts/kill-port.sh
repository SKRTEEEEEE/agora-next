#!/bin/bash

# Script to kill process on port 3002
PORT=3002

echo "Checking for processes on port $PORT..."

# Find and kill process on the port
PID=$(lsof -ti:$PORT 2>/dev/null || fuser $PORT/tcp 2>/dev/null)

if [ -n "$PID" ]; then
  echo "Killing process $PID on port $PORT"
  kill -9 $PID 2>/dev/null || true
  sleep 1
  echo "Port $PORT is now free"
else
  echo "No process found on port $PORT"
fi
