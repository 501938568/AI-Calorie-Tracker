#!/bin/bash

# 监控间隔（秒）- 30分钟
INTERVAL=1800
PROJECT_DIR="/root/project_1"

echo "[$(date)] 监控脚本启动"

while true; do
    # 检查前端 (Vite on port 80)
    if ! lsof -i:80 | grep -q LISTEN; then
        echo "[$(date)] 前端挂掉，重新启动..."
        cd "$PROJECT_DIR/client" && npm run dev -- --port 80 >> /tmp/vite.log 2>&1 &
    fi

    # 检查后端 (Node server on port 3000)
    if ! lsof -i:3000 | grep -q LISTEN; then
        echo "[$(date)] 后端挂掉，重新启动..."
        cd "$PROJECT_DIR/server" && node server.cjs >> /tmp/server.log 2>&1 &
    fi

    sleep $INTERVAL
done
