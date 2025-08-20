#!/bin/bash

# 版本更新腳本
# 使用方法: ./update-version.sh [新版本號]

if [ $# -eq 0 ]; then
    echo "請提供新版本號"
    echo "使用方法: ./update-version.sh 2.1.1"
    exit 1
fi

NEW_VERSION=$1
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

echo "正在更新版本至 $NEW_VERSION..."

# 驗證版本號格式
if ! [[ $NEW_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "錯誤: 版本號格式不正確，請使用 x.y.z 格式"
    exit 1
fi

# 更新版本配置文件
sed -i "s/VERSION: '[0-9]\+\.[0-9]\+\.[0-9]\+'/VERSION: '$NEW_VERSION'/g" version-config.js
sed -i "s/BUILD_DATE: '[^']*'/BUILD_DATE: '$TIMESTAMP'/g" version-config.js

# 更新 HTML 文件中的版本號
sed -i "s/v=[0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+/v=$NEW_VERSION/g" index.html
sed -i "s/v=[0-9]\+\.[0-9]\+\.[0-9]\+/v=$NEW_VERSION/g" index.html
sed -i "s/content=\"[0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+\"/content=\"$NEW_VERSION\"/g" index.html
sed -i "s/content=\"[0-9]\+\.[0-9]\+\.[0-9]\+\"/content=\"$NEW_VERSION\"/g" index.html
sed -i "s/id=\"version-display\">[0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+</id=\"version-display\">$NEW_VERSION</g" index.html
sed -i "s/id=\"version-display\">[0-9]\+\.[0-9]\+\.[0-9]\+</id=\"version-display\">$NEW_VERSION</g" index.html
sed -i "s/id=\"version-date\">[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}[^<]*/id=\"version-date\">$TIMESTAMP/g" index.html

# 更新 JavaScript 文件中的版本號和日期
sed -i "s/CURRENT_VERSION = '[0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+'/CURRENT_VERSION = '$NEW_VERSION'/g" script.js
sed -i "s/CURRENT_VERSION = '[0-9]\+\.[0-9]\+\.[0-9]\+'/CURRENT_VERSION = '$NEW_VERSION'/g" script.js
sed -i "s/CURRENT_VERSION_DATE = '[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}[^']*'/CURRENT_VERSION_DATE = '$TIMESTAMP'/g" script.js

# 更新 Service Worker 中的版本號
# 更新緩存名稱
sed -i "s/irukatun-welcome-v[0-9]\+\.[0-9]\+\.[0-9]\+/irukatun-welcome-v$NEW_VERSION/g" sw.js
sed -i "s/static-v[0-9]\+\.[0-9]\+\.[0-9]\+/static-v$NEW_VERSION/g" sw.js
# 更新版本配置文件中的版本號
sed -i "s/v=[0-9]\+\.[0-9]\+\.[0-9]\+/v=$NEW_VERSION/g" version-config.js
# 更新資源版本號
sed -i "s/v=[0-9]\+\.[0-9]\+\.[0-9]\+/v=$NEW_VERSION/g" sw.js

echo "版本更新完成！"
echo "新版本: $NEW_VERSION"
echo "更新時間: $TIMESTAMP"
echo ""
echo "已更新的文件:"
echo "- version-config.js (版本配置)"
echo "- index.html (meta版本標籤和資源版本)"
echo "- script.js (CURRENT_VERSION 和 CURRENT_VERSION_DATE)"
echo "- sw.js (緩存名稱和資源版本)"
echo ""
echo "請記得："
echo "1. 檢查更新後的文件是否正確"
echo "2. 提交並推送更改到git倉庫"
echo "3. 部署新版本到服務器"
echo "4. 清除瀏覽器快取測試新版本"
