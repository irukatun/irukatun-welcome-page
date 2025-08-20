#!/bin/bash

# 版本更新腳本
# 使用方法: ./update-version.sh [新版本號]

if [ $# -eq 0 ]; then
    echo "請提供新版本號"
    echo "使用方法: ./update-version.sh 2.1.1"
    exit 1
fi

NEW_VERSION=$1
CURRENT_DATE=$(date +"%Y-%m-%d %H:%M:%S")

echo "正在更新版本至 $NEW_VERSION..."

# 更新 HTML 文件中的版本號
sed -i "s/v=[0-9]\+\.[0-9]\+\.[0-9]\+/v=$NEW_VERSION/g" index.html
sed -i "s/content=\"[0-9]\+\.[0-9]\+\.[0-9]\+\"/content=\"$NEW_VERSION\"/g" index.html

# 更新 JavaScript 文件中的版本號
sed -i "s/CURRENT_VERSION = '[0-9]\+\.[0-9]\+\.[0-9]\+'/CURRENT_VERSION = '$NEW_VERSION'/g" script.js

# 更新 Service Worker 中的版本號
sed -i "s/v[0-9]\+\.[0-9]\+\.[0-9]\+/v$NEW_VERSION/g" sw.js

echo "版本更新完成！"
echo "新版本: $NEW_VERSION"
echo "更新時間: $CURRENT_DATE"
echo ""
echo "請記得："
echo "1. 提交並推送更改到git倉庫"
echo "2. 部署新版本到服務器"
echo "3. 通知用戶刷新頁面以獲取最新版本"
