#!/bin/bash

# 輕量化版本更新腳本
# 使用方法: ./update-version.sh [新版本號]

if [ $# -eq 0 ]; then
    echo "請提供新版本號"
    echo "使用方法: ./update-version.sh x.y.z-abcde"
    exit 1
fi

NEW_VERSION=$1
TIMESTAMP=$(TZ='Asia/Taipei' date +"%Y-%m-%d %H:%M:%S")

echo "正在更新版本至 $NEW_VERSION..."

# 1. 更新 script.js 中的版本配置（唯一來源）
sed -i "s/const APP_VERSION = '[^']*'/const APP_VERSION = '$NEW_VERSION'/g" script.js
sed -i "s/const BUILD_DATE = '[^']*'/const BUILD_DATE = '$TIMESTAMP'/g" script.js

# 2. 更新 HTML 中的資源版本號（緩存控制）
sed -i "s/\?v=[^\"']*/?v=$NEW_VERSION/g" index.html

# 3. 更新 HTML meta 版本標籤（只更新 name="version" 的那一行）
sed -i 's/<meta name="version" content="[^"]*">/<meta name="version" content="'$NEW_VERSION'">/g' index.html

# 4. 更新 HTML 中的版本顯示占位符
sed -i "s/<span id=\"version-display\">[^<]*</<span id=\"version-display\">$NEW_VERSION</g" index.html
sed -i "s/<span id=\"version-date\">[^<]*</<span id=\"version-date\">$TIMESTAMP</g" index.html

echo "版本更新完成！"
echo "新版本: $NEW_VERSION"
echo "更新時間: $TIMESTAMP"
echo ""
echo "已更新的檔案:"
echo "- script.js (版本配置 - 唯一來源)"
echo "- index.html (meta版本標籤和資源版本)"
echo ""
echo "版本號將自動同步到頁面顯示"
